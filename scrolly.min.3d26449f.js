// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app/libraries/scrolly.min.js":[function(require,module,exports) {
/**
 * scrolly.js
 * Current Version: 1.0.1
 * http://www.scrollyjs.com
 * Github: https://github.com/yesiamrocks/scrolly.js
 * Copyright (c) 2017 Pavel
 * License: scrolly.js is licensed under the MIT license
 **/
!function () {
  var t = "Unknown";
  -1 != window.navigator.userAgent.indexOf("Windows") ? t = "Windows" : -1 != window.navigator.userAgent.indexOf("Mac") && (t = "Mac");
  var e = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g),
      s = "",
      l = 0,
      o = !0,
      a = {},
      r = {},
      i = {},
      n = {},
      c = {},
      d = {},
      m = {},
      f = "visibility: hidden;",
      y = "animation-fill-mode: both;",
      u = " -webkit-animation-fill-mode: both; visibility: visible;",
      h = " visibility: visible; -webkit-animation-duration: 1s; display:block;-webkit-animation-fill-mode: both; ",
      v = {
    selectorClass: "scrolly",
    dataClickElm: "data-scrolly-click",
    dataMouseoverElm: "data-scrolly-mouseover",
    dataMouseoutElm: "data-scrolly-mouseout",
    dataSelectorIn: "data-scrolly-top",
    dataSelectorOut: "data-scrolly-down",
    dataScrollyInDelay: "data-scrolly-top-delay",
    dataScrollyOutDelay: "data-scrolly-down-delay",
    dataScrollyOffsetTop: "data-scrolly-offset-top",
    dataScrollyOffsetBottom: "data-scrolly-offset-bottom",
    dataCharacterAnimate: "data-scrolly-characters",
    dataScrollyIndex: "data-scrolly-index",
    dataScrollyTargetClick: "data-scrolly-target-click",
    dataScrollyTargetMouseOver: "data-scrolly-target-mouseover",
    dataScrollyTargetMouseOut: "data-scrolly-target-mouseout",
    dataScrollySelector: "data-scrolly-selector",
    dataScrollyAnimation: "data-scrolly-animation",
    scrollyOffsetTop: 0,
    scrollyOffsetBottom: 0,
    scrollyMacOffsetTop: 0,
    scrollyMacOffsetBottom: 0,
    scrollyWindowsOffsetTop: 0,
    scrollyWindowsOffsetBottom: 0,
    scrollyTabOffsetTop: 0,
    scrollyTabOffsetBottom: 0,
    scrollyMobileOffsetTop: 0,
    scrollyMobileOffsetBottom: 0,
    scrollyDisable: !1,
    scrollyAnimationCssRemove: !1,
    scrollyScreen: {
      mobile: {
        minWidth: 0,
        maxWidth: 767
      },
      tab: {
        minWidth: 768,
        maxWidth: 991
      },
      desktop: {
        minWidth: 992,
        maxWidth: 1200
      },
      lgDesktop: {
        minWidth: 1201,
        maxWidth: 1e4
      }
    },
    scrollyStopIt: {
      mobile: !1,
      tab: !1,
      desktop: !1,
      lgDesktop: !1
    }
  };
  this.isInView = function (t) {
    var e, s, l, o;
    o = window.pageYOffset, l = o + window.innerHeight, s = this.offsetTop(t), e = s + t.clientHeight;
    var a = t.getAttribute(v.dataScrollyOffsetTop);
    a ? o += parseInt(a) : parseInt(v.scrollyOffsetTop) && (o += parseInt(v.scrollyOffsetTop));
    var r = t.getAttribute(v.dataScrollyOffsetBottom);
    return r ? l -= parseInt(r) : parseInt(v.scrollyOffsetBottom) && (l -= parseInt(v.scrollyOffsetBottom)), l >= s && e >= o;
  }, e && (h = "visibility: visible; animation-duration: 1s;"), this.makeStyle = function (t, l) {
    var o = "";

    if (null !== t && "" !== t) {
      var a = t.trim().split(",");
      o = u, o += e ? " animation-duration: 1s; " : " -webkit-animation-duration: 1s; ";

      for (var r = 0; r < a.length; r++) {
        var i = a[r].trim(),
            n = i.split(":");
        if (2 === n.length) var c = "animation-" + n[0].trim(),
            d = n[1].trim();else var c = "animation-name",
            d = i;
        e ? o += c + ":" + d + "; " : "animation-delay" == c ? (o += f, "topToBottom" === l ? s.setAttribute(v.dataScrollyInDelay, d) : "bottomToTop" === l && s.setAttribute(v.dataScrollyOutDelay, d)) : o += " -webkit-" + c.trim() + ":" + d + "; ";
      }
    }

    return o;
  }, this.isHidden = function (t) {
    return null !== t.getAttribute("style") && t.getAttribute("style").trim() == f.trim() ? !0 : !1;
  }, this.animationStart = function () {
    if (v.scrollyDisable === !0) return 0;

    if (p) {
      var t = window.pageYOffset || document.documentElement.scrollTop;
      o = t >= l ? !0 : !1, l = t;

      for (var e = 0; p > e; e++) {
        var s = this.isInView(b[e]);
        s ? this.showElement(e) : this.clearStyle(e);
      }
    }
  }, this.hasClass = function (t, e) {
    return (" " + t.className + " ").indexOf(" " + e + " ") > -1;
  };
  var b = {},
      p = 0,
      S = screen.width;
  this.checkScreenForAnimation = function () {
    v.scrollyStopIt.mobile && S >= parseInt(v.scrollyScreen.mobile.minWidth) && S <= parseInt(v.scrollyScreen.mobile.maxWidth) ? (v.scrollyDisable = !0, this.resetWindow()) : v.scrollyStopIt.tab && S >= parseInt(v.scrollyScreen.tab.minWidth) && S <= parseInt(v.scrollyScreen.tab.maxWidth) ? (v.scrollyDisable = !0, this.resetWindow()) : v.scrollyStopIt.desktop && S >= parseInt(v.scrollyScreen.desktop.minWidth) && S <= parseInt(v.scrollyScreen.desktop.maxWidth) ? (v.scrollyDisable = !0, this.resetWindow()) : v.scrollyStopIt.lgDesktop && S >= parseInt(v.scrollyScreen.lgDesktop.minWidth) && S <= parseInt(v.scrollyScreen.lgDesktop.maxWidth) ? (v.scrollyDisable = !0, this.resetWindow()) : v.scrollyDisable = !1;
  }, this.initOptions = function (t, e) {
    var s, l;

    for (s in e) {
      l = e[s], null == t[s] && (t[s] = l);
    }

    return t;
  }, this.scrolly = function (e) {
    if (e && (v = this.initOptions(e, v)), v.scrollyDisable === !0) return 0;
    v.scrollyStopIt && this.checkScreenForAnimation(), "Windows" === t && parseInt(v.scrollyWindowsOffsetTop) && (v.scrollyOffsetTop = parseInt(v.scrollyWindowsOffsetTop)), "Windows" === t && parseInt(v.scrollyWindowsOffsetBottom) && (v.scrollyOffsetBottom = parseInt(v.scrollyWindowsOffsetBottom)), "Mac" === t && parseInt(v.scrollyMacOffsetTop) && (v.scrollyOffsetTop = parseInt(v.scrollyMacOffsetTop)), "Mac" === t && parseInt(v.scrollyMacOffsetBottom) && (v.scrollyOffsetBottom = parseInt(v.scrollyMacOffsetBottom)), parseInt(v.scrollyMobileOffsetTop) && S >= parseInt(v.scrollyScreen.mobile.minWidth) && S <= parseInt(v.scrollyScreen.mobile.maxWidth) ? v.scrollyOffsetTop = parseInt(v.scrollyMobileOffsetTop) : parseInt(v.scrollyTabOffsetTop) && S >= parseInt(v.scrollyScreen.tab.minWidth) && S <= parseInt(v.scrollyScreen.tab.maxWidth) && (v.scrollyOffsetTop = parseInt(v.scrollyTabOffsetTop)), parseInt(v.scrollyMobileOffsetBottom) && S >= parseInt(v.scrollyScreen.mobile.minWidth) && S <= parseInt(v.scrollyScreen.mobile.maxWidth) ? v.scrollyOffsetBottom = parseInt(v.scrollyMobileOffsetBottom) : parseInt(v.scrollyTabOffsetBottom) && S >= parseInt(v.scrollyScreen.tab.minWidth) && S <= parseInt(v.scrollyScreen.tab.maxWidth) && (v.scrollyOffsetBottom = parseInt(v.scrollyTabOffsetBottom));
    var l = document.querySelectorAll("[" + v.dataSelectorIn + "]"),
        o = l.length,
        f = document.querySelectorAll("[" + v.dataSelectorOut + "]"),
        y = f.length,
        u = document.querySelectorAll("[" + v.dataScrollyTargetClick + "]"),
        h = u.length;
    if (h) for (var g = 0; h > g; g++) {
      u[g].addEventListener("click", T, !0), this.hasClass(u[g], v.selectorClass) || (u[g].className += " " + v.selectorClass);
    }
    var A = document.querySelectorAll("[" + v.dataScrollyTargetMouseOver + "]"),
        O = A.length;
    if (O) for (var I = 0; O > I; I++) {
      A[I].addEventListener("mouseover", T, !0), this.hasClass(A[I], v.selectorClass) || (A[I].className += " " + v.selectorClass);
    }
    var w = document.querySelectorAll("[" + v.dataScrollyTargetMouseOut + "]"),
        C = w.length;
    if (C) for (var g = 0; C > g; g++) {
      w[g].addEventListener("mouseout", T, !0), this.hasClass(w[g], v.selectorClass) || (w[g].className += " " + v.selectorClass);
    }
    var k = document.querySelectorAll("[" + v.dataClickElm + "]"),
        W = k.length;
    if (W) for (var x = 0; W > x; x++) {
      k[x].addEventListener("click", this.cssAnimationClick), this.hasClass(k[x], v.selectorClass) || (k[x].className += " " + v.selectorClass);
    }
    var E = document.querySelectorAll("[" + v.dataMouseoverElm + "]"),
        M = E.length;
    if (M) for (var B = 0; M > B; B++) {
      E[B].addEventListener("mouseover", this.cssAnimationMouseOver), this.hasClass(E[B], v.selectorClass) || (E[B].className += " " + v.selectorClass);
    }
    var D = document.querySelectorAll("[" + v.dataMouseoutElm + "]"),
        L = D.length;
    if (L) for (var N = 0; L > N; N++) {
      D[N].addEventListener("mouseout", this.cssAnimationMouseOut), this.hasClass(D[N], v.selectorClass) || (D[N].className += " " + v.selectorClass);
    }
    if (o) for (var q = 0; o > q; q++) {
      this.hasClass(l[q], v.selectorClass) || (l[q].className += " " + v.selectorClass);
    }
    if (y) for (var F = 0; y > F; F++) {
      this.hasClass(f[F], v.selectorClass) || (f[F].className += " " + v.selectorClass);
    }

    if (b = document.querySelectorAll("." + v.selectorClass), p = b.length) {
      for (var H = 0; p > H; H++) {
        if (a[H] = b[H], s = b[H], r[H] = "", i[H] = "", n[H] = "", c[H] = "", d[H] = "", m[H] = "", v.scrollyAnimationCssRemove) {
          b[H].setAttribute(v.dataScrollyIndex, H);
          var Y = b[H];
          Y.addEventListener("webkitAnimationEnd", cssAnimtionEnd, !1), Y.addEventListener("animationend", cssAnimtionEnd, !1), Y.addEventListener("oanimationend", cssAnimtionEnd, !1);
        }

        var z = b[H].getAttribute("style");
        z && (c[H] = z);
        var j = b[H].getAttribute("class");
        j && (r[H] = j);
        var P = b[H].getAttribute(v.dataCharacterAnimate);

        if (P) {
          var R = b[H].textContent.trim(),
              V = P.trim().replace(/\s/g, ""),
              U = V.split(","),
              G = 150,
              J = !1,
              K = b[H].getAttribute(v.dataSelectorIn),
              Q = b[H].getAttribute(v.dataSelectorOut);
          K && (d[H] = " " + K + " "), Q && (m[H] = " " + Q + " ");

          for (var X = 0; X < U.length; X++) {
            var Z = U[X].trim(),
                $ = Z.split(":");
            "delay" == $[0] ? G = $[1] : "randomly" == $[0] && (J = !0);
          }

          for (var _ = [], tt = 0; tt < R.length; tt++) {
            _[tt] = tt;
          }

          J && (_ = this.shuffle(_));

          for (var et = 0, st = "", lt = 0; lt < R.length; lt++) {
            var ot = R[lt];

            if (" " != ot) {
              var at = G * _[et];
              et++;
              var rt = " display: inline-block; animation-fill-mode: both; -webkit-animation-duration:1s; -webkit-animation-delay:" + at + "ms; ";
              ot = '<span style="' + rt + '" >' + ot + "</span>";
            }

            st += ot;
          }

          b[H].innerHTML = st;
        } else {
          var it = b[H].getAttribute(v.dataSelectorIn);
          it && (i[H] = this.makeStyle(it, "topToBottom"), b[H].removeAttribute(v.dataSelectorIn));
          var nt = b[H].getAttribute(v.dataSelectorOut);
          nt && (n[H] = this.makeStyle(nt, "bottomToTop"), b[H].removeAttribute(v.dataSelectorOut));
        }

        this.clearStyle(H);
      }

      animationStart();
    }

    window.onscroll = function () {
      animationStart();
    }, window.addEventListener("resize", function () {
      this.checkScreenForAnimation();
    });
  }, this.shuffle = function (t) {
    for (var e, s = t.length, l = 0; s--;) {
      l = Math.floor(Math.random() * (s + 1)), e = t[s], t[s] = t[l], t[l] = e;
    }

    return t;
  };
  var g = !1,
      A = !1;
  this.showElement = function (t) {
    if (this.isHidden(b[t])) {
      var e = b[t].getAttribute(v.dataCharacterAnimate);
      if (o) {
        if (b[t].getAttribute(v.dataScrollyOutDelay)) {
          var s = 1e3 * parseFloat(b[t].getAttribute(v.dataScrollyOutDelay));
          A && (clearTimeout(A), A = !1), g = setTimeout(function () {
            e ? (b[t].style.cssText = u + c[t] + y, this.hasClass(b[t], d[t]) || (b[t].className += d[t])) : b[t].style.cssText = n[t] + c[t], b[t].style.visibility = "visible";
          }, s);
        } else e ? (b[t].style.cssText = u + c[t] + y, this.hasClass(b[t], d[t]) || (b[t].className += d[t])) : b[t].style.cssText = u + n[t] + c[t], b[t].style.visibility = "visible";
      } else if (b[t].getAttribute(v.dataScrollyInDelay)) {
        var l = 1e3 * parseFloat(b[t].getAttribute(v.dataScrollyInDelay));
        g && (clearTimeout(g), g = !1), A = setTimeout(function () {
          e ? (b[t].style.cssText = u + c[t] + y, this.hasClass(b[t], m[t]) || (b[t].className += m[t])) : b[t].style.cssText = i[t] + c[t], b[t].style.visibility = "visible";
        }, l);
      } else e ? (b[t].style.cssText = u + c[t] + y, this.hasClass(b[t], m[t]) || (b[t].className += m[t])) : b[t].style.cssText = u + i[t] + c[t], b[t].style.visibility = "visible";
    }
  }, this.resetWindow = function () {
    if (p) for (var t = 0; p > t; t++) {
      b[t].style.cssText = c[t];
    }
  }, this.clearStyle = function (t) {
    var e = b[t].getAttribute(v.dataCharacterAnimate);
    b[t].style.cssText = f, e && (b[t].className = "scrolly " + r[t]);
  }, this.getScroll = function () {
    if (void 0 != window.pageYOffset) return pageYOffset;
    var t,
        e,
        s = document,
        l = s.documentElement,
        o = s.body;
    return t = l.scrollLeft || o.scrollLeft || 0, e = l.scrollTop || o.scrollTop || 0;
  }, this.offsetTop = function (t) {
    for (var e; void 0 === t.offsetTop;) {
      t = t.parentNode;
    }

    for (e = t.offsetTop; t = t.offsetParent;) {
      e += t.offsetTop;
    }

    return e;
  };

  var T = function T() {
    var t = this,
        e = t.getAttribute(v.dataScrollyTargetClick);
    null == e && (e = t.getAttribute(v.dataScrollyTargetMouseOver)), null == e && (e = t.getAttribute(v.dataScrollyTargetMouseOut));
    var s = document.querySelector("[" + v.dataScrollySelector + "=" + e + "]"),
        l = s,
        o = t.getAttribute(v.dataScrollyAnimation),
        a = l.getAttribute("style");

    if (l.removeAttribute("style"), a || (a = ""), null === l.getAttribute(v.dataScrollyIndex)) {
      var r = parseInt(Object.size(c)) + 1;
      l.setAttribute(v.dataScrollyIndex, r), c[r] = a, l.addEventListener("webkitAnimationEnd", cssAnimtionEnd, !1), l.addEventListener("animationend", cssAnimtionEnd, !1), l.addEventListener("oanimationend", cssAnimtionEnd, !1);
    }

    setTimeout(function () {
      l.style.cssText = a + h + " animation-name: " + o + ";";
    }, 0);
  };

  Object.size = function (t) {
    var e,
        s = 0;

    for (e in t) {
      t.hasOwnProperty(e) && s++;
    }

    return s;
  }, this.cssAnimtionEnd = function () {
    var t = this,
        e = parseInt(t.getAttribute(v.dataScrollyIndex));
    t.removeAttribute("style"), e && "" !== c[e] && (t.style.cssText = c[e]);
  }, this.cssAnimationClick = function () {
    var t = this,
        e = t.getAttribute(v.dataClickElm).trim();
    t.removeAttribute("style"), setTimeout(function () {
      t.style.cssText = h + " animation-name: " + e + ";";
    }, 0);
  }, this.cssAnimationMouseOver = function () {
    var t = this,
        e = t.getAttribute(v.dataMouseoverElm).trim();
    t.removeAttribute("style"), setTimeout(function () {
      t.style.cssText = h + " animation-name: " + e + ";";
    }, 0);
  }, this.cssAnimationMouseOut = function () {
    var t = this,
        e = t.getAttribute(v.dataMouseoutElm).trim();
    t.removeAttribute("style"), setTimeout(function () {
      t.style.cssText = h + " animation-name: " + e + ";";
    }, 0);
  };
}();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51252" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app/libraries/scrolly.min.js"], null)
//# sourceMappingURL=/scrolly.min.3d26449f.js.map