<<<<<<<< HEAD:public/build/assets/Index.b5115532.js
import{_ as r,O as i}from"./vendor.7c6c1ab8.js";import{C as o}from"./ConfirmationModal.91fad66a.js";import{S as n}from"./app.40a6410b.js";import{I as l}from"./InputGroup.392fed83.js";import{aB as c,aC as u,n as p}from"./LogoLight.fa462175.js";const d={name:"AdminEDUCoursePurchaseIndex",components:{IconCheck:c,IconSave:u,ConfirmationModal:o,InputGroup:l,SelectGroup:n},layout:"admin-layout",props:{purchases:{required:!0,type:Object},searchOptions:{required:!0,type:Object|Array},statuses:{required:!0,type:Object},types:{required:!0,type:Object}},data(){return{editableSearchOptions:{course_purchase_course_id:"",course_purchase_email_address:"",course_purchase_status:"",course_purchase_type:"",course_purchase_user_id:"",per_page:25},isInitialised:!1}},mounted(){this.setSearchOptions(this.searchOptions)},computed:{showPagination(){try{return this.purchases.pagination.last_page>1}catch{return!1}},showActions(){return this.userCan("edu_course_purchases.show")},purchaseData(){return!this.purchases||!this.purchases.data||this.purchases.data.length<1?!1:this.purchases.data}},methods:{onSearchOptionsUpdate:r.debounce(function(){!this.isInitialised&&(this.isInitialised=!0,this.purchaseData)||i.get(this.$route("admin.edu.course-purchases.index"),this.editableSearchOptions,{only:["purchases"],preserveState:!0})},500),setSearchOptions(a={}){let e={email_address:"",per_page:15};try{r.forEach(a,(t,s)=>{e[s]=t})}catch(t){console.log(t)}this.editableSearchOptions=r.cloneDeep(e)}},watch:{editableSearchOptions:{deep:!0,handler:"onSearchOptionsUpdate"}}};var h=function(){var e=this,t=e._self._c;return t("section",[t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Purchases ("+e._s(e.purchases.data.length)+") ")])]),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("h1",{staticClass:"font-semibold px-6 text-gray-850"},[e._v(" Search "),t("button",{staticClass:"text-sm text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary hover:text-theme-primary",on:{click:e.setSearchOptions}},[e._v(" (Clear) ")])]),t("div",{staticClass:"flex flex-col items-center mt-4 px-6 space-y-4 md:flex-row md:space-y-0 md:space-x-8"},[t("div",{staticClass:"w-full md:w-1/6"},[t("select-group",{attrs:{"label-hidden":!0,"label-text":"Status","input-any-option-enabled":!0,"input-any-option-label":"Status (All)","input-class":"form-control form-control-short","input-id":"status","input-name":"status","input-option-label-key":"name","input-option-value-key":"id","input-options":e.statuses},model:{value:e.editableSearchOptions.course_purchase_status,callback:function(s){e.$set(e.editableSearchOptions,"course_purchase_status",s)},expression:"editableSearchOptions.course_purchase_status"}})],1),t("div",{staticClass:"w-full md:w-1/6"},[t("select-group",{attrs:{"label-hidden":!0,"label-text":"Type","input-any-option-enabled":!0,"input-any-option-label":"Types (All)","input-class":"form-control form-control-short","input-id":"type","input-name":"type","input-option-label-key":"name","input-option-value-key":"id","input-options":e.types},model:{value:e.editableSearchOptions.course_purchase_type,callback:function(s){e.$set(e.editableSearchOptions,"course_purchase_type",s)},expression:"editableSearchOptions.course_purchase_type"}})],1),t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"email_address_search","input-class":"form-control form-control-short","input-id":"email_address","input-name":"email_address","input-placeholder":"Email Address","input-type":"text","label-hidden":!0,"label-text":"Email Address"},model:{value:e.editableSearchOptions.course_purchase_email_address,callback:function(s){e.$set(e.editableSearchOptions,"course_purchase_email_address",s)},expression:"editableSearchOptions.course_purchase_email_address"}})],1)]),e.purchaseData?[t("div",{staticClass:"block mt-8 overflow-x-auto w-full"},[t("table",{staticClass:"table table-hover table-striped w-full"},[t("thead",[t("tr",[t("th",[e._v("Date")]),t("th",[e._v("Course")]),t("th",[e._v("Email")]),t("th",[e._v("Status")]),t("th",[e._v("Type")]),t("th",[e._v("Price Due")]),t("th",[e._v("Price Paid")]),t("th",[e._v("Refundable")]),e.showActions?t("th"):e._e()])]),t("tbody",e._l(e.purchaseData,function(s){return t("tr",{key:`purchase-${s.id}`},[t("td",[e._v(" "+e._s(e._f("humanFriendlyDateTime")(s.created_at))+" ")]),t("td",[e._v(" "+e._s(s.course.name)+" ")]),t("td",[e._v(" "+e._s(s.email_address)+" ")]),t("td",[e._v(" "+e._s(e.statuses.hasOwnProperty(s.status)?e.statuses[s.status]:s.status)+" ")]),t("td",[e._v(" "+e._s(e.types.hasOwnProperty(s.type)?e.types[s.type]:s.type)+" ")]),t("td",[e._v(" "+e._s(e._f("currencySymbol")(s.currency))+" "+e._s(e._f("priceDecimal")(s.total_price_due))+" ")]),t("td",[e._v(" "+e._s(e._f("currencySymbol")(s.currency))+" "+e._s(e._f("priceDecimal")(s.total_price_paid))+" ")]),t("td",[t(s.is_refundable?"icon-check":"icon-close",{tag:"component",staticClass:"w-4"})],1),e.showActions?t("td",[t("div",{staticClass:"flex flex-row items-center justify-end -mx-1"},[e.userCan("edu_course_purchases.show")?t("inertia-link",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{href:e.$route("admin.edu.course-purchases.show",s.id),title:"View"}},[t("icon-eye",{staticClass:"w-4"})],1):e._e()],1)]):e._e()])}),0)])]),e.showPagination?t("div",{staticClass:"flex flex-row justify-center mt-12 px-6"},[t("pagination",{attrs:{pagination:e.purchases.pagination}})],1):e._e()]:t("p",{staticClass:"bg-theme-base-subtle mt-8 mx-6 px-6 py-4 rounded text-center text-theme-base-subtle-contrast"},[e._v(" No results ")])],2)])},_=[],m=p(d,h,_,!1,null,null,null,null);const w=m.exports;export{w as default};
========
import{_ as r,O as i}from"./vendor.7c6c1ab8.js";import{C as o}from"./ConfirmationModal.ab34ec58.js";import{S as n}from"./app.84f85cc2.js";import{I as l}from"./InputGroup.2066916f.js";import{aB as c,aC as u,n as p}from"./LogoLight.dcee77db.js";const d={name:"AdminEDUCoursePurchaseIndex",components:{IconCheck:c,IconSave:u,ConfirmationModal:o,InputGroup:l,SelectGroup:n},layout:"admin-layout",props:{purchases:{required:!0,type:Object},searchOptions:{required:!0,type:Object|Array},statuses:{required:!0,type:Object},types:{required:!0,type:Object}},data(){return{editableSearchOptions:{course_purchase_course_id:"",course_purchase_email_address:"",course_purchase_status:"",course_purchase_type:"",course_purchase_user_id:"",per_page:25},isInitialised:!1}},mounted(){this.setSearchOptions(this.searchOptions)},computed:{showPagination(){try{return this.purchases.pagination.last_page>1}catch{return!1}},showActions(){return this.userCan("edu_course_purchases.show")},purchaseData(){return!this.purchases||!this.purchases.data||this.purchases.data.length<1?!1:this.purchases.data}},methods:{onSearchOptionsUpdate:r.debounce(function(){!this.isInitialised&&(this.isInitialised=!0,this.purchaseData)||i.get(this.$route("admin.edu.course-purchases.index"),this.editableSearchOptions,{only:["purchases"],preserveState:!0})},500),setSearchOptions(a={}){let e={email_address:"",per_page:15};try{r.forEach(a,(t,s)=>{e[s]=t})}catch(t){console.log(t)}this.editableSearchOptions=r.cloneDeep(e)}},watch:{editableSearchOptions:{deep:!0,handler:"onSearchOptionsUpdate"}}};var h=function(){var e=this,t=e._self._c;return t("section",[t("div",{staticClass:"flex flex-row items-center mb-6"},[t("h1",{staticClass:"font-medium mr-auto text-lg"},[e._v(" Purchases ("+e._s(e.purchases.data.length)+") ")])]),t("div",{staticClass:"bg-white py-6 shadow-subtle rounded-lg"},[t("h1",{staticClass:"font-semibold px-6 text-gray-850"},[e._v(" Search "),t("button",{staticClass:"text-sm text-theme-base-subtle-contrast focus:outline-none focus:text-theme-primary hover:text-theme-primary",on:{click:e.setSearchOptions}},[e._v(" (Clear) ")])]),t("div",{staticClass:"flex flex-col items-center mt-4 px-6 space-y-4 md:flex-row md:space-y-0 md:space-x-8"},[t("div",{staticClass:"w-full md:w-1/6"},[t("select-group",{attrs:{"label-hidden":!0,"label-text":"Status","input-any-option-enabled":!0,"input-any-option-label":"Status (All)","input-class":"form-control form-control-short","input-id":"status","input-name":"status","input-option-label-key":"name","input-option-value-key":"id","input-options":e.statuses},model:{value:e.editableSearchOptions.course_purchase_status,callback:function(s){e.$set(e.editableSearchOptions,"course_purchase_status",s)},expression:"editableSearchOptions.course_purchase_status"}})],1),t("div",{staticClass:"w-full md:w-1/6"},[t("select-group",{attrs:{"label-hidden":!0,"label-text":"Type","input-any-option-enabled":!0,"input-any-option-label":"Types (All)","input-class":"form-control form-control-short","input-id":"type","input-name":"type","input-option-label-key":"name","input-option-value-key":"id","input-options":e.types},model:{value:e.editableSearchOptions.course_purchase_type,callback:function(s){e.$set(e.editableSearchOptions,"course_purchase_type",s)},expression:"editableSearchOptions.course_purchase_type"}})],1),t("div",{staticClass:"w-full md:w-1/3"},[t("input-group",{attrs:{"input-autocomplete":"email_address_search","input-class":"form-control form-control-short","input-id":"email_address","input-name":"email_address","input-placeholder":"Email Address","input-type":"text","label-hidden":!0,"label-text":"Email Address"},model:{value:e.editableSearchOptions.course_purchase_email_address,callback:function(s){e.$set(e.editableSearchOptions,"course_purchase_email_address",s)},expression:"editableSearchOptions.course_purchase_email_address"}})],1)]),e.purchaseData?[t("div",{staticClass:"block mt-8 overflow-x-auto w-full"},[t("table",{staticClass:"table table-hover table-striped w-full"},[t("thead",[t("tr",[t("th",[e._v("Date")]),t("th",[e._v("Course")]),t("th",[e._v("Email")]),t("th",[e._v("Status")]),t("th",[e._v("Type")]),t("th",[e._v("Price Due")]),t("th",[e._v("Price Paid")]),t("th",[e._v("Refundable")]),e.showActions?t("th"):e._e()])]),t("tbody",e._l(e.purchaseData,function(s){return t("tr",{key:`purchase-${s.id}`},[t("td",[e._v(" "+e._s(e._f("humanFriendlyDateTime")(s.created_at))+" ")]),t("td",[e._v(" "+e._s(s.course.name)+" ")]),t("td",[e._v(" "+e._s(s.email_address)+" ")]),t("td",[e._v(" "+e._s(e.statuses.hasOwnProperty(s.status)?e.statuses[s.status]:s.status)+" ")]),t("td",[e._v(" "+e._s(e.types.hasOwnProperty(s.type)?e.types[s.type]:s.type)+" ")]),t("td",[e._v(" "+e._s(e._f("currencySymbol")(s.currency))+" "+e._s(e._f("priceDecimal")(s.total_price_due))+" ")]),t("td",[e._v(" "+e._s(e._f("currencySymbol")(s.currency))+" "+e._s(e._f("priceDecimal")(s.total_price_paid))+" ")]),t("td",[t(s.is_refundable?"icon-check":"icon-close",{tag:"component",staticClass:"w-4"})],1),e.showActions?t("td",[t("div",{staticClass:"flex flex-row items-center justify-end -mx-1"},[e.userCan("edu_course_purchases.show")?t("inertia-link",{staticClass:"flex flex-row items-center inline-flex mx-1 px-2 py-1 rounded text-theme-base-subtle-contrast text-sm tracking-wide focus:outline-none focus:ring hover:bg-theme-info hover:text-theme-info-contrast",attrs:{href:e.$route("admin.edu.course-purchases.show",s.id),title:"View"}},[t("icon-eye",{staticClass:"w-4"})],1):e._e()],1)]):e._e()])}),0)])]),e.showPagination?t("div",{staticClass:"flex flex-row justify-center mt-12 px-6"},[t("pagination",{attrs:{pagination:e.purchases.pagination}})],1):e._e()]:t("p",{staticClass:"bg-theme-base-subtle mt-8 mx-6 px-6 py-4 rounded text-center text-theme-base-subtle-contrast"},[e._v(" No results ")])],2)])},_=[],m=p(d,h,_,!1,null,null,null,null);const w=m.exports;export{w as default};
>>>>>>>> master:public/build/assets/Index.c45d390e.js
