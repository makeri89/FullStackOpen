(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),u=n.n(a),l=n(13),c=n.n(l),o=n(2),r=function(e){var t=e.name,n=e.number;return u.a.createElement("div",null,t.name," ",n.number)},i=function(e){var t=e.persons,n=e.newSearch,a=e.onDelete,l=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return u.a.createElement("div",null,l.map((function(e){return u.a.createElement("span",{key:e.id},u.a.createElement(r,{name:e,number:e}),u.a.createElement("button",{type:"button",value:e.id,onClick:a},"delete"))})))},m=n(3),s=n.n(m),f="/api/persons",d=function(){return s.a.get(f)},b=function(e){return s.a.post(f,e)},p=function(e,t){return s.a.put("".concat(f,"/").concat(e),t)},v=function(e){window.confirm("Delete ".concat(e.name))&&s.a.delete("".concat(f,"/").concat(e.id))},h=function(e){var t=e.message;return null===t?null:u.a.createElement("div",{className:"info"},t)},E=function(e){var t=e.message;return null===t?null:u.a.createElement("div",{className:"error"},t)},g=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)(""),r=Object(o.a)(c,2),m=r[0],s=r[1],f=Object(a.useState)(""),g=Object(o.a)(f,2),w=g[0],O=g[1],j=Object(a.useState)(""),S=Object(o.a)(j,2),C=S[0],k=S[1],y=Object(a.useState)(null),D=Object(o.a)(y,2),T=D[0],L=D[1],x=Object(a.useState)(null),N=Object(o.a)(x,2),J=N[0],A=N[1];Object(a.useEffect)((function(){d().then((function(e){l(e.data)}))}),[]);return u.a.createElement("div",null,u.a.createElement("h1",null,"Phonebook"),u.a.createElement(h,{message:T}),u.a.createElement(E,{message:J}),"filter shown with",u.a.createElement("input",{type:"text",onChange:function(e){k(e.target.value)}}),u.a.createElement("h2",null,"add a new"),u.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={name:m,number:w},a=n.filter((function(e){return e.name.toLowerCase()===m.toLowerCase()}));if(a.length>0){var u=a[0].id;window.confirm("".concat(m," is already added to phonebook, replace old number with a new one?"))&&(console.log(u),p(u,t).then((function(e){l(n.map((function(t){return t.id!==e.data.id?t:e.data}))),console.log(e.data),s(""),O("")})),L("Updated ".concat(m)),setTimeout((function(){L(null)}),2e3))}else b(t).then((function(e){l(n.concat(e.data)),s(""),O("")})).catch((function(e){A("The minimum length for a name is 3 chracters and 8 for a phone number"),setTimeout((function(){A(null)}),3e3)})),null===J&&(L("Added ".concat(m)),setTimeout((function(){L(null)}),2e3))}},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:m,onChange:function(e){s(e.target.value)}})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:w,onChange:function(e){O(e.target.value)}})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))),u.a.createElement("h2",null,"Numbers"),u.a.createElement("div",null,u.a.createElement(i,{persons:n,newSearch:C,onDelete:function(e){e.preventDefault();var t=e.target.value,a=n.filter((function(e){return e.id==t}));console.log(a);var u=n.indexOf(a[0]);console.log(u),v(n[u]),l(n.filter((function(e){return e.id!==t}))),L("Removed ".concat(n[u].name)),setTimeout((function(){L(null)}),2e3)}})))};n(36);c.a.render(u.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.bf62b254.chunk.js.map