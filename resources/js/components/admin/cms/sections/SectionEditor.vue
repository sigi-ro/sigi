<template>
    <div 
        class="border bg-white rounded-lg shadow-sm overflow-hidden mb-4"
        role="listitem"
        :aria-label="section.name"
    >
        <!-- Section Header -->
        <div
            class="px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors gap-2 sm:gap-0"
            :class="{ 'bg-gray-50': isExpanded }"
            role="button"
            :tabindex="section.is_collapsible ? 0 : -1"
            :aria-expanded="isExpanded.toString()"
            :aria-controls="`section-content-${section.id}`"
            @click="toggleSection"
            @keydown.enter.prevent="toggleSection"
            @keydown.space.prevent="toggleSection"
        >
            <div class="flex items-center space-x-2 sm:space-x-3 flex-grow min-w-0">
                <!-- Drag Handle (only shown when enabled) -->
                <div
                    v-if="showDragHandle"
                    class="section-drag-handle flex-shrink-0 cursor-grab active:cursor-grabbing p-2 sm:p-1 -ml-1 sm:-ml-2 hover:bg-gray-200 rounded touch-manipulation"
                    @click.stop
                    role="button"
                    tabindex="0"
                    :aria-label="transWithFallback('drag-to-reorder', 'Drag to reorder section')"
                    @keydown.enter.stop
                    @keydown.space.stop
                >
                    <icon-grip-vertical class="w-5 h-5 text-gray-400" aria-hidden="true" />
                </div>

                <!-- Collapse/Expand Icon -->
                <div class="flex-shrink-0" aria-hidden="true">
                    <icon-chevron-right
                        :class="['w-5 h-5 text-gray-500 transition-transform', { 'rotate-90': isExpanded }]"
                    />
                </div>

                <!-- Section Info -->
                <div class="flex-grow min-w-0">
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 class="text-sm sm:text-base font-semibold text-theme-base-contrast truncate">
                            {{ section.name }}
                        </h3>
                        <span class="text-xs text-gray-500 whitespace-nowrap">
                            ({{ sectionFields.length }} {{ sectionFields.length === 1 ? 'field' : 'fields' }})
                        </span>
                    </div>
                    <p v-if="section.description" class="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 sm:line-clamp-none">
                        {{ section.description }}
                    </p>
                </div>
            </div>

            <!-- Section Actions -->
            <div class="flex items-center space-x-1 sm:space-x-2 self-end sm:self-center" @click.stop role="group" :aria-label="transWithFallback('section-actions', 'Section actions')">
                <button
                    type="button"
                    class="p-2 sm:px-2 sm:py-1 text-xs border rounded bg-blue-50 hover:bg-blue-100 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors touch-manipulation"
                    @click="assignFields"
                    :aria-label="transWithFallback('assign-fields-to-section', 'Assign fields to this section')"
                >
                    <icon-plus class="w-4 h-4 sm:w-4 sm:h-4" aria-hidden="true" />
                </button>
                <button
                    v-if="userCan('cms.delete')"
                    type="button"
                    class="p-2 sm:px-2 sm:py-1 text-xs border rounded bg-red-50 hover:bg-red-100 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors touch-manipulation"
                    @click="deleteSection"
                    :aria-label="transWithFallback('delete-this-section', 'Delete this section')"
                >
                    <icon-trash class="w-4 h-4 sm:w-4 sm:h-4" aria-hidden="true" />
                </button>
                <button
                    v-if="userCan('cms.edit')"
                    type="button"
                    class="p-2 sm:px-2 sm:py-1 text-xs border rounded bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 transition-colors touch-manipulation"
                    @click="editSection"
                    :aria-label="transWithFallback('edit-this-section', 'Edit this section')"
                >
                    <icon-edit class="w-4 h-4 sm:w-4 sm:h-4" aria-hidden="true" />
                </button>
            </div>
        </div>

        <!-- Section Fields (when expanded) -->
        <!-- Use v-show after first expansion for faster toggle, v-if initially for lazy loading -->
        <transition name="fade">
            <div 
                v-if="hasBeenExpanded"
                v-show="isExpanded" 
                class="px-3 sm:px-4 pb-4 pt-0 bg-gray-50"
                :id="`section-content-${section.id}`"
                role="region"
                :aria-label="transWithFallback('section-fields', 'Fields in section') + ' ' + section.name"
            >
                <!-- Loading indicator for large sections -->
                <div v-if="isLoadingFields" class="py-6 text-center" role="status" aria-live="polite">
                    <div class="inline-flex items-center space-x-2 text-gray-500 text-sm">
                        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{{ transWithFallback('loading-fields', 'Loading fields...') }}</span>
                    </div>
                </div>
                <div v-else-if="sectionFields.length === 0" class="py-8 text-center text-gray-500 text-sm" role="status">
                    {{ transWithFallback('no-fields-in-section', 'No fields in this section') }}
                </div>
                    <div v-else class="space-y-2 sm:space-y-3 mt-3" role="list" :aria-label="transWithFallback('fields-list', 'List of fields')">
                        <div
                            v-for="templateField in sectionFields"
                            :key="templateField.id"
                            :ref="setFieldRef(templateField.id)"
                            :data-field-id="templateField.id"
                            class="border bg-white rounded shadow-sm overflow-hidden transition-all duration-200"
                            :class="{ 'ring-2 ring-yellow-400 bg-yellow-50': isFieldHighlighted(templateField) }"
                            role="listitem"
                            :aria-label="templateField.name"
                        >
                        <div 
                            class="px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2" 
                            @click.stop
                        >
                            <div class="flex items-start space-x-3 w-full min-w-0">
                                <div class="flex-grow min-w-0">
                                    <div class="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                                        <div class="flex items-center space-x-2 min-w-0">
                                            <div class="text-sm font-medium text-theme-base-contrast truncate">
                                                <span v-html="highlightText(templateField.name)"></span>
                                            </div>
                                            <span v-if="templateField.is_required" class="text-xs text-theme-danger-contrast flex-shrink-0">*</span>
                                        </div>
                                        <div class="text-xs text-gray-400 flex-shrink-0">{{ shortType(templateField.type) }}</div>
                                    </div>
                                    <div class="text-xs sm:text-sm mt-1 text-theme-base-subtle-contrast truncate">
                                        {{ previewText(templateField) }}
                                    </div>
                                </div>
                            </div>

                            <div class="flex-shrink-0 self-end sm:self-start">
                                <button
                                    type="button"
                                    class="px-3 py-2 sm:px-2 sm:py-1 text-xs border rounded bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 touch-manipulation w-full sm:w-auto"
                                    @click="handleToggleClick($event, templateField.id)"
                                    :aria-expanded="expanded[templateField.id] ? 'true' : 'false'"
                                    :aria-controls="`field-editor-${templateField.id}`"
                                    :aria-label="expanded[templateField.id] ? transWithFallback('collapse-field', 'Collapse field editor') : transWithFallback('expand-field', 'Expand field editor')"
                                >
                                    <span v-if="expanded[templateField.id]">{{ transWithFallback('collapse', 'Collapse') }}</span>
                                    <span v-else>{{ transWithFallback('expand', 'Expand') }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Field Editor (when expanded) -->
                        <transition name="fade">
                            <div 
                                v-if="expanded[templateField.id]" 
                                class="px-4 pb-4 pt-0 bg-white"
                                :id="`field-editor-${templateField.id}`"
                                role="region"
                                :aria-label="transWithFallback('field-editor-for', 'Field editor for') + ' ' + templateField.name"
                            >
                                <div class="mt-3">
                                    <component
                                        v-if="shouldMountField(templateField)"
                                        :is="getContentFieldComponent(templateField)"
                                        :template-field="templateField"
                                        @input="onEditableContentUpdate"
                                        v-model="editableContent[templateField.id].data"
                                    >
                                        <div class="mb-2">
                                            <p
                                                class="text-sm text-theme-base-subtle-contrast"
                                                v-if="templateField.description"
                                            >
                                                {{ templateField.description }}
                                            </p>
                                        </div>
                                    </component>
                                    <div v-else class="py-6 text-center text-sm text-gray-400">
                                        {{ transWithFallback('loading-editor', 'Loading editor…') }}
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import _ from 'lodash';
    import CheckboxField from "../content/content_fields/CheckboxField.vue";
    import CmsMenuField from "../content/content_fields/CmsMenuField.vue";
    import ComponentField from "../content/content_fields/ComponentField.vue";
    import CrmFormField from "../content/content_fields/CrmFormField.vue";
    import CrmOrganisationUnitField from "../content/content_fields/CrmOrganisationUnitField.vue";
    import EduCourseField from "../content/content_fields/EduCourseField.vue";
    import ImageField from "../content/content_fields/ImageField.vue";
    import NumberField from "../content/content_fields/NumberField.vue";
    import RepeaterField from "../content/content_fields/RepeaterField.vue";
    import SelectField from "../content/content_fields/SelectField.vue";
    import ColorField from "../content/content_fields/ColorField.vue";
    import TextAreaField from "../content/content_fields/TextAreaField.vue";
    import TextField from "../content/content_fields/TextField.vue";
    import WysiwygField from "../content/content_fields/WysiwygField.vue";

    export default {
        name: "SectionEditor",
        components: {
            CheckboxField,
            CmsMenuField,
            ComponentField,
            CrmFormField,
            CrmOrganisationUnitField,
            EduCourseField,
            ImageField,
            NumberField,
            RepeaterField,
            SelectField,
            ColorField,
            TextAreaField,
            TextField,
            WysiwygField,
        },
        props: {
            section: {
                required: true,
                type: Object,
            },
            templateFields: {
                required: true,
                type: Array,
            },
            templateId: {
                required: true,
                type: Number,
            },
            content: {
                required: true,
                type: Object,
            },
            showDragHandle: {
                default: false,
                type: Boolean,
            },
            searchQuery: {
                default: '',
                type: String,
            },
        },
        data() {
            return {
                editableContent: {},
                expanded: {},
                fieldRefs: {},
                sectionExpanded: null, // Track section expanded state reactively
                hasBeenExpanded: false, // Track if section was ever expanded (for lazy loading)
                mountedFields: {}, // Track which fields have been mounted (lazy load field editors)
                isLoadingFields: false, // Show loading state when expanding section
            }
        },
        computed: {
            isExpanded() {
                // Use section's collapsed state, or default to expanded if not collapsible
                if (!this.section.is_collapsible) {
                    return true;
                }
                // Use reactive data property if set, otherwise check localStorage or default
                if (this.sectionExpanded !== null) {
                    return this.sectionExpanded;
                }
                // Check localStorage for user preference, or use default
                const storageKey = `section_${this.section.id}_expanded`;
                const stored = localStorage.getItem(storageKey);
                if (stored !== null) {
                    return stored === 'true';
                }
                return !this.section.is_collapsed_by_default;
            },
            sectionFields() {
                if (!this.templateFields || !Array.isArray(this.templateFields)) {
                    return [];
                }
                return this.templateFields.filter(field => {
                    return field.section_id === this.section.id;
                }).sort((a, b) => (a.order || 0) - (b.order || 0));
            },
        },
        created() {
            // Initialize content
            if (typeof this.content === 'object' && Object.keys(this.content).length > 0) {
                this.editableContent = _.cloneDeep(this.content);
            }

            // Initialize section expanded state from localStorage or default
            if (this.section.is_collapsible) {
                const storageKey = `section_${this.section.id}_expanded`;
                const stored = localStorage.getItem(storageKey);
                if (stored !== null) {
                    this.sectionExpanded = stored === 'true';
                } else {
                    this.sectionExpanded = !this.section.is_collapsed_by_default;
                }
            } else {
                this.sectionExpanded = true;
            }
            // Mark as expanded if initially expanded (for lazy loading)
            this.hasBeenExpanded = this.sectionExpanded;

            // Initialize expansion for fields
            this.sectionFields.forEach((field, idx) => {
                this.$set(this.expanded, field.id, idx === 0);
                if (!this.editableContent[field.id]) {
                    this.$set(this.editableContent, field.id, { 
                        data: null,
                        template_field_id: field.id 
                    });
                } else if (!this.editableContent[field.id].template_field_id) {
                    // Ensure template_field_id is set if missing
                    this.$set(this.editableContent[field.id], 'template_field_id', field.id);
                }
            });
        },
        methods: {
            assignFields() {
                this.$emit('assign-fields', this.section);
            },
            deleteSection() {
                this.$emit('delete', this.section);
            },
            editSection() {
                this.$emit('edit', this.section);
            },
            getContentFieldComponent(templateField) {
                switch (templateField.type) {
                    case 'checkbox': return 'CheckboxField';
                    case 'cms_menu': return 'CmsMenuField';
                    case 'component': return 'ComponentField';
                    case 'crm_form': return 'CrmFormField';
                    case 'crm_organisation_unit': return 'CrmOrganisationUnitField';
                    case 'edu_course': return 'EduCourseField';
                    case 'image': return 'ImageField';
                    case 'number': return 'NumberField';
                    case 'repeater': return 'RepeaterField';
                    case 'select': return 'SelectField';
                    case 'color': return 'ColorField';
                    case 'text': return 'TextField';
                    case 'textarea': return 'TextAreaField';
                    case 'wysiwyg': return 'WysiwygField';
                    default:
                        this.$errorToast('Unregistered content field for template field: ' + templateField.type);
                        return false;
                }
            },
            handleToggleClick(event, fieldId) {
                event.preventDefault();
                event.stopPropagation();
                this.toggleExpand(fieldId);
            },
            onEditableContentUpdate: _.debounce(function() {
                this.$emit('content-update', _.cloneDeep(this.editableContent));
            }, 300),
            // Immediate version for critical updates
            onEditableContentUpdateImmediate() {
                this.$emit('content-update', _.cloneDeep(this.editableContent));
            },
            previewText(field) {
                try {
                    const data = this.editableContent[field.id] ? this.editableContent[field.id].data : undefined;
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
            isFieldHighlighted(field) {
                if (!this.searchQuery || this.searchQuery.length < 2) return false;
                const q = this.searchQuery.toLowerCase();
                return (field.name || '').toLowerCase().includes(q) ||
                       (field.type || '').toLowerCase().includes(q) ||
                       (field.description || '').toLowerCase().includes(q);
            },
            highlightText(text) {
                if (!this.searchQuery || this.searchQuery.length < 2 || !text) return text;
                const regex = new RegExp(`(${this.escapeRegex(this.searchQuery)})`, 'gi');
                return text.replace(regex, '<mark class="bg-yellow-200 px-0.5 rounded">$1</mark>');
            },
            escapeRegex(string) {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            },
            setFieldRef(id) {
                return (el) => { if (el) this.$set(this.fieldRefs, id, el); };
            },
            shouldMountField(field) {
                // Don't mount if field editor is not expanded
                if (!this.expanded[field.id]) return false;
                // Check if field has been mounted (lazy loading)
                if (!this.mountedFields[field.id]) {
                    // Defer mounting to next tick for smoother UI
                    this.$nextTick(() => {
                        this.$set(this.mountedFields, field.id, true);
                    });
                    return false;
                }
                return true;
            },
            shortType(type) {
                switch (type) {
                    case 'wysiwyg': return 'Rich text';
                    case 'image': return 'Image';
                    case 'repeater': return 'Repeater';
                    default: return type.charAt(0).toUpperCase() + type.slice(1);
                }
            },
            toggleExpand(fieldId) {
                this.$set(this.expanded, fieldId, !this.expanded[fieldId]);
                if (this.expanded[fieldId] && !this.editableContent[fieldId]) {
                    this.$set(this.editableContent, fieldId, { 
                        data: null,
                        template_field_id: fieldId 
                    });
                    // Use immediate update for initialization to ensure state consistency
                    this.onEditableContentUpdateImmediate();
                } else if (this.expanded[fieldId] && this.editableContent[fieldId] && !this.editableContent[fieldId].template_field_id) {
                    // Ensure template_field_id is set if missing
                    this.$set(this.editableContent[fieldId], 'template_field_id', fieldId);
                    this.onEditableContentUpdateImmediate();
                }
                if (this.expanded[fieldId]) {
                    this.$nextTick(() => {
                        const ref = this.fieldRefs[fieldId];
                        const el = (ref && ref.$el) ? ref : ref;
                        if (el && el.querySelector) {
                            const input = el.querySelector('input, textarea, [contenteditable]');
                            if (input) input.focus();
                        }
                    });
                }
            },
            toggleSection() {
                if (!this.section.is_collapsible) return;
                const newState = !this.isExpanded;
                
                // Show loading state when expanding for the first time with many fields
                if (newState && !this.hasBeenExpanded && this.sectionFields.length > 5) {
                    this.isLoadingFields = true;
                    // Use requestAnimationFrame for smoother UI
                    requestAnimationFrame(() => {
                        this.sectionExpanded = newState;
                        this.hasBeenExpanded = true;
                        // Hide loading after a short delay
                        setTimeout(() => {
                            this.isLoadingFields = false;
                        }, 100);
                    });
                } else {
                    this.sectionExpanded = newState;
                    if (newState) {
                        this.hasBeenExpanded = true;
                    }
                }
                
                const storageKey = `section_${this.section.id}_expanded`;
                localStorage.setItem(storageKey, newState.toString());
            },
        },
    }
</script>

