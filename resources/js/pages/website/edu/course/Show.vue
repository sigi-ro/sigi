<template>
    <section class="bg-white">

       <course-header :course="course"></course-header>

        <course-features :course="course"></course-features>

        <video-preview :course="course"></video-preview>

        <course-description :course="course"></course-description>

        <purchase :course="course"></purchase>

        <course-content :course="course"></course-content>

<!--        <faq></faq>-->

<!--        <about-author :course="course"></about-author>-->

        <testimonials></testimonials>

        <course-footer></course-footer>

    </section>
</template>

<script>
import Faq from "../../../../components/website/edu/course/Faq.vue";
import AboutAuthor from "../../../../components/website/edu/course/AboutAuthor.vue";
import Testimonials from "../../../../components/website/edu/course/Testimonials.vue";
import CourseContent from "../../../../components/website/edu/course/CourseContent.vue";
import Purchase from "../../../../components/website/edu/course/Purchase.vue";
import CourseDescription from "../../../../components/website/edu/course/CourseDescription.vue";
import VideoPreview from "../../../../components/website/edu/course/VideoPreview.vue";
import CourseFeatures from "../../../../components/website/edu/course/CourseFeatures.vue";
import CourseHeader from "../../../../components/website/edu/course/CourseHeader.vue";
import CourseFooter from "../../../../components/website/edu/course/CourseFooter.vue";

export default {
    name: "EduCourseShow",
    components: {
        Faq,
        AboutAuthor,
        Testimonials,
        CourseContent,
        Purchase,
        CourseDescription,
        VideoPreview,
        CourseFeatures,
        CourseHeader,
        CourseFooter
    },
    layout: 'website-layout',
    props: {
        course: {
            type: Object,
            required: true
        }
    }
}
</script>
