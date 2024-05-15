import{_ as o,O as s}from"./vendor.21c2b6f5.js";import{C as c}from"./ConfirmationModal.caf623a6.js";import{I as i}from"./InputGroup.d82ecd1f.js";import{n as l}from"./LogoLight.eaabebeb.js";const r={name:"AdminCrmContactIndex",components:{ConfirmationModal:c,InputGroup:i},layout:"admin-layout",props:{searchOptions:{required:!0,type:Array|Object},contacts:{required:!0,type:Object}},data(){return{editableSearchOptions:{contact_email:"",contact_first_name:"",contact_last_name:"",contact_telephone:"",per_page:15},isInitialised:!1,isLoadingDelete:!1,showDeleteModal:!1,contactToDelete:null}},computed:{contactsData(){return!this.contacts||!this.contacts.data||this.contacts.data.length<1?!1:this.contacts.data},deleteModalText(){try{return"Do you really want to delete '"+this.contactToDelete.name_with_title+"'?"}catch{return"Do you really want to delete this contact?"}},showContactsActions(){return this.userCan("crm_contacts.edit")||this.userCan("crm_contacts.delete")},showPagination(){try{return this.contacts.pagination.last_page>1}catch{return!1}}},mounted(){this.setSearchOptions(this.searchOptions)},methods:{cancelDelete(){this.isLoadingDelete||(this.showDeleteModal=!1,this.contactToDelete=null)},checkDelete(n){this.showDeleteModal=!0,this.contactToDelete=n},confirmDelete(){if(this.isLoadingDelete)return this.$errorToast("It's only possible to delete one contact at a time.");this.$inertia.delete(this.$route("admin.crm.contacts.destroy",this.contactToDelete.id),{only:["flash","contacts"]}),this.contactToDelete=null,this.showDeleteModal=!1},onSearchOptionsUpdate:o.debounce(function(){!this.isInitialised&&(this.isInitialised=!0,this.contactsData)||s.get(this.$route("admin.crm.contacts.index"),this.editableSearchOptions,{only:["contacts"],preserveState:!0})},500),setSearchOptions(n={}){let t={contact_email:"",contact_first_name:"",contact_last_name:"",contact_telephone:"",per_page:15};try{o.forEach(n,(e,a)=>{t[a]=e})}catch(e){console.log(e)}this.editableSearchOptions=o.cloneDeep(t)}},watch:{editableSearchOptions:{deep:!0,handler:"onSearchOptionsUpdate"}}};var m=function(){var t=this,e=t._self._c;return e("section",[e("div",{staticClass:"flex flex-row items-center mb-6"},[e("h1",{staticClass:"font-medium mr-auto text-lg"},[t._v(" Contacts ")]),t.userCan("crm_contacts.create")?e("inertia-link",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{href:t.$route("admin.crm.contacts.create")}},[e("icon-plus",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Create Contact ")])],1):t._e()],1),e("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[e("h1",{staticClass:"font-semibold px-6 text-gray-850"},[t._v(" Search "),e("button",{staticClass:"text-sm text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary hover:text-theme-primary",on:{click:t.setSearchOptions}},[t._v(" (Clear) ")])]),e("div",{staticClass:"flex flex-col items-center mt-4 px-6 space-y-4 md:flex-row md:space-y-0 md:space-x-8"},[e("div",{staticClass:"w-full md:w-1/4"},[e("input-group",{attrs:{"input-autocomplete":"contact_first_name_search","input-class":"form-control form-control-short","input-id":"contact_first_name","input-name":"contact_first_name","input-placeholder":"First Name","input-type":"text","label-hidden":!0,"label-text":"First Name"},model:{value:t.editableSearchOptions.contact_first_name,callback:function(a){t.$set(t.editableSearchOptions,"contact_first_name",a)},expression:"editableSearchOptions.contact_first_name"}})],1),e("div",{staticClass:"w-full md:w-1/4"},[e("input-group",{attrs:{"input-autocomplete":"contact_last_name_search","input-class":"form-control form-control-short","input-id":"contact_last_name","input-name":"contact_last_name","input-placeholder":"Last Name","input-type":"text","label-hidden":!0,"label-text":"Last Name"},model:{value:t.editableSearchOptions.contact_last_name,callback:function(a){t.$set(t.editableSearchOptions,"contact_last_name",a)},expression:"editableSearchOptions.contact_last_name"}})],1),e("div",{staticClass:"w-full md:w-1/4"},[e("input-group",{attrs:{"input-autocomplete":"contact_email_search","input-class":"form-control form-control-short","input-id":"contact_email","input-name":"contact_email","input-placeholder":"Email","input-type":"text","label-hidden":!0,"label-text":"Email"},model:{value:t.editableSearchOptions.contact_email,callback:function(a){t.$set(t.editableSearchOptions,"contact_email",a)},expression:"editableSearchOptions.contact_email"}})],1),e("div",{staticClass:"w-full md:w-1/4"},[e("input-group",{attrs:{"input-autocomplete":"contact_telephone_search","input-class":"form-control form-control-short","input-id":"contact_telephone","input-name":"contact_telephone","input-placeholder":"Telephone","input-type":"text","label-hidden":!0,"label-text":"Telephone"},model:{value:t.editableSearchOptions.contact_telephone,callback:function(a){t.$set(t.editableSearchOptions,"contact_telephone",a)},expression:"editableSearchOptions.contact_telephone"}})],1)]),t.contactsData?[e("div",{staticClass:"block mt-8 overflow-x-auto w-full"},[e("table",{staticClass:"table table-hover table-striped w-full"},[e("thead",[e("tr",[e("th",[t._v("Name")]),e("th",[t._v("Email")]),e("th",[t._v("Telephone")]),t.showContactsActions?e("th"):t._e()])]),e("tbody",t._l(t.contactsData,function(a,h){return e("tr",{key:`contact-${a.id}`},[e("td",[t._v(" "+t._s(a.name_with_title)+" ")]),e("td",[t._v(" "+t._s(a.email)+" ")]),e("td",[t._v(" "+t._s(a.telephone)+" ")]),t.showContactsActions?e("td",[e("div",{staticClass:"flex flex-row items-center justify-end -mx-1"},[t.userCan("crm_contacts.edit")?e("inertia-link",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{href:t.$route("admin.crm.contacts.edit",a.id),title:"Edit Contact"}},[e("icon-edit",{staticClass:"w-4"})],1):t._e(),t.userCan("crm_contacts.delete")?e("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-danger hover:text-theme-danger-contrast",attrs:{title:"Delete Contact"},on:{click:function(u){return t.checkDelete(a)}}},[e("icon-trash",{staticClass:"w-4"})],1):t._e()],1)]):t._e()])}),0)])])]:e("p",{staticClass:"bg-theme-base-subtle mt-6 mx-6 px-6 py-4 rounded text-center text-theme-base-subtle-contrast"},[t._v(" No contacts ")]),t.showPagination?e("div",{staticClass:"flex flex-row justify-center mt-12 px-6"},[e("pagination",{attrs:{pagination:t.contacts.pagination}})],1):t._e(),e("confirmation-modal",{attrs:{"confirm-text":"Delete","confirm-type":"danger","show-modal":t.showDeleteModal,"message-text":t.deleteModalText},on:{cancelAction:t.cancelDelete,closeModal:t.cancelDelete,confirmAction:t.confirmDelete}})],2)])},d=[],p=l(r,m,d,!1,null,null,null,null);const w=p.exports;export{w as default};
