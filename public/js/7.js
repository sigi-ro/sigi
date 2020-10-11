(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"4/2z":function(t,e,r){"use strict";r.r(e);var s={name:"AuthPasswordReset",components:{InputGroup:r("5qNN").a},layout:"auth-layout",props:{email:{default:"",type:String},token:{default:"",type:String}},data:function(){return{form:{email:"",password:"",password_confirmation:"",token:""}}},mounted:function(){this.form.email=this.email,this.form.token=this.token},methods:{submit:function(){this.$inertia.post(this.$route("password.update"),this.form)}}},n=r("KHd+"),i=Object(n.a)(s,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"auth-card-container"},[r("div",{staticClass:"auth-card"},[r("h1",{staticClass:"auth-header"},[t._v("\n            Password Reset\n        ")]),t._v(" "),r("form",{staticClass:"px-6",on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[r("input-group",{staticClass:"mt-4",attrs:{error_message:t.$page.errors.email?t.$page.errors.email[0]:"",input_autocomplete:"email",input_id:"email",input_name:"email",input_required:!0,input_type:"email",label_text:"Email"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),r("input-group",{staticClass:"mt-4",attrs:{error_message:t.$page.errors.password?t.$page.errors.password[0]:"",input_autocomplete:"new-password",input_autofocus:!0,input_id:"password",input_name:"password",input_required:!0,input_type:"password",label_text:"Password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),t._v(" "),r("input-group",{staticClass:"mt-4",attrs:{error_message:t.$page.errors.password_confirmation?t.$page.errors.password_confirmation[0]:"",input_autocomplete:"new-password",input_id:"password_confirmation",input_name:"password_confirmation",input_required:!0,input_type:"password",label_text:"Confirm Password"},model:{value:t.form.password_confirmation,callback:function(e){t.$set(t.form,"password_confirmation",e)},expression:"form.password_confirmation"}}),t._v(" "),t._m(0)],1)]),t._v(" "),r("div",{staticClass:"flex justify-between mt-4"},[r("inertia-link",{staticClass:"\n                text-gray-300 text-sm tracking-wide\n                hover:text-theme-base-subtle-contrast\n            ",attrs:{href:t.$route("login")}},[t._v("\n            Login\n        ")]),t._v(" "),r("inertia-link",{staticClass:"\n                text-gray-300 text-sm tracking-wide\n                hover:text-theme-base-subtle-contrast\n            ",attrs:{href:t.$route("register")}},[t._v("\n            Register\n        ")])],1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex flex-row items-center justify-between mt-4 py-6"},[e("button",{staticClass:"\n                        bg-theme-primary px-4 py-2 rounded shadow text-theme-primary-contrast\n                        focus:outline-none focus:shadow-outline-primary\n                        hover:bg-theme-primary-hover hover:shadow-lg\n                        transition-all ease-in-out duration-300\n                    ",attrs:{type:"submit"}},[this._v("\n                    Send Password Reset Link\n                ")])])}],!1,null,null,null);e.default=i.exports},"5qNN":function(t,e,r){"use strict";var s={name:"InputGroup",model:{prop:"input_value"},props:{allow_parent_updates:{default:!0,type:Boolean},error_class:{default:"mt-1 text-red-500 text-sm",type:String},error_hide_on_input:{default:!0,type:Boolean},error_message:{default:"",type:String},input_autocomplete:{default:"",type:String},input_autofocus:{default:!1,type:Boolean},input_class:{default:"font-medium rounded shadow mt-2 px-3 py-2 w-full focus:outline-none focus:shadow-outline-primary",type:String},input_disabled:{default:!1,type:Boolean},input_id:{required:!0,type:String},input_name:{required:!0,type:String},input_placeholder:{default:"",type:String},input_required:{default:!1,type:Boolean},input_type:{default:"text",type:String},input_value:{default:"",type:String},label_class:{default:"font-medium text-theme-base-contrast text-sm tracking-wider",type:String},label_text:{required:!0,type:String}},data:function(){return{hide_error:!1}},computed:{formatted_input_class:function(){return this.is_error?this.input_class+" error":this.input_class},is_error:function(){return!this.hide_error&&this.error_message&&""!==this.error_message}},mounted:function(){this.autofocus()},methods:{autofocus:function(){var t=this;this.input_autofocus&&this.$refs[this.input_id]&&this.$nextTick((function(){t.$refs[t.input_id].focus()}))},onErrorMessageChange:function(){this.hide_error=!1},onInputKeyPress:function(){this.$emit("input",this.$refs[this.input_id].value),this.error_hide_on_input&&(this.hide_error=!0)}},watch:{error_message:{handler:"onErrorMessageChange"}}},n=r("KHd+"),i=Object(n.a)(s,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex flex-col"},[r("label",{class:t.label_class,attrs:{for:t.input_id}},[t._v("\n        "+t._s(t.label_text)+"\n    ")]),t._v(" "),r("input",{ref:t.input_id,class:t.formatted_input_class,attrs:{id:t.input_id,autocomplete:t.input_autocomplete,disabled:t.input_disabled,name:t.input_name,placeholder:t.input_placeholder,required:t.input_required,type:t.input_type},domProps:{value:t.input_value},on:{input:t.onInputKeyPress}}),t._v(" "),r("div",[r("transition",{attrs:{name:"slide-down-fade"}},[t.is_error?r("p",{class:t.error_class},[t._v("\n                "+t._s(t.error_message)+"\n            ")]):t._e()])],1)])}),[],!1,null,null,null);e.a=i.exports}}]);