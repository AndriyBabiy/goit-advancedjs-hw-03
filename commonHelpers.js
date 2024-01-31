import{a as m,S as h,i as y}from"./assets/vendor-d19d9935.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();m.defaults.headers.common["x-api-key"]="live_93kzxPqZS9E6ojCL8XkLA4w6GnhQGrGXpUQVK67EZJHlYyynejv0lm0RzZHOnfPA";const g=()=>f("/v1/breeds"),S=e=>f("/v1/images/search",{api_key:"live_93kzxPqZS9E6ojCL8XkLA4w6GnhQGrGXpUQVK67EZJHlYyynejv0lm0RzZHOnfPA",breed_ids:e});function f(e,t){const s="https://api.thecatapi.com",i=e,r=new URLSearchParams(t);return fetch(`${s}${i}?${r}`,{headers:{}}).then(n=>{if(!n.ok)throw new Error(n.statusText);return n.json()})}m.defaults.headers.common["x-api-key"]="live_93kzxPqZS9E6ojCL8XkLA4w6GnhQGrGXpUQVK67EZJHlYyynejv0lm0RzZHOnfPA";const l=document.querySelector("select.breed-select"),a=document.querySelector("div.cat-info"),u=document.querySelector("p.loader"),v=document.querySelector("p.error");c(v);c(l);c(a);g().then(e=>{c(u),d(l),new h({select:l,data:b(e),events:{afterChange:t=>{const s=t.map(({value:i})=>i);L(s)}}})}).catch(e=>{p(e)});function L(e){a.innerHTML="",d(u),S(e).then(t=>{const s=t.map(({url:o})=>o).toString(),i=t.map(o=>o.breeds).flat().map(({name:o})=>o).toString(),r=t.map(o=>o.breeds).flat().map(({description:o})=>o).toString(),n=t.map(o=>o.breeds).flat().map(({temperament:o})=>o).toString();if(t.length===0)throw new Error("Cat not found");a.insertAdjacentHTML("afterbegin",E(s,i,r,n)),c(u),d(a)}).catch(t=>{p(t)})}function c(e){e.classList.add("hidden")}function d(e){e.classList.remove("hidden")}function p(e){w(e),c(u),c(l),c(document.querySelector(".ss-main")),console.error(e)}function w(e){return y.show({title:`${e}`,message:"Oops! Something went wrong! Try reloading the page!",color:"red",position:"topRight",timeout:!1})}function b(e){return e.map(({id:t,name:s})=>({text:s,value:t}))}function E(e,t,s,i){return`
  <img class='cat-img' src=${e} alt="Cat Image">
  <div class="cat-text">
    <h3>${t}</h3>
    <p>${s}</p>
    <p><b>Temperament:</b> ${i}</p>
  </div>
  `}
//# sourceMappingURL=commonHelpers.js.map
