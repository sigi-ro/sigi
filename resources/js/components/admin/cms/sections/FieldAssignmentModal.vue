<template>
    <transition
        v-if="showModal"
        name="fade"
    >
        <div
            class="fixed bg-gray-800 bg-opacity-75 flex h-full inset-0 items-center justify-center w-full p-2 sm:p-4 z-30"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="'field-assignment-title-' + _uid"
            @keydown.esc="closeModal"
        >
            <div
                class="bg-theme-card max-h-full w-full sm:max-w-full overflow-y-auto relative rounded shadow-md text-theme-card-contrast sm:w-160"
                v-on-clickaway="closeModal"
            >
                <div class="flex flex-row justify-between items-center p-3 sm:p-4 border-b">
                    <h2 
                        class="text-base sm:text-lg font-semibold"
                        :id="'field-assignment-title-' + _uid"
                    >
                        {{ section && section.name 
                            ? transWithFallback('assign-fields-to-section', 'Assign Fields to Section') + ': ' + section.name
                            : transWithFallback('assign-fields-to-section', 'Assign Fields to Section')
                        }}
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
                    >
                        <icon-close class="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <div class="p-3 sm:p-4">
                    <p class="text-sm text-gray-600 mb-4">
                        {{ transWithFallback('select-fields-to-assign', 'Select fields to assign to this section:') }}
                    </p>

                    <div class="space-y-2 max-h-64 sm:max-h-96 overflow-y-auto">
                        <div
                            v-for="field in availableFields"
                            :key="field.id"
                            class="flex items-start sm:items-center space-x-3 p-3 border rounded hover:bg-gray-50 touch-manipulation"
                            :class="{ 'bg-blue-50': field.section_id === section?.id, 'bg-gray-50': field.section_id && field.section_id !== section?.id }"
                        >
                            <input
                                type="checkbox"
                                :id="`field_${field.id}`"
                                :value="field.id"
                                v-model="selectedFieldIds"
                                class="rounded h-5 w-5 sm:h-4 sm:w-4 mt-0.5 sm:mt-0 flex-shrink-0"
                            />
                            <label :for="`field_${field.id}`" class="flex-grow cursor-pointer min-w-0">
                                <div class="font-medium text-sm sm:text-base truncate">{{ field.name }}</div>
                                <div class="text-xs text-gray-500 flex flex-wrap gap-1">
                                    <span>{{ shortType(field.type) }}</span>
                                    <span v-if="field.section_id && field.section_id !== section?.id" class="text-orange-600">
                                        ({{ transWithFallback('in-another-section', 'In another section') }})
                                    </span>
                                    <span v-else-if="field.section_id === section?.id" class="text-blue-600">
                                        ({{ transWithFallback('in-this-section', 'In this section') }})
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div v-if="availableFields.length === 0" class="text-center py-8 text-gray-500 text-sm" role="status">
                        {{ transWithFallback('no-available-fields', 'No available fields to assign') }}
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row justify-end p-3 sm:p-4 border-t gap-2 sm:gap-3">
                    <button
                        class="
                            bg-theme-base-subtle px-4 py-3 sm:py-2 rounded text-theme-base-subtle-contrast
                            ease-in-out duration-300 transition-colors
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                            hover:bg-theme-base-subtle-contrast hover:text-theme-base-subtle
                            touch-manipulation order-2 sm:order-1
                        "
                        type="button"
                        @click="closeModal"
                    >
                        {{ transWithFallback('cancel', 'Cancel') }}
                    </button>

                    <button
                        class="
                            bg-theme-primary px-4 py-3 sm:py-2 rounded text-theme-primary-contrast
                            ease-in-out duration-300 transition-colors
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                            hover:bg-theme-primary-hover
                            touch-manipulation order-1 sm:order-2
                            disabled:opacity-50 disabled:cursor-not-allowed
                        "
                        :disabled="isSubmitting || selectedFieldIds.length === 0"
                        :aria-busy="isSubmitting"
                        type="button"
                        @click="assignFields"
                    >
                        <icon-loader-circle
                            v-if="isSubmitting"
                            class="animate-spin-slow mr-2 w-5 inline"
                            aria-hidden="true"
                        />
                        {{ isSubmitting ? transWithFallback('assigning', 'Assigning...') : transWithFallback('assign-fields', 'Assign Fields') }}
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway';

    export default {
        name: "FieldAssignmentModal",
        mixins: [clickaway],
        props: {
            section: {
                required: true,
                type: Object,
            },
            templateFields: {
                default: () => [],
                type: Array,
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
                isSubmitting: false,
                selectedFieldIds: [],
            }
        },
        computed: {
            availableFields() {
                if (!this.templateFields || !Array.isArray(this.templateFields)) {
                    return [];
                }
                // Show ALL fields - user can reassign fields from one section to another
                return this.templateFields;
            },
        },
        watch: {
            showModal(newVal) {
                if (newVal) {
                    if (this.section && this.section.id) {
                        // Pre-select fields that are already in this section
                        this.selectedFieldIds = this.templateFields
                            .filter(field => field.section_id === this.section.id)
                            .map(field => field.id);
                    } else {
                        // If no section, start with empty selection
                        this.selectedFieldIds = [];
                    }
                }
            },
        },
        methods: {
            assignFields() {
                if (this.isSubmitting || this.selectedFieldIds.length === 0 || !this.section || !this.section.id) return;

                this.isSubmitting = true;

                axios.post(
                    this.$route('admin.api.cms.templates.sections.assign-fields', {
                        template: this.templateId,
                        section: this.section.id
                    }),
                    {
                        field_ids: this.selectedFieldIds
                    }
                ).then(() => {
                    this.$successToast(this.transWithFallback('fields-assigned', 'Fields assigned successfully'));
                    this.$emit('fields-assigned');
                    this.closeModal();
                }).catch(error => {
                    this.$errorToast(this.transWithFallback('failed-to-assign-fields', 'Failed to assign fields'));
                    console.error(error);
                }).finally(() => {
                    this.isSubmitting = false;
                });
            },
            closeModal() {
                this.$emit('close');
                this.selectedFieldIds = [];
            },
            shortType(type) {
                switch (type) {
                    case 'wysiwyg': return 'Rich text';
                    case 'image': return 'Image';
                    case 'repeater': return 'Repeater';
                    default: return type.charAt(0).toUpperCase() + type.slice(1);
                }
            },
        },
    }
</script>

