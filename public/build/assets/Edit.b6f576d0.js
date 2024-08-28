import{I as s}from"./InputGroup.392fed83.js";import{W as n,T as r,S as o}from"./app.053b0c35.js";import{C as i}from"./CheckboxGroup.93ed8500.js";import{n as l}from"./LogoLight.fa462175.js";import"./vendor.7c6c1ab8.js";import"./ConfirmationModal.91fad66a.js";import"./checkbox-form-group.99a615f1.js";const m={name:"AdminEduAnnouncementEdit",components:{WysiwygField:n,TextAreaGroup:r,InputGroup:s,CheckboxGroup:i,SelectGroup:o},layout:"admin-layout",props:{announcement:{type:Object,required:!0},statuses:{required:!0,type:Object|Array}},data(){return{formData:{}}},created(){this.formData={title:this.announcement.title,description:this.announcement.description,platform:this.announcement.platform,email:this.announcement.email,sms:this.announcement.sms,status:this.announcement.status}},methods:{submit(){this.$inertia.put(this.$route("admin.edu.announcements.update",this.announcement.id),this.formData)}}};var u=function(){var t=this,e=t._self._c;return e("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(a){return a.preventDefault(),t.submit.apply(null,arguments)}}},[t.userCan("announcements.edit")?e("div",{staticClass:"flex flex-row items-center mb-6"},[e("h1",{staticClass:"font-medium mr-auto text-lg"},[t._v(" Edit - "),e("b",[t._v(t._s(t.announcement.title))])]),t.userCan("announcements.view")?e("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:t.$route("admin.edu.announcements.index")}},[e("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Back ")])],1):t._e(),e("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[e("icon-save",{staticClass:"w-5 md:mr-2"}),e("span",{staticClass:"hidden md:inline"},[t._v(" Save ")])],1)],1):t._e(),e("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg"},[e("h2",[t._v("General details")]),e("input-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("title"),"input-autocomplete":"title_name","input-id":"title","input-name":"title","input-required":!0,"input-type":"text","label-text":"Title"},on:{errorHidden:function(a){return t.clearPageErrorMessage("title")}},model:{value:t.formData.title,callback:function(a){t.$set(t.formData,"title",a)},expression:"formData.title"}}),e("div",{staticClass:"mt-4"},[e("label",[t._v("Description")]),e("wysiwyg-field",{attrs:{"input-autofocus":!0},model:{value:t.formData.description,callback:function(a){t.$set(t.formData,"description",a)},expression:"formData.description"}})],1),e("select-group",{staticClass:"mt-4",attrs:{"label-hidden":!0,"label-text":"Status","input-any-option-enabled":!0,"input-any-option-label":"Status","input-class":"form-control form-control-short","input-id":"status","input-name":"status","input-option-label-key":"name","input-option-value-key":"id","input-options":t.statuses},model:{value:t.formData.status,callback:function(a){t.$set(t.formData,"status",a)},expression:"formData.status"}})],1),e("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[e("h2",[t._v("Communication Channels")]),e("div",{staticClass:"grid grid-cols-4 gap-4"},[e("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("platform"),"input-id":"platform","input-name":"platform","label-text":"Show to user on the platform?"},on:{errorHidden:function(a){return t.clearPageErrorMessage("platform")}},model:{value:t.formData.platform,callback:function(a){t.$set(t.formData,"platform",a)},expression:"formData.platform"}}),e("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("email"),"input-id":"email","input-name":"email","label-text":"Send to users via Email?"},on:{errorHidden:function(a){return t.clearPageErrorMessage("email")}},model:{value:t.formData.email,callback:function(a){t.$set(t.formData,"email",a)},expression:"formData.email"}}),e("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":t.getPageErrorMessage("sms"),"input-id":"sms","input-name":"sms","label-text":"Send to users via SMS?"},on:{errorHidden:function(a){return t.clearPageErrorMessage("sms")}},model:{value:t.formData.sms,callback:function(a){t.$set(t.formData,"sms",a)},expression:"formData.sms"}})],1)])])},c=[],p=l(m,u,c,!1,null,null,null,null);const _=p.exports;export{_ as default};
