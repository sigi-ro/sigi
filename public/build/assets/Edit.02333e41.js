<<<<<<<< HEAD:public/build/assets/Edit.02333e41.js
import{_ as s,s as i}from"./vendor.7c6c1ab8.js";import{I as o}from"./InputGroup.392fed83.js";import{W as n,T as u,S as c}from"./app.40a6410b.js";import{C as l}from"./CheckboxGroup.93ed8500.js";import{D as m}from"./DateTimePickerGroup.99cf2454.js";import{S as p}from"./SectionItemsEditor.44271593.js";import{n as d}from"./LogoLight.fa462175.js";import"./ConfirmationModal.91fad66a.js";import"./checkbox-form-group.99a615f1.js";import"./vuedraggable.umd.d3f96d51.js";const g={name:"AdminEduCourseEdit",components:{WysiwygField:n,TextAreaGroup:u,SectionItemsEditor:p,InputGroup:o,CheckboxGroup:l,SelectGroup:c,DateTimePickerGroup:m},layout:"admin-layout",props:{course:{type:Object,required:!0},currencies:{required:!0,type:Object|Array},statuses:{required:!0,type:Object|Array}},data(){return{autoUpdateSlug:!1,formData:{}}},created(){this.transformSections(),this.formData={id:this.course.id,name:this.course.name,slug:this.course.slug,summary:this.course.summary,description:this.course.description,status:this.course.status,available_from:this.course.available_from,available_to:this.course.available_to,content_length_video:this.course.content_length_video,banner:this.course.banner,primary_image:this.course.primary_image,video_preview:this.course.video_preview,price:this.course.price,discount_price:this.course.discount_price,vat:this.course.vat,price_vat:this.course.price_vat,currency:this.course.currency,languages:this.course.languages,has_webinars:this.course.has_webinars,has_money_back_guarantee:this.course.has_money_back_guarantee,has_certificate:this.course.has_certificate,has_captions:this.course.has_captions,has_lifetime_access:this.course.has_lifetime_access,has_student_discount:this.course.has_student_discount,has_pdfs:this.course.has_pdfs,has_free_seo_exposure:this.course.has_free_seo_exposure,sections:this.course.sections,templateField:{type:"wysiwyg"}}},methods:{transformSections(){let r=this.course.sections;s.forEach(r,(e,a)=>{s.forEach(e.child_items,(t,v)=>{t.child_items=[]})}),this.course.sections=r},onNameInput(){!this.autoUpdateSlug||(this.formData.slug=this.slugify(this.formData.name),this.computedUrl=this.formData.slug)},onSlugBlur(){this.formData.slug=this.slugify(this.formData.slug)},onSlugInput(){this.autoUpdateSlug=!1,this.computedUrl=this.formData.slug},slugify(r){return!r||!r.length?"":i(r,{lower:!0})},submit(){this.$inertia.put(this.$route("admin.edu.courses.update",this.course.id),this.formData)}}};var f=function(){var e=this,a=e._self._c;return a("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[e.userCan("courses.edit")?a("div",{staticClass:"flex flex-row items-center mb-6 sticky-menu"},[a("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Edit - "),a("b",[e._v(e._s(e.course.name))])]),e.userCan("courses.view")?a("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.edu.courses.index")}},[a("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),a("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),e.userCan("course.view")?a("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.edu.courses.preview",e.course.id),target:"_blank"}},[a("icon-eye",{staticClass:"w-5 md:mr-2"}),a("span",{staticClass:"hidden md:inline"},[e._v(" Preview ")])],1):e._e(),a("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[a("icon-save",{staticClass:"w-5 md:mr-2"}),a("span",{staticClass:"hidden md:inline"},[e._v(" Save ")])],1)],1):e._e(),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg"},[a("h2",[e._v(" General details "),e.course.status==="PUBLISHED"?a("span",{staticClass:"bg-red-600 p-1 text-white"},[e._v(" "+e._s(e.course.status)+" ")]):e._e()]),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("name"),"input-autocomplete":"course_name","input-id":"name","input-name":"name","input-required":!0,"input-type":"text","label-text":"Name"},on:{errorHidden:function(t){return e.clearPageErrorMessage("name")},input:e.onNameInput},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("slug"),"input-autocomplete":"course_slug","input-id":"slug","input-name":"slug","input-required":!0,"input-type":"text","label-text":"Slug"},on:{blur:e.onSlugBlur,errorHidden:function(t){return e.clearPageErrorMessage("slug")},input:e.onSlugInput},model:{value:e.formData.slug,callback:function(t){e.$set(e.formData,"slug",t)},expression:"formData.slug"}}),e.course.status==="PUBLISHED"?a("select-group",{staticClass:"mt-4",attrs:{"label-hidden":!0,"label-text":"Status","input-any-option-enabled":!0,"input-any-option-label":"Status","input-class":"form-control form-control-short","input-id":"status","input-name":"status","input-option-label-key":"name","input-option-value-key":"id","input-options":e.statuses},model:{value:e.formData.status,callback:function(t){e.$set(e.formData,"status",t)},expression:"formData.status"}}):e._e(),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("summary"),"input-autocomplete":"course_summary","input-id":"summary","input-name":"summary","input-required":!1,"input-type":"text","label-text":"Summary"},on:{errorHidden:function(t){return e.clearPageErrorMessage("summary")}},model:{value:e.formData.summary,callback:function(t){e.$set(e.formData,"summary",t)},expression:"formData.summary"}}),a("div",{staticClass:"mt-4"},[a("label",[e._v("Description")]),a("wysiwyg-field",{attrs:{"input-autofocus":!0},model:{value:e.formData.description,callback:function(t){e.$set(e.formData,"description",t)},expression:"formData.description"}})],1)],1),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[a("h2",[e._v("Availability details")]),a("div",{staticClass:"grid grid-cols-2 gap-2"},[a("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("available_from"),"input-id":"available_from","input-name":"available_from","label-text":"Available From"},on:{errorHidden:function(t){return e.clearPageErrorMessage("available_from")}},model:{value:e.formData.available_from,callback:function(t){e.$set(e.formData,"available_from",t)},expression:"formData.available_from"}}),a("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("available_to"),"input-id":"available_to","input-name":"available_to","label-text":"Available To"},on:{errorHidden:function(t){return e.clearPageErrorMessage("available_to")}},model:{value:e.formData.available_to,callback:function(t){e.$set(e.formData,"available_to",t)},expression:"formData.available_to"}})],1)]),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[a("h2",[e._v("Image & Video details")]),a("div",{staticClass:"grid grid-cols-2 gap-2"},[a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("content_length_video"),"input-autocomplete":"course_content_length_video","input-id":"content_length_video","input-name":"content_length_video","input-required":!1,"input-type":"text","label-text":"Total content length in hours"},on:{errorHidden:function(t){return e.clearPageErrorMessage("content_length_video")}},model:{value:e.formData.content_length_video,callback:function(t){e.$set(e.formData,"content_length_video",t)},expression:"formData.content_length_video"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("banner"),"input-autocomplete":"banner","input-id":"banner","input-name":"banner","input-required":!1,"input-type":"text","label-text":"Banner"},on:{errorHidden:function(t){return e.clearPageErrorMessage("banner")}},model:{value:e.formData.banner,callback:function(t){e.$set(e.formData,"banner",t)},expression:"formData.banner"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("primary_image"),"input-autocomplete":"primary_image","input-id":"primary_image","input-name":"primary_image","input-required":!1,"input-type":"text","label-text":"Primary Image"},on:{errorHidden:function(t){return e.clearPageErrorMessage("primary_image")}},model:{value:e.formData.primary_image,callback:function(t){e.$set(e.formData,"primary_image",t)},expression:"formData.primary_image"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("video_preview"),"input-autocomplete":"video_preview","input-id":"video_preview","input-name":"video_preview","input-required":!1,"input-type":"text","label-text":"Video Preview"},on:{errorHidden:function(t){return e.clearPageErrorMessage("video_preview")}},model:{value:e.formData.video_preview,callback:function(t){e.$set(e.formData,"video_preview",t)},expression:"formData.video_preview"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("languages"),"input-autocomplete":"languages","input-id":"languages","input-name":"languages","input-required":!1,"input-type":"text","label-text":"The language/s of the content"},on:{errorHidden:function(t){return e.clearPageErrorMessage("languages")}},model:{value:e.formData.languages,callback:function(t){e.$set(e.formData,"languages",t)},expression:"formData.languages"}})],1)]),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[a("h2",[e._v("Price details")]),a("div",{staticClass:"grid grid-cols-3 gap-3"},[a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("price"),"input-autocomplete":"price","input-id":"price","input-name":"price","input-required":!1,"input-type":"text","label-text":"Price"},on:{errorHidden:function(t){return e.clearPageErrorMessage("price")}},model:{value:e.formData.price,callback:function(t){e.$set(e.formData,"price",t)},expression:"formData.price"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("discount_price"),"input-autocomplete":"discount_price","input-id":"discount_price","input-name":"discount_price","input-required":!1,"input-type":"text","label-text":"Discount Price"},on:{errorHidden:function(t){return e.clearPageErrorMessage("discount_price")}},model:{value:e.formData.discount_price,callback:function(t){e.$set(e.formData,"discount_price",t)},expression:"formData.discount_price"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("vat"),"input-autocomplete":"vat","input-id":"vat","input-name":"vat","input-required":!1,"input-type":"text","label-text":"VAT"},on:{errorHidden:function(t){return e.clearPageErrorMessage("vat")}},model:{value:e.formData.vat,callback:function(t){e.$set(e.formData,"vat",t)},expression:"formData.vat"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("price_vat"),"input-autocomplete":"price_vat","input-id":"price_vat","input-name":"price_vat","input-required":!1,"input-type":"text","label-text":"Price VAT"},on:{errorHidden:function(t){return e.clearPageErrorMessage("price_vat")}},model:{value:e.formData.price_vat,callback:function(t){e.$set(e.formData,"price_vat",t)},expression:"formData.price_vat"}}),a("select-group",{staticClass:"mt-4",attrs:{"label-text":"Currency","input-any-option-enabled":!0,"input-any-option-label":"Currency","input-class":"input-group-input","input-id":"currency","input-name":"currency","input-option-label-key":"name","input-option-value-key":"id","input-options":e.currencies},model:{value:e.formData.currency,callback:function(t){e.$set(e.formData,"currency",t)},expression:"formData.currency"}})],1)]),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[a("h2",[e._v("Features Offered")]),a("div",{staticClass:"grid grid-cols-4 gap-4"},[a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_webinars"),"input-id":"has_webinars","input-name":"has_webinars","label-text":"Has Webinars?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_webinars")}},model:{value:e.formData.has_webinars,callback:function(t){e.$set(e.formData,"has_webinars",t)},expression:"formData.has_webinars"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_money_back_guarantee"),"input-id":"has_money_back_guarantee","input-name":"has_money_back_guarantee","label-text":"Has Money Back Guarantee?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_money_back_guarantee")}},model:{value:e.formData.has_money_back_guarantee,callback:function(t){e.$set(e.formData,"has_money_back_guarantee",t)},expression:"formData.has_money_back_guarantee"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_certificate"),"input-id":"has_certificate","input-name":"has_certificate","label-text":"Has Certificate?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_certificate")}},model:{value:e.formData.has_certificate,callback:function(t){e.$set(e.formData,"has_certificate",t)},expression:"formData.has_certificate"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_captions"),"input-id":"has_captions","input-name":"has_captions","label-text":"Videos have captions?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_captions")}},model:{value:e.formData.has_captions,callback:function(t){e.$set(e.formData,"has_captions",t)},expression:"formData.has_captions"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_lifetime_access"),"input-id":"has_lifetime_access","input-name":"has_lifetime_access","label-text":"Has Lifetime Access?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_lifetime_access")}},model:{value:e.formData.has_lifetime_access,callback:function(t){e.$set(e.formData,"has_lifetime_access",t)},expression:"formData.has_lifetime_access"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_student_discount"),"input-id":"has_student_discount","input-name":"has_student_discount","label-text":"Has Student Discount?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_student_discount")}},model:{value:e.formData.has_student_discount,callback:function(t){e.$set(e.formData,"has_student_discount",t)},expression:"formData.has_student_discount"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_pdfs"),"input-id":"has_pdfs","input-name":"has_pdfs","label-text":"Has PDFs?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_pdfs")}},model:{value:e.formData.has_pdfs,callback:function(t){e.$set(e.formData,"has_pdfs",t)},expression:"formData.has_pdfs"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_free_seo_exposure"),"input-id":"has_free_seo_exposure","input-name":"has_free_seo_exposure","label-text":"Has Free SEO Exposure?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_free_seo_exposure")}},model:{value:e.formData.has_free_seo_exposure,callback:function(t){e.$set(e.formData,"has_free_seo_exposure",t)},expression:"formData.has_free_seo_exposure"}})],1)]),a("div",{staticClass:"bg-white mt-6 p-6 shadow-subtle rounded-lg"},[a("section-items-editor",{model:{value:e.formData.sections,callback:function(t){e.$set(e.formData,"sections",t)},expression:"formData.sections"}})],1)])},_=[],h=d(g,f,_,!1,null,null,null,null);const M=h.exports;export{M as default};
========
import{_ as s,s as i}from"./vendor.7c6c1ab8.js";import{I as o}from"./InputGroup.2066916f.js";import{W as n,T as u,S as c}from"./app.84f85cc2.js";import{C as l}from"./CheckboxGroup.41b255bb.js";import{D as m}from"./DateTimePickerGroup.6fcfa721.js";import{S as p}from"./SectionItemsEditor.e6e40ec6.js";import{n as d}from"./LogoLight.dcee77db.js";import"./ConfirmationModal.ab34ec58.js";import"./checkbox-form-group.50e62bcf.js";import"./vuedraggable.umd.d3f96d51.js";const g={name:"AdminEduCourseEdit",components:{WysiwygField:n,TextAreaGroup:u,SectionItemsEditor:p,InputGroup:o,CheckboxGroup:l,SelectGroup:c,DateTimePickerGroup:m},layout:"admin-layout",props:{course:{type:Object,required:!0},currencies:{required:!0,type:Object|Array},statuses:{required:!0,type:Object|Array}},data(){return{autoUpdateSlug:!1,formData:{}}},created(){this.transformSections(),this.formData={id:this.course.id,name:this.course.name,slug:this.course.slug,summary:this.course.summary,description:this.course.description,status:this.course.status,available_from:this.course.available_from,available_to:this.course.available_to,content_length_video:this.course.content_length_video,banner:this.course.banner,primary_image:this.course.primary_image,video_preview:this.course.video_preview,price:this.course.price,discount_price:this.course.discount_price,vat:this.course.vat,price_vat:this.course.price_vat,currency:this.course.currency,languages:this.course.languages,has_webinars:this.course.has_webinars,has_money_back_guarantee:this.course.has_money_back_guarantee,has_certificate:this.course.has_certificate,has_captions:this.course.has_captions,has_lifetime_access:this.course.has_lifetime_access,has_student_discount:this.course.has_student_discount,has_pdfs:this.course.has_pdfs,has_free_seo_exposure:this.course.has_free_seo_exposure,sections:this.course.sections,templateField:{type:"wysiwyg"}}},methods:{transformSections(){let r=this.course.sections;s.forEach(r,(e,a)=>{s.forEach(e.child_items,(t,v)=>{t.child_items=[]})}),this.course.sections=r},onNameInput(){!this.autoUpdateSlug||(this.formData.slug=this.slugify(this.formData.name),this.computedUrl=this.formData.slug)},onSlugBlur(){this.formData.slug=this.slugify(this.formData.slug)},onSlugInput(){this.autoUpdateSlug=!1,this.computedUrl=this.formData.slug},slugify(r){return!r||!r.length?"":i(r,{lower:!0})},submit(){this.$inertia.put(this.$route("admin.edu.courses.update",this.course.id),this.formData)}}};var f=function(){var e=this,a=e._self._c;return a("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[e.userCan("courses.edit")?a("div",{staticClass:"flex flex-row items-center mb-6 sticky-menu"},[a("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Edit - "),a("b",[e._v(e._s(e.course.name))])]),e.userCan("courses.view")?a("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.edu.courses.index")}},[a("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),a("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),e.userCan("course.view")?a("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.edu.courses.preview",e.course.id),target:"_blank"}},[a("icon-eye",{staticClass:"w-5 md:mr-2"}),a("span",{staticClass:"hidden md:inline"},[e._v(" Preview ")])],1):e._e(),a("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[a("icon-save",{staticClass:"w-5 md:mr-2"}),a("span",{staticClass:"hidden md:inline"},[e._v(" Save ")])],1)],1):e._e(),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg"},[a("h2",[e._v(" General details "),e.course.status==="PUBLISHED"?a("span",{staticClass:"bg-red-600 p-1 text-white"},[e._v(" "+e._s(e.course.status)+" ")]):e._e()]),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("name"),"input-autocomplete":"course_name","input-id":"name","input-name":"name","input-required":!0,"input-type":"text","label-text":"Name"},on:{errorHidden:function(t){return e.clearPageErrorMessage("name")},input:e.onNameInput},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("slug"),"input-autocomplete":"course_slug","input-id":"slug","input-name":"slug","input-required":!0,"input-type":"text","label-text":"Slug"},on:{blur:e.onSlugBlur,errorHidden:function(t){return e.clearPageErrorMessage("slug")},input:e.onSlugInput},model:{value:e.formData.slug,callback:function(t){e.$set(e.formData,"slug",t)},expression:"formData.slug"}}),e.course.status==="PUBLISHED"?a("select-group",{staticClass:"mt-4",attrs:{"label-hidden":!0,"label-text":"Status","input-any-option-enabled":!0,"input-any-option-label":"Status","input-class":"form-control form-control-short","input-id":"status","input-name":"status","input-option-label-key":"name","input-option-value-key":"id","input-options":e.statuses},model:{value:e.formData.status,callback:function(t){e.$set(e.formData,"status",t)},expression:"formData.status"}}):e._e(),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("summary"),"input-autocomplete":"course_summary","input-id":"summary","input-name":"summary","input-required":!1,"input-type":"text","label-text":"Summary"},on:{errorHidden:function(t){return e.clearPageErrorMessage("summary")}},model:{value:e.formData.summary,callback:function(t){e.$set(e.formData,"summary",t)},expression:"formData.summary"}}),a("div",{staticClass:"mt-4"},[a("label",[e._v("Description")]),a("wysiwyg-field",{attrs:{"input-autofocus":!0},model:{value:e.formData.description,callback:function(t){e.$set(e.formData,"description",t)},expression:"formData.description"}})],1)],1),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[a("h2",[e._v("Availability details")]),a("div",{staticClass:"grid grid-cols-2 gap-2"},[a("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("available_from"),"input-id":"available_from","input-name":"available_from","label-text":"Available From"},on:{errorHidden:function(t){return e.clearPageErrorMessage("available_from")}},model:{value:e.formData.available_from,callback:function(t){e.$set(e.formData,"available_from",t)},expression:"formData.available_from"}}),a("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("available_to"),"input-id":"available_to","input-name":"available_to","label-text":"Available To"},on:{errorHidden:function(t){return e.clearPageErrorMessage("available_to")}},model:{value:e.formData.available_to,callback:function(t){e.$set(e.formData,"available_to",t)},expression:"formData.available_to"}})],1)]),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[a("h2",[e._v("Image & Video details")]),a("div",{staticClass:"grid grid-cols-2 gap-2"},[a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("content_length_video"),"input-autocomplete":"course_content_length_video","input-id":"content_length_video","input-name":"content_length_video","input-required":!1,"input-type":"text","label-text":"Total content length in hours"},on:{errorHidden:function(t){return e.clearPageErrorMessage("content_length_video")}},model:{value:e.formData.content_length_video,callback:function(t){e.$set(e.formData,"content_length_video",t)},expression:"formData.content_length_video"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("banner"),"input-autocomplete":"banner","input-id":"banner","input-name":"banner","input-required":!1,"input-type":"text","label-text":"Banner"},on:{errorHidden:function(t){return e.clearPageErrorMessage("banner")}},model:{value:e.formData.banner,callback:function(t){e.$set(e.formData,"banner",t)},expression:"formData.banner"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("primary_image"),"input-autocomplete":"primary_image","input-id":"primary_image","input-name":"primary_image","input-required":!1,"input-type":"text","label-text":"Primary Image"},on:{errorHidden:function(t){return e.clearPageErrorMessage("primary_image")}},model:{value:e.formData.primary_image,callback:function(t){e.$set(e.formData,"primary_image",t)},expression:"formData.primary_image"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("video_preview"),"input-autocomplete":"video_preview","input-id":"video_preview","input-name":"video_preview","input-required":!1,"input-type":"text","label-text":"Video Preview"},on:{errorHidden:function(t){return e.clearPageErrorMessage("video_preview")}},model:{value:e.formData.video_preview,callback:function(t){e.$set(e.formData,"video_preview",t)},expression:"formData.video_preview"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("languages"),"input-autocomplete":"languages","input-id":"languages","input-name":"languages","input-required":!1,"input-type":"text","label-text":"The language/s of the content"},on:{errorHidden:function(t){return e.clearPageErrorMessage("languages")}},model:{value:e.formData.languages,callback:function(t){e.$set(e.formData,"languages",t)},expression:"formData.languages"}})],1)]),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[a("h2",[e._v("Price details")]),a("div",{staticClass:"grid grid-cols-3 gap-3"},[a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("price"),"input-autocomplete":"price","input-id":"price","input-name":"price","input-required":!1,"input-type":"text","label-text":"Price"},on:{errorHidden:function(t){return e.clearPageErrorMessage("price")}},model:{value:e.formData.price,callback:function(t){e.$set(e.formData,"price",t)},expression:"formData.price"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("discount_price"),"input-autocomplete":"discount_price","input-id":"discount_price","input-name":"discount_price","input-required":!1,"input-type":"text","label-text":"Discount Price"},on:{errorHidden:function(t){return e.clearPageErrorMessage("discount_price")}},model:{value:e.formData.discount_price,callback:function(t){e.$set(e.formData,"discount_price",t)},expression:"formData.discount_price"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("vat"),"input-autocomplete":"vat","input-id":"vat","input-name":"vat","input-required":!1,"input-type":"text","label-text":"VAT"},on:{errorHidden:function(t){return e.clearPageErrorMessage("vat")}},model:{value:e.formData.vat,callback:function(t){e.$set(e.formData,"vat",t)},expression:"formData.vat"}}),a("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("price_vat"),"input-autocomplete":"price_vat","input-id":"price_vat","input-name":"price_vat","input-required":!1,"input-type":"text","label-text":"Price VAT"},on:{errorHidden:function(t){return e.clearPageErrorMessage("price_vat")}},model:{value:e.formData.price_vat,callback:function(t){e.$set(e.formData,"price_vat",t)},expression:"formData.price_vat"}}),a("select-group",{staticClass:"mt-4",attrs:{"label-text":"Currency","input-any-option-enabled":!0,"input-any-option-label":"Currency","input-class":"input-group-input","input-id":"currency","input-name":"currency","input-option-label-key":"name","input-option-value-key":"id","input-options":e.currencies},model:{value:e.formData.currency,callback:function(t){e.$set(e.formData,"currency",t)},expression:"formData.currency"}})],1)]),a("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[a("h2",[e._v("Features Offered")]),a("div",{staticClass:"grid grid-cols-4 gap-4"},[a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_webinars"),"input-id":"has_webinars","input-name":"has_webinars","label-text":"Has Webinars?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_webinars")}},model:{value:e.formData.has_webinars,callback:function(t){e.$set(e.formData,"has_webinars",t)},expression:"formData.has_webinars"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_money_back_guarantee"),"input-id":"has_money_back_guarantee","input-name":"has_money_back_guarantee","label-text":"Has Money Back Guarantee?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_money_back_guarantee")}},model:{value:e.formData.has_money_back_guarantee,callback:function(t){e.$set(e.formData,"has_money_back_guarantee",t)},expression:"formData.has_money_back_guarantee"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_certificate"),"input-id":"has_certificate","input-name":"has_certificate","label-text":"Has Certificate?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_certificate")}},model:{value:e.formData.has_certificate,callback:function(t){e.$set(e.formData,"has_certificate",t)},expression:"formData.has_certificate"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_captions"),"input-id":"has_captions","input-name":"has_captions","label-text":"Videos have captions?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_captions")}},model:{value:e.formData.has_captions,callback:function(t){e.$set(e.formData,"has_captions",t)},expression:"formData.has_captions"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_lifetime_access"),"input-id":"has_lifetime_access","input-name":"has_lifetime_access","label-text":"Has Lifetime Access?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_lifetime_access")}},model:{value:e.formData.has_lifetime_access,callback:function(t){e.$set(e.formData,"has_lifetime_access",t)},expression:"formData.has_lifetime_access"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_student_discount"),"input-id":"has_student_discount","input-name":"has_student_discount","label-text":"Has Student Discount?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_student_discount")}},model:{value:e.formData.has_student_discount,callback:function(t){e.$set(e.formData,"has_student_discount",t)},expression:"formData.has_student_discount"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_pdfs"),"input-id":"has_pdfs","input-name":"has_pdfs","label-text":"Has PDFs?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_pdfs")}},model:{value:e.formData.has_pdfs,callback:function(t){e.$set(e.formData,"has_pdfs",t)},expression:"formData.has_pdfs"}}),a("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_free_seo_exposure"),"input-id":"has_free_seo_exposure","input-name":"has_free_seo_exposure","label-text":"Has Free SEO Exposure?"},on:{errorHidden:function(t){return e.clearPageErrorMessage("has_free_seo_exposure")}},model:{value:e.formData.has_free_seo_exposure,callback:function(t){e.$set(e.formData,"has_free_seo_exposure",t)},expression:"formData.has_free_seo_exposure"}})],1)]),a("div",{staticClass:"bg-white mt-6 p-6 shadow-subtle rounded-lg"},[a("section-items-editor",{model:{value:e.formData.sections,callback:function(t){e.$set(e.formData,"sections",t)},expression:"formData.sections"}})],1)])},_=[],h=d(g,f,_,!1,null,null,null,null);const M=h.exports;export{M as default};
>>>>>>>> master:public/build/assets/Edit.eb2cc6b8.js
