import{_ as r,O as i}from"./vendor.21c2b6f5.js";import{C as n}from"./ConfirmationModal.242a99d0.js";import{I as l}from"./InputGroup.513e0dd4.js";import{n as o}from"./LogoLight.f7426689.js";const u={name:"AdminUserIndex",components:{ConfirmationModal:n,InputGroup:l},layout:"admin-layout",props:{searchOptions:Array|Object,users:Object},data(){return{editableSearchOptions:{per_page:15,user_first_name:"",user_last_name:"",user_email:""},isInitialised:!1,isLoadingUserDelete:!1,showDeleteModal:!1,userToDelete:null}},computed:{deleteModalText(){try{return"Do you really want to delete '"+this.userToDelete.name+"'?"}catch{return"Do you really want to delete this user?"}},show_users_actions(){return this.userCan("users.edit")||this.userCan("users.delete")},showPagination(){try{return this.users.pagination.last_page>1}catch{return!1}},usersData(){return!this.users||!this.users.data||this.users.data.length<1?!1:this.users.data}},mounted(){this.setSearchOptions(this.searchOptions)},methods:{cancelUserDelete(){this.isLoadingUserDelete||(this.showDeleteModal=!1,this.userToDelete=null)},checkUserDelete(a){this.showDeleteModal=!0,this.userToDelete=a},confirmUserDelete(){if(this.isLoadingUserDelete)return this.$errorToast("It's only possible to delete one user at a time.");this.$inertia.delete(this.$route("landlord.admin.users.destroy",this.userToDelete.id),{only:["flash","users"]}),this.userToDelete=null,this.showDeleteModal=!1},isUserCurrent(a){try{return a.id===this.$page.props.auth.user.id}catch{return!1}},onSearchOptionsUpdate:r.debounce(function(){!this.isInitialised&&(this.isInitialised=!0,this.usersData)||i.get(this.$route("landlord.admin.users.index"),this.editableSearchOptions,{only:["users"],preserveState:!0})},500),setSearchOptions(a={}){let e={per_page:15,user_first_name:"",user_last_name:"",user_email:""};try{r.forEach(a,(t,s)=>{e[s]=t})}catch(t){console.log(t)}this.editableSearchOptions=r.cloneDeep(e)}},watch:{editableSearchOptions:{deep:!0,handler:"onSearchOptionsUpdate"}}};var c=function(){var e=this,t=e._self._c;return t("section",[t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Users ")]),e.userCan("users.create")?t("inertia-link",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{href:e.$route("landlord.admin.users.create")}},[t("icon-plus",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create User ")])],1):e._e()],1),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("h1",{staticClass:"font-semibold px-6 text-gray-850"},[e._v(" Search "),t("button",{staticClass:"text-sm text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary hover:text-theme-primary",on:{click:e.setSearchOptions}},[e._v(" (Clear) ")])]),t("div",{staticClass:"flex flex-col items-center mt-4 px-6 space-y-4 md:flex-row md:space-y-0 md:space-x-8"},[t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"user_first_name_search","input-class":"form-control form-control-short","input-id":"user_first_name","input-name":"user_first_name","input-placeholder":"First Name","input-type":"text","label-hidden":!0,"label-text":"First Name"},model:{value:e.editableSearchOptions.user_first_name,callback:function(s){e.$set(e.editableSearchOptions,"user_first_name",s)},expression:"editableSearchOptions.user_first_name"}})],1),t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"user_last_name_search","input-class":"form-control form-control-short","input-id":"user_last_name","input-name":"user_last_name","input-placeholder":"Last Name","input-type":"text","label-hidden":!0,"label-text":"Last Name"},model:{value:e.editableSearchOptions.user_last_name,callback:function(s){e.$set(e.editableSearchOptions,"user_last_name",s)},expression:"editableSearchOptions.user_last_name"}})],1),t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"user_email_search","input-class":"form-control form-control-short","input-id":"user_email","input-name":"user_email","input-placeholder":"Email","input-type":"text","label-hidden":!0,"label-text":"Email"},model:{value:e.editableSearchOptions.user_email,callback:function(s){e.$set(e.editableSearchOptions,"user_email",s)},expression:"editableSearchOptions.user_email"}})],1)]),e.usersData?[t("div",{staticClass:"block mt-8 overflow-x-auto w-full"},[t("table",{staticClass:"table table-hover table-striped w-full"},[t("thead",[t("tr",[t("th",[e._v("Name")]),t("th",[e._v("Email")]),e.show_users_actions?t("th"):e._e()])]),t("tbody",e._l(e.usersData,function(s,h){return t("tr",{key:`user-${s.id}`},[t("td",[e._v(" "+e._s(s.name)+" ")]),t("td",[e._v(" "+e._s(s.email)+" ")]),e.show_users_actions?t("td",[t("div",{staticClass:"flex flex-row items-center justify-end -mx-1"},[e.userCan("users.edit")?t("inertia-link",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{href:e.$route("landlord.admin.users.edit",s.id),title:"Edit User"}},[t("icon-edit",{staticClass:"w-4"})],1):e._e(),e.userCan("users.delete")?t("button",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-danger hover:text-theme-danger-contrast",attrs:{disabled:e.isUserCurrent(s),title:"Delete User"},on:{click:function(p){return e.checkUserDelete(s)}}},[t("icon-trash",{staticClass:"w-4"})],1):e._e()],1)]):e._e()])}),0)])])]:t("p",{staticClass:"bg-theme-base-subtle mt-6 mx-6 px-6 py-4 rounded text-center text-theme-base-subtle-contrast"},[e._v(" No users ")]),e.showPagination?t("div",{staticClass:"flex flex-row justify-center mt-12 px-6"},[t("pagination",{attrs:{pagination:e.users.pagination}})],1):e._e(),t("confirmation-modal",{attrs:{"confirm-text":"Delete","confirm-type":"danger","show-modal":e.showDeleteModal,"message-text":e.deleteModalText},on:{cancelAction:e.cancelUserDelete,closeModal:e.cancelUserDelete,confirmAction:e.confirmUserDelete}})],2)])},d=[],m=o(u,c,d,!1,null,null,null,null);const w=m.exports;export{w as default};