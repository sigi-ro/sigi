<template>
    <div class="flex flex-col">
        <label
            :class="formattedLabelClass"
            :for="inputId"
        >
            <slot>
                <span class="flex flex-row items-baseline">
                    <span>{{ labelText }}</span>
                    <sup
                        v-if="inputRequired"
                        class="text-theme-danger-contrast"
                    >
                        *
                    </sup>
                </span>
            </slot>
        </label>

        <select
            :id="inputId"
            :class="formattedInputClass"
            :disabled="inputDisabled"
            :name="inputName"
            :ref="inputId"
            :required="inputRequired"
            @change="onInput"
            @keyup.esc="blurInput"
        >
            <option
                v-if="inputAnyOptionEnabled"
                :disabled="isOptionDisabled(inputAnyOptionValue)"
                :selected="isOptionSelected(inputAnyOptionValue)"
                :value="inputAnyOptionValue"
            >
                {{ inputAnyOptionLabel}}
            </option>

            <option
                v-for="(option, key) in formattedOptions"
                :key="`${inputId}-option-${key}`"
                :disabled="isOptionDisabled(option.value)"
                :selected="isOptionSelected(option.value)"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>


        <form-field-error
            :error-class="errorClass"
            :error-message="errorMessage"
            :is-error="isError"
        />
    </div>
</template>

<script>
    import _ from 'lodash';
    import {baseFormGroupMixin} from "../../../mixins/admin/cms/forms/base-form-group";
    import FormFieldError from "./partials/FormFieldError.vue";

    export default {
        name: 'SelectGroup',
        mixins: [
            baseFormGroupMixin,
        ],
        components: {
            FormFieldError
        },
        props: {
            inputAnyOptionEnabled: {
                default: false,
                type: Boolean
            },
            inputAnyOptionLabel: {
                default: "Any",
                type: String
            },
            inputAnyOptionClass: {
                default: "",
                type: String
            },
            inputAnyOptionValue: {
                default: '',
            },
            inputClass: {
                default: 'border border-theme-base-subtle cursor-pointer font-medium form-select px-3 py-2 rounded w-full focus:border-theme-primary focus:outline-none focus:ring-0 focus:shadow-none',
                type: String
            },
            inputOptionExact: {
                default: false,
                type: Boolean,
            },
            inputOptionForceFormatting: {
                default: false,
                type: Boolean,
            },
            inputOptionLabelKey: {
                default: false,
                type: Boolean | String | Number
            },
            inputOptionValueKey: {
                default: false,
                type: Boolean | String | Number
            },
            inputOptions: {
                required: true,
                type: Array | Object
            },
        },
        computed: {
            formattedOptions() {
                let options = [];

                // DEBUG: log input form to investigate dropdown rendering issues
                // debug logs removed

                // If the options are just an array of strings (primitive values)
                if (Array.isArray(this.inputOptions) && (this.inputOptionForceFormatting === true ? false : (this.inputOptions.length === 0 || typeof this.inputOptions[0] !== 'object'))) {
                    options = this.inputOptions.map(option => ({
                        label: option,
                        value: option,
                    }));
                } else if (Array.isArray(this.inputOptions)) {
                    // If already array of objects
                    options = this.inputOptions.map(option => {
                        let label = option;
                        let value = option;
                        if (
                            this.inputOptionLabelKey !== false &&
                            option.hasOwnProperty(this.inputOptionLabelKey)
                        ) {
                            label = option[this.inputOptionLabelKey];
                        }
                        if (
                            this.inputOptionValueKey !== false &&
                            option.hasOwnProperty(this.inputOptionValueKey)
                        ) {
                            value = option[this.inputOptionValueKey];
                        }
                        return { label, value };
                    });
                } else {
                    // If inputOptions is an object
                    options = Object.keys(this.inputOptions).map(key => {
                        let option = this.inputOptions[key];
                        let label = option;
                        let value = key;
                        if (
                            this.inputOptionLabelKey !== false &&
                            option.hasOwnProperty(this.inputOptionLabelKey)
                        ) {
                            label = option[this.inputOptionLabelKey];
                        }
                        if (
                            this.inputOptionValueKey !== false &&
                            option.hasOwnProperty(this.inputOptionValueKey)
                        ) {
                            value = option[this.inputOptionValueKey];
                        }
                        return { label, value };
                    });
                }
                return options;
            },
            formattedInputClass() {
                let inputClass = this.inputClass;

                if (this.isError) {
                    inputClass += ' error';
                }

                if (this.isAnyOptionSelected) {
                    inputClass += ' ' + this.inputAnyOptionClass;
                }

                return inputClass;
            },
            isAnyOptionSelected() {
                return this.inputValue === this.inputAnyOptionValue || this.inputValue === null;
            }
        },
        mounted() {
            this.autofocus();
        },
        methods: {
            isOptionDisabled(optionValue) {
                if (!this.inputRequired) {
                    return false;
                }

                if (optionValue === '') {
                    return true;
                }

                return false;
            },
            isOptionSelected(optionValue) {
                if (this.inputOptionExact) {
                    return optionValue === this.inputValue;
                }

                return optionValue == this.inputValue;
            },
        },
    }
</script>
