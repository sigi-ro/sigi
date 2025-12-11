<template>
    <div>
        <main
            id="admin-layout"
            class="flex min-h-screen"
        >
            <side-menu
                :url="url()"
                :menu="sideMenu"
            />

            <div class="admin-section">
                <top-menu />

                <page-alerts />

                <div class="bg-theme-base flex-1 p-8">
                    <slot/>
                </div>
            </div>


            <!-- Singleton Modals -->
            <file-manager-modal class="z-30" />
        </main>
    </div>
</template>

<script>
    import { router } from '@inertiajs/vue2'

    import FileManagerModal from "../../components/admin/modals/FileManagerModal.vue";
    import PageAlerts from "../../components/core/alerts/PageAlerts.vue";

    export default {
        name: "AdminLayout",
        components: {
            FileManagerModal,
            PageAlerts
        },
        metaInfo() {
            return {
                title: this.metaTitle,
                meta: [
                    {
                        name: 'description',
                        content: this.metaDescription,
                    }
                ]
            }
        },
        data() {
            return {
                sideMenu: {
                    main: {
                        children: {
                            dashboard: {
                                children: false,
                                icon: "icon-home",
                                label: this.transWithFallback('admin-dashboard', 'Dashboard'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: [],
                                route: "admin.index",
                            },
                        },
                        label: this.transWithFallback('admin-main', 'Main'),
                        requiresAllPermissions: [],
                        requiresAnyPermissions: [],
                        showLabel: false,
                    },
                    cms: {
                        children : {
                            pages: {
                                activeRoutes: ["admin.cms.pages.index", "admin.cms.pages.create", "admin.cms.pages.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-pages-view', 'View Pages'),
                                        requiresAllPermissions: ["cms.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.pages.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-pages-create', 'Create Page'),
                                        requiresAllPermissions: ["cms.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.pages.create",
                                    },
                                },
                                icon: "icon-layout-navbar",
                                label: this.transWithFallback('admin-pages', 'Pages'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["cms.create", "cms.view"],
                            },
                            layouts: {
                                activeRoutes: ["admin.cms.layouts.index", "admin.cms.layouts.create", "admin.cms.layouts.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-layouts-view', 'View Layouts'),
                                        requiresAllPermissions: ["cms.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.layouts.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-layouts-create', 'Create Layout'),
                                        requiresAllPermissions: ["cms_advanced.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.layouts.create",
                                    },
                                },
                                icon: "icon-layout",
                                label: this.transWithFallback('admin-layouts', 'Layouts'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["cms.create", "cms.view"],
                            },
                            menus: {
                                activeRoutes: ["admin.cms.menus.index", "admin.cms.menus.create", "admin.cms.menus.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-menus-view', 'View Menus'),
                                        requiresAllPermissions: ["cms.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.menus.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-menus-create', 'Create Menu'),
                                        requiresAllPermissions: ["cms.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.menus.create",
                                    },
                                },
                                icon: "icon-columns",
                                label: this.transWithFallback('admin-menus', 'Menus'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["cms.create", "cms.view"],
                            },
                        },
                        label: this.transWithFallback('admin-cms', 'CMS'),
                        requiresAllPermissions: [],
                        requiresAnyPermissions: ["cms.edit", "cms.create", "cms.view"],
                        requiresTenantModule: 'cms',
                        showLabel: true,
                    },
                    cms_advanced: {
                        children : {
                            redirects: {
                                activeRoutes: ["admin.cms.redirects.index", "admin.cms.redirects.create", "admin.cms.redirects.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-cms_advanced-redirects-view','View Redirects'),
                                        requiresAllPermissions: ["cms_advanced.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.redirects.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-cms_advanced-redirects-create','Create Redirects'),
                                        requiresAllPermissions: ["cms_advanced.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.redirects.create",
                                    },
                                },
                                icon: "icon-arrows-shuffle",
                                label: this.transWithFallback('admin-cms_advanced-redirects','Redirects'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["cms_advanced.create", "cms_advanced.view"],
                            },
                            templates: {
                                activeRoutes: ["admin.cms.templates.index", "admin.cms.templates.create", "admin.cms.templates.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-cms_advanced-templates-view','View Templates'),
                                        requiresAllPermissions: ["cms_advanced.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.templates.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-cms_advanced-templates-create','Create Template'),
                                        requiresAllPermissions: ["cms_advanced.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.cms.templates.create",
                                    },
                                },
                                icon: "icon-template",
                                label: this.transWithFallback('admin-cms_advanced-templates','Templates'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["cms_advanced.create", "cms_advanced.view"],
                            },
                        },
                        label: this.transWithFallback('admin-cms_advanced','CMS - Advanced'),
                        requiresAllPermissions: [],
                        requiresAnyPermissions: ["cms_advanced.create", "cms_advanced.view"],
                        requiresTenantModule: 'cms',
                        showLabel: true,
                    },
                    crm: {
                        children: {
                            forms: {
                                activeRoutes: ["admin.crm.forms.index", "admin.crm.forms.create", "admin.crm.forms.edit", "admin.crm.form-submissions.index", "admin.crm.form-submissions.show"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-crm-forms-view','View Forms'),
                                        requiresAllPermissions: ["crm_forms.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.crm.forms.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-crm-forms-create','Create Form'),
                                        requiresAllPermissions: ["crm_forms.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.crm.forms.create",
                                    },
                                    submissions: {
                                        activeRoutes: ["admin.crm.form-submissions.index", "admin.crm.form-submissions.show"],
                                        icon: false,
                                        label: this.transWithFallback('admin-crm-forms-submissions','View Form Submissions'),
                                        requiresAllPermissions: ["crm_form_submissions.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.crm.form-submissions.index",
                                    },
                                },
                                icon: "icon-forms",
                                label: this.transWithFallback('admin-crm-forms','Forms'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["crm_forms.create", "crm_forms.view"],
                            },
                            contacts: {
                                activeRoutes: ["admin.crm.contacts.index", "admin.crm.contacts.create", "admin.crm.contacts.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-crm-contacts-view','View Contacts'),
                                        requiresAllPermissions: ["crm_contacts.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.crm.contacts.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-crm-contacts-create','Create Contact'),
                                        requiresAllPermissions: ["crm_contacts.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.crm.contacts.create",
                                    },
                                },
                                icon: "icon-id",
                                label: this.transWithFallback('admin-crm-contacts','Contacts'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["crm_contacts.create", "crm_contacts.view"],
                            },
                            organisation_units: {
                                activeRoutes: ["admin.crm.organisation-units.index", "admin.crm.organisation-units.create", "admin.crm.organisation-units.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-crm-organisation_units-view','View Units'),
                                        requiresAllPermissions: ["crm_organisation_units.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.crm.organisation-units.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-crm-organisation_units-create','Create Unit'),
                                        requiresAllPermissions: ["crm_organisation_units.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.crm.organisation-units.create",
                                    },
                                },
                                icon: "icon-building",
                                label: this.transWithFallback('admin-crm-organisation_units','Organisation Units'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["crm_organisation_units.create", "crm_organisation_units.view"],
                            }
                        },
                        label: this.transWithFallback('admin-crm','CRM'),
                        requiresAllPermissions: [],
                        requiresAnyPermissions: ["crm_forms.create", "crm_forms.view", "crm_contacts.create", "crm_contacts.view", "crm_organisation_units.create", "crm_organisation_units.view"],
                        requiresTenantModule: 'crm',
                        showLabel: true,
                    },
                    edu: {
                        children : {
                            announcements: {
                                activeRoutes: ["admin.edu.announcements.index", "admin.edu.announcements.create", "admin.edu.announcements.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-announcements-view','View'),
                                        requiresAllPermissions: ["edu_announcements.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.announcements.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-announcements-create','Create'),
                                        requiresAllPermissions: ["edu_announcements.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.announcements.create",
                                    }
                                },
                                icon: "icon-speaker-phone",
                                label: this.transWithFallback('admin-edu-announcements','Announcements'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["edu_announcements.create", "edu_announcements.view"],
                            },
                            courses: {
                                activeRoutes: ["admin.edu.courses.index", "admin.edu.courses.create", "admin.edu.courses.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-courses-view','View Courses'),
                                        requiresAllPermissions: ["edu_courses.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.courses.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-courses-create','Create Course'),
                                        requiresAllPermissions: ["edu_courses.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.courses.create",
                                    }
                                },
                                icon: "icon-chalkboard",
                                label: this.transWithFallback('admin-edu-courses','Courses'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["edu_courses.create", "edu_courses.view"],
                            },
                            programmes: {
                                activeRoutes: ["admin.edu.programmes.index", "admin.edu.programmes.create", "admin.edu.programmes.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-programmes-view','View Programmes'),
                                        requiresAllPermissions: ["edu_programmes.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.programmes.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-programmes-create','Create Programme'),
                                        requiresAllPermissions: ["edu_programmes.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.programmes.create",
                                    }
                                },
                                icon: "icon-box-multiple",
                                label: this.transWithFallback('admin-edu-programmes','Programmes'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["edu_programmes.create", "edu_programmes.view"],
                            },
                            labels: {
                                activeRoutes: ["admin.edu.labels.index", "admin.edu.labels.create", "admin.edu.labels.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-labels-view','View Labels'),
                                        requiresAllPermissions: ["edu_labels.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.labels.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-labels-create','Create Label'),
                                        requiresAllPermissions: ["edu_labels.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.labels.create",
                                    }
                                },
                                icon: "icon-tags",
                                label: this.transWithFallback('admin-edu-labels','Labels'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["edu_labels.create", "edu_labels.view"],
                            },
                            purchases: {
                                activeRoutes: ["admin.edu.course-purchases.index", "admin.edu.course-purchases.show"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-purchases-view','View'),
                                        activeRoutes: ["admin.edu.course-purchases.index", "admin.edu.course-purchases.show"],
                                        requiresAllPermissions: ["edu_course_purchases.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.course-purchases.index",
                                    }
                                },
                                icon: "icon-moneybag",
                                label: this.transWithFallback('admin-edu-purchases','Purchases'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["edu_course_purchases.view"],
                            },
                            webinars: {
                                activeRoutes: ["admin.edu.webinars.index", "admin.edu.webinars.create", "admin.edu.webinars.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-webinars-view','View'),
                                        requiresAllPermissions: ["edu_webinars.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.webinars.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-edu-webinars-create','Create'),
                                        requiresAllPermissions: ["edu_webinars.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.edu.webinars.create",
                                    }
                                },
                                icon: "icon-camera-check",
                                label: this.transWithFallback('admin-webinars','Webinars'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["edu_webinars.create", "edu_webinars.view"],
                            },
                        },
                        label: this.transWithFallback('admin-edu','EDU'),
                        requiresAllPermissions: [],
                        requiresAnyPermissions: [
                            'edu_announcements.create',
                            'edu_announcements.view',
                            'edu_courses.create',
                            'edu_courses.view',
                            'edu_programmes.create',
                            'edu_programmes.view',
                            'edu_labels.create',
                            'edu_labels.view',
                            'edu_course_purchases.view',
                            'edu_webinars.view',
                            'edu_webinars.create',
                        ],
                        requiresTenantModule: 'edu',
                        showLabel: true,
                    },
                    utilities: {
                        children : {
                            file_manager: {
                                children: false,
                                icon: "icon-folders",
                                label: this.transWithFallback('file-manager','File Manager'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["file_manager.view"],
                                route: 'admin.file_manager.index',
                            }
                        },
                        label: this.transWithFallback('admin-utilities','Utilities'),
                        requiresAllPermissions: [],
                        requiresAnyPermissions: ["file_manager.view"],
                        showLabel: true,
                    },
                    admin: {
                        children : {
                            settings: {
                                activeRoutes: ["admin.settings.edit"],
                                children: {
                                    core: {
                                        icon: false,
                                        label: this.transWithFallback('admin-core','Core'),
                                        requiresAllPermissions: ["settings.edit"],
                                        requiresAnyPermissions: [],
                                        route: ["admin.settings.edit", 'core'],
                                    },
                                    edu: {
                                        icon: false,
                                        label: this.transWithFallback('admin-edu','Edu'),
                                        requiresAllPermissions: ["settings.edit"],
                                        requiresAnyPermissions: [],
                                        requiresTenantModule: 'edu',
                                        route: ["admin.settings.edit", 'edu'],
                                    },
                                    theme: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-theme','Theme'),
                                        requiresAllPermissions: ["settings.edit"],
                                        requiresAnyPermissions: [],
                                        route: ["admin.settings.edit", 'theme'],
                                    },
                                    thirdParty: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-third-party','Third Party'),
                                        requiresAllPermissions: ["settings.edit"],
                                        requiresAnyPermissions: [],
                                        route: ["admin.settings.edit", 'third-party'],
                                    },
                                },
                                icon: "icon-settings",
                                label: this.transWithFallback('admin-settings','Settings'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["settings.edit"],
                                route: false,
                            },
                            users: {
                                activeRoutes: ["admin.users.index", "admin.users.create", "admin.users.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-users-view','View Users'),
                                        requiresAllPermissions: ["users.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.users.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-users-create','Create User'),
                                        requiresAllPermissions: ["users.create"],
                                        requiresAnyPermissions: [],
                                        route: "admin.users.create",
                                    },
                                },
                                icon: "icon-users",
                                label: this.transWithFallback('admin-users','Users'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["users.view", "users.create"],
                                route: false,
                            },
                            email_preview: {
                                activeRoutes: ["admin.email.preview.index", "admin.email.preview.show"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-admin-email_preview-view','View Emails'),
                                        requiresAllPermissions: ["email_preview.view"],
                                        requiresAnyPermissions: [],
                                        route: "admin.email.preview.index",
                                    },
                                },
                                icon: "icon-mail",
                                label: this.transWithFallback('admin-admin-email_preview','Email Preview'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["admin.email.preview.index", "admin.email.preview.show"],
                                route: false,
                            },

                        },
                        label: this.transWithFallback('admin-admin','Admin'),
                        requiresAllPermissions: [],
                        requiresAnyPermissions: ["users.view", "users.create"],
                        showLabel: true,
                    },
                },
            }
        },
        computed: {
            metaDescription() {
                return this.getMetaDataField(
                    'description',
                    'SIGI - powered by Laravel, Tailwind, Vue, and Inertia'
                );
            },
            metaTitle() {
                return this.getMetaDataField(
                    'title',
                    'SIGI'
                );
            }
        },
        mounted() {
            router.on('success', event => {
                this.hideMobileSideMenu();
            })

            // Debug: log translation lookups for menu labels
            try {
                console.debug('ZORA LOCALE', window.locale);
                console.debug('trans admin-dashboard ->', this.trans('admin-dashboard'));
                console.debug('trans messages.admin-dashboard ->', this.trans('messages.admin-dashboard'));
                console.debug('transWithFallback admin-dashboard ->', this.transWithFallback('admin-dashboard', 'Dashboard'));
            } catch (e) {
                console.error('Translation debug error', e);
            }
        },
        methods: {
            getMetaDataField(slug, fallback = '') {
                try {
                    return this.$page.props.meta[slug] ?? fallback;
                } catch (e) {
                    console.log(e);
                    return fallback;
                }
            },
            url() {
                return location.pathname.substr(1)
            },
            hideMobileSideMenu() {
                if (this.$store.state.isMobileSideMenuOpen) {
                    this.$store.commit('hideMobileSideMenu');
                }
            },
        }
    }
</script>
