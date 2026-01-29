<template>
    <div class="max-w-5xl mx-auto">
        <div class="flex flex-row items-center mb-6">
            <h1 class="font-medium mr-auto text-lg">
                {{ transWithFallback('webhooks', 'Webhooks') }}
            </h1>
        </div>

        <!-- Global Settings -->
        <div class="bg-white shadow-subtle rounded-lg p-6 mb-6">
            <h2 class="text-md font-medium mb-4">{{ transWithFallback('global-settings', 'Global Settings') }}</h2>

            <div class="flex items-center mb-4">
                <label class="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        class="form-checkbox h-5 w-5 text-theme-primary"
                        v-model="formData.enabled"
                        @change="saveSettings"
                    >
                    <span class="ml-2">{{ transWithFallback('webhooks-enabled', 'Webhooks Enabled') }}</span>
                </label>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ transWithFallback('retry-attempts', 'Retry Attempts') }}
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        class="form-input w-full"
                        v-model.number="formData.retry_attempts"
                        @change="saveSettings"
                    >
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ transWithFallback('timeout-seconds', 'Timeout (seconds)') }}
                    </label>
                    <input
                        type="number"
                        min="5"
                        max="120"
                        class="form-input w-full"
                        v-model.number="formData.timeout_seconds"
                        @change="saveSettings"
                    >
                </div>
            </div>
        </div>

        <!-- Stats -->
        <div class="bg-white shadow-subtle rounded-lg p-6 mb-6">
            <h2 class="text-md font-medium mb-4">{{ transWithFallback('delivery-stats', 'Delivery Stats (Last 7 Days)') }}</h2>
            <div class="grid grid-cols-3 gap-4">
                <div class="text-center p-4 bg-gray-50 rounded">
                    <div class="text-2xl font-bold text-theme-primary">{{ stats.total_sent }}</div>
                    <div class="text-sm text-gray-600">{{ transWithFallback('total-sent', 'Total Sent') }}</div>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded">
                    <div class="text-2xl font-bold" :class="stats.success_rate >= 95 ? 'text-green-600' : 'text-yellow-600'">
                        {{ stats.success_rate }}%
                    </div>
                    <div class="text-sm text-gray-600">{{ transWithFallback('success-rate', 'Success Rate') }}</div>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded">
                    <div class="text-2xl font-bold" :class="stats.failed > 0 ? 'text-red-600' : 'text-green-600'">
                        {{ stats.failed }}
                    </div>
                    <div class="text-sm text-gray-600">{{ transWithFallback('failed', 'Failed') }}</div>
                </div>
            </div>
        </div>

        <!-- Endpoints -->
        <div class="bg-white shadow-subtle rounded-lg p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-md font-medium">{{ transWithFallback('webhook-endpoints', 'Webhook Endpoints') }}</h2>
                <button
                    type="button"
                    class="button button-primary button-small"
                    @click="addEndpoint"
                >
                    + {{ transWithFallback('add-endpoint', 'Add Endpoint') }}
                </button>
            </div>

            <div v-if="formData.endpoints.length === 0" class="text-center text-gray-500 py-8">
                {{ transWithFallback('no-endpoints', 'No webhook endpoints configured. Click "Add Endpoint" to create one.') }}
            </div>

            <div
                v-for="(endpoint, index) in formData.endpoints"
                :key="endpoint.id || index"
                class="border rounded-lg p-4 mb-4"
            >
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer mr-4">
                            <input
                                type="checkbox"
                                class="form-checkbox h-4 w-4 text-theme-primary"
                                v-model="endpoint.is_active"
                                @change="saveSettings"
                            >
                            <span class="ml-2 text-sm">{{ transWithFallback('active', 'Active') }}</span>
                        </label>
                        <span
                            v-if="endpoint.is_active"
                            class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded"
                        >
                            {{ transWithFallback('enabled', 'Enabled') }}
                        </span>
                        <span
                            v-else
                            class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                            {{ transWithFallback('disabled', 'Disabled') }}
                        </span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button
                            type="button"
                            class="text-blue-600 hover:text-blue-800 text-sm"
                            @click="testEndpoint(endpoint)"
                            :disabled="isTesting"
                        >
                            {{ isTesting ? transWithFallback('testing', 'Testing...') : transWithFallback('test', 'Test') }}
                        </button>
                        <button
                            type="button"
                            class="text-red-600 hover:text-red-800 text-sm"
                            @click="removeEndpoint(index)"
                        >
                            {{ transWithFallback('remove', 'Remove') }}
                        </button>
                    </div>
                </div>

                <div class="grid gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            {{ transWithFallback('endpoint-name', 'Name') }}
                        </label>
                        <input
                            type="text"
                            class="form-input w-full"
                            v-model="endpoint.name"
                            :placeholder="transWithFallback('endpoint-name-placeholder', 'e.g., Production Site Rebuild')"
                            @blur="saveSettings"
                        >
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            {{ transWithFallback('endpoint-url', 'URL') }}
                        </label>
                        <input
                            type="url"
                            class="form-input w-full"
                            v-model="endpoint.url"
                            placeholder="https://example.com/webhook"
                            @blur="saveSettings"
                        >
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            {{ transWithFallback('secret-key', 'Secret Key (for signature verification)') }}
                        </label>
                        <div class="flex">
                            <input
                                :type="showSecret[index] ? 'text' : 'password'"
                                class="form-input flex-1"
                                v-model="endpoint.secret"
                                :placeholder="transWithFallback('secret-placeholder', 'Optional shared secret')"
                                @blur="saveSettings"
                            >
                            <button
                                type="button"
                                class="ml-2 px-3 py-2 border rounded text-sm"
                                @click="toggleSecret(index)"
                            >
                                {{ showSecret[index] ? transWithFallback('hide', 'Hide') : transWithFallback('show', 'Show') }}
                            </button>
                            <button
                                type="button"
                                class="ml-2 px-3 py-2 border rounded text-sm"
                                @click="generateSecret(index)"
                            >
                                {{ transWithFallback('generate', 'Generate') }}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ transWithFallback('events', 'Events') }}
                        </label>
                        <div class="grid grid-cols-2 gap-2">
                            <label
                                v-for="(label, event) in availableEvents"
                                :key="event"
                                class="flex items-center cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    class="form-checkbox h-4 w-4 text-theme-primary"
                                    :value="event"
                                    v-model="endpoint.events"
                                    @change="saveSettings"
                                >
                                <span class="ml-2 text-sm">{{ label }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Logs -->
        <div class="bg-white shadow-subtle rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-md font-medium">{{ transWithFallback('recent-logs', 'Recent Delivery Logs') }}</h2>
                <button
                    type="button"
                    class="text-red-600 hover:text-red-800 text-sm"
                    @click="clearLogs"
                    v-if="recentLogs.length > 0"
                >
                    {{ transWithFallback('clear-old-logs', 'Clear Old Logs') }}
                </button>
            </div>

            <div v-if="recentLogs.length === 0" class="text-center text-gray-500 py-8">
                {{ transWithFallback('no-logs', 'No webhook delivery logs yet.') }}
            </div>

            <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                {{ transWithFallback('time', 'Time') }}
                            </th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                {{ transWithFallback('event', 'Event') }}
                            </th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                {{ transWithFallback('endpoint', 'Endpoint') }}
                            </th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                {{ transWithFallback('status', 'Status') }}
                            </th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                {{ transWithFallback('duration', 'Duration') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="log in recentLogs" :key="log.id">
                            <td class="px-4 py-2 text-sm text-gray-500">
                                {{ formatDate(log.created_at) }}
                            </td>
                            <td class="px-4 py-2 text-sm">
                                {{ log.event_type }}
                            </td>
                            <td class="px-4 py-2 text-sm">
                                {{ log.endpoint_name || truncateUrl(log.endpoint_url) }}
                            </td>
                            <td class="px-4 py-2">
                                <span
                                    class="px-2 py-1 text-xs rounded"
                                    :class="{
                                        'bg-green-100 text-green-800': log.status === 'success',
                                        'bg-red-100 text-red-800': log.status === 'failed',
                                        'bg-yellow-100 text-yellow-800': log.status === 'pending',
                                    }"
                                >
                                    {{ log.status }}
                                    <span v-if="log.http_status">({{ log.http_status }})</span>
                                </span>
                            </td>
                            <td class="px-4 py-2 text-sm text-gray-500">
                                {{ log.duration_ms ? log.duration_ms + 'ms' : '-' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'AdminSettingsWebhooks',
    layout: 'admin-layout',
    props: {
        settings: {
            type: Object,
            required: true,
        },
        availableEvents: {
            type: Object,
            required: true,
        },
        recentLogs: {
            type: Array,
            default: () => [],
        },
        stats: {
            type: Object,
            default: () => ({ success_rate: 100, total_sent: 0, failed: 0 }),
        },
    },
    data() {
        return {
            formData: {
                enabled: this.settings.enabled,
                retry_attempts: this.settings.retry_attempts,
                timeout_seconds: this.settings.timeout_seconds,
                endpoints: _.cloneDeep(this.settings.endpoints || []),
            },
            showSecret: {},
            isTesting: false,
            isSaving: false,
        };
    },
    methods: {
        addEndpoint() {
            this.formData.endpoints.push({
                id: this.generateId(),
                name: '',
                url: '',
                secret: '',
                events: ['page.published'],
                is_active: true,
            });
        },
        removeEndpoint(index) {
            if (confirm(this.transWithFallback('confirm-remove-endpoint', 'Are you sure you want to remove this endpoint?'))) {
                this.formData.endpoints.splice(index, 1);
                this.saveSettings();
            }
        },
        toggleSecret(index) {
            this.$set(this.showSecret, index, !this.showSecret[index]);
        },
        generateSecret(index) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let secret = '';
            for (let i = 0; i < 32; i++) {
                secret += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            this.$set(this.formData.endpoints[index], 'secret', secret);
            this.$set(this.showSecret, index, true);
            this.saveSettings();
        },
        generateId() {
            return 'ep_' + Math.random().toString(36).substr(2, 9);
        },
        saveSettings: _.debounce(function() {
            if (this.isSaving) return;
            this.isSaving = true;

            axios.put(this.$route('admin.webhooks.update'), this.formData)
                .then(response => {
                    this.$successToast(response.data.message || this.transWithFallback('settings-saved', 'Settings saved'));
                })
                .catch(error => {
                    this.$errorToast(error.response?.data?.message || this.transWithFallback('save-failed', 'Failed to save settings'));
                })
                .finally(() => {
                    this.isSaving = false;
                });
        }, 500),
        async testEndpoint(endpoint) {
            if (!endpoint.url) {
                this.$errorToast(this.transWithFallback('url-required', 'URL is required'));
                return;
            }

            this.isTesting = true;

            try {
                const response = await axios.post(this.$route('admin.webhooks.test'), {
                    url: endpoint.url,
                    secret: endpoint.secret,
                });

                if (response.data.success) {
                    this.$successToast(response.data.message);
                } else {
                    this.$errorToast(response.data.message);
                }
            } catch (error) {
                this.$errorToast(error.response?.data?.message || this.transWithFallback('test-failed', 'Test failed'));
            } finally {
                this.isTesting = false;
            }
        },
        async clearLogs() {
            if (!confirm(this.transWithFallback('confirm-clear-logs', 'Are you sure you want to clear logs older than 30 days?'))) {
                return;
            }

            try {
                const response = await axios.delete(this.$route('admin.webhooks.logs.clear'));
                this.$successToast(response.data.message);
                // Refresh page to show updated logs
                this.$inertia.reload({ only: ['recentLogs', 'stats'] });
            } catch (error) {
                this.$errorToast(this.transWithFallback('clear-failed', 'Failed to clear logs'));
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString();
        },
        truncateUrl(url) {
            if (!url) return '';
            try {
                const urlObj = new URL(url);
                return urlObj.hostname + (urlObj.pathname.length > 20 ? urlObj.pathname.substring(0, 20) + '...' : urlObj.pathname);
            } catch {
                return url.substring(0, 30) + '...';
            }
        },
    },
};
</script>
