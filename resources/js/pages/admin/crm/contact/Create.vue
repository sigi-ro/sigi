<template>
    <form
        class="max-w-5xl mx-auto"
        autocomplete="off"
        @submit.prevent="submit"
    >
        <!-- Header -->
        <div
            v-if="userCan('crm_contacts.create')"
            class="flex flex-row items-center mb-6"
        >
            <h1 class="font-medium mr-auto text-lg">
                Create Contact
            </h1>

            <inertia-link
                v-if="userCan('crm_contacts.view')"
                class="
                    button button-default-responsive button-primary-subtle
                    flex flex-row items-center mr-2
                "
                :href="$route('admin.crm.contacts.index')"
            >
                <icon-chevron-left
                    class="w-5 md:mr-2"
                />
                <span
                    class="hidden md:inline"
                >
                    Back
                </span>
            </inertia-link>

            <button
                class="
                    button button-default-responsive button-primary
                    flex flex-row items-center
                "
                type="submit"
            >
                <icon-save
                    class="
                        w-5
                        md:mr-2
                    "
                />
                <span
                    class="hidden md:inline"
                >
                    Create Contact
                </span>
            </button>
        </div>

        <!-- Contact Details -->
        <div class="bg-white py-6 shadow-subtle rounded-lg">
            <div class="block px-6 w-full">

                <input-group
                    :error-message="getPageErrorMessage('title')"
                    input-autocomplete="title"
                    :input-autofocus="true"
                    input-id="title"
                    input-name="title"
                    input-type="text"
                    label-text="Title"
                    @errorHidden="clearPageErrorMessage('title')"
                    v-model="formData.title"
                />

                <input-group
                    class="mt-4"
                    :error-message="getPageErrorMessage('first_name')"
                    input-autocomplete="first_name"
                    input-id="first_name"
                    input-name="first_name"
                    :input-required="true"
                    input-type="text"
                    label-text="First Name"
                    @errorHidden="clearPageErrorMessage('first_name')"
                    v-model="formData.first_name"
                />

                <input-group
                    class="mt-4"
                    :error-message="getPageErrorMessage('last_name')"
                    input-autocomplete="last_name"
                    input-id="last_name"
                    input-name="last_name"
                    :input-required="true"
                    input-type="text"
                    label-text="Last Name"
                    @errorHidden="clearPageErrorMessage('last_name')"
                    v-model="formData.last_name"
                />

                <input-group
                    class="mt-4"
                    :error-message="getPageErrorMessage('email')"
                    input-autocomplete="email"
                    input-id="email"
                    input-name="email"
                    :input-required="true"
                    input-type="email"
                    label-text="Email"
                    @errorHidden="clearPageErrorMessage('email')"
                    v-model="formData.email"
                />

                <input-group
                    class="mt-4"
                    :error-message="getPageErrorMessage('telephone')"
                    input-autocomplete="telephone"
                    input-id="telephone"
                    input-max-length="20"
                    input-name="telephone"
                    input-type="telephone"
                    label-text="Telephone"
                    @errorHidden="clearPageErrorMessage('telephone')"
                    v-model="formData.telephone"
                />

            </div>
        </div>

        <!-- Marketing Preferences -->
        <div class="bg-white mt-6 py-6 shadow-subtle rounded-lg">
            <div class="block px-6 w-full">
                <p class="font-medium mb-4 text-theme-base-contrast tracking-wider">
                    Marketing Preferences
                </p>

                <div class="space-y-4">
                    <inline-checkbox-group
                        input-id="marketing-email"
                        input-name="marketing-email"
                        label-text="Email"
                        v-model="formData.marketing_email"
                    />

                    <inline-checkbox-group
                        input-id="marketing-sms"
                        input-name="marketing-sms"
                        label-text="SMS"
                        v-model="formData.marketing_sms"
                    />

                    <inline-checkbox-group
                        input-id="marketing-telephone"
                        input-name="marketing-telephone"
                        label-text="Telephone"
                        v-model="formData.marketing_telephone"
                    />
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    import _ from "lodash";
    import InlineCheckboxGroup from "../../../../components/core/forms/InlineCheckboxGroup.vue";
    import InputGroup from "../../../../components/core/forms/InputGroup.vue";

    export default {
        name: "AdminCrmContactCreate",
        components: {
            InlineCheckboxGroup,
            InputGroup,
        },
        layout: 'admin-layout',
        data() {
            return {
                formData: {
                    email: '',
                    first_name: '',
                    last_name: '',
                    telephone: '',
                    title: '',
                    marketing_email: false,
                    marketing_sms: false,
                    marketing_telephone: false,
                }
            }
        },
        methods: {
            submit() {
                this.$inertia.post(
                    this.$route('admin.crm.contacts.store'),
                    this.formData
                );
            }
        }
    }
</script>
