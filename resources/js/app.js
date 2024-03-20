import './bootstrap';

import Vue from 'vue';
import { store } from './store/admin';
import dayjs from 'dayjs';
import 'dayjs/locale/ro';
dayjs.locale('ro');

import { createInertiaApp } from '@inertiajs/vue2';

import './plugins/toasted';
import './plugins/vue2-datepicker';
import './plugins/vue-cookies';
import './plugins/vue-meta';
import './plugins/ziggy';
import './plugins/zora';

import './filters/date-times';
import './filters/prices';

import './mixins/page-error';

import './component-registration';

import './inertia-events';

const app = createInertiaApp({
    progress: {
        // The delay after which the progress bar will
        // appear during navigation, in milliseconds.
        delay: 5,

        // Whether to include the default NProgress styles.
        includeCSS: false,

        // Whether the NProgress spinner will be shown.
        showSpinner: false,

    },
    resolve: (name) => require(`./pages/${name}.vue`),
    setup({ el, App, props, plugin }) {
        Vue.use(plugin)

        new Vue({
            store,
            render: h => h(App, props),
        }).$mount(el)
    },
});
