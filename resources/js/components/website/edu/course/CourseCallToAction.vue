<template>
    <section
        class="bg-gray-100 px-4"
        style="padding-bottom: 3rem;"
    >
        <div class="container max-w-screen-lg mx-auto">
            <div class="max-w-screen-lg">
                <div class="flex flex-row justify-center">
                    <a
                        class="animate-bg-primary-to-secondary button button-primary flex flex-row justify-center max-w-250px mt-6 rounded-full text-xl w-full"
                        :href="url"
                    >
                        {{ __('messages.apply-now') }}
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "CourseCallToAction",
        props: {
            data: {
                default: '',
                required: false,
                type: String
            },
            url: {
                default: '#purchase',
                required: false,
                type: String
            },
        },
    }
</script>
