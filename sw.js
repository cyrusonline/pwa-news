const staticAssests = [
    './',
    './styles.css',
    './app.js',
];


self.addEventListener('install',async event=>{
    const cache = await caches.open('news-static');
    cache.addAll(staticAssests)
})

self.addEventListener('fetch',event=>{
    const req = event.request;
    const url = new URL(request.url);
    
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    }else{
        event.respondWith(networkFirst(req));
    }
    console.log('fetch')
})

async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

