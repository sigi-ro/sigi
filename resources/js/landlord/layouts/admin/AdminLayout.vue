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
        </main>
    </div>
</template>

<script>
    import { router } from '@inertiajs/vue2'

    import PageAlerts from "../../../components/core/alerts/PageAlerts.vue";

    export default {
        name: "AdminLayout",
        components: {
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
                                route: "landlord.admin.index",
                            },
                        },
                        label: this.transWithFallback('admin-main', 'Main'),
                        requiresAllPermissions: [],
                        requiresAnyPermissions: [],
                        showLabel: false,
                    },
                    admin: {
                        children : {
                            tenants: {
                                activeRoutes: ["landlord.admin.tenants.index", "landlord.admin.tenants.create", "landlord.admin.tenants.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-tenants-view','View Tenants'),
                                        requiresAllPermissions: ["tenants.view"],
                                        requiresAnyPermissions: [],
                                        route: "landlord.admin.tenants.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-tenants-create','Create Tenant'),
                                        requiresAllPermissions: ["tenants.create"],
                                        requiresAnyPermissions: [],
                                        route: "landlord.admin.tenants.create",
                                    },
                                },
                                icon: "icon-app-window",
                                label: this.transWithFallback('admin-tenants','Tenants'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["tenants.view", "tenants.create"],
                                route: false,
                            },
                            users: {
                                activeRoutes: ["landlord.admin.users.index", "landlord.admin.users.create", "landlord.admin.users.edit"],
                                children: {
                                    index: {
                                        icon: false,
                                        label: this.transWithFallback('admin-users-view','View Users'),
                                        requiresAllPermissions: ["users.view"],
                                        requiresAnyPermissions: [],
                                        route: "landlord.admin.users.index",
                                    },
                                    create: {
                                        children: false,
                                        icon: false,
                                        label: this.transWithFallback('admin-users-create','Create User'),
                                        requiresAllPermissions: ["users.create"],
                                        requiresAnyPermissions: [],
                                        route: "landlord.admin.users.create",
                                    },
                                },
                                icon: "icon-users",
                                label: this.transWithFallback('admin-users','Users'),
                                requiresAllPermissions: [],
                                requiresAnyPermissions: ["users.view", "users.create"],
                                route: false,
                            },
                        },
                        label: this.transWithFallback('admin-admin','Admin'),
                        requiresAllPermissions: [],
                        requiresAnyPermissions: ["users.view", "users.create", "tenants.view", "tenants.create"],
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
                console.debug('ZORA LOCALE (landlord)', window.locale);
                console.debug('trans admin-dashboard ->', this.trans('admin-dashboard'));
                console.debug('trans messages.admin-dashboard ->', this.trans('messages.admin-dashboard'));
                console.debug('transWithFallback admin-dashboard ->', this.transWithFallback('admin-dashboard', 'Dashboard'));
            } catch (e) {
                console.error('Translation debug error (landlord)', e);
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
