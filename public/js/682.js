(self.webpackChunk=self.webpackChunk||[]).push([[682],{682:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>o});const n={name:"WebsiteError",layout:"website-layout",props:{status:{required:!0,type:Number}},computed:{error_button_class:function(){return this.is_allowed_error?{403:"bg-theme-warning text-theme-warning-contrast hover:bg-theme-warning-contrast hover:text-theme-warning",404:"bg-theme-info text-theme-info-contrast hover:bg-theme-info-contrast hover:text-theme-info",500:"bg-theme-danger text-theme-danger-contrast hover:bg-theme-danger-contrast hover:text-theme-danger"}[this.status]:"bg-theme-danger text-theme-danger-contrast hover:bg-theme-danger-contrast hover:text-theme-danger"},error_description:function(){return this.is_allowed_error?{403:"Sorry, you are forbidden from accessing this page.",404:"Sorry, the page you are looking for could not be found.",500:"Whoops, something went wrong on our servers. We are looking into it.",503:"Sorry, we are doing some maintenance. Please check back soon."}[this.status]:"Whoops, something went wrong on our servers. We are looking into it."},error_title_class:function(){return this.is_allowed_error?{403:"text-theme-warning-contrast",404:"text-theme-info-contrast",500:"text-theme-danger-contrast",503:"text-theme-primary"}[this.status]:"text-theme-danger-contrast"},is_allowed_error:function(){return[403,404,500,503].indexOf(this.status)>=0}}};const o=(0,r(1900).Z)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"flex flex-col items-center justify-center h-full min-h-screen p-6"},[r("div",{staticClass:"text-center"},[r("h1",{staticClass:"font-black text-7xl text-center",class:t.error_title_class},[t._v("\n            "+t._s(t.is_allowed_error?t.status:"Error")+"\n        ")]),t._v(" "),r("p",{staticClass:"font-semibold mt-4 max-w-full text-center text-theme-base-subtle-contrast text-lg w-72"},[t._v("\n            "+t._s(t.error_description)+"\n        ")]),t._v(" "),503!==t.status?r("inertia-link",{staticClass:"\n                button\n                font-semibold inline-block mt-8 mx-auto px-12 text-lg\n            ",class:t.error_button_class,attrs:{href:"/"}},[t._v("\n            Go Home\n        ")]):t._e()],1)])}),[],!1,null,null,null).exports}}]);