<?php

namespace App\Traits\CMS;

use App\Http\Resources\Admin\CRM\OrganisationUnitResource;
use App\Http\Resources\Web\CMS\ContentResource;
use App\Http\Resources\Web\CMS\MenuResource;
use App\Http\Resources\Web\CRM\FormResource;
use App\Http\Resources\Web\EDU\CourseShowResource;
use App\Interfaces\CMS\TemplateFieldInterface;
use App\Models\CMS\Menu;
use App\Models\CRM\Form;
use App\Models\CRM\OrganisationUnit;
use App\Models\EDU\Course\Course;

trait ResourceHasContent
{
    protected function formatContent()
    {
        $content = ContentResource::collection($this->content)->keyBy('templateField.slug');

        // Loop through the content and get any "relation" fields
        $menu_fields = [];
        $course_fields = [];
        $form_fields = [];
        $organisation_unit_fields = [];

        foreach ($content as $template_field_slug => $c) {
            if ($c->template_field_type === TemplateFieldInterface::TYPE_CMS_MENU) {
                $menu_fields[$template_field_slug] = $c->data;
            } elseif ($c->template_field_type === TemplateFieldInterface::TYPE_EDU_COURSE) {
                $course_fields[$template_field_slug] = $c->data;
            } elseif ($c->template_field_type === TemplateFieldInterface::TYPE_CRM_FORM) {
                $form_fields[$template_field_slug] = $c->data;
            } elseif ($c->template_field_type === TemplateFieldInterface::TYPE_CRM_ORGANISATION_UNIT) {
                $organisation_unit_fields[$template_field_slug] = $c->data;
            }
        }

        // Load any menus
        $menu_ids = array_unique($menu_fields);
        if (count($menu_ids)) {
            $menus = Menu::whereIn('id', $menu_ids)
                ->get()
                ->keyBy('id');

            foreach ($menu_fields as $template_field_slug => $menu_id) {
                $content[$template_field_slug]['data'] = $menus->get($menu_id) ?
                    MenuResource::make($menus->get($menu_id)) :
                    null;
            }
        }

        // Load any courses
        $course_ids = array_unique($course_fields);
        if (count($course_ids)) {
            $courses = Course::whereIn('id', $course_ids)->with([
                'creator',
                'instalmentPlans',
                'sections'
            ])->get()
                ->keyBy('id');

            foreach ($course_fields as $template_field_slug => $course_id) {
                $content[$template_field_slug]['data'] = $courses->get($course_id) ?
                    CourseShowResource::make($courses->get($course_id)) :
                    null;
            }
        }

        // Load any forms
        $form_ids = array_unique($form_fields);
        if (count($form_ids)) {
            $forms = Form::whereIn('id', $form_ids)
                ->with('formFields')
                ->get()
                ->keyBy('id');

            foreach ($form_fields as $template_field_slug => $form_id) {
                $content[$template_field_slug]['data'] = $forms->get($form_id) ?
                    FormResource::make($forms->get($form_id)) :
                    null;
            }
        }

        // Load any organisation units
        $organisation_unit_ids = array_unique($organisation_unit_fields);
        if (count($organisation_unit_fields)) {
            $organisation_units = OrganisationUnit::whereIn('id', $organisation_unit_ids)
                ->with([
                    'location',
                    'company',
                    'children',
                ])
                ->get()
                ->keyBy('id');

            foreach ($organisation_unit_fields as $template_field_slug => $organisation_unit_id) {
                $content[$template_field_slug]['data'] = $organisation_units->get($organisation_unit_id) ?
                    OrganisationUnitResource::make($organisation_units->get($organisation_unit_id)) :
                    null;
            }
        }

        return $content;
    }
}
