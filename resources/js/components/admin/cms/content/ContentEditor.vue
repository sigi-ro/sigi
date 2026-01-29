<template>
    <div class="flex flex-row space-x-6">

        <!-- Left: sticky table-of-contents / quick nav -->
        <aside class="hidden lg:block w-64 sticky top-24 overflow-auto" :style="{ height: 'calc(100vh - 6rem)' }">
            <div class="bg-white border rounded p-3 shadow-sm">
                <div class="mb-3">
                    <input
                        v-model="searchQuery"
                        type="search"
                        :placeholder="transWithFallback('search-fields','Search fields...')"
                        class="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-theme-primary"
                    />
                </div>

                <nav aria-label="Fields navigation">
                    <!-- Section-aware navigation when sections are enabled -->
                    <template v-if="useSections && templateId && templateSections && templateSections.length > 0">
                        <ul class="space-y-1 text-sm" @click.stop>
                            <li v-for="section in visibleSections" :key="section.id" class="mb-2">
                                <!-- Section Header -->
                                <button
                                    type="button"
                                    @click="handleSectionClick($event, section.id)"
                                    class="w-full text-left px-2 py-2 rounded hover:bg-gray-50 focus:outline-none focus:bg-blue-50 transition-colors"
                                    :class="activeSectionId === section.id ? 'bg-blue-50 font-medium text-theme-primary' : 'text-gray-800'"
                                >
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-2 flex-grow">
                                            <icon-chevron-right
                                                :class="['w-4 h-4 text-gray-500 transition-transform flex-shrink-0', { 'rotate-90': sidebarSectionsExpanded[section.id] }]"
                                            />
                                            <span class="truncate font-medium">{{ section.name }}</span>
                                            <span class="text-xs text-gray-500 flex-shrink-0">
                                                ({{ getSectionFieldCount(section.id) }})
                                            </span>
                                        </div>
                                    </div>
                                </button>
                                
                                <!-- Nested Fields (when section is expanded) -->
                                <transition name="fade">
                                    <ul v-if="sidebarSectionsExpanded[section.id]" class="ml-6 mt-1 space-y-1">
                                        <li v-for="field in getSectionFields(section.id)" :key="field.id">
                                            <button
                                                type="button"
                                                @click="handleFieldClick($event, field.id, section.id)"
                                                class="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 focus:outline-none focus:bg-blue-50 transition-colors text-xs"
                                                :class="activeFieldId === field.id ? 'bg-blue-50 font-medium text-theme-primary' : 'text-gray-700'"
                                            >
                                                <div class="flex items-center justify-between">
                                                    <div class="truncate">{{ field.name }}</div>
                                                    <div class="text-xs text-gray-400 ml-2 flex-shrink-0">{{ shortType(field.type) }}</div>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </transition>
                            </li>
                            
                            <!-- Fields without section -->
                            <li v-if="visibleFieldsWithoutSection.length > 0" class="mt-4 pt-4 border-t">
                                <div class="px-2 py-1 text-xs font-semibold text-gray-500 uppercase mb-2">
                                    {{ transWithFallback('fields-without-section', 'Unassigned') }}
                                </div>
                                <ul class="space-y-1">
                                    <li v-for="field in visibleFieldsWithoutSection" :key="field.id">
                                        <button
                                            type="button"
                                            @click="handleFieldClick($event, field.id, null)"
                                            class="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 focus:outline-none focus:bg-blue-50 transition-colors text-xs"
                                            :class="activeFieldId === field.id ? 'bg-blue-50 font-medium text-theme-primary' : 'text-gray-700'"
                                        >
                                            <div class="flex items-center justify-between">
                                                <div class="truncate">{{ field.name }}</div>
                                                <div class="text-xs text-gray-400 ml-2 flex-shrink-0">{{ shortType(field.type) }}</div>
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </template>
                    
                    <!-- Show unassigned fields when sections enabled but no sections exist yet -->
                    <template v-else-if="useSections && templateId && (!templateSections || templateSections.length === 0)">
                        <div class="text-xs text-gray-500 mb-2 px-2">
                            {{ transWithFallback('no-sections-yet', 'No sections yet. Add a section to organize your fields.') }}
                        </div>
                        <ul class="space-y-2 text-sm" @click.stop>
                            <li v-for="field in visibleFields" :key="field.id">
                                <button
                                    type="button"
                                    @click="handleScrollClick($event, field.id)"
                                    class="w-full text-left px-2 py-2 rounded hover:bg-gray-50 focus:outline-none focus:bg-blue-50"
                                    :class="expanded[field.id] ? 'font-medium text-theme-primary' : 'text-gray-700'"
                                >
                                    <div class="flex items-center justify-between">
                                        <div class="truncate">{{ field.name }}</div>
                                        <div class="text-xs text-gray-400 ml-2">{{ shortType(field.type) }}</div>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </template>
                    
                    <!-- Fallback to flat field list when sections not enabled -->
                    <template v-else>
                        <ul class="space-y-2 text-sm" @click.stop>
                            <li v-for="field in visibleFields" :key="field.id">
                                <button
                                    type="button"
                                    @click="handleScrollClick($event, field.id)"
                                    class="w-full text-left px-2 py-2 rounded hover:bg-gray-50 focus:outline-none focus:bg-blue-50"
                                    :class="expanded[field.id] ? 'font-medium text-theme-primary' : 'text-gray-700'"
                                >
                                    <div class="flex items-center justify-between">
                                        <div class="truncate">{{ field.name }}</div>
                                        <div class="text-xs text-gray-400 ml-2">{{ shortType(field.type) }}</div>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </template>
                </nav>
            </div>
        </aside>

        <!-- Main editor column -->
        <div class="flex-1">
            <div class="flex flex-col space-y-4">

        <p
            v-if="getPageErrorMessage(contentFieldSlug)"
            class="text-theme-danger-contrast"
        >
            {{ getPageErrorMessage(contentFieldSlug) }}
        </p>

                <!-- Use Section Manager if sections are enabled -->
                <section-manager
                    v-if="useSections && templateId"
                    ref="sectionManager"
                    :sections="templateSections"
                    :template-fields="templateFields"
                    :template-id="templateId"
                    :content="editableContent"
                    :search-query="searchQuery"
                    @content-update="onEditableContentUpdate"
                    @section-saved="onSectionSaved"
                    @section-deleted="onSectionDeleted"
                    @reload-template="$emit('reload-template')"
                />

                <!-- Fallback to old field list if sections not enabled or no sections -->
                <template v-else>
                    <div v-for="templateField in visibleFields" :key="templateField.id" :ref="setFieldRef(templateField.id)">
                    <!-- Collapsed card header -->
                    <div class="border bg-white rounded shadow-sm overflow-hidden">
                        <div class="px-4 py-3 flex items-start justify-between" @click.stop>
                            <div class="flex items-start space-x-3 w-full">
                                <div class="flex-grow">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-2">
                                            <div class="text-sm font-medium text-theme-base-contrast">{{ templateField.name }}</div>
                                            <span v-if="templateField.is_required" class="text-xs text-theme-danger-contrast">*</span>
                                        </div>
                                        <div class="text-xs text-gray-400">{{ shortType(templateField.type) }}</div>
                                    </div>

                                    <div class="text-sm mt-1 text-theme-base-subtle-contrast truncate">
                                        {{ previewText(templateField) }}
                                    </div>
                                </div>
                            </div>

                            <div class="ml-4 flex-shrink-0">
                                <button type="button" class="px-2 py-1 text-xs border rounded bg-gray-50 hover:bg-gray-100 focus:outline-none" @click="handleToggleClick($event, templateField.id)">
                                    <span v-if="expanded[templateField.id]">{{ transWithFallback('collapse','Collapse') }}</span>
                                    <span v-else>{{ transWithFallback('expand','Expand') }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Editor body mounts lazily when expanded -->
                        <transition name="fade">
                            <div v-if="expanded[templateField.id]" class="px-4 pb-4 pt-0 bg-gray-50">
                                    <div class="mt-3">
                                    <component
                                        v-if="shouldMountField(templateField)"
                                        :is="getContentFieldComponent(templateField)"
                                        :template-field="templateField"
                                        @input="onEditableContentUpdate"
                                        v-model="editableContent[templateField.id].data"
                                    >
                                        <div class="mb-2">
                                            <p class="text-sm text-theme-base-subtle-contrast" v-if="templateField.description">{{ templateField.description }}</p>
                                        </div>
                                    </component>

                                    <!-- lightweight placeholder for heavy components until mounted -->
                                    <div v-else class="py-6 text-center text-sm text-gray-400">{{ transWithFallback('loading-editor','Loading editor…') }}</div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
                </template>
            </div>
        </div>
</template>

<script>
    import _ from 'lodash';
    import CheckboxField from "./content_fields/CheckboxField.vue";
    import CmsMenuField from "./content_fields/CmsMenuField.vue";
    import ComponentField from "./content_fields/ComponentField.vue";
    import CrmFormField from "./content_fields/CrmFormField.vue";
    import CrmOrganisationUnitField from "./content_fields/CrmOrganisationUnitField.vue";
    import EduCourseField from "./content_fields/EduCourseField.vue";
    import ImageField from "./content_fields/ImageField.vue";
    import NumberField from "./content_fields/NumberField.vue";
    import RepeaterField from "./content_fields/RepeaterField.vue";
    import SelectField from "./content_fields/SelectField.vue";
    import ColorField from "./content_fields/ColorField.vue";
    import TextAreaField from "./content_fields/TextAreaField.vue";
    import TextField from "./content_fields/TextField.vue";
    import WysiwygField from "./content_fields/WysiwygField.vue";
    import SectionManager from "../sections/SectionManager.vue";

    export default {
        name: 'AdminCmsContentEditor',
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
            SectionManager,
        },
        model: {
            prop: 'content',
        },
        props: {
            content: {
                required: true,
                type: Array | Object
            },
            contentFieldSlug: {
                default: 'content',
                type: String,
            },
            templateFields: {
                required: true,
                type: Array
            },
            templateSections: {
                default: () => [],
                type: Array,
            },
            templateId: {
                default: null,
                type: Number,
            },
            useSections: {
                default: false,
                type: Boolean,
            },
        },
        data() {
            return {
                editableContent: {},
                // map of fieldId -> expanded boolean
                expanded: {},
                // refs map for quick scrolling
                fieldRefs: {},
                // section refs for scrolling
                sectionRefs: {},
                // quick search
                searchQuery: '',
                // sidebar section expanded state
                sidebarSectionsExpanded: {},
                // active section/field for highlighting
                activeSectionId: null,
                activeFieldId: null,
            }
        },
        created() {
            // If there is existing content, clone it
            if (typeof this.content === 'object' && Object.keys(this.content).length > 0) {
                this.editableContent = _.cloneDeep(this.content);
            }

            // initialize expansion map so first visible field is expanded to aid editing
            this.templateFields.forEach((f, idx) => {
                this.$set(this.expanded, f.id, idx === 0);
                // ensure editableContent has an entry so bindings don't break when expanded
                if (!this.editableContent[f.id]) {
                    this.$set(this.editableContent, f.id, { 
                        data: null,
                        template_field_id: f.id 
                    });
                } else if (!this.editableContent[f.id].template_field_id) {
                    // Ensure template_field_id is set if missing
                    this.$set(this.editableContent[f.id], 'template_field_id', f.id);
                }
            });

            // Initialize sidebar section expanded state (expand all by default)
            if (this.useSections && this.templateSections) {
                this.templateSections.forEach(section => {
                    this.$set(this.sidebarSectionsExpanded, section.id, true);
                });
            }
        },
        computed: {
            visibleFields() {
                if (!this.searchQuery) return this.templateFields || [];
                const q = this.searchQuery.toLowerCase();
                return (this.templateFields || []).filter(f => {
                    return (f.name || '').toLowerCase().includes(q) || (f.type || '').toLowerCase().includes(q) || (f.description || '').toLowerCase().includes(q);
                });
            },
            visibleSections() {
                if (!this.useSections || !this.templateSections || this.templateSections.length === 0) return [];
                
                if (!this.searchQuery) {
                    return this.templateSections.sort((a, b) => (a.order || 0) - (b.order || 0));
                }
                
                // Filter sections based on search query
                const q = this.searchQuery.toLowerCase();
                return this.templateSections.filter(section => {
                    // Show section if name/description matches
                    if ((section.name || '').toLowerCase().includes(q) || 
                        (section.description || '').toLowerCase().includes(q)) {
                        return true;
                    }
                    // Show section if any of its fields match
                    const sectionFields = this.getSectionFields(section.id);
                    return sectionFields.some(field => {
                        return (field.name || '').toLowerCase().includes(q) || 
                               (field.type || '').toLowerCase().includes(q) ||
                               (field.description || '').toLowerCase().includes(q);
                    });
                }).sort((a, b) => (a.order || 0) - (b.order || 0));
            },
            visibleFieldsWithoutSection() {
                if (!this.useSections) return [];
                
                const fieldsWithoutSection = (this.templateFields || []).filter(f => !f.section_id);
                
                if (!this.searchQuery) {
                    return fieldsWithoutSection.sort((a, b) => (a.order || 0) - (b.order || 0));
                }
                
                const q = this.searchQuery.toLowerCase();
                return fieldsWithoutSection.filter(f => {
                    return (f.name || '').toLowerCase().includes(q) || 
                           (f.type || '').toLowerCase().includes(q) ||
                           (f.description || '').toLowerCase().includes(q);
                }).sort((a, b) => (a.order || 0) - (b.order || 0));
            },
        },

        methods: {
            getContentFieldComponent(templateField) {
                switch (templateField.type) {
                    case 'checkbox':
                        return 'CheckboxField';
                    case 'cms_menu':
                        return 'CmsMenuField';
                    case 'component':
                        return 'ComponentField';
                    case 'crm_form':
                        return 'CrmFormField';
                    case 'crm_organisation_unit':
                        return 'CrmOrganisationUnitField';
                    case 'edu_course':
                        return 'EduCourseField';
                    case 'image':
                        return 'ImageField';
                    case 'number':
                        return 'NumberField';
                    case 'repeater':
                        return 'RepeaterField';
                    case 'select':
                        return 'SelectField';
                    case 'color':
                        return 'ColorField';
                    case 'text':
                        return 'TextField';
                    case 'textarea':
                        return 'TextAreaField';
                    case 'wysiwyg':
                        return 'WysiwygField';
                    default:
                        this.$errorToast('Unregistered content field for template field: ' + templateField.type);
                        this.$errorToast('Unregistered content field for template field: ' + templateField.type);
                        return false;
                }
            },
            onEditableContentUpdate(updatedContent) {
                if (updatedContent) {
                    this.editableContent = updatedContent;
                    // Ensure all content items have template_field_id
                    Object.keys(this.editableContent).forEach(fieldId => {
                        if (this.editableContent[fieldId] && !this.editableContent[fieldId].template_field_id) {
                            this.$set(this.editableContent[fieldId], 'template_field_id', parseInt(fieldId));
                        }
                    });
                }
                this.$emit('input', _.cloneDeep(this.editableContent));
            },
            onSectionDeleted() {
                // Reload template to get updated sections
                this.$emit('reload-template');
            },
            onSectionSaved() {
                // Reload template to get updated sections
                this.$emit('reload-template');
            },

            // UX helpers
            toggleExpand(fieldId) {
                this.$set(this.expanded, fieldId, !this.expanded[fieldId]);
                // if expanding and the field has no content object, ensure there's a slot
                if (this.expanded[fieldId] && !this.editableContent[fieldId]) {
                    this.$set(this.editableContent, fieldId, { 
                        data: null,
                        template_field_id: fieldId 
                    });
                    this.onEditableContentUpdate();
                } else if (this.expanded[fieldId] && this.editableContent[fieldId] && !this.editableContent[fieldId].template_field_id) {
                    // Ensure template_field_id is set if missing
                    this.$set(this.editableContent[fieldId], 'template_field_id', fieldId);
                    this.onEditableContentUpdate();
                }
                // focus the mounted editor (best-effort) after tick
                if (this.expanded[fieldId]) {
                    this.$nextTick(() => {
                        const ref = this.fieldRefs[fieldId];
                        const el = (ref && ref.$el) ? ref.$el : ref;
                        if (el && el.querySelector) {
                            const input = el.querySelector('input, textarea, [contenteditable]');
                            if (input) input.focus();
                        }
                    });
                }
            },

            handleToggleClick(event, fieldId) {
                event.preventDefault();
                event.stopPropagation();
                this.toggleExpand(fieldId);
            },

            handleScrollClick(event, fieldId) {
                event.preventDefault();
                event.stopPropagation();
                this.scrollToField(fieldId);
            },

            setFieldRef(id) {
                // Return a function usable as ref binding to capture elements
                return (el) => { if (el) this.$set(this.fieldRefs, id, el); };
            },

            scrollToField(fieldId) {
                const el = this.fieldRefs[fieldId];
                if (!el) return;
                // expand then scroll
                if (!this.expanded[fieldId]) this.$set(this.expanded, fieldId, true);
                this.$nextTick(() => {
                    const rootEl = el instanceof Element ? el : (el.$el || el);
                    if (rootEl && rootEl.scrollIntoView) rootEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            },

            shortType(type) {
                switch (type) {
                    case 'wysiwyg': return 'Rich text';
                    case 'image': return 'Image';
                    case 'repeater': return 'Repeater';
                    default: return type.charAt(0).toUpperCase() + type.slice(1);
                }
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

            shouldMountField(field) {
                // mount heavy editors only when expanded (lazy) — helps perf for long pages
                // lightweight fields can still be mounted immediately
                if (!this.expanded[field.id]) return false;
                const heavy = ['wysiwyg', 'repeater', 'image', 'component'];
                // allow immediate mount for non-heavy fields
                return true; // we mount everything when expanded — collapse prevents mount
            },
            
            // Section-aware navigation methods
            getSectionFields(sectionId) {
                if (!this.templateFields) return [];
                return this.templateFields
                    .filter(f => f.section_id === sectionId)
                    .sort((a, b) => (a.order || 0) - (b.order || 0));
            },
            getSectionFieldCount(sectionId) {
                return this.getSectionFields(sectionId).length;
            },
            handleSectionClick(event, sectionId) {
                event.preventDefault();
                event.stopPropagation();
                
                // Expand clicked section in sidebar
                this.$set(this.sidebarSectionsExpanded, sectionId, true);
                
                // Collapse all other sections in sidebar
                this.templateSections.forEach(section => {
                    if (section.id !== sectionId) {
                        this.$set(this.sidebarSectionsExpanded, section.id, false);
                    }
                });
                
                // Scroll to section and collapse others in main view
                this.scrollToSectionAndCollapseOthers(sectionId);
            },
            handleFieldClick(event, fieldId, sectionId) {
                event.preventDefault();
                event.stopPropagation();
                
                // Set active states
                this.activeFieldId = fieldId;
                this.activeSectionId = sectionId;
                
                // Expand section in sidebar if collapsed
                if (sectionId && !this.sidebarSectionsExpanded[sectionId]) {
                    this.$set(this.sidebarSectionsExpanded, sectionId, true);
                }
                
                // Scroll to field (works differently for sections vs flat list)
                if (this.useSections && sectionId) {
                    this.scrollToFieldInSection(fieldId, sectionId);
                } else {
                    this.scrollToField(fieldId);
                }
            },
            scrollToSection(sectionId) {
                // Find the section editor component in SectionManager
                if (!this.$refs.sectionManager) return;
                
                // Get all section editor components
                const sectionEditors = this.$refs.sectionManager.$children.filter(
                    child => child.$options.name === 'SectionEditor' && child.section && child.section.id === sectionId
                );
                
                if (sectionEditors.length > 0) {
                    const sectionEditor = sectionEditors[0];
                    // Expand the section if it's collapsed
                    if (!sectionEditor.isExpanded && sectionEditor.section.is_collapsible) {
                        sectionEditor.toggleSection();
                    }
                    
                    // Scroll to the section
                    this.$nextTick(() => {
                        const sectionEl = sectionEditor.$el;
                        if (sectionEl && sectionEl.scrollIntoView) {
                            sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    });
                }
                
                // Set active section
                this.activeSectionId = sectionId;
            },
            scrollToSectionAndCollapseOthers(sectionId) {
                // Find the section editor component in SectionManager
                if (!this.$refs.sectionManager) return;
                
                // Get all section editor components
                const allSectionEditors = this.$refs.sectionManager.$children.filter(
                    child => child.$options.name === 'SectionEditor' && child.section
                );
                
                // Collapse all sections except the target one
                allSectionEditors.forEach(sectionEditor => {
                    if (sectionEditor.section.id !== sectionId) {
                        // Collapse if it's expanded and collapsible
                        if (sectionEditor.isExpanded && sectionEditor.section.is_collapsible) {
                            sectionEditor.toggleSection();
                        }
                    }
                });
                
                // Find and expand the target section
                const targetSectionEditor = allSectionEditors.find(
                    se => se.section.id === sectionId
                );
                
                if (targetSectionEditor) {
                    // Expand the section if it's collapsed
                    if (!targetSectionEditor.isExpanded && targetSectionEditor.section.is_collapsible) {
                        targetSectionEditor.toggleSection();
                    }
                    
                    // Scroll to the section
                    this.$nextTick(() => {
                        const sectionEl = targetSectionEditor.$el;
                        if (sectionEl && sectionEl.scrollIntoView) {
                            sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    });
                }
                
                // Set active section
                this.activeSectionId = sectionId;
            },
            scrollToFieldInSection(fieldId, sectionId) {
                // First, scroll to and expand the section (collapsing others)
                this.scrollToSectionAndCollapseOthers(sectionId);
                
                // Then find and scroll to the field within the section
                this.$nextTick(() => {
                    if (!this.$refs.sectionManager) return;
                    
                    // Find the section editor
                    const sectionEditors = this.$refs.sectionManager.$children.filter(
                        child => child.$options.name === 'SectionEditor' && child.section && child.section.id === sectionId
                    );
                    
                    if (sectionEditors.length > 0) {
                        const sectionEditor = sectionEditors[0];
                        
                        // Expand the field within the section
                        if (!sectionEditor.expanded[fieldId]) {
                            sectionEditor.toggleExpand(fieldId);
                        }
                        
                        // Scroll to the field element
                        this.$nextTick(() => {
                            // Find the field element within the section
                            const fieldEl = sectionEditor.$el.querySelector(`[data-field-id="${fieldId}"]`);
                            if (fieldEl && fieldEl.scrollIntoView) {
                                fieldEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            } else {
                                // Fallback: scroll to section if field element not found
                                const sectionEl = sectionEditor.$el;
                                if (sectionEl && sectionEl.scrollIntoView) {
                                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }
                        });
                    }
                });
            },
            setSectionRef(id) {
                return (el) => { if (el) this.$set(this.sectionRefs, id, el); };
            },
        }
    }
</script>
