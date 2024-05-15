import{I as r}from"./InputGroup.d82ecd1f.js";import{n as i}from"./LogoLight.eaabebeb.js";import"./vendor.21c2b6f5.js";const n={name:"AuthPasswordEmail",components:{InputGroup:r},layout:"auth-layout",data(){return{form:{email:""}}},methods:{submit(){this.$inertia.post(this.$route("password.email"),this.form)}}};var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"auth-card-container"},[e("div",{staticClass:"auth-card"},[e("h1",{staticClass:"auth-header"},[t._v(" Password Reset ")]),t.$page.props.flash.status?e("p",{staticClass:"pb-8 px-6 text-center text-green-700"},[t._v(" "+t._s(t.$page.props.flash.status)+" ")]):e("form",{staticClass:"px-6",on:{submit:function(s){return s.preventDefault(),t.submit.apply(null,arguments)}}},[e("input-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("email"),"input-autocomplete":"email","input-class":"auth-input","input-id":"email","input-name":"email","input-required":!0,"input-type":"email","label-text":"Email"},on:{errorHidden:function(s){return t.clearPageErrorMessage("email")}},model:{value:t.form.email,callback:function(s){t.$set(t.form,"email",s)},expression:"form.email"}}),t._m(0)],1)]),e("div",{staticClass:"flex justify-between mt-4"},[e("inertia-link",{staticClass:"text-gray-300 text-sm tracking-wide hover:text-theme-base-subtle-contrast",attrs:{href:t.$route("login")}},[t._v(" Login ")]),t.$routeCheck("register")?e("inertia-link",{staticClass:"text-gray-300 text-sm tracking-wide hover:text-theme-base-subtle-contrast",attrs:{href:t.$route("register")}},[t._v(" Register ")]):t._e()],1)])},l=[function(){var a=this,t=a._self._c;return t("div",{staticClass:"flex flex-row items-center justify-between mt-4 py-6"},[t("button",{staticClass:"bg-theme-primary px-4 py-2 rounded shadow text-theme-primary-contrast focus:outline-none focus:ring focus:ring-primary hover:bg-theme-primary-hover hover:shadow-lg transition-all ease-in-out duration-300",attrs:{type:"submit"}},[a._v(" Send Password Reset Link ")])])}],u=i(n,o,l,!1,null,null,null,null);const f=u.exports;export{f as default};
