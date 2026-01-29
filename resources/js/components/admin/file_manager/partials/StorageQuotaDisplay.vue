<template>
    <div class="bg-white rounded-lg shadow-subtle p-4">
        <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-700">
                {{ transWithFallback('storage-quota', 'Storage Usage') }}
            </h3>
            <button
                v-if="showRecalculateButton"
                class="
                    text-xs text-theme-base-subtle-contrast
                    hover:text-theme-primary
                    focus:outline-none focus:text-theme-primary
                    transition-colors duration-200
                "
                :disabled="isRecalculating"
                @click="recalculateStorage"
            >
                <icon-refresh
                    v-if="!isRecalculating"
                    class="w-4 h-4"
                />
                <icon-loader-circle
                    v-else
                    class="w-4 h-4 animate-spin-slow"
                />
            </button>
        </div>

        <!-- Loading state -->
        <template v-if="isLoading">
            <div class="flex items-center justify-center py-4">
                <icon-loader-circle class="w-5 h-5 animate-spin-slow text-gray-400" />
            </div>
        </template>

        <!-- Loaded state -->
        <template v-else>
            <!-- Progress bar -->
            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                    class="h-2.5 rounded-full transition-all duration-500"
                    :class="progressBarClass"
                    :style="{ width: usagePercent + '%' }"
                ></div>
            </div>

            <!-- Usage text -->
            <div class="flex justify-between text-xs text-gray-500">
                <span>{{ usedFormatted }} {{ transWithFallback('of', 'of') }} {{ limitFormatted }}</span>
                <span :class="usageTextClass">{{ usagePercent }}%</span>
            </div>

            <!-- Warning message -->
            <div
                v-if="isQuotaExceeded"
                class="mt-2 text-xs text-red-600 flex items-center"
            >
                <icon-alert-triangle class="w-4 h-4 mr-1" />
                {{ transWithFallback('storage-quota-exceeded', 'Storage quota exceeded. Delete files to upload more.') }}
            </div>
            <div
                v-else-if="isQuotaWarning"
                class="mt-2 text-xs text-yellow-600 flex items-center"
            >
                <icon-alert-triangle class="w-4 h-4 mr-1" />
                {{ transWithFallback('storage-quota-warning', 'Running low on storage space.') }}
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'StorageQuotaDisplay',
    props: {
        autoLoad: {
            type: Boolean,
            default: true,
        },
        showRecalculateButton: {
            type: Boolean,
            default: false,
        },
        warningThreshold: {
            type: Number,
            default: 80, // Show warning at 80% usage
        },
    },
    data() {
        return {
            isLoading: true,
            isRecalculating: false,
            storageData: {
                used_bytes: 0,
                limit_bytes: 0,
                remaining_bytes: 0,
                usage_percent: 0,
                is_quota_exceeded: false,
                used_formatted: '0 B',
                limit_formatted: '0 B',
                remaining_formatted: '0 B',
            },
        };
    },
    computed: {
        usedFormatted() {
            return this.storageData.used_formatted;
        },
        limitFormatted() {
            return this.storageData.limit_formatted;
        },
        usagePercent() {
            return this.storageData.usage_percent;
        },
        isQuotaExceeded() {
            return this.storageData.is_quota_exceeded;
        },
        isQuotaWarning() {
            return !this.isQuotaExceeded && this.usagePercent >= this.warningThreshold;
        },
        progressBarClass() {
            if (this.isQuotaExceeded) {
                return 'bg-red-500';
            }
            if (this.isQuotaWarning) {
                return 'bg-yellow-500';
            }
            return 'bg-theme-primary';
        },
        usageTextClass() {
            if (this.isQuotaExceeded) {
                return 'text-red-600 font-medium';
            }
            if (this.isQuotaWarning) {
                return 'text-yellow-600 font-medium';
            }
            return 'text-gray-500';
        },
    },
    mounted() {
        if (this.autoLoad) {
            this.fetchStorageQuota();
        }
    },
    methods: {
        async fetchStorageQuota() {
            this.isLoading = true;
            try {
                const response = await axios.get(this.$route('admin.api.file-manager.storage-quota.index'));
                this.storageData = response.data.data;
            } catch (error) {
                console.error('Failed to fetch storage quota:', error);
                this.$emit('error', error);
            } finally {
                this.isLoading = false;
            }
        },
        async recalculateStorage() {
            this.isRecalculating = true;
            try {
                const response = await axios.post(this.$route('admin.api.file-manager.storage-quota.recalculate'));
                this.storageData = response.data.data;
                this.$emit('recalculated', this.storageData);
            } catch (error) {
                console.error('Failed to recalculate storage:', error);
                this.$emit('error', error);
            } finally {
                this.isRecalculating = false;
            }
        },
        // Allow parent components to trigger refresh
        refresh() {
            return this.fetchStorageQuota();
        },
    },
};
</script>
