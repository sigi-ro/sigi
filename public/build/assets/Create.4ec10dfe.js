import"./vendor.c4aed689.js";import{I as n}from"./InlineCheckboxGroup.a177775d.js";import{I as s}from"./InputGroup.a0b1f6ab.js";import{n as i}from"./LogoLight.682f8f67.js";import"./checkbox-form-group.99a615f1.js";const r={name:"AdminTenantCreate",components:{InlineCheckboxGroup:n,InputGroup:s},layout:"admin-layout",data(){return{formData:{id:""},isLoading:!1}},methods:{submit(){this.isLoading||(this.isLoading=!0,this.$inertia.post(this.$route("landlord.admin.tenants.store"),this.formData))}}};var o=function(){var t=this,e=t._self._c;return e("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(a){return a.preventDefault(),t.submit.apply(null,arguments)}}},[t.userCan("tenants.create")?e("div",{staticClass:"flex flex-row items-center mb-6"},[e("h1",{staticClass:"font-medium mr-auto text-lg"},[t._v(" Create Tenant ")]),t.userCan("tenants.view")?e("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:t.$route("landlord.admin.tenants.index")}},[e("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Back ")])],1):t._e(),e("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{disabled:t.isLoading,type:"submit"}},[t.isLoading?[e("icon-loader-circle",{staticClass:"animate-spin-slow w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Loading... this may take a while ")])]:[e("icon-save",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Create Tenant ")])]],2)],1):t._e(),e("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[e("div",{staticClass:"block px-6 w-full"},[e("input-group",{attrs:{"error-message":t.getPageErrorMessage("id"),"input-autocomplete":"id","input-autofocus":!0,"input-id":"id","input-name":"id","input-required":!0,"input-type":"text","label-text":"ID"},on:{errorHidden:function(a){return t.clearPageErrorMessage("id")}},model:{value:t.formData.id,callback:function(a){t.$set(t.formData,"id",a)},expression:"formData.id"}})],1)])])},l=[],u=i(r,o,l,!1,null,null,null,null);const b=u.exports;export{b as default};