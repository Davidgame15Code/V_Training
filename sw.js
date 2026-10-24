const V='v-training-v5';
const FILES=["./", "index.html", "manifest.webmanifest", "icons/icon-180.png", "icons/icon-192.png", "img/vergil.webp", "img/v0.webp", "img/v1.webp", "img/v2.webp", "img/v3.webp", "img/v4.webp", "img/v5.webp", "img/v6.webp", "img/v7.webp", "img/v8.webp", "img/v9.webp", "img/v10.webp", "img/v11.webp", "img/v12.webp", "img/v13.webp", "img/v14.webp", "img/v15.webp", "img/v16.webp", "img/v17.webp", "img/v18.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;
 if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith((async()=>{
  const c=await caches.open(V);
  const hit=await c.match(r,{ignoreSearch:true})||(r.mode==='navigate'?await c.match('index.html'):null);
  const net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>null);
  if(hit){e.waitUntil(net);return hit}
  return (await net)||Response.error();
 })());
});
