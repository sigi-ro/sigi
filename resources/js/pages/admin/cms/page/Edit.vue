<template>
    <form
        class="max-w-5xl mx-auto"
        autocomplete="off"
        @submit.prevent="submit"
    >
        <div
            v-if="userCan('cms.edit')"
            class="flex flex-row items-center mb-6 sticky-menu"
        >
            <h1 class="font-medium mr-auto text-lg">
                {{ transWithFallback('admin-pages-edit','Edit Page') }}
            </h1>

            <inertia-link
                v-if="userCan('cms.view')"
                class="
                    button button-default-responsive button-primary-subtle
                    flex flex-row items-center mr-2
                "
                :href="$route('admin.cms.pages.index')"
            >
                <icon-chevron-left
                    class="w-5 md:mr-2"
                />
                <span
                    class="hidden md:inline"
                >
                    {{ transWithFallback('back','Back') }}
                </span>
            </inertia-link>

            <button
                type="button"
                class="
                    button button-default-responsive button-secondary
                    flex flex-row items-center mr-2
                "
                :disabled="isGeneratingPreview"
                @click="generatePreview"
            >
                <icon-external-link class="w-5 md:mr-2"/>
                <span class="hidden md:inline">
                    {{ isGeneratingPreview ? transWithFallback('loading','Loading...') : transWithFallback('preview','Preview') }}
                </span>
            </button>

            <button
                class="
                    button button-default-responsive button-primary
                    flex flex-row items-center
                "
                type="submit"
            >
                <icon-save class="w-5 md:mr-2"/>

                <span
                    class="hidden md:inline"
                >
                    {{ transWithFallback('save-changes','Save Changes') }}
                </span>
            </button>
        </div>

        <!-- Top tabs: Layout / Meta / URL / Fields -->
        <div class="mt-4">
            <nav class="flex items-center space-x-2 px-1" role="tablist" aria-label="Page editor tabs" @keydown="onTabListKeydown">
                <button
                    type="button"
                    role="tab"
                    :aria-selected="activeTab === 'layout'"
                    tabindex="0"
                    :class="['px-3 py-2 text-sm rounded-md focus:outline-none', activeTab === 'layout' ? 'bg-blue-100 text-theme-primary' : 'bg-white text-gray-700 border border-gray-200']"
                    @click="setActiveTab('layout')"
                >
                    {{ transWithFallback('layout','Layout') }}
                </button>

                <button
                    type="button"
                    role="tab"
                    :aria-selected="activeTab === 'meta'"
                    tabindex="0"
                    :class="['px-3 py-2 text-sm rounded-md focus:outline-none', activeTab === 'meta' ? 'bg-blue-100 text-theme-primary' : 'bg-white text-gray-700 border border-gray-200']"
                    @click="setActiveTab('meta')"
                >
                    {{ transWithFallback('meta','Meta') }}
                </button>

                <button
                    type="button"
                    role="tab"
                    :aria-selected="activeTab === 'url'"
                    tabindex="0"
                    :class="['px-3 py-2 text-sm rounded-md focus:outline-none', activeTab === 'url' ? 'bg-blue-100 text-theme-primary' : 'bg-white text-gray-700 border border-gray-200']"
                    @click="setActiveTab('url')"
                >
                    {{ transWithFallback('url','URL') }}
                </button>

                <button
                    type="button"
                    role="tab"
                    :aria-selected="activeTab === 'fields'"
                    tabindex="0"
                    :class="['px-3 py-2 text-sm rounded-md focus:outline-none', activeTab === 'fields' ? 'bg-blue-100 text-theme-primary' : 'bg-white text-gray-700 border border-gray-200']"
                    @click="setActiveTab('fields')"
                >
                    {{ transWithFallback('fields','Fields') }}
                </button>
            </nav>
        </div>


        <div v-if="activeTab === 'layout'" class="bg-white mt-6 py-6 shadow-subtle rounded-lg">
            <div class="block px-6 w-full">
                <select-group
                    :error-message="getPageErrorMessage('layout_id')"
                    :label-text="transWithFallback('layout','Layout')"
                    :input-any-option-enabled="true"
                    :input-any-option-label="transWithFallback('please-select-layout','Please select a Layout')"
                    :input-autofocus="true"
                    input-id="layout_id"
                    input-name="layout_id"
                    :input-options="layouts"
                    input-option-label-key="name"
                    input-option-value-key="id"
                    :input-required="true"
                    @errorHidden="clearPageErrorMessage('layout_id')"
                    v-model="formData.layout_id"
                />

                <select-group
                    class="mt-4"
                    :error-message="getPageErrorMessage('template_id')"
                    :label-text="transWithFallback('template','Template')"
                    :input-any-option-enabled="true"
                    :input-any-option-label="transWithFallback('please-select-template','Please select a template')"
                    input-id="template_id"
                    input-name="template_id"
                    :input-options="templates"
                    input-option-label-key="name"
                    input-option-value-key="id"
                    :input-required="true"
                    @errorHidden="clearPageErrorMessage('template_id')"
                    v-model="formData.template_id"
                />

                <select-group
                    v-if="parentPagesUrls"
                    class="mt-4"
                    :error-message="getPageErrorMessage('parent_id')"
                    :label-text="transWithFallback('parent-page','Parent Page')"
                    :input-any-option-enabled="true"
                    :input-any-option-label="transWithFallback('please-select-parent-optional','Please select a parent (optional)')"
                    input-id="parent_id"
                    input-name="parent_id"
                    :input-options="parentPagesUrls"
                    input-option-label-key="label"
                    input-option-value-key="id"
                    @errorHidden="clearPageErrorMessage('parent_id')"
                    v-model="formData.parent_id"
                />

                <input-group
                    class="mt-4"
                    :error-message="getPageErrorMessage('name')"
                    input-autocomplete="page_name"
                    input-id="name"
                    input-name="name"
                    :input-required="true"
                    input-type="text"
                    :label-text="transWithFallback('page-name','Page Name')"
                    @errorHidden="clearPageErrorMessage('name')"
                    @input="onNameInput"
                    v-model="formData.name"
                />

                <input-group
                    class="mt-4"
                    :error-message="getPageErrorMessage('slug')"
                    input-autocomplete="page_slug"
                    input-id="slug"
                    input-name="slug"
                    :input-required="true"
                    input-type="text"
                    :label-text="transWithFallback('page-slug','Page Slug')"
                    @blur="onSlugBlur"
                    @errorHidden="clearPageErrorMessage('slug')"
                    @input="onSlugInput"
                    v-model="formData.slug"
                />

                <input-group
                    class="mt-4"
                    input-id="slug"
                    input-name="full_page_slug"
                    :input-disabled="true"
                    input-type="text"
                    :label-text="transWithFallback('full-page-slug','Full Page Slug')"
                    v-model="fullPageSlug"
                />
            </div>
        </div>


        <div
            v-if="activeTab === 'meta'"
            class="bg-white mt-6 overflow-x-hidden px-6 py-6 shadow-subtle rounded-lg"
        >
            <metadata-editor
                v-model="formData.metadata"
            />
        </div>


        <div
            v-show="activeTab === 'url' && isInitialised_url"
            class="bg-white mt-6 px-6 py-6 shadow-subtle rounded-lg"
        >
            <url-editor
                :parent-url="selectedParentPageUrl"
                @isAvailable="onUrlIsAvailableEvent"
                v-model="formData.url"
            />
        </div>

        <div
            v-if="activeTab === 'fields' && !this.isLoadingTemplate && selectedTemplateHasFields && isInitialisedContent"
            class="bg-white mt-6 px-4 py-6 shadow-subtle rounded-lg"
        >
            <p class="text-lg">{{ transWithFallback('fields','Fields') }}</p>

            <content-editor
                class="mt-4"
                :template-fields="selectedTemplate.template_fields"
                :template-sections="selectedTemplate.sections || []"
                :template-id="selectedTemplate.id"
                :use-sections="selectedTemplateHasFields && selectedTemplate.id"
                @reload-template="reloadTemplate"
                v-model="formData.content"
            />
        </div>
    </form>
