import Vue from "vue";
import _, {snakeCase} from 'lodash';

Vue.mixin({
    methods: {
        formatTransKey(key) {
            return _.snakeCase(key);
        },
        transWithFallback(key, fallbackValue) {
            // If key is an admin.sidebar nested key, prefer a flat `admin-...` key first
            if (typeof key === 'string' && key.indexOf('admin.sidebar.') === 0) {
                const flatKey = 'admin-' + key.replace(/^admin\.sidebar\./, '').replace(/\./g, '-');
                const flatTranslation = this.trans(flatKey);
                if (typeof flatTranslation === 'string' && flatTranslation !== flatKey) {
                    return flatTranslation;
                }
                if (typeof flatTranslation === 'object') {
                    if (flatTranslation.label) return flatTranslation.label;
                    if (flatTranslation.name) return flatTranslation.name;
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
                        return msgTranslation;
                    }
                    if (typeof msgTranslation === 'object') {
                        if (msgTranslation.label) return msgTranslation.label;
                        if (msgTranslation.name) return msgTranslation.name;
                    }
                } catch (e) {
                    // ignore and fall through to fallbackValue
                }

                return fallbackValue;
            }

            // If translation is an object (e.g. nested keys were exported), prefer common string fields
            if (typeof translation === 'object') {
                if (translation.label) return translation.label;
                if (translation.name) return translation.name;

                // If it's an object but doesn't contain a string we can use, return the fallback
                return fallbackValue;
            }

            return translation;
        }
    }
});
