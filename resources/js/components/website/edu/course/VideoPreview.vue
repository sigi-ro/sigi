<template>
    <section
        v-if="course.video_preview"
        class="bg-grey-800 px-4 py-12"
    >
        <div class="container max-w-screen-lg mx-auto">
            <div
                v-if="showTitle"
                class="max-w-screen-md"
            >
                <p class="font-bold mb-4 text-lg">
                    {{__('messages.course-preview') }}:
                </p>
            </div>

            <section class=" grid grid-cols-1 gap-4
                    sm:grid-cols-2
                    lg:grid-cols-2"
            >
                <div class="align-left">
                    <p v-html="videoPreviewText">
                    </p>
                </div>
                <div class="aspect-ratio-16-9 max-w-xl relative w-full align-right">
                    <iframe
                        :src="course.video_preview"
                        class="h-full w-full"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen
                    />
                </div>
            </section>
        </div>
    </section>
</template>

<script>
    export default {
        name: "VideoPreview",
        props: {
            course: {
                required: true,
                type: Object,
            },
            showTitle: {
                default: false,
                required: false,
                type: Boolean
            },
            videoPreviewText: {
                default: "Preview Video",
                required: false,
                type: String
            }
        },
    }
</script>
