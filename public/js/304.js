"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[304],{5966:(e,t,a)=>{a.d(t,{H:()=>s});var s={props:{inputValue:{default:!1,type:String|Number|Boolean},inputValueFalse:{default:!1,type:String|Number|Boolean},inputValueTrue:{default:!0,type:String|Number|Boolean}},data:function(){return{editableValue:!1}},computed:{isChecked:function(){return this.editableValue===this.inputValueTrue}},mounted:function(){this.editableValue=this.inputValue,this.autofocus()},methods:{onInput:function(){this.$emit("input",this.isChecked?this.inputValueTrue:this.inputValueFalse),this.errorHideOnInput&&(this.hideError=!0)}}}},3809:(e,t,a)=>{a.d(t,{Z:()=>l});var s=a(3601),r=a(5966),i=a(7489);const n={name:"InlineCheckboxGroup",mixins:[s.S,r.H],components:{FormFieldError:i.Z},props:{inputClass:{default:"cursor-pointer form-checkbox h-5 mr-2 rounded text-theme-primary w-5 focus:border-theme-primary focus:outline-none focus:ring focus:ring-primary",type:String},labelClass:{default:"cursor-pointer flex-1 font-medium select-none text-theme-base-contrast text-sm tracking-wider",type:String}}};const l=(0,a(1900).Z)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex flex-col"},[t("div",{staticClass:"flex flex-row"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.editableValue,expression:"editableValue"}],ref:e.inputId,class:e.formattedInputClass,attrs:{id:e.inputId,disabled:e.inputDisabled,"false-value":e.inputValueFalse,name:e.inputName,required:e.inputRequired,"true-value":e.inputValueTrue,type:"checkbox"},domProps:{checked:Array.isArray(e.editableValue)?e._i(e.editableValue,null)>-1:e._q(e.editableValue,e.inputValueTrue)},on:{change:[function(t){var a=e.editableValue,s=t.target,r=s.checked?e.inputValueTrue:e.inputValueFalse;if(Array.isArray(a)){var i=e._i(a,null);s.checked?i<0&&(e.editableValue=a.concat([null])):i>-1&&(e.editableValue=a.slice(0,i).concat(a.slice(i+1)))}else e.editableValue=r},e.onInput],keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.blurInput.apply(null,arguments)}}}),e._v(" "),t("label",{class:e.labelClass,attrs:{for:e.inputId}},[t("span",{staticClass:"flex flex-row items-baseline"},[t("span",[e._v(e._s(e.labelText))]),e._v(" "),e.inputRequired?t("sup",{staticClass:"text-theme-danger-contrast"},[e._v("\n                    *\n                ")]):e._e()])])]),e._v(" "),t("form-field-error",{attrs:{"error-class":e.errorClass,"error-message":e.errorMessage,"is-error":e.isError}})],1)}),[],!1,null,null,null).exports},9304:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var s=a(6486),r=a.n(s),i=a(3809),n=a(8825);const l={name:"AdminUserEdit",components:{InlineCheckboxGroup:i.Z,InputGroup:n.Z},layout:"admin-layout",props:{selectableRoles:{required:!0,type:Object},user:{required:!0,type:Object}},data:function(){return{formData:null}},computed:{isCurrentUser:function(){try{return this.user.id===this.$page.props.auth.user.id}catch(e){return!1}},isSelectableRoles:function(){try{return Object.keys(this.selectableRoles).length>0}catch(e){return!1}}},created:function(){this.formData={email:this.user.email,first_name:this.user.first_name,last_name:this.user.last_name,roles:this.user.roles},Array.isArray(this.formData.roles)&&(this.formData.roles={}),this.initialiseRoles()},methods:{initialiseRoles:function(){var e=this;r().forEach(this.selectableRoles,(function(t,a){e.formData.roles.hasOwnProperty(a)||(e.formData.roles[a]=!1)}))},submit:function(){this.$inertia.put(this.$route("admin.users.update",this.user.id),this.formData)}}};const u=(0,a(1900).Z)(l,(function(){var e=this,t=e._self._c;return t("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[e.userCan("users.edit")?t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v("\n            Edit User\n            "),t("span",{staticClass:"ml-2 opacity-75 text-sm"},[e._v("\n                "+e._s(e.user.name)+"\n            ")])]),e._v(" "),e.userCan("users.view")?t("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.users.index")}},[t("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),e._v(" "),t("span",{staticClass:"hidden md:inline"},[e._v("\n                Back\n            ")])],1):e._e(),e._v(" "),t("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[t("icon-save",{staticClass:"w-5 md:mr-2"}),e._v(" "),t("span",{staticClass:"hidden md:inline"},[e._v("\n                Save Changes\n            ")])],1)],1):e._e(),e._v(" "),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("input-group",{attrs:{"error-message":e.getPageErrorMessage("first_name"),"input-autocomplete":"off","input-autofocus":!0,"input-id":"first_name","input-name":"first_name","input-required":!0,"input-type":"text","label-text":"First Name"},on:{errorHidden:function(t){return e.clearPageErrorMessage("first_name")}},model:{value:e.formData.first_name,callback:function(t){e.$set(e.formData,"first_name",t)},expression:"formData.first_name"}}),e._v(" "),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("last_name"),"input-autocomplete":"off","input-id":"last_name","input-name":"last_name","input-required":!0,"input-type":"text","label-text":"Last Name"},on:{errorHidden:function(t){return e.clearPageErrorMessage("last_name")}},model:{value:e.formData.last_name,callback:function(t){e.$set(e.formData,"last_name",t)},expression:"formData.last_name"}}),e._v(" "),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("email"),"input-autocomplete":"off","input-id":"email","input-name":"email","input-required":!0,"input-type":"email","label-text":"Email"},on:{errorHidden:function(t){return e.clearPageErrorMessage("email")}},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email",t)},expression:"formData.email"}})],1)]),e._v(" "),e.isSelectableRoles?t("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[t("div",{staticClass:"block px-6 w-full"},[t("p",{staticClass:"font-medium mb-4 text-theme-base-contrast tracking-wider"},[e._v("\n                Roles\n            ")]),e._v(" "),t("div",{staticClass:"space-y-3"},e._l(e.selectableRoles,(function(a,s){return t("inline-checkbox-group",{key:"user-role-".concat(s),attrs:{"input-id":"user-role-".concat(s),"input-name":"user-role-".concat(s),"label-text":a},model:{value:e.formData.roles[s],callback:function(t){e.$set(e.formData.roles,s,t)},expression:"formData.roles[role_key]"}})})),1)])]):e._e()])}),[],!1,null,null,null).exports}}]);