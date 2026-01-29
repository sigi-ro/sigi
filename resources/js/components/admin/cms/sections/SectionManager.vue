<template>
    <div 
        class="section-manager"
        role="region"
        :aria-label="transWithFallback('section-management', 'Section Management')"
    >
        <!-- Screen reader announcements -->
        <div 
            aria-live="polite" 
            aria-atomic="true" 
            class="sr-only"
            ref="announcer"
        >
            {{ announcement }}
        </div>

        <!-- Section Management Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h3 class="text-lg font-semibold" id="sections-heading">{{ transWithFallback('sections', 'Sections') }}</h3>
            <button
                type="button"
                class="
                    bg-theme-primary px-4 py-2 rounded text-theme-primary-contrast text-sm
                    ease-in-out duration-300 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    hover:bg-theme-primary-hover flex items-center justify-center space-x-2
                    w-full sm:w-auto
                "
                :aria-label="transWithFallback('add-new-section', 'Add new section')"
                @click="showAddSectionForm"
            >
                <icon-plus class="w-4 h-4" aria-hidden="true" />
                <span>{{ transWithFallback('add-section', 'Add Section') }}</span>
            </button>
        </div>

        <!-- Sections List -->
        <div v-if="sections.length === 0" class="text-center py-8 text-gray-500 text-sm" role="status">
            {{ transWithFallback('no-sections', 'No sections yet. Add a section to organize your fields.') }}
        </div>

        <draggable
            v-else
            v-model="draggableSections"
            :animation="200"
            handle=".section-drag-handle"
            ghost-class="section-ghost"
            @end="onSectionDragEnd"
            class="space-y-4"
            role="list"
            aria-labelledby="sections-heading"
        >
            <section-editor
                v-for="section in draggableSections"
                :key="section.id"
                :section="section"
                :template-fields="templateFields"
                :template-id="templateId"
                :content="content"
                :show-drag-handle="true"
                :search-query="searchQuery"
                @assign-fields="showAssignFieldsModal"
                @content-update="onContentUpdate"
                @edit="editSection"
                @delete="confirmDeleteSection"
            />
        </draggable>

        <!-- Fields without sections -->
        <div v-if="fieldsWithoutSection.length > 0" class="mt-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <h4 class="text-md font-semibold text-gray-600">
                    {{ transWithFallback('fields-without-section', 'Fields without section') }}
                </h4>
                <button
                    v-if="sortedSections.length > 0"
                    type="button"
                    class="
                        bg-theme-primary px-3 py-2 sm:py-1 rounded text-theme-primary-contrast text-xs
                        ease-in-out duration-300 transition-colors
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                        hover:bg-theme-primary-hover
                        w-full sm:w-auto text-center
                    "
                    :aria-label="transWithFallback('assign-unassigned-fields', 'Assign unassigned fields to a section')"
                    @click="showAssignFieldsModal(null)"
                >
                    {{ transWithFallback('assign-to-section', 'Assign to Section') }}
                </button>
            </div>
            <div class="space-y-3">
                <div
                    v-for="templateField in fieldsWithoutSection"
                    :key="templateField.id"
                    class="border bg-white rounded shadow-sm overflow-hidden"
                >
                    <div class="px-4 py-3 flex items-start justify-between" @click.stop>
                        <div class="flex items-start space-x-3 w-full">
                            <div class="flex-grow">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-2">
                                        <div class="text-sm font-medium text-theme-base-contrast">
                                            {{ templateField.name }}
                                        </div>
                                        <span v-if="templateField.is_required" class="text-xs text-theme-danger-contrast">*</span>
                                    </div>
                                    <div class="text-xs text-gray-400">{{ shortType(templateField.type) }}</div>
                                </div>
                                <div class="text-sm mt-1 text-theme-base-subtle-contrast truncate">
                                    {{ previewText(templateField) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section Form Modal -->
        <section-form
            :section="editingSection"
            :show-modal="showSectionForm"
            :template-id="templateId"
            @close="closeSectionForm"
            @saved="onSectionSaved"
        />

        <!-- Field Assignment Modal -->
        <field-assignment-modal
            v-if="sectionForFieldAssignment"
            :section="sectionForFieldAssignment"
            :template-fields="templateFields"
            :template-id="templateId"
            :show-modal="showFieldAssignmentModal"
            @close="closeFieldAssignmentModal"
            @fields-assigned="onFieldsAssigned"
        />

        <!-- Delete Confirmation Modal -->
        <confirmation-modal
            :show-modal="showDeleteModal"
            :message-title="transWithFallback('delete-section', 'Delete Section')"
            :message-text="transWithFallback('delete-section-confirm', 'Are you sure you want to delete this section? Fields in this section will be unassigned but not deleted.')"
            :confirm-text="transWithFallback('delete', 'Delete')"
            :cancel-text="transWithFallback('cancel', 'Cancel')"
            confirm-type="danger"
            @closeModal="closeDeleteModal"
            @confirmAction="deleteSection"
        />
    </div>
</template>

<script>
    import _ from 'lodash';
    import draggable from 'vuedraggable';
    import ConfirmationModal from "../../../core/modals/ConfirmationModal.vue";
    import FieldAssignmentModal from "./FieldAssignmentModal.vue";
    import SectionEditor from "./SectionEditor.vue";
    import SectionForm from "./SectionForm.vue";

    export default {
        name: "SectionManager",
        components: {
            ConfirmationModal,
            draggable,
            FieldAssignmentModal,
            SectionEditor,
            SectionForm,
        },
        props: {
            sections: {
                default: () => [],
                type: Array,
            },
            templateFields: {
                default: () => [],
                type: Array,
            },
            templateId: {
                required: true,
                type: Number,
            },
            content: {
                default: () => ({}),
                type: Object,
            },
            searchQuery: {
                default: '',
                type: String,
            },
        },
        data() {
            return {
                announcement: '',
                editingSection: null,
                internalSections: [],
                isReordering: false,
                sectionForFieldAssignment: null,
                sectionToDelete: null,
                showDeleteModal: false,
                showFieldAssignmentModal: false,
                showSectionForm: false,
            }
        },
        computed: {
            draggableSections: {
                get() {
                    // Use internal copy for drag operations
                    if (this.internalSections.length > 0) {
                        return this.internalSections;
                    }
                    return this.sortedSections;
                },
                set(value) {
                    this.internalSections = value;
                }
            },
            fieldsWithoutSection() {
                if (!this.templateFields || !Array.isArray(this.templateFields)) {
                    return [];
                }
                return this.templateFields.filter(field => !field.section_id)
                    .sort((a, b) => (a.order || 0) - (b.order || 0));
            },
            sortedSections() {
                if (!this.sections || !Array.isArray(this.sections)) {
                    return [];
                }
                return [...this.sections].sort((a, b) => (a.order || 0) - (b.order || 0));
            },
        },
        watch: {
            sections: {
                handler(newVal) {
                    // Reset internal sections when parent sections change
                    this.internalSections = [...newVal].sort((a, b) => (a.order || 0) - (b.order || 0));
                },
                immediate: true,
                deep: true,
            },
        },
        methods: {
            closeDeleteModal() {
                this.showDeleteModal = false;
                this.sectionToDelete = null;
            },
            closeSectionForm() {
                this.showSectionForm = false;
                this.editingSection = null;
            },
            confirmDeleteSection(section) {
                this.sectionToDelete = section;
                this.showDeleteModal = true;
            },
            deleteSection() {
                if (!this.sectionToDelete) return;

                axios.delete(
                    this.$route('admin.api.cms.templates.sections.destroy', {
                        template: this.templateId,
                        section: this.sectionToDelete.id
                    })
                ).then(() => {
                    this.$successToast(this.transWithFallback('section-deleted', 'Section deleted successfully'));
                    this.announce(this.transWithFallback('section-deleted-announcement', 'Section has been deleted'));
                    this.$emit('section-deleted', this.sectionToDelete);
                    this.closeDeleteModal();
                }).catch(error => {
                    this.$errorToast(this.transWithFallback('failed-to-delete-section', 'Failed to delete section'));
                    console.error(error);
                });
            },
            editSection(section) {
                this.editingSection = section;
                this.showSectionForm = true;
            },
            onContentUpdate(updatedContent) {
                this.$emit('content-update', updatedContent);
            },
            onFieldsAssigned() {
                this.$emit('reload-template');
                this.closeFieldAssignmentModal();
            },
            onSectionDragEnd() {
                // Build the reorder payload with new order values
                const sectionsToReorder = this.internalSections.map((section, index) => ({
                    id: section.id,
                    order: index,
                }));

                // Optimistically update local state
                this.isReordering = true;

                axios.post(
                    this.$route('admin.api.cms.templates.sections.reorder', {
                        template: this.templateId,
                    }),
                    { sections: sectionsToReorder }
                ).then(() => {
                    this.$successToast(this.transWithFallback('sections-reordered', 'Sections reordered'));
                    this.announce(this.transWithFallback('sections-reordered-announcement', 'Sections have been reordered'));
                    // Emit event to parent to reload template with new order
                    this.$emit('reload-template');
                }).catch(error => {
                    this.$errorToast(this.transWithFallback('failed-to-reorder-sections', 'Failed to reorder sections'));
                    console.error(error);
                    // Reset to original order on failure
                    this.internalSections = [...this.sections].sort((a, b) => (a.order || 0) - (b.order || 0));
                }).finally(() => {
                    this.isReordering = false;
                });
            },
            onSectionSaved(savedSection) {
                this.$emit('section-saved', savedSection);
                this.closeSectionForm();
            },
            closeFieldAssignmentModal() {
                this.showFieldAssignmentModal = false;
                this.sectionForFieldAssignment = null;
            },
            showAssignFieldsModal(section) {
                // If section is null, we need to show a section selector first
                if (!section && this.sortedSections.length > 0) {
                    // For now, just use the first section or show a prompt
                    // In a future enhancement, we could show a section selector
                    if (this.sortedSections.length === 1) {
                        this.sectionForFieldAssignment = this.sortedSections[0];
                        this.showFieldAssignmentModal = true;
                    } else {
                        // Multiple sections - let user choose (for now, use first)
                        // TODO: Add section selector modal
                        this.sectionForFieldAssignment = this.sortedSections[0];
                        this.showFieldAssignmentModal = true;
                    }
                } else if (section) {
                    this.sectionForFieldAssignment = section;
                    this.showFieldAssignmentModal = true;
                }
            },
            previewText(field) {
                try {
                    const data = this.content[field.id] ? this.content[field.id].data : undefined;
                    if (field.type === 'text' || field.type === 'textarea') {
                        return (data || '').toString().slice(0, 120);
                    }
                    if (field.type === 'image') {
                        if (data && typeof data === 'object') {
                            return data.url || data.path || 'No image';
                        }
                        return data || 'No image';
                    }
                    if (field.type === 'repeater' && Array.isArray(data)) {
                        return `${data.length} items`;
                    }
                    if (field.type === 'wysiwyg') {
                        return (data || '').toString().replace(/<[^>]+>/g, '').slice(0, 80);
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            },
            shortType(type) {
                switch (type) {
                    case 'wysiwyg': return 'Rich text';
                    case 'image': return 'Image';
                    case 'repeater': return 'Repeater';
                    default: return type.charAt(0).toUpperCase() + type.slice(1);
                }
            },
            showAddSectionForm() {
                this.editingSection = null;
                this.showSectionForm = true;
            },
            /**
             * Announce a message to screen readers
             * @param {string} message - The message to announce
             */
            announce(message) {
                this.announcement = '';
                this.$nextTick(() => {
                    this.announcement = message;
                });
            },
        },
    }
</script>

<style scoped>
    .section-ghost {
        opacity: 0.5;
        background: #f3f4f6;
        border: 2px dashed #9ca3af;
        border-radius: 0.5rem;
    }
    
    .section-ghost > * {
        opacity: 0;
    }
</style>
