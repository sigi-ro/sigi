<?php

namespace App\Traits\CMS;

use App\Interfaces\CMS\TemplateFieldInterface;
use App\Models\CMS\Content;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;

trait ManagesContent
{
    use ManagesData;

    protected string $content_slug = 'content';

    protected function extractContentFromData() : Collection
    {
        $content = Arr::get($this->data, $this->content_slug, []);
        unset($this->data[$this->content_slug]);

        if (empty($content)) {
            return collect([]);
        }

        // Content may come as array indices [0 => {...}, 1 => {...}] after prepareForValidation
        // or as object keys {"40": {...}, "41": {...}} if prepareForValidation didn't run
        // We need to key it by template_field_id for processing
        $data = collect($content)->mapWithKeys(function ($item, $key) {
            // Ensure it's an array
            if (!is_array($item)) {
                $item = (array) $item;
            }
            
            // Get template_field_id from item or use key if numeric
            $template_field_id = $item['template_field_id'] ?? (is_numeric($key) ? (int) $key : null);
            
            if (!$template_field_id) {
                // Skip items without template_field_id
                return [];
            }
            
            // Ensure template_field_id is set
            $item['template_field_id'] = $template_field_id;
            
            // Remove 'id' field (content record ID) - we don't want this in the data
            unset($item['id']);
            
            return [$template_field_id => $item];
        })->filter(); // Remove empty entries

        return $data;
    }

    protected function storeContent(Model $model, Collection $content)
    {
        // Get all the template fields for the new model
        $template_fields = $model->template->templateFields->keyBy('id');

        if (!count($template_fields)) {
            return;
        }

        // Advanced content validation
        $this->validateContent($content, $template_fields);

        // Create the Content model if the template field exists
        $new_content = [];
        foreach ($content as $template_field_id => $c) {
            if (isset($template_fields[$template_field_id])) {
                // Ensure template_field_id is set
                $c['template_field_id'] = $template_field_id;
                // Remove any 'id' field if present
                unset($c['id']);
                $c['template_field_type'] = $template_fields[$template_field_id]->type;

                if (in_array($c['template_field_type'], TemplateFieldInterface::JSON_TYPES)) {
                    $c['data'] = json_encode(Arr::get($c, 'data'));
                }

                $new_content[] = new Content($c);
            }
        }

        $model->content()->saveMany($new_content);
    }

    protected function updateContent(Model $model, Collection $content)
    {
        // Get all the template fields for the model
        $template_fields = $model->template->templateFields->keyBy('id');

        if (!count($template_fields)) {
            $model->content()->delete();
            return;
        }

        // Advanced content validation
        $this->validateContent($content, $template_fields);

        $existing_content = $model->content->keyBy('template_field_id');
        $content_to_save = [];
        $content_to_delete = [];

        foreach ($template_fields as $template_field_id => $template_field) {
            // Check if the field exists and is being updated
            if (isset($content[$template_field_id]) && isset($existing_content[$template_field_id])) {
                // Update the existing content model
                $content_data = $content[$template_field_id]['data'] ?? null;
                
                // Format the data as JSON if necessary
                if (in_array($template_field->type, TemplateFieldInterface::JSON_TYPES)) {
                    $content_data = json_encode($content_data);
                }
                
                $existing_content[$template_field_id]->data = $content_data;
                $existing_content[$template_field_id]->template_field_type = $template_field->type;
                $content_to_save[$template_field_id] = $existing_content[$template_field_id];

                unset($content[$template_field_id]);
                unset($existing_content[$template_field_id]);
            }
            // Check if the field is new
            else if (isset($content[$template_field_id])) {
                $c_data = $content[$template_field_id];
                // Ensure template_field_id is set
                $c_data['template_field_id'] = $template_field_id;
                // Remove any 'id' field (content record ID, not template field ID)
                unset($c_data['id']);
                
                $content_data = Arr::get($c_data, 'data');
                
                // Format the data as JSON if necessary
                if (in_array($template_field->type, TemplateFieldInterface::JSON_TYPES)) {
                    $c_data['data'] = json_encode($content_data);
                }
                
                $c = new Content($c_data);
                $c->template_field_type = $template_field->type;
                $content_to_save[$template_field_id] = $c;
                unset($content[$template_field_id]);
            }
        }

        // Check if any of the existing content should be deleted
        foreach ($existing_content as $template_field_id => $ec) {
            if (!isset($template_fields[$template_field_id])) {
                // Store the content record ID, not the template field ID
                $content_to_delete[] = $ec->id;
            }
        }

        if (count($content_to_save)) {
            foreach ($content_to_save as $content_item) {
                if ($content_item instanceof Content && $content_item->exists) {
                    // Update existing content
                    $content_item->save();
                } else {
                    // Create new content
                    $model->content()->save($content_item);
                }
            }
            unset($content_to_save);
        }

        if (count($content_to_delete)) {
            Content::destroy($content_to_delete);
        }
    }

    protected function validateContent(Collection $content, Collection $template_fields)
    {
        $required_fields = $template_fields->where('is_required', true)->keyBy('id');

        if (!count($required_fields)) {
            return;
        }

        $missing_fields = [];
        foreach ($required_fields as $id => $field) {
            if (!isset($content[$id]) || !isset($content[$id]['data']) || !$content[$id]['data']) {
                $missing_fields[] = $field->name;
            }
        }

        if (count($missing_fields)) {
            throw ValidationException::withMessages([
                $this->content_slug => 'The following fields are required: ' . implode("', ", $missing_fields)
            ]);
        }
    }
}
