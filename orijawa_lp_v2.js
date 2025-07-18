
const hookScript = document.getElementById("orijawahook");
if (hookScript) {
  const pixelSnackAttr = hookScript.getAttribute("snack-pixel");
  var pixelIds = [];
  if (pixelSnackAttr) {
    pixelIds = pixelSnackAttr.split(",").map((id) => id.trim());
    if(pixelIds.length > 0){
        //SNACK VIDEO PIXEL
        !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.install=t():e.install=t()}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var o=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var o,r=0,i=t.length;r<i;r++)!o&&r in t||(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))};Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t,n){var o,i=e.createElement("script");i.type="text/javascript",i.async=!0,i.src=t,n&&(i.onerror=function(){r(e,n)});var a=e.getElementsByTagName("script")[0];null===(o=a.parentNode)||void 0===o||o.insertBefore(i,a)};!function(e,t,n){e.KwaiAnalyticsObject=n;var i=e[n]=e[n]||[];i.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];var a=function(e,t){e[t]=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var i=o([t],n,!0);e.push(i)}};i.methods.forEach((function(e){a(i,e)})),i.instance=function(e){var t,n=(null===(t=i._i)||void 0===t?void 0:t[e])||[];return i.methods.forEach((function(e){a(n,e)})),n},i.load=function(e,o){var a="//s16-def.ap4r.com/kos/s101/nlav11187/pixel/events.js";i._i=i._i||{},i._i[e]=[],i._i[e]._u=a,i._t=i._t||{},i._t[e]=+new Date,i._o=i._o||{},i._o[e]=o||{};var c="?sdkid=".concat(e,"&lib=").concat(n);r(t,a+c,"https://s16-11187.ap4r.com/kos/s101/nlav11187/pixel/events.js"+c)}}(window,document,"kwaiq")}])}));
    }

    const tryRun = () => {
      if (typeof kwaiq !== "undefined" && typeof kwaiq.load === "function") {
        pixelIds.forEach((id) => {
          if (id) kwaiq.load(id);
        });
        kwaiq.page();
      } else {
        setTimeout(tryRun, 100); // coba lagi setelah 100ms
      }
    };

    tryRun();
  }
}


function mergeQueryParams(url1, url2) {
    console.log(url1, url2)
    const u1 = new URL(url1);
    const u2 = new URL(url2);

    // Gabungkan searchParams dari url1 ke url2
    for (const [key, value] of u1.searchParams.entries()) {
        if (!u2.searchParams.has(key)) {
            u2.searchParams.append(key, value);
        }
    }

    return u2.toString();
}

document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("click", function(e) {
        // Cari elemen <a> terdekat dari elemen yang diklik
        const anchor = e.target.closest("a[href]");

        if (anchor) {
            const href = anchor.getAttribute("href");

            // Abaikan jika href adalah hash atau javascript:
            if (!href.startsWith("#") && !href.startsWith("javascript:")) {
                e.preventDefault();

                // Gabungkan query dari URL saat ini ke URL href target
                const mergedUrl = mergeQueryParams(window.location.href, href);

                // Redirect ke URL baru
                window.location.href = mergedUrl;
            }
        }
    });

    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', () => {
            try {
                const originalUrl = new URL(img.src);

                // Pastikan hanya memproses URL yang mengandung media.buat.id
                if (originalUrl.hostname === 'media.buat.id') {
                    // Hilangkan segmen "/live/tr:*" dari path
                    const cleanedPath = originalUrl.pathname.replace(/\/live\/tr:[^/]+/, '');

                    // Ganti domain
                    const newUrl = `https://mediabuatid.ngx.my.id${cleanedPath}`;

                    // Ganti src image
                    img.src = newUrl;
                }
            } catch (e) {
                console.warn('Gagal memproses URL:', e);
            }
        });
    });
});
