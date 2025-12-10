<template>
    <div>
        <slot />

        <select-group
            :input-id="`content-field-${templateField.id}`"
            :input-name="`content-field-${templateField.id}`"
            :input-options="fieldOptions"
            input-option-label-key="label"
            input-option-value-key="value"
            v-model="editableContent"
            :label-text="templateField.name"
        />
    </div>
</template>

<script>
    import { contentFieldMixin } from "../../../../../mixins/admin/cms/content-field";
    import SelectGroup from "../../../../core/forms/SelectGroup.vue";

    export default {
        name: "SelectField",
        mixins: [
            contentFieldMixin,
        ],
        components: {
            SelectGroup,
        },
        computed: {
            fieldOptions() {
                // Only override for text-horizontal-position
                if (this.templateField.slug === 'text-horizontal-position') {
                    return ['left', 'center', 'right'].map(option => ({
                        label: this.formatOptionLabel(option),
                        value: option
                    }));
                }
                let options = [];
                try {
                    if (this.templateField && this.templateField.settings && this.templateField.settings.options) {
                        options = this.templateField.settings.options;
                    }
                } catch (e) {
                    options = [];
                }
                return options.map(option => ({
                    label: this.formatOptionLabel(option),
                    value: option
                }));
            },
            horizontalValue() {
                // Only for text-horizontal-position, always use string value
                if (this.templateField.slug === 'text-horizontal-position') {
                    if (typeof this.editableContent === 'object' && this.editableContent !== null && this.editableContent.value) {
                        return this.editableContent.value;
                    }
                    return this.editableContent || '';
                }
                return this.editableContent;
            },
        },
        created() {
            // The mixin already set editableContent = cloneDeep(content)
            // If content is an object (old format), extract the value
            // Set default value if no content exists
            if (!this.editableContent && this.templateField && this.templateField.settings && this.templateField.settings.default) {
                this.editableContent = this.templateField.settings.default;
                this.onEditableContentUpdate();
            }
            // Always store only the string value for dropdowns
            if (typeof this.editableContent === 'object' && this.editableContent !== null && this.editableContent.value) {
                this.editableContent = this.editableContent.value;
            }
        },
        methods: {
            formatOptionLabel(value) {
                // Convert kebab-case or snake_case to Title Case
                return value
                    .split(/[-_]/)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            },
            onHorizontalChange(value) {
                // Only for text-horizontal-position, always store string value
                if (this.templateField.slug === 'text-horizontal-position') {
                    this.editableContent = value;
                    this.onEditableContentUpdate();
                    return;
                }
                // Always store only the string value
                if (typeof value === 'object' && value !== null && value.value) {
                    this.editableContent = value.value;
                } else {
                    this.editableContent = value;
                }
                this.onEditableContentUpdate();
            },
        },
    }
</script>
