import{_ as o}from"./vendor.21c2b6f5.js";import{n}from"./LogoLight.eaabebeb.js";const l={name:"AdminCrmFormSubmissionShow",layout:"admin-layout",props:{formSubmission:{required:!0,type:Object}},data(){return{marketingFields:{marketing_email:"Email",marketing_sms:"SMS",marketing_telephone:"Telephone"}}},computed:{enabledFormMarketingFields(){let e={};try{return o.forEach(this.marketingFields,(t,s)=>{this.formSubmission.form.hasOwnProperty(s)?e[s]=this.formSubmission.form[s]:e[s]=!1}),e}catch{return e}}},methods:{getFormSubmissionDataField(e,t="-"){try{return this.formSubmission.data[e]}catch{return t}},getFormSubmissionMarketingField(e){try{return Boolean(this.getFormSubmissionDataField(e,!1))?"Enabled":"Disabled"}catch{return"An error occurred."}}}};var m=function(){var t=this,s=t._self._c;return s("section",{staticClass:"max-w-5xl mx-auto"},[s("div",{staticClass:"flex flex-row items-center mb-6"},[s("h1",{staticClass:"font-medium mr-auto text-lg"},[t._v(" Form Submission ")]),s("inertia-link",{staticClass:"button button-default-responsive button-primary-subtle flex flex-row items-center",attrs:{href:t.$route("admin.crm.form-submissions.index")}},[s("icon-chevron-left",{staticClass:"w-5 md:mr-2"}),s("span",{staticClass:"hidden md:inline"},[t._v(" All Submissions ")])],1)],1),s("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[s("div",{staticClass:"block px-6 w-full"},[s("h2",{staticClass:"font-semibold"},[t._v(" Submission Details ")]),s("p",{staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" Form Name ")]),t._v(" "+t._s(t.formSubmission.form.name)+" ")]),s("p",{staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" Submitted At ")]),t._v(" "+t._s(t._f("humanFriendlyDateTime")(t.formSubmission.submitted_at))+" ")])])]),t.formSubmission.contact?s("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[s("div",{staticClass:"block px-6 w-full"},[s("h2",{staticClass:"font-semibold"},[t._v(" Contact Details "),t.userCan("crm_contacts.edit")?s("inertia-link",{staticClass:"text-sm text-theme-base-subtle-contrast",attrs:{href:t.$route("admin.crm.contacts.edit",t.formSubmission.contact_id)}},[t._v(" (View Contact) ")]):t._e()],1),s("p",{staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" Name ")]),t._v(" "+t._s(t.formSubmission.contact.name_with_title?t.formSubmission.contact.name_with_title:"-")+" ")]),s("p",{staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" Email ")]),t._v(" "+t._s(t.formSubmission.contact.email)+" ")])])]):t._e(),s("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[s("div",{staticClass:"block px-6 w-full"},[s("h2",{staticClass:"font-semibold"},[t._v(" Marketing Preference Data ")]),t._l(t.enabledFormMarketingFields,function(i,a){return s("p",{key:`marketing-field-${a}`,staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" "+t._s(t.marketingFields[a])+" ")]),i?[t._v(" "+t._s(t.getFormSubmissionMarketingField(a))+" ")]:[t._v(" The "+t._s(t.marketingFields[a])+" field is not tracked for this form. ")]],2)})],2)]),s("div",{staticClass:"bg-white mt-6 py-6 shadow-subtle rounded-lg"},[s("div",{staticClass:"block px-6 w-full"},[s("h2",{staticClass:"font-semibold"},[t._v(" Form Submission Data ")]),t._l(t.formSubmission.form.form_fields,function(i){return s("p",{key:`form-field-${i.slug}`,staticClass:"mt-2"},[s("span",{staticClass:"block font-semibold text-theme-base-subtle-contrast text-xs"},[t._v(" "+t._s(i.name)+" ")]),t._v(" "+t._s(t.getFormSubmissionDataField(i.slug))+" ")])})],2)])])},r=[],c=n(l,m,r,!1,null,null,null,null);const u=c.exports;export{u as default};