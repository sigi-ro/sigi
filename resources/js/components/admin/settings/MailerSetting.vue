<template>
    <section class="overflow-hidden relative">
        <hr class="mb-4 mt-4">

        <h2 class="font-medium mb-4 text-theme-base-contrast tracking-wider">
            {{ title }}
        </h2>

        <div
            v-if="showSettings"
            class="flex flex-col space-y-2"
        >
            <div
                v-for="(settingValue, settingKey) in formattedSettingValue"
                :key="`${formattedSettingValue.mailer}-${settingKey}`"
            >
                <select-group
                    v-if="settingKey === 'mailer'"
                    :input-any-option-enabled="true"
                    input-any-option-label="Please Select"
                    :input-options="mailers" label-text="Mailer" input-name="mailer" input-id="mailer"
                    v-model="formattedSettingValue[settingKey]"
                    @input="onUpdate"
                />

                <input-group
                    v-else
                    :label-text="mailerSettingLabels[settingKey]"
                    :input-name="settingKey"
                    :input-id="settingKey"
                    v-model="formattedSettingValue[settingKey]"
                    @input="onUpdate"
                />
            </div>
        </div>
    </section>
</template>

<script>
    import _ from 'lodash';
    import IconPlus from "../../core/icons/IconPlus.vue";
    import InputGroup from "../../core/forms/InputGroup.vue";
    import SelectGroup from "../../core/forms/SelectGroup.vue";
    export default {
        name: "MailerSetting",
        components: {SelectGroup, InputGroup, IconPlus},
        model: {
            prop: 'settingValue'
        },
        props: {
            mailers: {
                required: true,
                type: Object
            },
            mailerSettingKeys: {
                required: true,
                type: Object
            },
            mailerSettingLabels: {
                required: true,
                type: Object
            },
            settingValue: {
                default: {},
                type: String | Object
            },
            title: {
                default: 'Mailer',
                type: String
            },
        },
        data() {
            return {
                formattedSettingValue: {},
                showSettings: true,
            }
        },
        computed: {
            isSettingValueSet() {
                try {
                    return !!Object.keys(this.formattedSettingValue).length;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            },
        },
        mounted() {
            this.initialise();
        },
        methods: {
            formatSetting() {
                if (!this.isSettingValueSet || this.formattedSettingValue.mailer === '') {
                    this.formattedSettingValue = {};
                    this.$set(this.formattedSettingValue, 'mailer', '');

                    return;
                }

                let settings = {
                    mailer: this.formattedSettingValue.mailer
                };

                console.log(settings);

                _.forEach(this.mailerSettingKeys[settings.mailer], (settingKey) => {
                    settings[settingKey] = this.formattedSettingValue[settingKey] ?? '';
                });

                this.formattedSettingValue = _.cloneDeep(settings);
            },
            initialise() {
                try {
                    this.formatSetting();
                } catch (e) {
                    // Do nothing
                }

                this.onUpdate();
            },
            onUpdate() {
                console.log('on update');
                this.formatSetting();
                this.$emit('input', this.formattedSettingValue);
            },
            toggleSettings() {
                this.showSettings = !this.showSettings;
            }
        }
    }
</script>
