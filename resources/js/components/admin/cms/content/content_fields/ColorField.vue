<template>
    <div>
        <input-group
            :error-message="errorMessage"
            :input-autocomplete="inputName"
            :input-id="inputName"
            :input-name="inputName"
            :input-required="templateField.is_required"
            input-type="text"
            label-class=""
            label-text=""
            v-model="editableContent"
        >
            <template #inputPrepend>
                <div class="flex items-center space-x-2">
                    <button
                        type="button"
                        class="relative flex items-center justify-center w-9 h-9 rounded border border-theme-subtle hover:shadow-sm"
                        :title="'Pick color for ' + (templateField.name || '')"
                    >
                        <span
                            class="w-5 h-5 rounded-full border"
                            :style="{ backgroundColor: (editableContent || defaultColor) }"
                        />

                        <!-- visible but transparent native color input overlayed on the button so the browser anchors popup correctly -->
                        <input
                            ref="picker"
                            type="color"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-0 p-0"
                            :value="editableContent || defaultColor"
                            @input="onColorPicker"
                            @change="onColorPicker"
                        />
                    </button>
                </div>
            </template>

            <slot/>
        </input-group>
    </div>
</template>

<script>
    import { contentFieldMixin } from "../../../../../mixins/admin/cms/content-field";
    import InputGroup from "../../../../core/forms/InputGroup.vue";

    export default {
        name: "ColorField",
        mixins: [
            contentFieldMixin,
        ],
        components: {
            InputGroup,
        },
        computed: {
            defaultColor() {
                try {
                    return (this.templateField && this.templateField.settings && this.templateField.settings.default) || '#ffffff';
                } catch (e) {
                    return '#ffffff';
                }
            }
        },

        mounted() {
            // When content is empty, set default from templateField.settings
            if ((!this.editableContent || this.editableContent === '') && this.defaultColor) {
                this.editableContent = this.defaultColor;
                this.onEditableContentUpdate();
            }
        },
        methods: {
            openPicker() {
                try {
                    this.$refs.picker.click();
                } catch (e) {
                    // no-op
                }
            },
            onColorPicker(e) {
                const v = e.target.value;
                if (v) {
                    this.editableContent = v;
                    this.onEditableContentUpdate();
                }
            }
        }
    }
</script>

    
