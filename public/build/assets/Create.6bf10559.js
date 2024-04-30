import{_ as i}from"./vendor.21c2b6f5.js";import{I as o}from"./InlineCheckboxGroup.03ba61c7.js";import{I as l}from"./InputGroup.548575c6.js";import{n as u}from"./LogoLight.eb2f8316.js";import"./checkbox-form-group.50e62bcf.js";const d={name:"AdminTenantCreate",components:{InlineCheckboxGroup:o,InputGroup:l},layout:"admin-layout",props:{modules:{required:!0,type:Object}},data(){return{enabledModules:{},formData:{id:"",modules:[]},isLoading:!1}},computed:{enabledModulesFormatted(){let n=[];return i.forEach(this.enabledModules,(t,e)=>{t&&n.push(e)}),n}},created(){i.forEach(this.modules,(n,t)=>{this.$set(this.enabledModules,t,!1)})},methods:{submit(){this.isLoading||(this.isLoading=!0,this.formData.modules=i.clone(this.enabledModulesFormatted),this.$inertia.post(this.$route("landlord.admin.tenants.store"),this.formData))}}};var m=function(){var t=this,e=t._self._c;return e("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(s){return s.preventDefault(),t.submit.apply(null,arguments)}}},[t.userCan("tenants.create")?e("div",{staticClass:"flex flex-row items-center mb-6"},[e("h1",{staticClass:"font-medium mr-auto text-lg"},[t._v(" Create Tenant ")]),t.userCan("tenants.view")?e("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:t.$route("landlord.admin.tenants.index")}},[e("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Back ")])],1):t._e(),e("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{disabled:t.isLoading,type:"submit"}},[t.isLoading?[e("icon-loader-circle",{staticClass:"animate-spin-slow w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Loading... this may take a while ")])]:[e("icon-save",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Create Tenant ")])]],2)],1):t._e(),e("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[e("div",{staticClass:"block px-6 w-full"},[e("input-group",{attrs:{"error-message":t.getPageErrorMessage("id"),"input-autocomplete":"id","input-autofocus":!0,"input-id":"id","input-name":"id","input-required":!0,"input-type":"text","label-text":"ID"},on:{errorHidden:function(s){return t.clearPageErrorMessage("id")}},model:{value:t.formData.id,callback:function(s){t.$set(t.formData,"id",s)},expression:"formData.id"}})],1)]),e("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[e("div",{staticClass:"block px-6 w-full"},[e("span",{staticClass:"font-medium text-theme-base-contrast tracking-wider"},[t._v(" Modules ")]),e("div",{staticClass:"mt-4 space-y-4"},t._l(t.enabledModules,function(s,a){return e("inline-checkbox-group",{key:`module-${a}`,attrs:{"input-id":`module-${a}`,"input-name":`module-${a}`,"label-text":t.modules[a],"input-value-true":!0,"input-value-false":!1},model:{value:t.enabledModules[a],callback:function(r){t.$set(t.enabledModules,a,r)},expression:"enabledModules[moduleKey]"}})}),1)])])])},c=[],p=u(d,m,c,!1,null,null,null,null);const x=p.exports;export{x as default};
