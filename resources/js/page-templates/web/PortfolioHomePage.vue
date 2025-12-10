<template>
    <main class="bg-gray-900 min-h-screen text-white">
        <!-- Hero Section with Background Image -->
        <section 
            class="relative min-h-screen flex items-center justify-center"
            :style="heroBackgroundStyle"
        >
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-60"></div>

            <!-- Hero Content -->
            <div class="relative z-10 container mx-auto px-4 text-center">
                <!-- Hero Title -->
                <h1 
                    v-if="heroTitle"
                    class="text-6xl md:text-8xl font-bold mb-4 tracking-wider"
                >
                    {{ heroTitle }}
                </h1>

                <!-- Hero Subtitle -->
                <p 
                    v-if="heroSubtitle"
                    class="text-xl md:text-2xl mb-8 text-gray-300"
                >
                    {{ heroSubtitle }}
                </p>

                <!-- About Text Box -->
                <div 
                    v-if="aboutText"
                    class="max-w-2xl mx-auto mt-12 p-8 bg-black bg-opacity-70 border border-gray-700 rounded-lg"
                >
                    <div 
                        class="prose prose-invert prose-lg mx-auto"
                        v-html="aboutText"
                    />
                    
                    <!-- More Info Button (Optional - can link to About page) -->
                    <inertia-link
                        v-if="$routeCheck('website.pages.show')"
                        :href="$route('website.pages.show', 'about')"
                        class="inline-block mt-6 px-8 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-200 transition-colors duration-300"
                    >
                        More Info
                    </inertia-link>
                </div>
            </div>

            <!-- Scroll Down Indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg 
                    class="w-6 h-6 text-white opacity-50" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </section>

        <!-- Portfolio Categories Section -->
        <section class="bg-gray-800 py-20">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-bold text-center mb-16">
                    Explore My Work
                </h2>

                <div class="grid gap-8 md:grid-cols-3">
                    <!-- Digital Paintings -->
                    <inertia-link
                        v-if="$routeCheck('website.pages.show')"
                        :href="$route('website.pages.show', 'digital-paintings')"
                        class="group relative overflow-hidden rounded-lg bg-gray-700 shadow-xl transition-transform duration-300 hover:scale-105"
                    >
                        <div class="aspect-[4/3] relative">
                            <div class="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-80"></div>
                            <div class="relative z-10 flex h-full items-center justify-center">
                                <h3 class="text-3xl font-bold text-white">Digital Paintings</h3>
                            </div>
                        </div>
                    </inertia-link>

                    <!-- Comics -->
                    <inertia-link
                        v-if="$routeCheck('website.pages.show')"
                        :href="$route('website.pages.show', 'comics')"
                        class="group relative overflow-hidden rounded-lg bg-gray-700 shadow-xl transition-transform duration-300 hover:scale-105"
                    >
                        <div class="aspect-[4/3] relative">
                            <div class="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-600 opacity-80"></div>
                            <div class="relative z-10 flex h-full items-center justify-center">
                                <h3 class="text-3xl font-bold text-white">Comics</h3>
                            </div>
                        </div>
                    </inertia-link>

                    <!-- Miscellaneous -->
                    <inertia-link
                        v-if="$routeCheck('website.pages.show')"
                        :href="$route('website.pages.show', 'misc')"
                        class="group relative overflow-hidden rounded-lg bg-gray-700 shadow-xl transition-transform duration-300 hover:scale-105"
                    >
                        <div class="aspect-[4/3] relative">
                            <div class="absolute inset-0 bg-gradient-to-br from-red-600 to-pink-600 opacity-80"></div>
                            <div class="relative z-10 flex h-full items-center justify-center">
                                <h3 class="text-3xl font-bold text-white">Miscellaneous</h3>
                            </div>
                        </div>
                    </inertia-link>
                </div>
            </div>
        </section>

        <!-- Contact CTA Section -->
        <section class="bg-gray-900 py-20">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-4xl font-bold mb-6">
                    Let's Work Together
                </h2>
                <p class="text-xl text-gray-400 mb-8">
                    Interested in commissioning artwork or collaborating on a project?
                </p>
                <inertia-link
                    v-if="$routeCheck('website.pages.show')"
                    :href="$route('website.pages.show', 'contact')"
                    class="inline-block px-12 py-4 bg-white text-gray-900 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300"
                >
                    Contact Me
                </inertia-link>
            </div>
        </section>
    </main>
</template>

<script>
    import { pageWithMetaMixin } from "../../mixins/website/page-with-meta";

    export default {
        name: "PortfolioHomePage",
        mixins: [
            pageWithMetaMixin
        ],
        props: {
            page: {
                required: true,
                type: Object
            }
        },
        computed: {
            heroImage() {
                return this.getContentFieldData('hero-image');
            },
            heroBackgroundStyle() {
                if (this.heroImage) {
                    return {
                        backgroundImage: `url(${this.heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    };
                }
                return {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                };
            },
            heroTitle() {
                return this.getContentFieldData('hero-title') || 'Portfolio';
            },
            heroSubtitle() {
                return this.getContentFieldData('hero-subtitle');
            },
            aboutText() {
                return this.getContentFieldData('about-text');
            }
        }
    }
</script>
