<template>
    <transition
        v-if="showModal"
        name="fade"
    >
        <div
            class="bg-gray-800 bg-opacity-75 fixed flex h-full inset-0 items-center justify-center w-full p-4 z-30"
            :class="componentName"
        >
            <div
                class="bg-theme-card max-h-full max-w-full overflow-y-auto relative rounded shadow-md text-theme-card-contrast w-96"
                v-on-clickaway="closeModal"
            >
                <div class="flex flex-row justify-end p-2">
                    <button
                        class="
                            flex items-center justify-center ml-auto p-1 rounded
                            ease-in-out duration-300 transition-colors
                            focus:outline-none focus:ring focus:ring-primary
                            hover:bg-theme-base-subtle
                        "
                        :disabled="isActionLoading"
                        type="button"
                        @click="closeModal"
                    >
                        <icon-close class="h-5 w-5"/>
                    </button>
                </div>

                <slot>
                    <div
                        v-if="isMessage"
                        class="flex flex-col items-center mt-6 px-4 text-center"
                    >
                        <h2
                            v-if="messageTitle"
                            class="font-semibold text-lg"
                        >
                            {{ messageTitle }}
                        </h2>
                        <p
                            v-if="messageText"
                            class="mt-2 text-center text-gray-700"
                        >
                            {{ messageText }}
                        </p>
                    </div>
                </slot>

                <div
                    class="
                        flex flex-col items-center justify-center mb-4 mt-8 px-4 space-y-2
                        sm:flex-row sm:space-x-3 sm:space-y-0
                    "
                >
                    <button
                        class="
                            bg-theme-base-subtle min-w-24 px-4 py-2 rounded text-center text-theme-base-subtle-contrast w-full
                            ease-in-out duration-300 transition-colors
                            sm:w-auto
                            focus:outline-none focus:ring focus:ring-primary
                            hover:bg-theme-base-subtle-contrast hover:text-theme-base-subtle
                        "
                        :disabled="isActionLoading"
                        type="button"
                        @click="cancelAction"
                    >
                        {{ cancelTextComputed }}
                    </button>

                    <button
                        class="
                            border flex flex-row items-center justify-center px-4 py-2 min-w-24 px-4 py-2 rounded text-center w-full
                            ease-in-out duration-300 transition-colors
                            sm:w-auto
                            focus:outline-none focus:ring focus:ring-primary
                        "
                        :class="confirmButtonClass"
                        :disabled="isActionLoading"
                        type="button"
                        @click="confirmAction"
                    >
                        <icon-loader-circle
                            v-if="isActionLoading"
                            class="animate-spin-slow mr-2 w-5"
                        />
                        <span v-else>
                            {{ confirmTextComputed }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway';

    export default {
        name: "ConfirmationModal",
        mixins: [clickaway],
        props: {
            componentName: {
                default: "confirmation-modal",
                type: String
            },
            cancelText: {
                default: '',
                type: String
            },
            confirmText: {
                default: '',
                type: String
            },
            confirmType: {
                default: 'primary',
                type: String
            },
            isActionLoading: {
                default: false,
                type: Boolean,
            },
            messageText: {
                default: '',
                type: String
            },
            messageTitle: {
                default: '',
                type: String
            },
            showModal: {
                default: true,
                type: Boolean
            }
        },
        computed: {
            cancelTextComputed() {
                return this.cancelText && this.cancelText.length ? this.cancelText : this.transWithFallback('cancel','Cancel');
            },
            confirmTextComputed() {
                return this.confirmText && this.confirmText.length ? this.confirmText : this.transWithFallback('confirm','Confirm');
            },
            messageTextComputed() {
                return this.messageText && this.messageText.length ? this.messageText : this.transWithFallback('perform-action-check','Do you really want to perform this action?');
            },
            messageTitleComputed() {
                return this.messageTitle && this.messageTitle.length ? this.messageTitle : this.transWithFallback('are-you-sure','Are you sure');
            },
            confirmButtonClass() {
                let classList = [];

                classList.push('bg-theme-' + this.confirmType);
                classList.push('border-theme-' + this.confirmType);
                classList.push('text-theme-' + this.confirmType + '-contrast');
                classList.push('hover:bg-theme-' + this.confirmType + '-hover');
                classList.push('hover:border-theme-' + this.confirmType + '-hover');
                classList.push('hover:text-theme-' + this.confirmType + '-hover-contrast');

                return classList;
            },
            isMessage() {
                return this.isMessageText && this.isMessageTitle;
            },
            isMessageText() {
                return !!this.messageTextComputed.length
            },
            isMessageTitle() {
                return !!this.messageTitleComputed.length;
            },
        },
        methods: {
            cancelAction() {
                this.$emit('cancelAction');
            },
            closeModal() {
                this.$emit('closeModal');
            },
            confirmAction() {
                this.$emit('confirmAction');
            },
            onShowModal() {
                try {
                    let body = document.getElementsByTagName('body')[0];

                    if (this.showModal) {
                        body.classList.add('overflow-y-hidden');
                    } else {
                        body.classList.remove('overflow-y-hidden');
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        },
        watch: {
            showModal: {
                handler: 'onShowModal'
            }
        }
    }
</script>

