<template>
    <div>
        <div
            class="flex flex-row items-center mb-6"
        >
            <h1 class="font-medium mr-auto text-lg">
                {{ transWithFallback('dashboard','Dashboard') }}            
            </h1>
        </div>

        <!-- Stats Cards -->
        <div v-if="stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Form Submissions Card -->
            <div class="bg-white rounded-lg shadow-subtle p-6 border-l-4 border-blue-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">
                            {{ transWithFallback('form-submissions','Form Submissions') }}                        
                        </p>
                        <p class="text-3xl font-bold text-gray-900 mt-2">
                            {{ formatNumber(stats.form_submissions || 0) }}
                        </p>
                    </div>
                    <div class="bg-blue-100 rounded-full p-3">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                </div>
                <div class="mt-4">
                    <a :href="$route('admin.crm.form-submissions.index')" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        {{ transWithFallback('view-all','View all') }} →
                    </a>
                </div>
            </div>

            <!-- Contacts Card -->
            <div class="bg-white rounded-lg shadow-subtle p-6 border-l-4 border-green-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">
                            {{ transWithFallback('contacts','Contacts') }}
                        </p>
                        <p class="text-3xl font-bold text-gray-900 mt-2">
                            {{ formatNumber(stats.contacts || 0) }}
                        </p>
                    </div>
                    <div class="bg-green-100 rounded-full p-3">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                </div>
                <div class="mt-4">
                    <a :href="$route('admin.crm.contacts.index')" class="text-sm text-green-600 hover:text-green-800 font-medium">
                        {{ transWithFallback('view-all','View all') }} →
                    </a>
                </div>
            </div>

            <!-- Pages Card -->
            <div class="bg-white rounded-lg shadow-subtle p-6 border-l-4 border-purple-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">
                            {{ transWithFallback('pages','Pages') }}
                        </p>
                        <p class="text-3xl font-bold text-gray-900 mt-2">
                            {{ formatNumber(stats.pages || 0) }}
                        </p>
                    </div>
                    <div class="bg-purple-100 rounded-full p-3">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                </div>
                <div class="mt-4">
                    <a :href="$route('admin.cms.pages.index')" class="text-sm text-purple-600 hover:text-purple-800 font-medium">
                        {{ transWithFallback('view-all','View all') }} →
                    </a>
                </div>
            </div>

            <!-- Files Card -->
            <div class="bg-white rounded-lg shadow-subtle p-6 border-l-4 border-orange-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">
                            {{ transWithFallback('files','Files') }}
                        </p>
                        <p class="text-3xl font-bold text-gray-900 mt-2">
                            {{ formatNumber(stats.files || 0) }}
                        </p>
                    </div>
                    <div class="bg-orange-100 rounded-full p-3">
                        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                    </div>
                </div>
                <div class="mt-4">
                    <a :href="$route('admin.file_manager.index')" class="text-sm text-orange-600 hover:text-orange-800 font-medium">
                        {{ transWithFallback('view-all','View all') }} →
                    </a>
                </div>
            </div>
        </div>

        <!-- Welcome Section -->
        <div class="bg-white p-6 shadow-subtle rounded-lg">
            <h1 class="font-semibold text-gray-850">
                {{ transWithFallback('welcome','Welcome', {name: $page.props.auth?.user?.first_name || ''}) }}
            </h1>

            <p class="mt-2">
                {{ transWithFallback('lets-build-something-great','Let\'s build something great.') }}
            </p>
        </div>
    </div>
</template>

<script>

    export default {
        name: "AdminHomeIndex",
        layout: 'admin-layout',
        computed: {
            stats() {
                return this.$page.props.stats || {
                    form_submissions: 0,
                    contacts: 0,
                    pages: 0,
                    files: 0,
                };
            }
        },
        methods: {
            formatNumber(value) {
                const num = Number(value) || 0;
                if (num >= 1000000) {
                    return (num / 1000000).toFixed(1) + 'M';
                }
                if (num >= 1000) {
                    return (num / 1000).toFixed(1) + 'K';
                }
                return num.toLocaleString();
            }
        }
    }
</script>
