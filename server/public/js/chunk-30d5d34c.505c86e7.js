(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30d5d34c"],{"4fb2":function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a("fb6a");function r(e,t,a){var r=e.slice((t-1)*a,t*a);return r}},"5f87":function(e,t,a){"use strict";a("ebfa")},afa8:function(e,t,a){"use strict";a("d3d2")},d3d2:function(e,t,a){},ebfa:function(e,t,a){},f2f4:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"memberArea"},[a("section",{staticClass:"form_container"},[a("el-table",{attrs:{type:"flex",justify:"center",align:"middle",data:e.tableData,"max-height":"450"}},[a("el-table-column",{attrs:{label:"建立日期",prop:"createdAt",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("i",{staticClass:"el-icon-time"}),a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(r.createdAt.slice(0,10)))])]}}])}),a("el-table-column",{attrs:{label:"姓名",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("p",[e._v(e._s(r.username))])]}}])}),a("el-table-column",{attrs:{label:"權限",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("p",[e._v(e._s(r.identity))])]}}])}),a("el-table-column",{attrs:{label:"Email",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("p",[e._v(e._s(r.email))])]}}])}),a("el-table-column",{attrs:{label:"Actions",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-button",{staticClass:"btn",attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.handleEdit(r)}}},[e._v("Edit ")]),a("DialogFound",{attrs:{dialog:e.dialog,form:e.form},on:{"update:updateData":e.getUsers}}),a("el-button",{staticClass:"btn",attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(r)}}},[e._v("Delete ")])]}}])})],1)],1),a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.pagination.total,pageSize:e.pagination.pageSize,currentPage:e.pagination.currentPage},on:{"current-change":e.handleCurrentChange}})],1)},n=[],i=(a("96cf"),a("1da1")),o=a("5530"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.dialog.show,"close-on-click-modal":!1,"close-on-press-escape":!1,"append-to-body":!0,width:"500px"},on:{"update:visible":function(t){return e.$set(e.dialog,"show",t)}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.form_rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"姓名",prop:"username","label-width":e.formLabelWidth,placeholder:"請輸入性名"}},[a("el-input",{model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"權限",prop:"identity","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"請選擇權限"},model:{value:e.form.identity,callback:function(t){e.$set(e.form,"identity",t)},expression:"form.identity"}},[a("el-option",{attrs:{label:"admin",value:"admin"}}),a("el-option",{attrs:{label:"editor",value:"editor"}}),a("el-option",{attrs:{label:"user",value:"user"}})],1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"Email",prop:"email","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"請輸入電子信箱",type:"email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"電話",prop:"phone","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"請輸入電話",type:"phone"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){return e.resetForm(e.form)}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submit("form")}}},[e._v("確定")])],1)],1)},l=[],c=a("bb46"),u={name:"memberDF",props:{dialog:{show:Boolean},form:{username:String,email:String,identity:String,phone:String}},data:function(){return{formLabelWidth:"80px",dialogWidth:"",form_rules:{username:[{required:!0,validator:c["validateName"],trigger:"blur"}],email:[{required:!0,validator:c["validateEmail"],trigger:"blur"}],phone:[{required:!0,validator:c["validatePhone"],trigger:"blur"}],identity:[{required:!0,validator:c["validateIdentity"],trigger:"change"}]}}},methods:{submit:function(e){var t=this;this.form.flag="dashBoard",this.$refs[e].validate((function(e){e&&t.$store.dispatch("member/updateMember",t.form).then((function(e){t.$swal.fire({icon:"success",title:"修改成功"}),t.$emit("update:updateData")})).catch((function(e){t.$swal.fire({icon:"error",title:e.data.message})}))})),this.dialog.show=!1},resetForm:function(){this.dialog.show=!1,this.$refs.form.resetFields()}}},m=u,d=(a("afa8"),a("2877")),f=Object(d["a"])(m,s,l,!1,null,"4b84308e",null),p=f.exports,b=a("4fb2"),g=a("2f62"),h={name:"Member",components:{DialogFound:p},data:function(){return{dialogFormVisible:!1,tableData:null,form:{username:"",identity:"",email:"",phone:""},dialog:{show:!1},filterIdentity:"",pagination:{total:0,pageSize:0,currentPage:1}}},created:function(){this.getUsers()},computed:Object(o["a"])({},Object(g["b"])(["user"])),methods:{getUsers:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("member/getMembers");case 2:if(!e.filterIdentity){t.next=11;break}return t.next=5,e.$store.commit("member/SET_FILTER_MEMBERS",e.filterIdentity);case 5:return t.next=7,e.$store.getters.filterMembers;case 7:e.tableData=t.sent,e.setPagination(),t.next=15;break;case 11:return t.next=13,e.$store.getters.members;case 13:e.tableData=t.sent,e.setPagination();case 15:case"end":return t.stop()}}),t)})))()},setPagination:function(){this.pagination.pageSize=5,this.pagination.total=this.tableData.length,this.tableData=Object(b["a"])(this.tableData,this.pagination.currentPage,this.pagination.pageSize)},handleCurrentChange:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.pagination.currentPage=e,!t.filterIdentity){a.next=9;break}return a.next=5,t.$store.getters.filterMembers;case 5:t.tableData=a.sent,t.tableData=Object(b["a"])(t.tableData,t.pagination.currentPage,t.pagination.pageSize),a.next=14;break;case 9:return a.next=12,t.$store.getters.members;case 12:t.tableData=a.sent,t.tableData=Object(b["a"])(t.tableData,t.pagination.currentPage,t.pagination.pageSize);case 14:case"end":return a.stop()}}),a)})))()},handleDelete:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$store.dispatch("member/deleteMember",e.id).then((function(e){t.$swal.fire({icon:"success",title:"刪除成功"}),t.getUsers(t.filterIdentity)})).catch((function(e){e.data&&t.$swal.fire({icon:"error",title:e.data.message||"連線有問題"})}));case 2:case"end":return a.stop()}}),a)})))()},handleEdit:function(e){this.dialog={show:!0},this.form={id:e.id,username:e.username,identity:e.identity,email:e.email,phone:e.phone}},handleFilterIdentity:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.filterIdentity=e,!e){a.next=12;break}return a.next=5,t.$store.commit("member/SET_FILTER_MEMBERS",e);case 5:return a.next=7,t.$store.getters.filterMembers;case 7:t.tableData=a.sent,t.pagination.currentPage=1,t.setPagination(),a.next=17;break;case 12:return a.next=15,t.$store.getters.members;case 15:t.tableData=a.sent,t.setPagination();case 17:case"end":return a.stop()}}),a)})))()},handleFilterEmail:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!e){a.next=11;break}return a.next=4,t.$store.commit("member/SET_FILTER_MEMBERS",e);case 4:return a.next=6,t.$store.getters.filterMembers;case 6:t.tableData=a.sent,t.pagination.currentPage=1,t.setPagination(),a.next=16;break;case 11:return a.next=14,t.$store.getters.members;case 14:t.tableData=a.sent,t.setPagination();case 16:case"end":return a.stop()}}),a)})))()}}},v=h,w=(a("5f87"),Object(d["a"])(v,r,n,!1,null,"58792b2a",null));t["default"]=w.exports}}]);
//# sourceMappingURL=chunk-30d5d34c.505c86e7.js.map