<template>
    <transition
        v-if="showModal"
        name="fade"
    >
        <div
            class="fixed bg-gray-800 bg-opacity-75 flex h-full inset-0 items-center justify-center w-full p-2 sm:p-4 z-30"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="'section-form-title-' + _uid"
            @keydown.esc="closeModal"
            @keypress.enter.prevent.stop="handleSubmit"
        >
            <div
                class="bg-theme-card max-h-full w-full sm:max-w-full overflow-y-auto relative rounded shadow-md text-theme-card-contrast sm:w-160"
                v-on-clickaway="closeModal"
                ref="modalContent"
            >
                <div class="flex flex-row justify-between items-center p-3 sm:p-4 border-b">
                    <h2 
                        class="text-base sm:text-lg font-semibold"
                        :id="'section-form-title-' + _uid"
                    >
                        {{ isEditing ? transWithFallback('edit-section', 'Edit Section') : transWithFallback('add-section', 'Add Section') }}
                    </h2>
                    <button
                        class="
                            flex items-center justify-center p-2 sm:p-1 rounded
                            ease-in-out duration-300 transition-colors
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                            hover:bg-theme-base-subtle
                            touch-manipulation
                        "
                        type="button"
                        :aria-label="transWithFallback('close-modal', 'Close modal')"
                        @click="closeModal"
                        ref="closeButton"
                    >
                        <icon-close class="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <form @submit.prevent="handleSubmit" class="p-3 sm:p-4">
                    <!-- Section Template Selector (only when creating new section) -->
                    <div v-if="!isEditing" class="mb-6">
                        <label 
                            class="block text-sm font-medium text-theme-card-contrast mb-2"
                            :for="'section-template-' + _uid"
                        >
                            {{ transWithFallback('section-template', 'Section Template') }}
                            <span class="text-gray-500 text-xs ml-1">({{ transWithFallback('optional', 'Optional') }})</span>
                        </label>
                        <select
                            v-model="selectedTemplate"
                            @change="applyTemplate"
                            :id="'section-template-' + _uid"
                            :aria-describedby="'template-help-' + _uid"
                            class="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary"
                        >
                            <option value="">{{ transWithFallback('create-custom-section', 'Create Custom Section') }}</option>
                            <option value="header">Header</option>
                            <option value="services">Services</option>
                            <option value="about-us">About Us</option>
                            <option value="portfolio">Portfolio</option>
                            <option value="contact">Contact</option>
                        </select>
                        <p 
                            class="text-xs text-gray-500 mt-1"
                            :id="'template-help-' + _uid"
                        >
                            {{ transWithFallback('select-template-to-prefill', 'Select a template to pre-fill section details, or create a custom section') }}
                        </p>
                    </div>

                    <input-group
                        :error-message="getErrorMessage('name')"
                        input-autocomplete="section_name"
                        input-id="section_name"
                        input-name="name"
                        :input-required="true"
                        input-type="text"
                        :label-text="transWithFallback('section-name', 'Section Name')"
                        @errorHidden="clearErrorMessage('name')"
                        @input="onNameInput"
                        v-model="formData.name"
                    />

                    <input-group
                        class="mt-4"
                        :error-message="getErrorMessage('slug')"
                        input-autocomplete="section_slug"
                        input-id="section_slug"
                        input-name="slug"
                        :input-required="true"
                        input-type="text"
                        :label-text="transWithFallback('section-slug', 'Section Slug')"
                        @blur="onSlugBlur"
                        @errorHidden="clearErrorMessage('slug')"
                        @input="onSlugInput"
                        v-model="formData.slug"
                    />

                    <input-group
                        class="mt-4"
                        :error-message="getErrorMessage('description')"
                        input-autocomplete="section_description"
                        input-id="section_description"
                        input-name="description"
                        input-type="text"
                        :label-text="transWithFallback('description', 'Description')"
                        @errorHidden="clearErrorMessage('description')"
                        v-model="formData.description"
                    />

                    <input-group
                        class="mt-4"
                        :error-message="getErrorMessage('order')"
                        input-autocomplete="section_order"
                        input-id="section_order"
                        input-name="order"
                        input-type="number"
                        :input-min="0"
                        :label-text="transWithFallback('order', 'Order')"
                        @errorHidden="clearErrorMessage('order')"
                        v-model="formData.order"
                    />

                    <div class="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            id="is_collapsible"
                            v-model="formData.is_collapsible"
                            class="mr-2 h-4 w-4 text-theme-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 border-gray-300 rounded"
                        />
                        <label for="is_collapsible" class="text-sm cursor-pointer">
                            {{ transWithFallback('collapsible', 'Collapsible') }}
                        </label>
                    </div>

                    <div v-if="formData.is_collapsible" class="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            id="is_collapsed_by_default"
                            v-model="formData.is_collapsed_by_default"
                            class="mr-2 h-4 w-4 text-theme-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 border-gray-300 rounded"
                        />
                        <label for="is_collapsed_by_default" class="text-sm cursor-pointer">
                            {{ transWithFallback('collapsed-by-default', 'Collapsed by default') }}
                        </label>
                    </div>

                    <div class="flex flex-row justify-end mt-6 space-x-3">
                        <button
                            class="
                                bg-theme-base-subtle px-4 py-2 rounded text-theme-base-subtle-contrast
                                ease-in-out duration-300 transition-colors
                                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                                hover:bg-theme-base-subtle-contrast hover:text-theme-base-subtle
                            "
                            type="button"
                            @click="closeModal"
                        >
                            {{ transWithFallback('cancel', 'Cancel') }}
                        </button>

                        <button
                            class="
                                bg-theme-primary px-4 py-2 rounded text-theme-primary-contrast
                                ease-in-out duration-300 transition-colors
                                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                                hover:bg-theme-primary-hover
                            "
                            :disabled="isSubmitting"
                            :aria-busy="isSubmitting"
                            type="submit"
                        >
                            <icon-loader-circle
                                v-if="isSubmitting"
                                class="animate-spin-slow mr-2 w-5 inline"
                                aria-hidden="true"
                            />
                            {{ isSubmitting ? transWithFallback('saving', 'Saving...') : transWithFallback('save', 'Save') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
    import _ from 'lodash';
    import slugify from "slugify";
    import { mixin as clickaway } from 'vue-clickaway';
    import InputGroup from "../../../core/forms/InputGroup.vue";

    export default {
        name: "SectionForm",
        mixins: [clickaway],
        components: {
            InputGroup,
        },
        props: {
            section: {
                default: null,
                type: Object,
            },
            templateId: {
                required: true,
                type: Number,
            },
            showModal: {
                default: false,
                type: Boolean,
            },
        },
        data() {
            return {
                autoUpdateSlug: false,
                errorMessages: {},
                formData: {
                    name: '',
                    slug: '',
                    description: '',
                    order: 0,
                    is_collapsible: true,
                    is_collapsed_by_default: false,
                },
                isSubmitting: false,
                selectedTemplate: '',
            }
        },
        computed: {
            isEditing() {
                return !!this.section && !!this.section.id;
            },
        },
        watch: {
            showModal(newVal) {
                if (newVal) {
                    this.initializeForm();
                    // Focus first input when modal opens
                    this.$nextTick(() => {
                        const firstInput = this.$refs.modalContent?.querySelector('input, select');
                        if (firstInput) {
                            firstInput.focus();
                        }
                    });
                }
            },
            section: {
                handler: 'initializeForm',
                immediate: true,
            },
        },
        methods: {
            clearErrorMessage(field) {
                this.$delete(this.errorMessages, field);
            },
            closeModal() {
                this.$emit('close');
                this.resetForm();
            },
            getErrorMessage(field) {
                return this.errorMessages[field] || null;
            },
            handleSubmit() {
                if (this.isSubmitting) return;

                this.isSubmitting = true;
                this.errorMessages = {};

                const url = this.isEditing
                    ? this.$route('admin.api.cms.templates.sections.update', {
                        template: this.templateId,
                        section: this.section.id
                    })
                    : this.$route('admin.api.cms.templates.sections.store', {
                        template: this.templateId
                    });

                const method = this.isEditing ? 'put' : 'post';

                axios[method](url, this.formData)
                    .then(response => {
                        this.$successToast(
                            this.isEditing
                                ? this.transWithFallback('section-updated', 'Section updated successfully')
                                : this.transWithFallback('section-created', 'Section created successfully')
                        );
                        this.$emit('saved', response.data);
                        this.closeModal();
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 422) {
                            const errors = error.response.data.errors || {};
                            Object.keys(errors).forEach(key => {
                                this.$set(this.errorMessages, key, errors[key][0]);
                            });
                        } else {
                            this.$errorToast(
                                this.transWithFallback('failed-to-save-section', 'Failed to save section')
                            );
                        }
                    })
                    .finally(() => {
                        this.isSubmitting = false;
                    });
            },
            initializeForm() {
                if (this.section && this.section.id) {
                    // Editing existing section
                    this.formData = {
                        name: this.section.name || '',
                        slug: this.section.slug || '',
                        description: this.section.description || '',
                        order: this.section.order || 0,
                        is_collapsible: this.section.is_collapsible !== false,
                        is_collapsed_by_default: this.section.is_collapsed_by_default || false,
                    };
                    this.autoUpdateSlug = false;
                } else {
                    // Creating new section
                    this.resetForm();
                }
            },
            onNameInput() {
                if (!this.autoUpdateSlug) {
                    return;
                }
                this.formData.slug = this.slugify(this.formData.name);
            },
            onSlugBlur() {
                this.formData.slug = this.slugify(this.formData.slug);
            },
            onSlugInput() {
                this.autoUpdateSlug = false;
            },
            resetForm() {
                this.formData = {
                    name: '',
                    slug: '',
                    description: '',
                    order: 0,
                    is_collapsible: true,
                    is_collapsed_by_default: false,
                };
                this.errorMessages = {};
                this.autoUpdateSlug = true;
                this.selectedTemplate = '';
            },
            applyTemplate() {
                if (!this.selectedTemplate) {
                    return;
                }

                const templates = {
                    'header': {
                        name: 'Header',
                        slug: 'header',
                        description: 'Hero section fields for the homepage',
                    },
                    'services': {
                        name: 'Services',
                        slug: 'services',
                        description: 'Services section fields',
                    },
                    'about-us': {
                        name: 'About Us',
                        slug: 'about-us',
                        description: 'About us section fields',
                    },
                    'portfolio': {
                        name: 'Portfolio',
                        slug: 'portfolio',
                        description: 'Portfolio section fields',
                    },
                    'contact': {
                        name: 'Contact',
                        slug: 'contact',
                        description: 'Contact section fields',
                    },
                };

                const template = templates[this.selectedTemplate];
                if (template) {
                    this.formData.name = template.name;
                    this.formData.slug = template.slug;
                    this.formData.description = template.description;
                    this.autoUpdateSlug = false; // Don't auto-update slug when template is applied
                }
            },
            calculateNextOrder() {
                // Fetch existing sections to determine next order
                // This will be handled by the backend, but we can set a reasonable default
                // The backend will handle order conflicts
                this.formData.order = 0;
            },
            slugify(value) {
                if (!value || !value.length) {
                    return '';
                }
                return slugify(value, {
                    lower: true,
                    strict: true,
                });
            },
        },
    }
</script>

