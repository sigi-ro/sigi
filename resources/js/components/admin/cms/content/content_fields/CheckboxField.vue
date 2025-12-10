<template>
    <div>
        <checkbox-group
            :error-message="errorMessage"
            :input-id="inputName"
            :input-name="inputName"
            :input-required="templateField.is_required"
            label-class=""
            label-text=""
            v-model="editableContent"
        >
            <slot/>
        </checkbox-group>
    </div>
</template>

<script>
    import { contentFieldMixin } from "../../../../../mixins/admin/cms/content-field";
    import CheckboxGroup from "../../../../core/forms/CheckboxGroup.vue";

    export default {
        name: "CheckboxField",
        mixins: [
            contentFieldMixin,
        ],
        components: {
            CheckboxGroup,
        }
    }
</script>
