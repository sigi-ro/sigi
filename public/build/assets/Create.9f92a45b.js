<<<<<<<< HEAD:public/build/assets/Create.9f92a45b.js
import{I as i}from"./InputGroup.392fed83.js";import{W as o,T as n,S as u}from"./app.40a6410b.js";import{C as l}from"./CheckboxGroup.93ed8500.js";import{D as m}from"./DateTimePickerGroup.99cf2454.js";import{S as c}from"./SectionItemsEditor.44271593.js";import{_ as s}from"./vendor.7c6c1ab8.js";import{n as d}from"./LogoLight.fa462175.js";import"./ConfirmationModal.91fad66a.js";import"./checkbox-form-group.99a615f1.js";import"./vuedraggable.umd.d3f96d51.js";const p={name:"AdminEDUWebinarCreate",components:{WysiwygField:o,TextAreaGroup:n,SectionItemsEditor:c,InputGroup:i,CheckboxGroup:l,SelectGroup:u,DateTimePickerGroup:m},layout:"admin-layout",props:{courses:{required:!0,type:Object|Array}},data(){return{autoUpdateSlug:!0,formData:{name:"",summary:"",description:"",creator_id:"",course_id:"",section_id:"",status:"",date_time_from:"",date_time_to:"",webinar_url:"",can_users_reserve:"",is_recorded:"",recording_url:"",templateField:{type:"wysiwyg"}},sectionOptions:null}},computed:{courseOptions(){if(!this.courses.length)return;let a={};return s.forEach(this.courses,e=>{a[e.id]=e.name}),a}},methods:{submit(){this.$inertia.post(this.$route("admin.edu.webinars.store"),this.formData)},getSectionOptions(){if(!this.courses.length)return;let a={};s.forEach(this.courses,e=>{s.forEach(e.sections,t=>{t.course_id==this.formData.course_id&&(a[t.id]=t.title)})}),this.sectionOptions=a}},watch:{["formData.course_id"](a){a!==null&&this.getSectionOptions()}}};var f=function(){var e=this,t=e._self._c;return t("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(r){return r.preventDefault(),e.submit.apply(null,arguments)}}},[e.userCan("webinars.create")?t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Create ")]),e.userCan("webinar.view")?t("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.edu.webinars.index")}},[t("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),t("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[t("icon-save",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create ")])],1)],1):e._e(),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg"},[t("h2",[e._v(" Course and Section ")]),t("div",{staticClass:"grid grid-cols-2 gap-2"},[t("select-group",{staticClass:"mt-4 md:flex-1",attrs:{"label-hidden":!0,"label-text":"Course","input-any-option-enabled":!0,"input-any-option-label":"Course","input-class":"form-control form-control-short","input-id":"course","input-name":"course","input-option-label-key":"name","input-option-value-key":"id","input-options":e.courseOptions,"input-required":!0},model:{value:e.formData.course_id,callback:function(r){e.$set(e.formData,"course_id",r)},expression:"formData.course_id"}}),t("select-group",{staticClass:"mt-4 md:flex-1",attrs:{"label-hidden":!0,"label-text":"Section","input-any-option-enabled":!0,"input-any-option-label":"Section","input-class":"form-control form-control-short","input-id":"section","input-name":"section","input-option-label-key":"name","input-option-value-key":"id","input-options":e.sectionOptions},model:{value:e.formData.section_id,callback:function(r){e.$set(e.formData,"section_id",r)},expression:"formData.section_id"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v(" General details ")]),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("name"),"input-autocomplete":"webinar_name","input-id":"name","input-name":"name","input-required":!0,"input-type":"text","label-text":"Name"},on:{errorHidden:function(r){return e.clearPageErrorMessage("name")}},model:{value:e.formData.name,callback:function(r){e.$set(e.formData,"name",r)},expression:"formData.name"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("summary"),"input-autocomplete":"webinar_summary","input-id":"summary","input-name":"summary","input-required":!1,"input-type":"text","label-text":"Summary"},on:{errorHidden:function(r){return e.clearPageErrorMessage("summary")}},model:{value:e.formData.summary,callback:function(r){e.$set(e.formData,"summary",r)},expression:"formData.summary"}}),t("div",{staticClass:"mt-4"},[t("label",[e._v("Description")]),t("wysiwyg-field",{attrs:{"input-autofocus":!0},model:{value:e.formData.description,callback:function(r){e.$set(e.formData,"description",r)},expression:"formData.description"}})],1)],1),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Availability details")]),t("div",{staticClass:"grid grid-cols-2 gap-2"},[t("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("date_time_from"),"input-id":"date_time_from","input-name":"date_time_from","label-text":"Available From"},on:{errorHidden:function(r){return e.clearPageErrorMessage("date_time_from")}},model:{value:e.formData.date_time_from,callback:function(r){e.$set(e.formData,"date_time_from",r)},expression:"formData.date_time_from"}}),t("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("date_time_to"),"input-id":"date_time_to","input-name":"date_time_to","label-text":"Available To"},on:{errorHidden:function(r){return e.clearPageErrorMessage("date_time_to")}},model:{value:e.formData.date_time_to,callback:function(r){e.$set(e.formData,"date_time_to",r)},expression:"formData.date_time_to"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("More Details")]),t("div",{staticClass:"grid grid-cols-2 gap-2"},[t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("webinar_url"),"input-autocomplete":"webinar_url","input-id":"webinar_url","input-name":"webinar_url","input-required":!1,"input-type":"text","label-text":"Webinar URL"},on:{errorHidden:function(r){return e.clearPageErrorMessage("webinar_url")}},model:{value:e.formData.webinar_url,callback:function(r){e.$set(e.formData,"webinar_url",r)},expression:"formData.webinar_url"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("recording_url"),"input-autocomplete":"recording_url","input-id":"recording_url","input-name":"recording_url","input-required":!1,"input-type":"text","label-text":"Recording URL"},on:{errorHidden:function(r){return e.clearPageErrorMessage("recording_url")}},model:{value:e.formData.recording_url,callback:function(r){e.$set(e.formData,"recording_url",r)},expression:"formData.recording_url"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Features")]),t("div",{staticClass:"grid grid-cols-4 gap-4"},[t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("is_recorded"),"input-id":"is_recorded","input-name":"is_recorded","label-text":"Is Recorded?"},on:{errorHidden:function(r){return e.clearPageErrorMessage("is_recorded")}},model:{value:e.formData.is_recorded,callback:function(r){e.$set(e.formData,"is_recorded",r)},expression:"formData.is_recorded"}}),t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("can_users_reserve"),"input-id":"can_users_reserve","input-name":"can_users_reserve","label-text":"Can users reserve access in advance?"},on:{errorHidden:function(r){return e.clearPageErrorMessage("can_users_reserve")}},model:{value:e.formData.can_users_reserve,callback:function(r){e.$set(e.formData,"can_users_reserve",r)},expression:"formData.can_users_reserve"}})],1)])])},_=[],g=d(p,f,_,!1,null,null,null,null);const E=g.exports;export{E as default};
========
import{I as i}from"./InputGroup.2066916f.js";import{W as o,T as n,S as u}from"./app.84f85cc2.js";import{C as l}from"./CheckboxGroup.41b255bb.js";import{D as m}from"./DateTimePickerGroup.6fcfa721.js";import{S as c}from"./SectionItemsEditor.e6e40ec6.js";import{_ as s}from"./vendor.7c6c1ab8.js";import{n as d}from"./LogoLight.dcee77db.js";import"./ConfirmationModal.ab34ec58.js";import"./checkbox-form-group.50e62bcf.js";import"./vuedraggable.umd.d3f96d51.js";const p={name:"AdminEDUWebinarCreate",components:{WysiwygField:o,TextAreaGroup:n,SectionItemsEditor:c,InputGroup:i,CheckboxGroup:l,SelectGroup:u,DateTimePickerGroup:m},layout:"admin-layout",props:{courses:{required:!0,type:Object|Array}},data(){return{autoUpdateSlug:!0,formData:{name:"",summary:"",description:"",creator_id:"",course_id:"",section_id:"",status:"",date_time_from:"",date_time_to:"",webinar_url:"",can_users_reserve:"",is_recorded:"",recording_url:"",templateField:{type:"wysiwyg"}},sectionOptions:null}},computed:{courseOptions(){if(!this.courses.length)return;let a={};return s.forEach(this.courses,e=>{a[e.id]=e.name}),a}},methods:{submit(){this.$inertia.post(this.$route("admin.edu.webinars.store"),this.formData)},getSectionOptions(){if(!this.courses.length)return;let a={};s.forEach(this.courses,e=>{s.forEach(e.sections,t=>{t.course_id==this.formData.course_id&&(a[t.id]=t.title)})}),this.sectionOptions=a}},watch:{["formData.course_id"](a){a!==null&&this.getSectionOptions()}}};var f=function(){var e=this,t=e._self._c;return t("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(r){return r.preventDefault(),e.submit.apply(null,arguments)}}},[e.userCan("webinars.create")?t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Create ")]),e.userCan("webinar.view")?t("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.edu.webinars.index")}},[t("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),t("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[t("icon-save",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create ")])],1)],1):e._e(),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg"},[t("h2",[e._v(" Course and Section ")]),t("div",{staticClass:"grid grid-cols-2 gap-2"},[t("select-group",{staticClass:"mt-4 md:flex-1",attrs:{"label-hidden":!0,"label-text":"Course","input-any-option-enabled":!0,"input-any-option-label":"Course","input-class":"form-control form-control-short","input-id":"course","input-name":"course","input-option-label-key":"name","input-option-value-key":"id","input-options":e.courseOptions,"input-required":!0},model:{value:e.formData.course_id,callback:function(r){e.$set(e.formData,"course_id",r)},expression:"formData.course_id"}}),t("select-group",{staticClass:"mt-4 md:flex-1",attrs:{"label-hidden":!0,"label-text":"Section","input-any-option-enabled":!0,"input-any-option-label":"Section","input-class":"form-control form-control-short","input-id":"section","input-name":"section","input-option-label-key":"name","input-option-value-key":"id","input-options":e.sectionOptions},model:{value:e.formData.section_id,callback:function(r){e.$set(e.formData,"section_id",r)},expression:"formData.section_id"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v(" General details ")]),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("name"),"input-autocomplete":"webinar_name","input-id":"name","input-name":"name","input-required":!0,"input-type":"text","label-text":"Name"},on:{errorHidden:function(r){return e.clearPageErrorMessage("name")}},model:{value:e.formData.name,callback:function(r){e.$set(e.formData,"name",r)},expression:"formData.name"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("summary"),"input-autocomplete":"webinar_summary","input-id":"summary","input-name":"summary","input-required":!1,"input-type":"text","label-text":"Summary"},on:{errorHidden:function(r){return e.clearPageErrorMessage("summary")}},model:{value:e.formData.summary,callback:function(r){e.$set(e.formData,"summary",r)},expression:"formData.summary"}}),t("div",{staticClass:"mt-4"},[t("label",[e._v("Description")]),t("wysiwyg-field",{attrs:{"input-autofocus":!0},model:{value:e.formData.description,callback:function(r){e.$set(e.formData,"description",r)},expression:"formData.description"}})],1)],1),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Availability details")]),t("div",{staticClass:"grid grid-cols-2 gap-2"},[t("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("date_time_from"),"input-id":"date_time_from","input-name":"date_time_from","label-text":"Available From"},on:{errorHidden:function(r){return e.clearPageErrorMessage("date_time_from")}},model:{value:e.formData.date_time_from,callback:function(r){e.$set(e.formData,"date_time_from",r)},expression:"formData.date_time_from"}}),t("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("date_time_to"),"input-id":"date_time_to","input-name":"date_time_to","label-text":"Available To"},on:{errorHidden:function(r){return e.clearPageErrorMessage("date_time_to")}},model:{value:e.formData.date_time_to,callback:function(r){e.$set(e.formData,"date_time_to",r)},expression:"formData.date_time_to"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("More Details")]),t("div",{staticClass:"grid grid-cols-2 gap-2"},[t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("webinar_url"),"input-autocomplete":"webinar_url","input-id":"webinar_url","input-name":"webinar_url","input-required":!1,"input-type":"text","label-text":"Webinar URL"},on:{errorHidden:function(r){return e.clearPageErrorMessage("webinar_url")}},model:{value:e.formData.webinar_url,callback:function(r){e.$set(e.formData,"webinar_url",r)},expression:"formData.webinar_url"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("recording_url"),"input-autocomplete":"recording_url","input-id":"recording_url","input-name":"recording_url","input-required":!1,"input-type":"text","label-text":"Recording URL"},on:{errorHidden:function(r){return e.clearPageErrorMessage("recording_url")}},model:{value:e.formData.recording_url,callback:function(r){e.$set(e.formData,"recording_url",r)},expression:"formData.recording_url"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Features")]),t("div",{staticClass:"grid grid-cols-4 gap-4"},[t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("is_recorded"),"input-id":"is_recorded","input-name":"is_recorded","label-text":"Is Recorded?"},on:{errorHidden:function(r){return e.clearPageErrorMessage("is_recorded")}},model:{value:e.formData.is_recorded,callback:function(r){e.$set(e.formData,"is_recorded",r)},expression:"formData.is_recorded"}}),t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("can_users_reserve"),"input-id":"can_users_reserve","input-name":"can_users_reserve","label-text":"Can users reserve access in advance?"},on:{errorHidden:function(r){return e.clearPageErrorMessage("can_users_reserve")}},model:{value:e.formData.can_users_reserve,callback:function(r){e.$set(e.formData,"can_users_reserve",r)},expression:"formData.can_users_reserve"}})],1)])])},_=[],g=d(p,f,_,!1,null,null,null,null);const E=g.exports;export{E as default};
>>>>>>>> master:public/build/assets/Create.0a3126bc.js
