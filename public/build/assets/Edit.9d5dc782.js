import{I as r}from"./InputGroup.23900402.js";import{n}from"./LogoLight.dd39b68d.js";import"./vendor.d799578a.js";const s={name:"AdminProfileIndex",layout:"admin-layout",components:{InputGroup:r},props:{auth:Object,profile:Object},data(){return{formData:{email:null,first_name:null,last_name:null}}},mounted(){this.formData.email=this.profile.email,this.formData.first_name=this.profile.first_name,this.formData.last_name=this.profile.last_name},methods:{submit(){this.$inertia.put(this.$route("admin.profile.update"),this.formData)}}};var i=function(){var t=this,e=t._self._c;return e("form",{staticClass:"max-w-5xl mx-auto",on:{submit:function(a){return a.preventDefault(),t.submit.apply(null,arguments)}}},[e("div",{staticClass:"flex flex-row items-center mb-6"},[e("h1",{staticClass:"font-medium mr-auto text-lg"},[t._v(" Edit Profile ")]),t.userCan("profile.view")?e("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:t.$route("admin.profile.index")}},[e("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Back ")])],1):t._e(),e("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[e("icon-save",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Save Changes ")])],1)],1),e("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[e("div",{staticClass:"block px-6 w-full"},[e("input-group",{attrs:{"error-message":t.getPageErrorMessage("first_name"),"input-autocomplete":"first_name","input-autofocus":!0,"input-id":"first_name","input-name":"first_name","input-required":!0,"input-type":"text","label-text":"First Name"},on:{errorHidden:function(a){return t.clearPageErrorMessage("first_name")}},model:{value:t.formData.first_name,callback:function(a){t.$set(t.formData,"first_name",a)},expression:"formData.first_name"}}),e("input-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("last_name"),"input-autocomplete":"last_name","input-id":"last_name","input-name":"last_name","input-required":!0,"input-type":"text","label-text":"Last Name"},on:{errorHidden:function(a){return t.clearPageErrorMessage("last_name")}},model:{value:t.formData.last_name,callback:function(a){t.$set(t.formData,"last_name",a)},expression:"formData.last_name"}}),e("input-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("email"),"input-autocomplete":"new_email","input-id":"email","input-name":"email","input-required":!0,"input-type":"email","label-text":"Email"},on:{errorHidden:function(a){return t.clearPageErrorMessage("email")}},model:{value:t.formData.email,callback:function(a){t.$set(t.formData,"email",a)},expression:"formData.email"}})],1)])])},l=[],o=n(s,i,l,!1,null,null,null,null);const c=o.exports;export{c as default};
