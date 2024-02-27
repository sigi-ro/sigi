<template>
    <section>
        <div class="bg-white py-6 shadow-subtle rounded-lg mt-5">
            <h1 class="font-medium mr-auto text-lg pl-4">
                Purchases
            </h1>
            <div class="block mt-8 overflow-x-auto w-full">
                <table class="table table-hover table-striped w-full">
                    <thead>
                    <tr>
                        <th>{{ __('messages.name') }}</th>
                        <th>{{ __('messages.price-due') }}</th>
                        <th>{{ __('messages.price-paid') }}</th>
                        <th>{{ __('messages.status') }}</th>
                        <th>{{ __('messages.purchased-at') }}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(item, index) in purchases"
                        :key="`item-${item.id}-${index}`"
                    >
                        <td>
                            {{ item.course.name }}
                        </td>
                        <td>
                            {{ item.total_price_due + ' ' + item.currency }}
                        </td>
                        <td>
                            {{ item.total_price_paid + ' ' + item.currency }}
                        </td>
                        <td>
                            {{ item.status }}
                        </td>
                        <td>
                            {{ item.created_at | humanFriendlyDateTime }}
                        </td>
                        <td v-if="item.is_refundable">
                            <div class="flex flex-row items-center justify-end -mx-1">
                                <button
                                    class="
                                        flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide
                                        focus:outline-none focus:ring
                                        hover:bg-theme-danger hover:text-theme-danger-contrast
                                    "
                                    title="Refund"
                                    @click="checkRefund(item)"
                                >
                                    <icon-receipt-refund class="w-5 md:mr-2" /> {{ __('messages.request-refund') }}
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <confirmation-modal
            confirm-text="Request Refund"
            confirm-type="danger"
            :show-modal="showRefundModal"
            :message-text="refundModalText"
            @cancelAction="cancelRefund"
            @closeModal="cancelRefund"
            @confirmAction="confirmRefund"
        />
    </section>
</template>

<script>
    import IconReceiptRefund from "../../../core/icons/IconReceiptRefund.vue";
    import ConfirmationModal from "../../../core/modals/ConfirmationModal";

    export default {
        name: "StudentAdminProfileRefunds",
        components: {
            IconReceiptRefund,
            ConfirmationModal
        },
        props: {
            purchases: {
                required: true,
                type: Object,
            }
        },
        data() {
            return {
                isLoadingRefund: false,
                showRefundModal: false,
                itemToRefund: null,
            }
        },
        computed: {
            refundModalText() {
                try {
                    return 'Do you really want to request a refund for \'' + this.itemToRefund.name + '\'?';
                } catch (e) {
                    return 'Do you really want to refund this?'
                }
            },
        },
        methods: {
            cancelRefund() {
                if (!this.isLoadingRefund) {
                    this.showRefundModal = false;
                    this.itemToRefund = null;
                }
            },
            checkRefund(item) {
                this.showRefundModal = true;
                this.itemToRefund = item.course;
            },
            confirmRefund() {
                if (this.isLoadingRefund) {
                    return this.$errorToast('It\'s only possible to refund one item at a time.');
                }
                this.$inertia.post(
                    this.$route('admin.edu.courses.refund', this.itemToRefund.id),
                    {
                        only: [
                            'flash',
                        ]
                    }
                );
                this.itemToRefund = null;
                this.showRefundModal = false;
            },
        }
    }
</script>
