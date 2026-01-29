<template>
    <li
        class="
            flex flex-row items-start justify-between py-2 space-x-4
            ease-in-out duration-300 transition-all
            hover:bg-gray-100
        "
        :class="{ 'cursor-pointer hover:pl-8': enableFileSelect }"
        @click="onFileSelected(file)"
    >
        <div class="flex flex-row items-start">
            <!-- Inline thumbnail for images -->
            <div v-if="isFileImage && showInlineThumbnail" class="relative min-w-12 w-12 h-12 mr-3 flex-shrink-0">
                <img
                    v-if="isThumbnailLoaded"
                    :src="file.url"
                    :alt="file.meta.basename"
                    class="w-12 h-12 object-cover rounded border border-gray-200"
                    @error="onThumbnailError"
                />
                <div
                    v-else
                    ref="thumbnailPlaceholder"
                    class="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center"
                >
                    <icon-photo class="w-5 text-gray-400" />
                </div>
            </div>
            <!-- Icon for non-images or when thumbnails disabled -->
            <component
                v-else
                class="min-w-5 mr-2 w-5"
                :is="fileIcon"
            />
            <span class="self-center">{{ file.meta.basename }}</span>
        </div>
        <div class="flex flex-row items-center space-x-2">
            <!-- Open file in new tab -->
            <a
                v-if="file.url"
                class="
                    flex flex-row items-center justify-center rounded text-theme-base-subtle-contrast
                    ease-in-out duration-300 transition-colors
                    focus:text-theme-primary focus:outline-none
                    hover:text-theme-primary
                "
                :href="file.url"
                rel="noreferrer noopener nofollow"
                target="_blank"
                @click.stop=""
            >
                <icon-external-link class="w-5" />
            </a>

            <!-- Info dropdown button -->
            <div>
                <button
                    v-if="isFileDropdownMeta"
                    :id="infoButtonId"
                    class="
                        flex flex-row items-center justify-center rounded text-theme-base-subtle-contrast
                        ease-in-out duration-300 transition-colors
                        focus:text-theme-primary focus:outline-none
                        hover:text-theme-primary
                    "
                    type="button"
                    @click.stop="onDropdownButtonClick"
                >
                    <icon-info-square class="w-5" />
                </button>

                <div
                    v-if="isFileDropdownMeta"
                    ref="infoDropdownMenu"
                    class="
                        flex flex-col px-4 py-4 space-y-3
                        focus:outline-none
                    "
                    @click.stop=""
                >
                    <div v-if="showDropdownPreview">
                        <img class="max-w-full" :src="file.url" alt="">
                    </div>
                    <p
                        v-for="(value, label) in fileDropdownMeta"
                        :key="label"
                    >
                        <span class="block text-theme-base-subtle-contrast text-xs">
                            {{  label }}
                        </span>
                        <a
                            v-if="value && label.toLowerCase() === 'url'"
                            class="block break-all text-gray-700 text-sm underline"
                            :href="value"
                            rel="noreferrer noopener nofollow"
                            target="_blank"
                        >
                            {{ value }}
                        </a>
                        <span
                            v-else
                            class="block break-all text-gray-700 text-sm"
                        >
                            {{  value }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    import prettyBytes from 'pretty-bytes';
    import slugify from 'slugify';
    import tippy from 'tippy.js';
    import 'tippy.js/animations/shift-away-extreme.css';

    export default {
        name: "FileManagerFilesListFile",
        props: {
            enableFileSelect: {
                default: false,
                type: Boolean,
            },
            file: {
                required: true,
                type: Object
            },
            showInlineThumbnail: {
                default: true,
                type: Boolean,
            }
        },
        data() {
            return {
                isDropdownPreviewLoaded: false, // default to false so previews only download when required
                isThumbnailLoaded: false, // lazy load thumbnails
                thumbnailError: false,
            }
        },
        computed: {
            etag() {
              return this.file.meta.etag.split('"').join('');
            },
            fileDropdownMeta() {
                let meta = {};

                if (this.fileUpdatedAt) {
                    meta["Last Updated"] = this.fileUpdatedAt;
                }

                if (this.fileSize) {
                    meta["Size"] = this.fileSize;
                }

                if (this.fileExtension) {
                    meta["File Extension"] = this.fileExtension;
                }

                if (this.file.url) {
                    meta["URL"] = this.file.url;
                }

                return meta;
            },
            fileExtension() {
                try {
                    return this.file.meta.extension;
                } catch (e) {
                    return false;
                }
            },
            fileIcon() {
                try {
                    switch (this.file.meta.mimetype.toLowerCase()) {
                        case 'image/jpeg':
                        case 'image/png':
                            return 'icon-photo';
                        case 'application/pdf':
                        case 'text/plain':
                            return 'icon-file-text';
                        default:
                            return 'icon-file';
                    }
                } catch (e) {
                    return 'icon-file';
                }
            },
            fileNameSlug() {
                return slugify(this.file.meta.basename, {
                    remove: '.'
                });
            },
            fileSize() {
                try {
                    return prettyBytes(this.file.meta.size);
                } catch (e) {
                    return false;
                }
            },
            fileUpdatedAt() {
                try {
                    let date = new Date(this.file.meta.timestamp)
                    return date.toLocaleString();
                } catch (e) {
                    return false;
                }
            },
            infoButtonId() {
                return 'info-button-' + this.fileNameSlug ;
            },
            isFileDropdownMeta() {
                try {
                    return Object.keys(this.fileDropdownMeta).length
                } catch(e) {
                    return false;
                }
            },
            isFileImage() {
                try {
                    return this.file.meta.mimetype.indexOf('image') === 0;
                } catch (e) {
                    return false;
                }
            },
            showDropdownPreview() {
                return this.isDropdownPreviewLoaded && this.isFileImage;
            },
        },
        mounted() {
            this.initialiseFileDropdown();
            this.initialiseThumbnailObserver();
        },
        beforeDestroy() {
            // Clean up the intersection observer
            if (this.thumbnailObserver) {
                this.thumbnailObserver.disconnect();
            }
        },
        methods: {
            initialiseFileDropdown() {
                if (!this.isFileDropdownMeta) {
                    return;
                }

                let infoDropdownMenu = this.$refs.infoDropdownMenu;
                infoDropdownMenu.style.display = 'block';

                tippy('#' + this.infoButtonId,{
                    animation: 'shift-away-extreme',
                    content: infoDropdownMenu,
                    interactive: true,
                    placement: 'bottom-end',
                    theme: 'dropdown',
                    trigger: 'click',
                });
            },
            initialiseThumbnailObserver() {
                // Set up lazy loading for image thumbnails using IntersectionObserver
                if (!this.isFileImage || !this.showInlineThumbnail) {
                    return;
                }

                this.$nextTick(() => {
                    const placeholder = this.$refs.thumbnailPlaceholder;
                    if (!placeholder) {
                        // Already loaded or not an image
                        return;
                    }

                    this.thumbnailObserver = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    this.isThumbnailLoaded = true;
                                    this.thumbnailObserver.disconnect();
                                }
                            });
                        },
                        { rootMargin: '50px' } // Load slightly before coming into view
                    );

                    this.thumbnailObserver.observe(placeholder);
                });
            },
            onDropdownButtonClick() {
                this.isDropdownPreviewLoaded = true;
            },
            onFileSelected(file) {
                if (this.enableFileSelect) {
                    this.$emit('fileSelected', file);
                }
            },
            onThumbnailError() {
                // Handle failed thumbnail loads gracefully
                this.thumbnailError = true;
                this.isThumbnailLoaded = false;
            }
        },
    }
</script>
