(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),l=t.n(a),o=t(13),u=t.n(o),c=t(2),r=function(e){var n=e.name,t=e.number;return l.a.createElement("div",null,n.name," ",t.number)},i=function(e){var n=e.persons,t=e.newSearch,a=e.onDelete,o=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return l.a.createElement("div",null,o.map((function(e){return l.a.createElement("span",{key:e.id},l.a.createElement(r,{name:e,number:e}),l.a.createElement("button",{type:"button",value:e.id,onClick:a},"delete"))})))},m=t(3),s=t.n(m),f="/api/persons",d=function(){return s.a.get(f)},b=function(e){return s.a.post(f,e)},v=function(e,n){return s.a.put("".concat(f,"/").concat(e),n)},p=function(e){window.confirm("Delete ".concat(e.name))&&s.a.delete("".concat(f,"/").concat(e.id))},h=function(e){var n=e.message;return null===n?null:l.a.createElement("div",{className:"info"},n)},E=function(e){var n=e.message;return null===n?null:l.a.createElement("div",{className:"error"},n)},g=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),r=Object(c.a)(u,2),m=r[0],s=r[1],f=Object(a.useState)(""),g=Object(c.a)(f,2),w=g[0],O=g[1],j=Object(a.useState)(""),S=Object(c.a)(j,2),C=S[0],k=S[1],y=Object(a.useState)(null),D=Object(c.a)(y,2),T=D[0],L=D[1],x=Object(a.useState)(null),N=Object(c.a)(x,2),J=N[0],A=N[1];Object(a.useEffect)((function(){d().then((function(e){o(e.data)}))}),[]);return l.a.createElement("div",null,l.a.createElement("h1",null,"Phonebook"),l.a.createElement(h,{message:T}),l.a.createElement(E,{message:J}),"filter shown with",l.a.createElement("input",{type:"text",onChange:function(e){k(e.target.value)}}),l.a.createElement("h2",null,"add a new"),l.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n={name:m,number:w},a=t.filter((function(e){return e.name.toLowerCase()===m.toLowerCase()}));if(a.length>0){var l=a[0].id;window.confirm("".concat(m," is already added to phonebook, replace old number with a new one?"))&&(console.log(l),v(l,n).then((function(e){o(t.map((function(n){return n.id!==e.data.id?n:e.data}))),console.log(e.data),s(""),O("")})),L("Updated ".concat(m)),setTimeout((function(){L(null)}),2e3))}else b(n).then((function(e){o(t.concat(e.data)),s(""),O("")})).catch((function(e){A("The minimum length for a name is 3 chracters and 8 for a phone number"),setTimeout((function(){A(null)}),3e3)})),null===J&&(L("Added ".concat(m)),setTimeout((function(){L(null)}),2e3))}},l.a.createElement("div",null,"name: ",l.a.createElement("input",{value:m,onChange:function(e){s(e.target.value)}})),l.a.createElement("div",null,"number: ",l.a.createElement("input",{value:w,onChange:function(e){O(e.target.value)}})),l.a.createElement("div",null,l.a.createElement("button",{type:"submit"},"add"))),l.a.createElement("h2",null,"Numbers"),l.a.createElement("div",null,l.a.createElement(i,{persons:t,newSearch:C,onDelete:function(e){e.preventDefault();var n=e.target.value;console.log(t),console.log(n);var a=t.filter((function(e){return e.id===n}));console.log(a);var l=t.indexOf(a[0]);console.log(l),p(t[l]),o(t.filter((function(e){return e.id!==n}))),L("Removed ".concat(t[l].name)),setTimeout((function(){L(null)}),2e3)}})))};t(36);u.a.render(l.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.0bf2ba90.chunk.js.map