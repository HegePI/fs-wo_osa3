(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(11),l=t.n(u),c=t(2),m=function(e){var n=e.name,t=e.number;return r.a.createElement("div",null,r.a.createElement("p",{key:n},n,": ",t))},o=function(e){var n=e.persons.map(function(e){return r.a.createElement(m,{name:e.name,number:e.number,key:e.name})});return r.a.createElement("div",null,r.a.createElement("h2",null,"Numerot"),n)},i=t(3),s=t.n(i),f=function(){return s.a.get("/api/persons").then(function(e){return e.data})},p=function(e){return s.a.post("/api/persons",e).then(function(e){return e.data})},E=function(e){var n=e.name,t=e.sname,a=e.number,u=e.snumber,l=e.persons,c=e.spersons,m=e.nameHandler,o=e.numberHandler,i=function(e){e.preventDefault(),p({name:n,number:a}).then(function(e){c(l.concat(e)),t(""),u("")})};return r.a.createElement("div",null,r.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=!1;l.forEach(function(e){n===e.name&&(a=!0)}),a?(window.alert("".concat(n," on jo listassa")),t(""),u("")):i(e)}},r.a.createElement("div",null,"Nimi: ",r.a.createElement("input",{value:n,onChange:m}),r.a.createElement("p",null),"Numero: ",r.a.createElement("input",{value:a,onChange:o}),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))))},b=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],l=Object(a.useState)(""),m=Object(c.a)(l,2),i=m[0],s=m[1],p=Object(a.useState)(""),b=Object(c.a)(p,2),v=b[0],d=b[1],h=Object(a.useState)(""),j=Object(c.a)(h,2),g=j[0],O=j[1];Object(a.useEffect)(function(){f().then(function(e){u(e)})},[]);var w=0===g.length?t:t.filter(function(e){return e.name.includes(g)});return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement("p",null,"Rajaa n\xe4ytett\xe4vi\xe4"),r.a.createElement("form",null,r.a.createElement("input",{value:g,onChange:function(e){O(e.target.value)}})),r.a.createElement(E,{name:i,sname:s,number:v,snumber:d,persons:t,spersons:u,nameHandler:function(e){s(e.target.value)},numberHandler:function(e){d(e.target.value)}}),r.a.createElement(o,{persons:w}))};l.a.render(r.a.createElement(b,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.1c16c180.chunk.js.map