import{I as r}from"./InputGroup.d82ecd1f.js";import{n as a}from"./LogoLight.eaabebeb.js";import"./vendor.21c2b6f5.js";const o={name:"StudentAuthPasswordReset",components:{InputGroup:r},layout:"auth-layout",props:{email:{default:"",type:String},token:{default:"",type:String}},data(){return{form:{email:"",password:"",password_confirmation:"",token:""}}},mounted(){this.form.email=this.email,this.form.token=this.token},methods:{submit(){this.$inertia.post(this.$route("student.password.update"),this.form)}}};var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"auth-card-container"},[e("div",{staticClass:"auth-card"},[e("h1",{staticClass:"auth-header"},[t._v(" "+t._s(t.__("messages.password-reset"))+" ")]),e("form",{staticClass:"px-6",on:{submit:function(s){return s.preventDefault(),t.submit.apply(null,arguments)}}},[e("input-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("email"),"input-autocomplete":"email","input-class":"auth-input","input-id":"email","input-name":"email","input-required":!0,"input-type":"email","label-text":t.__("messages.email")},on:{errorHidden:function(s){return t.clearPageErrorMessage("email")}},model:{value:t.form.email,callback:function(s){t.$set(t.form,"email",s)},expression:"form.email"}}),e("input-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("password"),"input-autocomplete":"new-password","input-autofocus":!0,"input-class":"auth-input","input-id":"password","input-name":"password","input-required":!0,"input-type":"password","label-text":t.__("messages.password")},on:{errorHidden:function(s){return t.clearPageErrorMessage("password")}},model:{value:t.form.password,callback:function(s){t.$set(t.form,"password",s)},expression:"form.password"}}),e("input-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("password_confirmation"),"input-autocomplete":"new-password","input-class":"auth-input","input-id":"password_confirmation","input-name":"password_confirmation","input-required":!0,"input-type":"password","label-text":t.__("messages.confirm-password")},on:{errorHidden:function(s){return t.clearPageErrorMessage("password_confirmation")}},model:{value:t.form.password_confirmation,callback:function(s){t.$set(t.form,"password_confirmation",s)},expression:"form.password_confirmation"}}),e("div",{staticClass:"flex flex-row items-center justify-between mt-4 py-6"},[e("button",{staticClass:"bg-theme-primary px-4 py-2 rounded shadow text-theme-primary-contrast focus:outline-none focus:ring focus:ring-primary hover:bg-theme-primary-hover hover:shadow-lg transition-all ease-in-out duration-300",attrs:{type:"submit"}},[t._v(" "+t._s(t.__("messages.password-reset"))+" ")])])],1)]),e("div",{staticClass:"flex justify-between mt-4"},[e("inertia-link",{staticClass:"text-gray-300 text-sm tracking-wide hover:text-theme-base-subtle-contrast",attrs:{href:t.$route("student.login")}},[t._v(" "+t._s(t.__("messages.login"))+" ")]),t.$routeCheck("student.register")?e("inertia-link",{staticClass:"text-gray-300 text-sm tracking-wide hover:text-theme-base-subtle-contrast",attrs:{href:t.$route("student.register")}},[t._v(" "+t._s(t.__("messages.register"))+" ")]):t._e()],1)])},i=[],u=a(o,n,i,!1,null,null,null,null);const c=u.exports;export{c as default};
