<template>
    <!--
        This is just the file that's loaded for a CMS page
        It is recommended to follow an approach similar to the below i.e.:
            A dynamic component for the layout - that takes a slot for the template
            A dynamic component for the template that displays the page content accordingly
    -->
    <component
        v-if="layoutComponent"
        :is="layoutComponent"
        :layout="layout"
        :page="page"
    >
        <component
            v-if="templateComponent"
            :is="templateComponent"
            :layout="layout"
            :page="page"
        />
    </component>

</template>

<script>
    import { pageWithMetaMixin } from "../../../mixins/website/page-with-meta";
    import BasicLayout from "../../../layouts/website/BasicLayout.vue";
    import BasicPage from "../../../page-templates/web/BasicPage.vue";
    import CourseLayout from "../../../layouts/website/CourseLayout.vue";
    import CoursePage from "../../../page-templates/web/CoursePage.vue";

    export default {
        name: 'PageShow',
        mixins: [
            pageWithMetaMixin
        ],
        components: {
            // Layout Templates
            BasicLayout,
            CourseLayout,
            // Page Templates
            BasicPage,
            CoursePage,
        },
    }
</script>
