<template>
    <main class="bg-gray-900 min-h-screen text-white">
        <!-- Hero Section -->
        <section class="container mx-auto px-4 py-16">
            <h1 class="text-5xl font-bold mb-6 text-center">
                {{ heroTitle }}
            </h1>
            <div 
                v-if="heroDescription"
                class="prose prose-invert mx-auto text-center text-lg"
                v-html="heroDescription"
            />
        </section>

        <!-- Artwork Grid Section -->
        <section 
            v-if="artworkItems && artworkItems.length"
            class="container mx-auto px-4 pb-16"
        >
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <article 
                    v-for="(artwork, index) in artworkItems"
                    :key="index"
                    class="group relative overflow-hidden rounded-lg bg-gray-800 shadow-xl transition-transform duration-300 hover:scale-105"
                >
                    <!-- Artwork Image -->
                    <div class="aspect-[3/4] relative w-full overflow-hidden">
                        <img 
                            v-if="getArtworkField(artwork, 'artwork-image')"
                            :src="getArtworkField(artwork, 'artwork-image')" 
                            :alt="getArtworkField(artwork, 'artwork-title', 'Artwork')"
                            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div 
                            v-else
                            class="flex h-full w-full items-center justify-center bg-gray-700 text-gray-500"
                        >
                            <span>No Image</span>
                        </div>
                    </div>

                    <!-- Artwork Info Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div class="absolute bottom-0 left-0 right-0 p-6">
                            <h3 
                                v-if="getArtworkField(artwork, 'artwork-title')"
                                class="mb-2 text-xl font-semibold"
                            >
                                {{ getArtworkField(artwork, 'artwork-title') }}
                            </h3>
                            <p 
                                v-if="getArtworkField(artwork, 'artwork-description')"
                                class="mb-2 text-sm text-gray-300"
                            >
                                {{ getArtworkField(artwork, 'artwork-description') }}
                            </p>
                            <div class="flex gap-4 text-xs text-gray-400">
                                <span v-if="getArtworkField(artwork, 'artwork-year')">
                                    {{ getArtworkField(artwork, 'artwork-year') }}
                                </span>
                                <span v-if="getArtworkField(artwork, 'artwork-dimensions')">
                                    {{ getArtworkField(artwork, 'artwork-dimensions') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <!-- Empty State -->
        <section 
            v-else
            class="container mx-auto px-4 pb-16 text-center"
        >
            <p class="text-gray-500 text-lg">
                No artwork items added yet. Add artwork through the admin panel.
            </p>
        </section>
    </main>
</template>

<script>
    import { pageWithMetaMixin } from "../../mixins/website/page-with-meta";

    export default {
        name: "PortfolioGalleryPage",
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
            heroTitle() {
                return this.getContentFieldData('hero-title') || 'Portfolio';
            },
            heroDescription() {
                return this.getContentFieldData('hero-description');
            },
            artworkItems() {
                const data = this.getContentFieldData('artwork-items');
                if (!data) return [];
                return this.formatRepeaterFieldData(data);
            }
        },
        methods: {
            getArtworkField(artwork, fieldSlug, defaultValue = null) {
                try {
                    return artwork[fieldSlug]?.data || defaultValue;
                } catch (e) {
                    return defaultValue;
                }
            }
        }
    }
</script>
