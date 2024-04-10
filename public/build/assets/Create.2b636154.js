import{I as m}from"./InputGroup.548575c6.js";import{T as p,S as d}from"./app.0bf483f2.js";import{C as g}from"./CheckboxGroup.d38283a5.js";import{D as _}from"./DateTimePickerGroup.f713b50e.js";import{S as f}from"./SectionItemsEditor.b76f411f.js";import{S as v}from"./SelectMultipleGroup.0eca543c.js";import{n as b}from"./LogoLight.eb2f8316.js";import"./vendor.21c2b6f5.js";import"./ConfirmationModal.41eb8e05.js";import"./checkbox-form-group.50e62bcf.js";import"./vuedraggable.umd.700457d3.js";const h={name:"AdminEDUProgrammeCreate",components:{SelectMultipleGroup:v,TextAreaGroup:p,SectionItemsEditor:f,InputGroup:m,CheckboxGroup:g,SelectGroup:d,DateTimePickerGroup:_},layout:"admin-layout",props:{currencies:{required:!0,type:Object|Array},courses:{required:!0,type:Object|Array}},data(){return{autoUpdateSlug:!0,formData:{name:"",summary:"",description:"",available_from:"",available_to:"",content_length_video:"",banner:"",primary_image:"",video_preview:"",price:"",discount_price:"",currency:"",languages:"",has_webinars:"",has_money_back_guarantee:"",has_certificate:"",has_captions:"",has_lifetime_access:"",has_student_discount:"",has_pdfs:"",has_free_seo_exposure:"",courses:[]}}},methods:{submit(){this.$inertia.post(this.$route("admin.edu.programmes.store"),this.formData)}}};var x=function(){var e=this,t=e._self._c;return t("form",{staticClass:"max-w-5xl mx-auto",attrs:{autocomplete:"off"},on:{submit:function(a){return a.preventDefault(),e.submit.apply(null,arguments)}}},[e.userCan("programmes.create")?t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Create Programme ")]),e.userCan("programmes.view")?t("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center mr-2",attrs:{href:e.$route("admin.edu.programmes.index")}},[t("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Back ")])],1):e._e(),t("button",{staticClass:"button button-default-responsive button-primary flex flex-row items-center",attrs:{type:"submit"}},[t("icon-save",{staticClass:"w-5 md:mr-2"}),t("span",{staticClass:"hidden md:inline"},[e._v(" Create ")])],1)],1):e._e(),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg"},[t("h2",[e._v("General details")]),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("name"),"input-autocomplete":"programme_name","input-id":"name","input-name":"name","input-required":!0,"input-type":"text","label-text":"Name"},on:{errorHidden:function(a){return e.clearPageErrorMessage("name")}},model:{value:e.formData.name,callback:function(a){e.$set(e.formData,"name",a)},expression:"formData.name"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("summary"),"input-autocomplete":"programme_summary","input-id":"summary","input-name":"summary","input-required":!0,"input-type":"text","label-text":"Summary"},on:{errorHidden:function(a){return e.clearPageErrorMessage("summary")}},model:{value:e.formData.summary,callback:function(a){e.$set(e.formData,"summary",a)},expression:"formData.summary"}}),t("text-area-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("description"),"input-id":"description","input-name":"description","input-rows":"2","input-type":"text","label-text":"Describe the programme"},on:{errorHidden:function(a){return e.clearPageErrorMessage("description")}},model:{value:e.formData.description,callback:function(a){e.$set(e.formData,"description",a)},expression:"formData.description"}})],1),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Availability details")]),t("div",{staticClass:"grid grid-cols-2 gap-2"},[t("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("available_from"),"input-id":"available_from","input-name":"available_from","label-text":"Available From"},on:{errorHidden:function(a){return e.clearPageErrorMessage("available_from")}},model:{value:e.formData.available_from,callback:function(a){e.$set(e.formData,"available_from",a)},expression:"formData.available_from"}}),t("date-time-picker-group",{staticClass:"mt-4 md:flex-1",attrs:{"error-message":e.getPageErrorMessage("available_to"),"input-id":"available_to","input-name":"available_to","label-text":"Available To"},on:{errorHidden:function(a){return e.clearPageErrorMessage("available_to")}},model:{value:e.formData.available_to,callback:function(a){e.$set(e.formData,"available_to",a)},expression:"formData.available_to"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Image & Video details")]),t("div",{staticClass:"grid grid-cols-2 gap-2"},[t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("content_length_video"),"input-autocomplete":"programme_content_length_video","input-id":"content_length_video","input-name":"content_length_video","input-required":!1,"input-type":"text","label-text":"Total content length in hours"},on:{errorHidden:function(a){return e.clearPageErrorMessage("content_length_video")}},model:{value:e.formData.content_length_video,callback:function(a){e.$set(e.formData,"content_length_video",a)},expression:"formData.content_length_video"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("banner"),"input-autocomplete":"programme_banner","input-id":"banner","input-name":"banner","input-required":!1,"input-type":"text","label-text":"Banner"},on:{errorHidden:function(a){return e.clearPageErrorMessage("banner")}},model:{value:e.formData.banner,callback:function(a){e.$set(e.formData,"banner",a)},expression:"formData.banner"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("primary_image"),"input-autocomplete":"primary_image","input-id":"primary_image","input-name":"primary_image","input-required":!1,"input-type":"text","label-text":"Primary Image"},on:{errorHidden:function(a){return e.clearPageErrorMessage("primary_image")}},model:{value:e.formData.primary_image,callback:function(a){e.$set(e.formData,"primary_image",a)},expression:"formData.primary_image"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("video_preview"),"input-autocomplete":"video_preview","input-id":"video_preview","input-name":"video_preview","input-required":!1,"input-type":"text","label-text":"Video Preview"},on:{errorHidden:function(a){return e.clearPageErrorMessage("video_preview")}},model:{value:e.formData.video_preview,callback:function(a){e.$set(e.formData,"video_preview",a)},expression:"formData.video_preview"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("languages"),"input-autocomplete":"languages","input-id":"languages","input-name":"languages","input-required":!1,"input-type":"text","label-text":"The language/s of the content"},on:{errorHidden:function(a){return e.clearPageErrorMessage("languages")}},model:{value:e.formData.languages,callback:function(a){e.$set(e.formData,"languages",a)},expression:"formData.languages"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Price details")]),t("div",{staticClass:"grid grid-cols-3 gap-3"},[t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("price"),"input-autocomplete":"price","input-id":"price","input-name":"price","input-required":!1,"input-type":"text","label-text":"Price"},on:{errorHidden:function(a){return e.clearPageErrorMessage("price")}},model:{value:e.formData.price,callback:function(a){e.$set(e.formData,"price",a)},expression:"formData.price"}}),t("input-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("discount_price"),"input-autocomplete":"discount_price","input-id":"discount_price","input-name":"discount_price","input-required":!1,"input-type":"text","label-text":"Discount Price"},on:{errorHidden:function(a){return e.clearPageErrorMessage("discount_price")}},model:{value:e.formData.discount_price,callback:function(a){e.$set(e.formData,"discount_price",a)},expression:"formData.discount_price"}}),t("select-group",{staticClass:"mt-4",attrs:{"label-hidden":!0,"label-text":"Currency","input-any-option-enabled":!0,"input-any-option-label":"Currency","input-class":"form-control form-control-short","input-id":"currency","input-name":"currency","input-option-label-key":"name","input-option-value-key":"id","input-options":e.currencies},model:{value:e.formData.currency,callback:function(a){e.$set(e.formData,"currency",a)},expression:"formData.currency"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Features Offered")]),t("div",{staticClass:"grid grid-cols-4 gap-4"},[t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_webinars"),"input-id":"has_webinars","input-name":"has_webinars","label-text":"Has Webinars?"},on:{errorHidden:function(a){return e.clearPageErrorMessage("has_webinars")}},model:{value:e.formData.has_webinars,callback:function(a){e.$set(e.formData,"has_webinars",a)},expression:"formData.has_webinars"}}),t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_money_back_guarantee"),"input-id":"has_money_back_guarantee","input-name":"has_money_back_guarantee","label-text":"Has Money Back Guarantee?"},on:{errorHidden:function(a){return e.clearPageErrorMessage("has_money_back_guarantee")}},model:{value:e.formData.has_money_back_guarantee,callback:function(a){e.$set(e.formData,"has_money_back_guarantee",a)},expression:"formData.has_money_back_guarantee"}}),t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_certificate"),"input-id":"has_certificate","input-name":"has_certificate","label-text":"Has Certificate?"},on:{errorHidden:function(a){return e.clearPageErrorMessage("has_certificate")}},model:{value:e.formData.has_certificate,callback:function(a){e.$set(e.formData,"has_certificate",a)},expression:"formData.has_certificate"}}),t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_captions"),"input-id":"has_captions","input-name":"has_captions","label-text":"Videos have captions?"},on:{errorHidden:function(a){return e.clearPageErrorMessage("has_captions")}},model:{value:e.formData.has_captions,callback:function(a){e.$set(e.formData,"has_captions",a)},expression:"formData.has_captions"}}),t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_lifetime_access"),"input-id":"has_lifetime_access","input-name":"has_lifetime_access","label-text":"Has Lifetime Access?"},on:{errorHidden:function(a){return e.clearPageErrorMessage("has_lifetime_access")}},model:{value:e.formData.has_lifetime_access,callback:function(a){e.$set(e.formData,"has_lifetime_access",a)},expression:"formData.has_lifetime_access"}}),t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_student_discount"),"input-id":"has_student_discount","input-name":"has_student_discount","label-text":"Has Student Discount?"},on:{errorHidden:function(a){return e.clearPageErrorMessage("has_student_discount")}},model:{value:e.formData.has_student_discount,callback:function(a){e.$set(e.formData,"has_student_discount",a)},expression:"formData.has_student_discount"}}),t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_pdfs"),"input-id":"has_pdfs","input-name":"has_pdfs","label-text":"Has PDFs?"},on:{errorHidden:function(a){return e.clearPageErrorMessage("has_pdfs")}},model:{value:e.formData.has_pdfs,callback:function(a){e.$set(e.formData,"has_pdfs",a)},expression:"formData.has_pdfs"}}),t("checkbox-group",{staticClass:"mt-4",attrs:{"error-message":e.getPageErrorMessage("has_free_seo_exposure"),"input-id":"has_free_seo_exposure","input-name":"has_free_seo_exposure","label-text":"Has Free SEO Exposure?"},on:{errorHidden:function(a){return e.clearPageErrorMessage("has_free_seo_exposure")}},model:{value:e.formData.has_free_seo_exposure,callback:function(a){e.$set(e.formData,"has_free_seo_exposure",a)},expression:"formData.has_free_seo_exposure"}})],1)]),t("div",{staticClass:"bg-white p-6 shadow-subtle rounded-lg mt-4"},[t("h2",[e._v("Courses")]),t("p",[e._v(" Please select the courses that you'd like to link to this programme. ")]),e.courses?t("div",{staticClass:"mt-4"},[t("div",{staticClass:"grid grid-cols-4 gap-4"},[t("p",[e._v("Courses selected: "+e._s(e.formData.courses.length))])]),e._l(e.courses,function(a,o,i){return t("div",{key:"course-p-"+i,staticClass:"grid grid-cols-2 gap-3 mt-2 mb-2"},[t("label",{staticClass:"no-style",attrs:{for:"course-label-"+i}},[t("span",[e._v(e._s(a))])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.courses,expression:"formData.courses"}],staticClass:"custom-checkbox",attrs:{id:"course-input-"+i,type:"checkbox",name:"courses[]"},domProps:{value:o,checked:Array.isArray(e.formData.courses)?e._i(e.formData.courses,o)>-1:e.formData.courses},on:{change:function(c){var r=e.formData.courses,n=c.target,l=!!n.checked;if(Array.isArray(r)){var u=o,s=e._i(r,u);n.checked?s<0&&e.$set(e.formData,"courses",r.concat([u])):s>-1&&e.$set(e.formData,"courses",r.slice(0,s).concat(r.slice(s+1)))}else e.$set(e.formData,"courses",l)}}})])})],2):t("div",[t("p",[e._v("No courses found.")])])])])},D=[],y=b(h,x,D,!1,null,null,null,null);const T=y.exports;export{T as default};
