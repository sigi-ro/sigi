(self.webpackChunk=self.webpackChunk||[]).push([[742],{8742:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>n});const a={name:"AuthPasswordEmail",components:{InputGroup:s(3764).Z},layout:"auth-layout",data:function(){return{form:{email:""}}},methods:{submit:function(){this.$inertia.post(this.$route("password.email"),this.form)}}};const n=(0,s(1900).Z)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"auth-card-container"},[s("div",{staticClass:"auth-card"},[s("h1",{staticClass:"auth-header"},[t._v("\n            Password Reset\n        ")]),t._v(" "),t.$page.props.flash.status?s("p",{staticClass:"pb-8 px-6 text-center text-green-700"},[t._v("\n            "+t._s(t.$page.props.flash.status)+"\n        ")]):s("form",{staticClass:"px-6",on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[s("input-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("email"),"input-autocomplete":"email","input-class":"auth-input","input-id":"email","input-name":"email","input-required":!0,"input-type":"email","label-text":"Email"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),t._m(0)],1)]),t._v(" "),s("div",{staticClass:"flex justify-between mt-4"},[s("inertia-link",{staticClass:"\n                text-gray-300 text-sm tracking-wide\n                hover:text-theme-base-subtle-contrast\n            ",attrs:{href:t.$route("login")}},[t._v("\n            Login\n        ")]),t._v(" "),s("inertia-link",{staticClass:"\n                text-gray-300 text-sm tracking-wide\n                hover:text-theme-base-subtle-contrast\n            ",attrs:{href:t.$route("register")}},[t._v("\n            Register\n        ")])],1)])}),[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex flex-row items-center justify-between mt-4 py-6"},[s("button",{staticClass:"\n                        bg-theme-primary px-4 py-2 rounded shadow text-theme-primary-contrast\n                        focus:outline-none focus:ring focus:ring-primary\n                        hover:bg-theme-primary-hover hover:shadow-lg\n                        transition-all ease-in-out duration-300\n                    ",attrs:{type:"submit"}},[t._v("\n                    Send Password Reset Link\n                ")])])}],!1,null,null,null).exports}}]);