</template>

<script>
    import _ from 'lodash';
    import slugify from "slugify";
    import InputGroup from "../../../../components/core/forms/InputGroup.vue";
    import MetadataEditor from "../../../../components/admin/cms/metadata/MetadataEditor.vue";
    import SelectGroup from "../../../../components/core/forms/SelectGroup.vue";
    import UrlEditor from "../../../../components/admin/cms/urls/UrlEditor.vue";

    let CancelToken = axios.CancelToken;
    let templateCancelToken = CancelToken.source();

    export default {
        name: "AdminCmsPageEdit",
        components: {
            InputGroup,
            MetadataEditor,
            SelectGroup,
            UrlEditor,
        },
        layout: 'admin-layout',
        props: {
            'layouts': {
                type: Object,
                required: true
            },
            'page': {
                type: Object,
                required: true
            },
            'parentPages': {
                type: Object | Array | null,
                required: true
            },
            'templates': {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                // activeTab: one of 'layout'|'meta'|'url'|'fields'
                activeTab: (localStorage && localStorage.getItem && localStorage.getItem('admin_page_edit_active_tab_' + (this.page && this.page.id ? this.page.id : ''))
                    ? localStorage.getItem('admin_page_edit_active_tab_' + (this.page && this.page.id ? this.page.id : ''))
                    : 'layout'),
                autoUpdateSlug: false,
                formData: {},
                isGeneratingPreview: false,
                isInitialisedTemplate: false,
                isInitialisedContent: false,
                isInitialised_url: false,
                isLoadingTemplate: false,
                isUrlAvailable: false,
                selectedTemplate: null,
            }
        },
        computed: {
            fullPageSlug() {
                if (!this.formData.slug) {
                    return '';
                }

                let slug = this.formData.slug;

                if (this.selectedParentPageUrl) {
                    slug = this.selectedParentPageUrl + '/'  + slug;
                }

                return slug;
            },
            parentPagesUrls() {
                try {
                    if (!Object.keys(this.parentPages).length) {
                        return null;
                    }

                    let pages = {};
                    _.forEach(this.parentPages, (page, key) => {
                        pages[key] = {
                            id: page.id,
                            label: page.name + ' => ' + page.url.url_full,
                            url_full: page.url.url_full,
                            url_main: page.url.url_main,
                        };
                    });

                    return pages;
                } catch (e) {
                    return null;
                }
            },
            parentPagesMap() {
                try {
                    if (!Object.keys(this.parentPages).length) {
                        return null;
                    }

                    let map = {};
                    _.forEach(this.parentPages, (page, key) => {
                        map[page.id] = key;
                    });

                    return map;
                } catch (e) {
                    return null;
                }
            },
            selectedParentPage() {
                try {
                    if (!this.formData.parent_id) {
                        return null;
                    }

                    return this.parentPages[
                        this.parentPagesMap[this.formData.parent_id]
                        ];
                } catch (e) {
                    return null;
                }
            },
            selectedParentPageUrl() {
                try {
                    return this.selectedParentPage.url.url_full;
                } catch (e) {
                    return null;
                }
            },
            selectedTemplateHasFields() {
                try {
                    if (!this.selectedTemplate) {
                        return false;
                    }

                    return this.selectedTemplate.template_fields.length;
                } catch (e) {
                    return false;
                }
            },
            selectedTemplateId() {
                return this.formData.template_id ?? '';
            },
        },
        created() {
            this.formData = {
                content:        {},
                id:             this.page.id,
                layout_id:      this.page.layout_id,
                metadata:       _.cloneDeep(this.page.metadata),
                name:           this.page.name,
                parent_id:      this.page.parent_id,
                slug:           this.page.slug,
                template_id:    this.page.template_id,
                url: {},
            };
            this.selectedTemplate = _.cloneDeep(this.page.template);
            this.setInitialContent();
            this.setInitialUrl();
        },
        mounted() {
            // ensure activeTab is set if localStorage value is missing or invalid
            if (!['layout','meta','url','fields'].includes(this.activeTab)) {
                this.activeTab = 'layout';
            }
        },
        methods: {
            cancelLoadTemplate() {
                if (this.isLoadingTemplate) {
                    templateCancelToken.cancel('Template load cancelled');
                    templateCancelToken = CancelToken.source();
                }
            },
            doesObjectHaveKeys(obj) {
                try {
                    return Object.keys(obj).length;
                } catch (e) {
                    return false;
                }
            },
            async generatePreview() {
                if (this.isGeneratingPreview) return;

                this.isGeneratingPreview = true;
                try {
                    const response = await axios.post(
                        this.$route('admin.api.cms.pages.preview-token.store', this.page.id)
                    );

                    if (response.data.preview_url) {
                        // Open preview in new tab
                        window.open(response.data.preview_url, '_blank');

                        // Show success toast with expiry info
                        this.$successToast(
                            this.transWithFallback(
                                'preview-generated',
                                `Preview link generated. Valid for ${response.data.expires_in_minutes} minutes.`
                            )
                        );
                    }
                } catch (error) {
                    console.error('Failed to generate preview:', error);
                    this.$errorToast(
                        this.transWithFallback('preview-failed', 'Failed to generate preview link')
                    );
                } finally {
                    this.isGeneratingPreview = false;
                }
            },
            pageHasContentField(template_field_id) {
                try {
                    return this.page.content.hasOwnProperty(template_field_id);
                } catch (e) {
                    return false;
                }
            },
            onNameInput() {
                if (!this.autoUpdateSlug) {
                    return;
                }

                this.formData.slug = this.slugify(this.formData.name);
            },
            onSelectedTemplateIdChange: _.debounce(function () {
                // The template id is set by default, so no need to re-load initially
                if (!this.isInitialisedTemplate) {
                    this.isInitialisedTemplate = true;
                    return;
                }

                this.selectedTemplate = null;
                this.cancelLoadTemplate();

                if (!this.selectedTemplateId) {
                    return;
                }

                this.loadTemplate();
            }, 500),
            loadTemplate() {
                this.isLoadingTemplate = true;

                axios.get(
                    this.$route('admin.api.cms.templates.show', this.selectedTemplateId)
                ).then(response => {
                    this.selectedTemplate = _.cloneDeep(response.data.data);
                    this.setNewTemplateContent();
                }).catch(e => {
                    if (!axios.isCancel(e)) {
                        this.$errorToast(this.transWithFallback('admin-pages-template-load-failed','Failed to load selected template'));
                        // error details intentionally not logged to console here
                    }
                }).finally(() => {
                    this.isLoadingTemplate = false;
                })
            },
            reloadTemplate() {
                if (!this.selectedTemplateId) return;
                this.loadTemplate();
            },
            onSlugBlur() {
                this.formData.slug = this.slugify(this.formData.slug)
            },
            onSlugInput() {
                this.autoUpdateSlug = false;
            },
            onUrlIsAvailableEvent(isAvailable) {
                this.isUrlAvailable = isAvailable;
            },
            setInitialContent() {
                // This is a fix / hack to prevent an empty object from becoming an array.
                let content = {};
                if (this.doesObjectHaveKeys(this.page.content)) {
                    content = _.cloneDeep(this.page.content);
                }

                // Set the defaults for any missing content
                _.forEach(this.selectedTemplate.template_fields, (templateField) => {
                    if (!this.pageHasContentField(templateField.id)) {
                        content[templateField.id] = {
                            data: '',
                            template_field_id: templateField.id
                        };
                    }
                });

                this.formData.content = _.cloneDeep(content);
                this.isInitialisedContent = true;
            },
            setInitialUrl() {
                // This is a fix / hack to prevent an empty object from becoming an array.
                let url = {};
                if (this.doesObjectHaveKeys(this.page.url)) {
                    url = _.cloneDeep(this.page.url);
                }

                this.formData.url = _.cloneDeep(url);
                this.isInitialised_url = true;
            },
            setNewTemplateContent() {
                if (!this.selectedTemplateHasFields) {
                    this.formData.content = {};
                    return;
                }

                // Get all fields from the template and set the default data
                let new_content = {};
                _.forEach(this.selectedTemplate.template_fields, (templateField) => {
                    // Preserve existing content if it exists, otherwise create new
                    if (this.formData.content && this.formData.content[templateField.id]) {
                        // Keep existing content but ensure template_field_id is set
                        new_content[templateField.id] = {
                            ...this.formData.content[templateField.id],
                            template_field_id: templateField.id,
                        };
                    } else {
                        new_content[templateField.id] = {
                            data: '',
                            template_field_id: templateField.id,
                        };
                    }
                });

                // Replace the existing content
                this.$set(this.formData, 'content', _.cloneDeep(new_content));
            },
            slugify(value) {
                if (!value || !value.length) {
                    return '';
                }

                return slugify(
                    value, {
                        lower: true,
                    }
                );
            },
            submit() {
                // Only require URL availability if the URL was changed by the editor.
                try {
                    const originalUrlMain = this.page && this.page.url ? this.page.url.url_main || '' : '';
                    const currentUrlMain = this.formData && this.formData.url ? this.formData.url.url_main || '' : '';

                    if (originalUrlMain !== currentUrlMain && !this.isUrlAvailable) {
                        this.$errorToast(this.transWithFallback('admin-pages-url-unavailable','Unable to save page. URL is unavailable'));
                        return;
                    }
                } catch (e) {
                    // If anything goes wrong checking URL state, fall back to blocking save when unavailable
                    if (!this.isUrlAvailable) {
                        this.$errorToast(this.transWithFallback('admin-pages-url-unavailable','Unable to save page. URL is unavailable'));
                        return;
                    }
                }

                // Ensure all content items have template_field_id before submitting
                if (this.formData.content && typeof this.formData.content === 'object') {
                    Object.keys(this.formData.content).forEach(fieldId => {
                        if (this.formData.content[fieldId]) {
                            // Ensure template_field_id is set
                            if (!this.formData.content[fieldId].template_field_id) {
                                this.$set(this.formData.content[fieldId], 'template_field_id', parseInt(fieldId));
                            }
                            // Remove 'id' field (content record ID) - it shouldn't be sent in the request
                            if (this.formData.content[fieldId].id !== undefined) {
                                this.$delete(this.formData.content[fieldId], 'id');
                            }
                        }
                    });
                }

                console.log('Submitting form data:', JSON.stringify(this.formData, null, 2));

                this.$inertia.put(
                    this.$route('admin.cms.pages.update', this.page.id),
                    this.formData,
                    {
                        onError: (errors) => {
                            console.error('Validation errors:', errors);
                            console.error('Full errors object:', JSON.stringify(errors, null, 2));
                            if (errors && Object.keys(errors).length > 0) {
                                const errorMessages = Object.entries(errors)
                                    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                                    .join('\n');
                                this.$errorToast('Validation failed:\n' + errorMessages);
                            } else {
                                this.$errorToast('Validation failed. Please check the form for errors.');
                            }
                        },
                        onSuccess: () => {
                            console.log('Page updated successfully');
                        },
                        onFinish: () => {
                            console.log('Request finished');
                        }
                    }
                );
            }
            ,
            // Tab helpers
            setActiveTab(tab) {
                if (!['layout','meta','url','fields'].includes(tab)) return;
                this.activeTab = tab;
                try {
                    localStorage.setItem('admin_page_edit_active_tab_' + (this.page && this.page.id ? this.page.id : ''), tab);
                } catch (e) {
                    // ignore (cookie/localStorage disabled)
                }
            }
            ,
            onTabListKeydown(e) {
                // handle arrow key navigation between tabs
                const tabs = ['layout','meta','url','fields'];
                const currentIndex = tabs.indexOf(this.activeTab);
                if (e.key === 'ArrowRight') {
                    const next = tabs[(currentIndex + 1) % tabs.length];
                    this.setActiveTab(next);
                    e.preventDefault();
                    return;
                }

                if (e.key === 'ArrowLeft') {
                    const prev = tabs[(currentIndex - 1 + tabs.length) % tabs.length];
                    this.setActiveTab(prev);
                    e.preventDefault();
                    return;
                }
            }
        },
        watch: {
            selectedTemplateId: {
                handler: 'onSelectedTemplateIdChange'
            }
        }
    }
</script>
