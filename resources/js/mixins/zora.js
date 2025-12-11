import Vue from "vue";
import _, {snakeCase} from 'lodash';

Vue.mixin({
    methods: {
        formatTransKey(key) {
            return _.snakeCase(key);
        },
        transWithFallback(key, fallbackValue, replacements = {}) {
            // Helper function to replace placeholders in a string
            const replacePlaceholders = (str, repl) => {
                if (typeof str !== 'string' || !repl || typeof repl !== 'object') {
                    return str;
                }
                let result = str;
                Object.keys(repl).forEach(key => {
                    const placeholder = ':' + key;
                    const value = repl[key] || '';
                    result = result.replace(new RegExp(placeholder, 'g'), value);
                });
                return result;
            };

            // If key is an admin.sidebar nested key, prefer a flat `admin-...` key first
            if (typeof key === 'string' && key.indexOf('admin.sidebar.') === 0) {
                const flatKey = 'admin-' + key.replace(/^admin\.sidebar\./, '').replace(/\./g, '-');
                const flatTranslation = this.trans(flatKey);
                if (typeof flatTranslation === 'string' && flatTranslation !== flatKey) {
                    return replacePlaceholders(flatTranslation, replacements);
                }
                if (typeof flatTranslation === 'object') {
                    if (flatTranslation.label) return replacePlaceholders(flatTranslation.label, replacements);
                    if (flatTranslation.name) return replacePlaceholders(flatTranslation.name, replacements);
                }
                // otherwise fall through and try original nested key
            }

            let translation = this.trans(key);

            // If the key didn't resolve (Zora stores many app strings under `messages.*`),
            // try `messages.{key}` as a fallback for flat keys like `admin-dashboard`.
            if (translation === key || typeof translation === 'undefined' || translation === null) {
                try {
                    const messagesKey = `messages.${key}`;
                    const msgTranslation = this.trans(messagesKey);
                    if (typeof msgTranslation === 'string' && msgTranslation !== messagesKey) {
                        return replacePlaceholders(msgTranslation, replacements);
                    }
                    if (typeof msgTranslation === 'object') {
                        if (msgTranslation.label) return replacePlaceholders(msgTranslation.label, replacements);
                        if (msgTranslation.name) return replacePlaceholders(msgTranslation.name, replacements);
                    }
                } catch (e) {
                    // ignore and fall through to fallbackValue
                }

                return replacePlaceholders(fallbackValue, replacements);
            }

            // If translation is an object (e.g. nested keys were exported), prefer common string fields
            if (typeof translation === 'object') {
                if (translation.label) return replacePlaceholders(translation.label, replacements);
                if (translation.name) return replacePlaceholders(translation.name, replacements);

                // If it's an object but doesn't contain a string we can use, return the fallback
                return replacePlaceholders(fallbackValue, replacements);
            }

            return replacePlaceholders(translation, replacements);
        }
    }
});
