(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class AppSidebarNavElement extends HTMLElement {
  static get observedAttributes() {
    return [];
  }
  /**
   * Hydrates the sidebar navigation when the element is attached.
   */
  connectedCallback() {
    this.render();
    this.setupNavigationCloseOnClick();
  }
  render() {
    const classes = "flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 bg-white".trim().split(/\s+/).filter(Boolean);
    this.classList.add(...classes);
    this.innerHTML = `				            
            <div class="relative flex h-16 shrink-0 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" alt="Interlocutor" viewBox="128 128 768 768" class="bg-emerald-400 dark:bg-emerald-600 text-emerald-600 dark:text-emerald-400 h-8 w-auto rounded-lg" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd">
                <path style="opacity:1" fill="currentColor" d="M-.5-.5h782c-29.307 9.487-56.641 22.987-82 40.5-41.54 30.54-77.374 66.707-107.5 108.5-36.94 52.534-66.606 109.201-89 170a775.85 775.85 0 0 0-41 141c-2.303 11.974.863 22.141 9.5 30.5a54.224 54.224 0 0 0 9 4 928.628 928.628 0 0 0 58 2c17.214.223 27.381 8.723 30.5 25.5.62 24.668-2.047 49.001-8 73a876.172 876.172 0 0 1-10 40c-21.563-12.62-42.396-11.453-62.5 3.5-20.918 21.091-24.084 44.591-9.5 70.5 9.709 12.773 22.542 20.273 38.5 22.5-19.879 47.591-43.045 93.425-69.5 137.5-30.88 49.88-71.38 90.047-121.5 120.5-33.564 17.24-68.897 28.74-106 34.5H-.5V-.5zm260 331c13.322.658 23.656 6.491 31 17.5 26.952 20.892 54.619 21.892 83 3 5.09-7.092 11.424-12.759 19-17 17.4-5.859 31.9-1.692 43.5 12.5 9.277 15.384 8.277 30.051-3 44-35.373 37.678-78.54 51.512-129.5 41.5-25.908-6.532-48.075-19.365-66.5-38.5-12.656-13.946-14.656-29.279-6-46 6.88-10.185 16.38-15.852 28.5-17z"/>
                <circle style="opacity:1" fill="currentColor" cx="661.5" cy="373.5" r="56"/>
              </svg>
            </div>
            
            <!-- custom side-bar content -->
            <nav class="relative flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">               
                <li class="mt-auto">
                  <a href="#settings" hx-get="./settings.html" hx-target="#main-panel" hx-swap="innerHTML" hx-push-url="#settings" class="group -mx-2 flex gap-x-3 p-2 text-sm/6 font-semibold text-stone-700 hover:bg-stone-50 hover:text-emerald-600 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 shrink-0 text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-white">
                      <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
            <!-- end custom side-bar content -->
		`;
  }
  /**
   * Closes the mobile sidebar dialog after a nav item is activated.
   */
  setupNavigationCloseOnClick() {
    const links = this.querySelectorAll("a[href]");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        const sidebarDialog = document.getElementById("sidebar");
        if (sidebarDialog && sidebarDialog.open) {
          sidebarDialog.close();
        }
      });
    });
  }
}
window.customElements.define("app-sidebar-nav", AppSidebarNavElement);
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
/*! Capacitor: https://capacitorjs.com/ - MIT License */
var ExceptionCode;
(function(ExceptionCode2) {
  ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
  ExceptionCode2["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
class CapacitorException extends Error {
  constructor(message, code, data) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
const getPlatformId = (win) => {
  var _a, _b;
  if (win === null || win === void 0 ? void 0 : win.androidBridge) {
    return "android";
  } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
    return "ios";
  } else {
    return "web";
  }
};
const createCapacitor = (win) => {
  const capCustomPlatform = win.CapacitorCustomPlatform || null;
  const cap = win.Capacitor || {};
  const Plugins = cap.Plugins = cap.Plugins || {};
  const getPlatform = () => {
    return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
  };
  const isNativePlatform = () => getPlatform() !== "web";
  const isPluginAvailable = (pluginName) => {
    const plugin = registeredPlugins.get(pluginName);
    if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
      return true;
    }
    if (getPluginHeader(pluginName)) {
      return true;
    }
    return false;
  };
  const getPluginHeader = (pluginName) => {
    var _a;
    return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find((h) => h.name === pluginName);
  };
  const handleError = (err) => win.console.error(err);
  const registeredPlugins = /* @__PURE__ */ new Map();
  const registerPlugin2 = (pluginName, jsImplementations = {}) => {
    const registeredPlugin = registeredPlugins.get(pluginName);
    if (registeredPlugin) {
      console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
      return registeredPlugin.proxy;
    }
    const platform = getPlatform();
    const pluginHeader = getPluginHeader(pluginName);
    let jsImplementation;
    const loadPluginImplementation = async () => {
      if (!jsImplementation && platform in jsImplementations) {
        jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
      } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
        jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
      }
      return jsImplementation;
    };
    const createPluginMethod = (impl, prop) => {
      var _a, _b;
      if (pluginHeader) {
        const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
        if (methodHeader) {
          if (methodHeader.rtype === "promise") {
            return (options) => cap.nativePromise(pluginName, prop.toString(), options);
          } else {
            return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
          }
        } else if (impl) {
          return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
        }
      } else if (impl) {
        return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
      } else {
        throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
      }
    };
    const createPluginMethodWrapper = (prop) => {
      let remove;
      const wrapper = (...args) => {
        const p = loadPluginImplementation().then((impl) => {
          const fn = createPluginMethod(impl, prop);
          if (fn) {
            const p2 = fn(...args);
            remove = p2 === null || p2 === void 0 ? void 0 : p2.remove;
            return p2;
          } else {
            throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
          }
        });
        if (prop === "addListener") {
          p.remove = async () => remove();
        }
        return p;
      };
      wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
      Object.defineProperty(wrapper, "name", {
        value: prop,
        writable: false,
        configurable: false
      });
      return wrapper;
    };
    const addListener = createPluginMethodWrapper("addListener");
    const removeListener = createPluginMethodWrapper("removeListener");
    const addListenerNative = (eventName, callback) => {
      const call = addListener({ eventName }, callback);
      const remove = async () => {
        const callbackId = await call;
        removeListener({
          eventName,
          callbackId
        }, callback);
      };
      const p = new Promise((resolve) => call.then(() => resolve({ remove })));
      p.remove = async () => {
        console.warn(`Using addListener() without 'await' is deprecated.`);
        await remove();
      };
      return p;
    };
    const proxy = new Proxy({}, {
      get(_, prop) {
        switch (prop) {
          case "$$typeof":
            return void 0;
          case "toJSON":
            return () => ({});
          case "addListener":
            return pluginHeader ? addListenerNative : addListener;
          case "removeListener":
            return removeListener;
          default:
            return createPluginMethodWrapper(prop);
        }
      }
    });
    Plugins[pluginName] = proxy;
    registeredPlugins.set(pluginName, {
      name: pluginName,
      proxy,
      platforms: /* @__PURE__ */ new Set([...Object.keys(jsImplementations), ...pluginHeader ? [platform] : []])
    });
    return proxy;
  };
  if (!cap.convertFileSrc) {
    cap.convertFileSrc = (filePath) => filePath;
  }
  cap.getPlatform = getPlatform;
  cap.handleError = handleError;
  cap.isNativePlatform = isNativePlatform;
  cap.isPluginAvailable = isPluginAvailable;
  cap.registerPlugin = registerPlugin2;
  cap.Exception = CapacitorException;
  cap.DEBUG = !!cap.DEBUG;
  cap.isLoggingEnabled = !!cap.isLoggingEnabled;
  return cap;
};
const initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
const Capacitor = /* @__PURE__ */ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
const registerPlugin = Capacitor.registerPlugin;
class WebPlugin {
  constructor() {
    this.listeners = {};
    this.retainedEventArguments = {};
    this.windowListeners = {};
  }
  addListener(eventName, listenerFunc) {
    let firstListener = false;
    const listeners = this.listeners[eventName];
    if (!listeners) {
      this.listeners[eventName] = [];
      firstListener = true;
    }
    this.listeners[eventName].push(listenerFunc);
    const windowListener = this.windowListeners[eventName];
    if (windowListener && !windowListener.registered) {
      this.addWindowListener(windowListener);
    }
    if (firstListener) {
      this.sendRetainedArgumentsForEvent(eventName);
    }
    const remove = async () => this.removeListener(eventName, listenerFunc);
    const p = Promise.resolve({ remove });
    return p;
  }
  async removeAllListeners() {
    this.listeners = {};
    for (const listener in this.windowListeners) {
      this.removeWindowListener(this.windowListeners[listener]);
    }
    this.windowListeners = {};
  }
  notifyListeners(eventName, data, retainUntilConsumed) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      if (retainUntilConsumed) {
        let args = this.retainedEventArguments[eventName];
        if (!args) {
          args = [];
        }
        args.push(data);
        this.retainedEventArguments[eventName] = args;
      }
      return;
    }
    listeners.forEach((listener) => listener(data));
  }
  hasListeners(eventName) {
    var _a;
    return !!((_a = this.listeners[eventName]) === null || _a === void 0 ? void 0 : _a.length);
  }
  registerWindowListener(windowEventName, pluginEventName) {
    this.windowListeners[pluginEventName] = {
      registered: false,
      windowEventName,
      pluginEventName,
      handler: (event) => {
        this.notifyListeners(pluginEventName, event);
      }
    };
  }
  unimplemented(msg = "not implemented") {
    return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
  }
  unavailable(msg = "not available") {
    return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
  }
  async removeListener(eventName, listenerFunc) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      return;
    }
    const index = listeners.indexOf(listenerFunc);
    this.listeners[eventName].splice(index, 1);
    if (!this.listeners[eventName].length) {
      this.removeWindowListener(this.windowListeners[eventName]);
    }
  }
  addWindowListener(handle) {
    window.addEventListener(handle.windowEventName, handle.handler);
    handle.registered = true;
  }
  removeWindowListener(handle) {
    if (!handle) {
      return;
    }
    window.removeEventListener(handle.windowEventName, handle.handler);
    handle.registered = false;
  }
  sendRetainedArgumentsForEvent(eventName) {
    const args = this.retainedEventArguments[eventName];
    if (!args) {
      return;
    }
    delete this.retainedEventArguments[eventName];
    args.forEach((arg) => {
      this.notifyListeners(eventName, arg);
    });
  }
}
const encode = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
const decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class CapacitorCookiesPluginWeb extends WebPlugin {
  async getCookies() {
    const cookies = document.cookie;
    const cookieMap = {};
    cookies.split(";").forEach((cookie) => {
      if (cookie.length <= 0)
        return;
      let [key, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
      key = decode(key).trim();
      value = decode(value).trim();
      cookieMap[key] = value;
    });
    return cookieMap;
  }
  async setCookie(options) {
    try {
      const encodedKey = encode(options.key);
      const encodedValue = encode(options.value);
      const expires = `; expires=${(options.expires || "").replace("expires=", "")}`;
      const path = (options.path || "/").replace("path=", "");
      const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
      document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async deleteCookie(options) {
    try {
      document.cookie = `${options.key}=; Max-Age=0`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearCookies() {
    try {
      const cookies = document.cookie.split(";") || [];
      for (const cookie of cookies) {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearAllCookies() {
    try {
      await this.clearCookies();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
registerPlugin("CapacitorCookies", {
  web: () => new CapacitorCookiesPluginWeb()
});
const readBlobAsBase64 = async (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result;
    resolve(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
  };
  reader.onerror = (error) => reject(error);
  reader.readAsDataURL(blob);
});
const normalizeHttpHeaders = (headers = {}) => {
  const originalKeys = Object.keys(headers);
  const loweredKeys = Object.keys(headers).map((k) => k.toLocaleLowerCase());
  const normalized = loweredKeys.reduce((acc, key, index) => {
    acc[key] = headers[originalKeys[index]];
    return acc;
  }, {});
  return normalized;
};
const buildUrlParams = (params, shouldEncode = true) => {
  if (!params)
    return null;
  const output = Object.entries(params).reduce((accumulator, entry) => {
    const [key, value] = entry;
    let encodedValue;
    let item;
    if (Array.isArray(value)) {
      item = "";
      value.forEach((str) => {
        encodedValue = shouldEncode ? encodeURIComponent(str) : str;
        item += `${key}=${encodedValue}&`;
      });
      item.slice(0, -1);
    } else {
      encodedValue = shouldEncode ? encodeURIComponent(value) : value;
      item = `${key}=${encodedValue}`;
    }
    return `${accumulator}&${item}`;
  }, "");
  return output.substr(1);
};
const buildRequestInit = (options, extra = {}) => {
  const output = Object.assign({ method: options.method || "GET", headers: options.headers }, extra);
  const headers = normalizeHttpHeaders(options.headers);
  const type = headers["content-type"] || "";
  if (typeof options.data === "string") {
    output.body = options.data;
  } else if (type.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(options.data || {})) {
      params.set(key, value);
    }
    output.body = params.toString();
  } else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
    const form = new FormData();
    if (options.data instanceof FormData) {
      options.data.forEach((value, key) => {
        form.append(key, value);
      });
    } else {
      for (const key of Object.keys(options.data)) {
        form.append(key, options.data[key]);
      }
    }
    output.body = form;
    const headers2 = new Headers(output.headers);
    headers2.delete("content-type");
    output.headers = headers2;
  } else if (type.includes("application/json") || typeof options.data === "object") {
    output.body = JSON.stringify(options.data);
  }
  return output;
};
class CapacitorHttpPluginWeb extends WebPlugin {
  /**
   * Perform an Http request given a set of options
   * @param options Options to build the HTTP request
   */
  async request(options) {
    const requestInit = buildRequestInit(options, options.webFetchExtra);
    const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
    const url = urlParams ? `${options.url}?${urlParams}` : options.url;
    const response = await fetch(url, requestInit);
    const contentType = response.headers.get("content-type") || "";
    let { responseType = "text" } = response.ok ? options : {};
    if (contentType.includes("application/json")) {
      responseType = "json";
    }
    let data;
    let blob;
    switch (responseType) {
      case "arraybuffer":
      case "blob":
        blob = await response.blob();
        data = await readBlobAsBase64(blob);
        break;
      case "json":
        data = await response.json();
        break;
      case "document":
      case "text":
      default:
        data = await response.text();
    }
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return {
      data,
      headers,
      status: response.status,
      url: response.url
    };
  }
  /**
   * Perform an Http GET request given a set of options
   * @param options Options to build the HTTP request
   */
  async get(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
  }
  /**
   * Perform an Http POST request given a set of options
   * @param options Options to build the HTTP request
   */
  async post(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
  }
  /**
   * Perform an Http PUT request given a set of options
   * @param options Options to build the HTTP request
   */
  async put(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
  }
  /**
   * Perform an Http PATCH request given a set of options
   * @param options Options to build the HTTP request
   */
  async patch(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
  }
  /**
   * Perform an Http DELETE request given a set of options
   * @param options Options to build the HTTP request
   */
  async delete(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
  }
}
registerPlugin("CapacitorHttp", {
  web: () => new CapacitorHttpPluginWeb()
});
const SplashScreen = registerPlugin("SplashScreen", {
  web: () => __vitePreload(() => import("./web-C27od1kW.js"), true ? [] : void 0).then((m) => new m.SplashScreenWeb())
});
var CameraSource;
(function(CameraSource2) {
  CameraSource2["Prompt"] = "PROMPT";
  CameraSource2["Camera"] = "CAMERA";
  CameraSource2["Photos"] = "PHOTOS";
})(CameraSource || (CameraSource = {}));
var CameraDirection;
(function(CameraDirection2) {
  CameraDirection2["Rear"] = "REAR";
  CameraDirection2["Front"] = "FRONT";
})(CameraDirection || (CameraDirection = {}));
var CameraResultType;
(function(CameraResultType2) {
  CameraResultType2["Uri"] = "uri";
  CameraResultType2["Base64"] = "base64";
  CameraResultType2["DataUrl"] = "dataUrl";
})(CameraResultType || (CameraResultType = {}));
class CameraWeb extends WebPlugin {
  async getPhoto(options) {
    return new Promise(async (resolve, reject) => {
      if (options.webUseInput || options.source === CameraSource.Photos) {
        this.fileInputExperience(options, resolve, reject);
      } else if (options.source === CameraSource.Prompt) {
        let actionSheet = document.querySelector("pwa-action-sheet");
        if (!actionSheet) {
          actionSheet = document.createElement("pwa-action-sheet");
          document.body.appendChild(actionSheet);
        }
        actionSheet.header = options.promptLabelHeader || "Photo";
        actionSheet.cancelable = false;
        actionSheet.options = [
          { title: options.promptLabelPhoto || "From Photos" },
          { title: options.promptLabelPicture || "Take Picture" }
        ];
        actionSheet.addEventListener("onSelection", async (e) => {
          const selection = e.detail;
          if (selection === 0) {
            this.fileInputExperience(options, resolve, reject);
          } else {
            this.cameraExperience(options, resolve, reject);
          }
        });
      } else {
        this.cameraExperience(options, resolve, reject);
      }
    });
  }
  async pickImages(_options) {
    return new Promise(async (resolve, reject) => {
      this.multipleFileInputExperience(resolve, reject);
    });
  }
  async cameraExperience(options, resolve, reject) {
    if (customElements.get("pwa-camera-modal")) {
      const cameraModal = document.createElement("pwa-camera-modal");
      cameraModal.facingMode = options.direction === CameraDirection.Front ? "user" : "environment";
      document.body.appendChild(cameraModal);
      try {
        await cameraModal.componentOnReady();
        cameraModal.addEventListener("onPhoto", async (e) => {
          const photo = e.detail;
          if (photo === null) {
            reject(new CapacitorException("User cancelled photos app"));
          } else if (photo instanceof Error) {
            reject(photo);
          } else {
            resolve(await this._getCameraPhoto(photo, options));
          }
          cameraModal.dismiss();
          document.body.removeChild(cameraModal);
        });
        cameraModal.present();
      } catch (e) {
        this.fileInputExperience(options, resolve, reject);
      }
    } else {
      console.error(`Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements.`);
      this.fileInputExperience(options, resolve, reject);
    }
  }
  fileInputExperience(options, resolve, reject) {
    let input = document.querySelector("#_capacitor-camera-input");
    const cleanup = () => {
      var _a;
      (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
    };
    if (!input) {
      input = document.createElement("input");
      input.id = "_capacitor-camera-input";
      input.type = "file";
      input.hidden = true;
      document.body.appendChild(input);
      input.addEventListener("change", (_e) => {
        const file = input.files[0];
        let format = "jpeg";
        if (file.type === "image/png") {
          format = "png";
        } else if (file.type === "image/gif") {
          format = "gif";
        }
        if (options.resultType === "dataUrl" || options.resultType === "base64") {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            if (options.resultType === "dataUrl") {
              resolve({
                dataUrl: reader.result,
                format
              });
            } else if (options.resultType === "base64") {
              const b64 = reader.result.split(",")[1];
              resolve({
                base64String: b64,
                format
              });
            }
            cleanup();
          });
          reader.readAsDataURL(file);
        } else {
          resolve({
            webPath: URL.createObjectURL(file),
            format
          });
          cleanup();
        }
      });
      input.addEventListener("cancel", (_e) => {
        reject(new CapacitorException("User cancelled photos app"));
        cleanup();
      });
    }
    input.accept = "image/*";
    input.capture = true;
    if (options.source === CameraSource.Photos || options.source === CameraSource.Prompt) {
      input.removeAttribute("capture");
    } else if (options.direction === CameraDirection.Front) {
      input.capture = "user";
    } else if (options.direction === CameraDirection.Rear) {
      input.capture = "environment";
    }
    input.click();
  }
  multipleFileInputExperience(resolve, reject) {
    let input = document.querySelector("#_capacitor-camera-input-multiple");
    const cleanup = () => {
      var _a;
      (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
    };
    if (!input) {
      input = document.createElement("input");
      input.id = "_capacitor-camera-input-multiple";
      input.type = "file";
      input.hidden = true;
      input.multiple = true;
      document.body.appendChild(input);
      input.addEventListener("change", (_e) => {
        const photos = [];
        for (let i = 0; i < input.files.length; i++) {
          const file = input.files[i];
          let format = "jpeg";
          if (file.type === "image/png") {
            format = "png";
          } else if (file.type === "image/gif") {
            format = "gif";
          }
          photos.push({
            webPath: URL.createObjectURL(file),
            format
          });
        }
        resolve({ photos });
        cleanup();
      });
      input.addEventListener("cancel", (_e) => {
        reject(new CapacitorException("User cancelled photos app"));
        cleanup();
      });
    }
    input.accept = "image/*";
    input.click();
  }
  _getCameraPhoto(photo, options) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const format = photo.type.split("/")[1];
      if (options.resultType === "uri") {
        resolve({
          webPath: URL.createObjectURL(photo),
          format,
          saved: false
        });
      } else {
        reader.readAsDataURL(photo);
        reader.onloadend = () => {
          const r = reader.result;
          if (options.resultType === "dataUrl") {
            resolve({
              dataUrl: r,
              format,
              saved: false
            });
          } else {
            resolve({
              base64String: r.split(",")[1],
              format,
              saved: false
            });
          }
        };
        reader.onerror = (e) => {
          reject(e);
        };
      }
    });
  }
  async checkPermissions() {
    if (typeof navigator === "undefined" || !navigator.permissions) {
      throw this.unavailable("Permissions API not available in this browser");
    }
    try {
      const permission = await window.navigator.permissions.query({
        name: "camera"
      });
      return {
        camera: permission.state,
        photos: "granted"
      };
    } catch (_a) {
      throw this.unavailable("Camera permissions are not available in this browser");
    }
  }
  async requestPermissions() {
    throw this.unimplemented("Not implemented on web.");
  }
  async pickLimitedLibraryPhotos() {
    throw this.unavailable("Not implemented on web.");
  }
  async getLimitedLibraryPhotos() {
    throw this.unavailable("Not implemented on web.");
  }
}
const Camera = registerPlugin("Camera", {
  web: () => new CameraWeb()
});
class CapacitorWelcomeElement extends HTMLElement {
  constructor() {
    super();
    SplashScreen.hide();
    this.innerHTML = `
    <div>
      <div>
        <h1>Capacitor</h1>
      </div>
      <main>
        <p>
          Capacitor makes it easy to build powerful apps for the app stores, mobile web (Progressive Web Apps), and desktop, all
          with a single code base.
        </p>
        <h2>Getting Started</h2>
        <p>
          You'll probably need a UI framework to build a full-featured app. Might we recommend
          <a target="_blank" href="http://ionicframework.com/">Ionic</a>?
        </p>
        <p>
          Visit <a href="https://capacitorjs.com">capacitorjs.com</a> for information
          on using native features, building plugins, and more.
        </p>
        <a href="https://capacitorjs.com" target="_blank">Read more</a>
        <h2>Tiny Demo</h2>
        <p>
          This demo shows how to call Capacitor plugins. Say cheese!
        </p>
        <p>
          <button id="take-photo">Take Photo</button>
        </p>
        <p>
          <img id="image" style="max-width: 100%">
        </p>
      </main>
    </div>
    `;
  }
  connectedCallback() {
    var _a;
    const self2 = this;
    (_a = self2.querySelector("#take-photo")) == null ? void 0 : _a.addEventListener("click", async () => {
      try {
        const photo = await Camera.getPhoto({
          resultType: "uri"
        });
        const image = self2.querySelector("#image");
        if (!image) return;
        image.src = photo.webPath ?? "";
      } catch (e) {
        console.warn("User cancelled", e);
      }
    });
  }
}
window.customElements.define("capacitor-welcome", CapacitorWelcomeElement);
class AppRecordIndicatorElement extends HTMLElement {
  constructor() {
    super(...arguments);
    this._state = "idle";
  }
  static get observedAttributes() {
    return ["state"];
  }
  get state() {
    return this._state;
  }
  set state(value) {
    const next = this._normalizeState(value);
    if (this._state === next) return;
    this._state = next;
    if (this.getAttribute("state") !== next) {
      this.setAttribute("state", next);
    }
    this.render();
  }
  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "state") {
      this._state = this._normalizeState(newValue);
      this.render();
    }
  }
  connectedCallback() {
    const attr = this.getAttribute("state");
    this._state = this._normalizeState(attr || "idle");
    this.render();
  }
  _normalizeState(value) {
    switch (value) {
      case "idle":
      case "not-ready":
      case "ready":
        return value;
      default:
        return "idle";
    }
  }
  render() {
    let content = "";
    switch (this._state) {
      case "idle":
        content = `
	            <span class="sr-only">Idle</span>
	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" class="size-6">
	              <circle cx="12" cy="12" r="8"/>
	            </svg>`;
        break;
      case "not-ready":
        content = `
	            <span class="sr-only">Not ready</span>
	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
	              <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 0 1 2.25 0v10.937a4.505 4.505 0 0 0-3.25 2.373 8.963 8.963 0 0 1 4-.935A.75.75 0 0 0 18 15v-2.266a3.368 3.368 0 0 1 .988-2.37 1.125 1.125 0 0 1 1.591 1.59 1.118 1.118 0 0 0-.329.79v3.006h-.005a6 6 0 0 1-1.752 4.007l-1.736 1.736a6 6 0 0 1-4.242 1.757H10.5a7.5 7.5 0 0 1-7.5-7.5V6.375a1.125 1.125 0 0 1 2.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 0 1 2.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875Z" />
	            </svg>`;
        break;
      case "ready":
        content = `
	            <span class="sr-only">Ready</span>
	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
	              <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
	            </svg>`;
        break;
    }
    this.innerHTML = content;
  }
}
window.customElements.define("app-record-indicator", AppRecordIndicatorElement);
const _regions = /* @__PURE__ */ new Set();
function registerLiveRegion(element) {
  if (element == null || typeof element !== "object")
    return;
  _regions.add(element);
}
function unregisterLiveRegion(target) {
  _regions.delete(target);
}
function getLiveRegion() {
  for (const el of _regions)
    return el;
  return null;
}
function announce(message, politeness, atomic) {
  const target = getLiveRegion();
  if (target == null)
    return;
  if (typeof target.announce === "function") {
    target.announce(message, politeness, atomic);
  }
}
class ARIALiveRegion extends HTMLElement {
  /**
   * Announce content to this live region.
   * Ensures role and ARIA attributes are applied, then writes content
   * with a clear-then-set cycle to force screen readers to re-announce.
   * @param message - The message to announce
   * @param politeness - The politeness level for the announcement
   * @param atomic - Whether the announcement should be atomic
   */
  announce(message, politeness, atomic) {
    const text = (message == null ? "" : String(message)).trim();
    if (text.length === 0)
      return;
    const requestedPoliteness = String(politeness || this.getAttribute("aria-live") || "polite").toLowerCase();
    const finalPoliteness = requestedPoliteness === "assertive" ? "assertive" : "polite";
    const hasAtomic = typeof atomic === "boolean";
    const currentAtomicAttr = this.getAttribute("aria-atomic");
    const finalAtomic = hasAtomic === true ? atomic : currentAtomicAttr == null ? true : currentAtomicAttr === "true";
    if (this.getAttribute("role") == null)
      this.setAttribute("role", "status");
    if (this.getAttribute("aria-live") !== finalPoliteness)
      this.setAttribute("aria-live", finalPoliteness);
    const atomicString = finalAtomic === true ? "true" : "false";
    if (this.getAttribute("aria-atomic") !== atomicString)
      this.setAttribute("aria-atomic", atomicString);
    this.textContent = "";
    requestAnimationFrame(() => {
      this.textContent = text;
    });
  }
  connectedCallback() {
    try {
      registerLiveRegion(this);
    } catch (_) {
    }
  }
  disconnectedCallback() {
    try {
      unregisterLiveRegion(this);
    } catch (_) {
    }
  }
}
customElements.define("aria-live-region", ARIALiveRegion);
class WhisperDictation extends EventTarget {
  /**
   * Create a new dictation instance.
   * @param config Configuration options including API key and settings
   */
  constructor(config) {
    super();
    this._isRecording = false;
    this._isCurrentlySpeaking = false;
    this._audioContext = null;
    this._analyser = null;
    this._microphone = null;
    this._stream = null;
    this._currentMediaRecorder = null;
    this._currentAudioChunks = [];
    this._speechStartTime = 0;
    this._lastSoundTime = 0;
    this._segmentStartTime = 0;
    this._animationFrameId = 0;
    this._processingQueue = 0;
    this._audioFormat = "";
    this._apiKey = config.apiKey;
    this._model = config.model || "whisper-1";
    this._silenceThresholdMs = config.silenceThresholdMs || 1500;
    this._minSpeechDurationMs = config.minSpeechDurationMs || 1e3;
    this._maxSegmentLengthMs = config.maxSegmentLengthMs || 1e4;
    this._silenceDetectionDb = config.silenceDetectionDb || -35;
    this._minVolumeForSpeech = config.volumeThreshold || 30;
    this._detectAudioFormat();
  }
  /**
   * Start microphone capture and VAD-driven segmentation.
   * No-op if already recording.
   */
  async start() {
    if (this._isRecording === true)
      return;
    if (!this._apiKey || String(this._apiKey).trim().length === 0) {
      this._announceStatus("Please provide a valid OpenAI API key");
      return;
    }
    try {
      this._stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16e3,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      this._setupAudioContext(this._stream);
      this._setupContinuousRecording();
      this._isRecording = true;
      this._lastSoundTime = Date.now();
      this._segmentStartTime = Date.now();
      this._startVadLoop();
      this.dispatchEvent(new CustomEvent("recordingstart", { detail: { startedAt: Date.now() } }));
      this._announceStatus("Recording started");
    } catch (error) {
      const err = error;
      this.dispatchEvent(new CustomEvent("error", { detail: { error: err } }));
      this._announceStatus("Error: Could not access microphone");
    }
  }
  /**
   * Stop microphone capture and cleanup.
   * No-op if already stopped.
   */
  stop() {
    if (this._isRecording === false)
      return;
    if (this._isCurrentlySpeaking === true) {
      this._endSpeechSegment();
    }
    this._isRecording = false;
    this._isCurrentlySpeaking = false;
    if (this._currentMediaRecorder && this._currentMediaRecorder.state === "recording") {
      try {
        this._currentMediaRecorder.stop();
      } catch (_) {
      }
    }
    if (this._stream) {
      try {
        this._stream.getTracks().forEach((track) => track.stop());
      } catch (_) {
      }
      this._stream = null;
    }
    if (this._audioContext) {
      try {
        this._audioContext.close();
      } catch (_) {
      }
      this._audioContext = null;
    }
    if (this._animationFrameId) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = 0;
    }
    this.dispatchEvent(new CustomEvent("recordingstop", { detail: { stoppedAt: Date.now() } }));
    this._announceStatus("Recording stopped");
  }
  /**
   * Toggle recording on or off.
   */
  async toggle() {
    if (this._isRecording === true) {
      this.stop();
      return;
    }
    await this.start();
  }
  /**
   * Update configuration at runtime. Values are in milliseconds unless noted.
   */
  configure(options = {}) {
    if (options.apiKey != null)
      this._apiKey = options.apiKey;
    if (options.model != null)
      this._model = options.model;
    if (options.silenceThresholdMs != null)
      this._silenceThresholdMs = options.silenceThresholdMs;
    if (options.minSpeechDurationMs != null)
      this._minSpeechDurationMs = options.minSpeechDurationMs;
    if (options.maxSegmentLengthMs != null)
      this._maxSegmentLengthMs = options.maxSegmentLengthMs;
    if (options.volumeThreshold != null)
      this._minVolumeForSpeech = options.volumeThreshold;
    if (options.silenceDetectionDb != null)
      this._silenceDetectionDb = options.silenceDetectionDb;
  }
  /**
   * Get current recording state.
   */
  get isRecording() {
    return this._isRecording === true;
  }
  /**
   * Get current speaking state according to VAD.
   */
  get isCurrentlySpeaking() {
    return this._isCurrentlySpeaking === true;
  }
  /**
   * Detect supported audio format for MediaRecorder.
   */
  _detectAudioFormat() {
    const formats = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/ogg",
      "audio/wav"
    ];
    for (const format of formats) {
      try {
        if (MediaRecorder.isTypeSupported(format)) {
          this._audioFormat = format;
          break;
        }
      } catch (_) {
      }
    }
  }
  /**
   * Initialize audio nodes for level analysis.
   */
  _setupAudioContext(stream) {
    this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this._analyser = this._audioContext.createAnalyser();
    this._microphone = this._audioContext.createMediaStreamSource(stream);
    this._analyser.fftSize = 512;
    this._analyser.smoothingTimeConstant = 0.1;
    this._microphone.connect(this._analyser);
  }
  /**
   * Prepare recording state for a new session.
   */
  _setupContinuousRecording() {
    this._currentAudioChunks = [];
    this._currentMediaRecorder = null;
  }
  /**
   * Begin recording a speech segment with MediaRecorder.
   */
  _startSpeechRecording() {
    if (this._currentMediaRecorder != null || !this._stream) {
      return;
    }
    const options = this._audioFormat ? { mimeType: this._audioFormat, audioBitsPerSecond: 128e3 } : { audioBitsPerSecond: 128e3 };
    this._currentMediaRecorder = new MediaRecorder(this._stream, options);
    this._currentAudioChunks = [];
    this._currentMediaRecorder.ondataavailable = (event) => {
      if (event && event.data && event.data.size > 0) {
        this._currentAudioChunks.push(event.data);
      }
    };
    this._currentMediaRecorder.onstop = () => {
      if (this._currentAudioChunks.length > 0) {
        const audioBlob = new Blob(this._currentAudioChunks, { type: this._audioFormat || "audio/webm" });
        this._processAudioBlob(audioBlob);
      }
      this._currentMediaRecorder = null;
      this._currentAudioChunks = [];
    };
    this._currentMediaRecorder.start(100);
  }
  /**
   * Stop recording the current speech segment.
   */
  _stopSpeechRecording() {
    if (this._currentMediaRecorder && this._currentMediaRecorder.state === "recording") {
      try {
        this._currentMediaRecorder.stop();
      } catch (_) {
      }
    }
  }
  /**
   * Voice Activity Detection loop.
   */
  _startVadLoop() {
    if (!this._analyser)
      return;
    const bufferLength = this._analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const loop = () => {
      if (this._isRecording === false)
        return;
      if (!this._analyser)
        return;
      this._analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      const decibels = 20 * Math.log10((average || 1) / 255);
      const now = Date.now();
      const isSpeechDetected = decibels > this._silenceDetectionDb;
      this.dispatchEvent(new CustomEvent("level", { detail: { average, decibels } }));
      if (isSpeechDetected === true) {
        this._lastSoundTime = now;
        if (this._isCurrentlySpeaking === false) {
          this._isCurrentlySpeaking = true;
          this._speechStartTime = now;
          this._startSpeechRecording();
          this.dispatchEvent(new CustomEvent("segmentstart", { detail: { startedAt: now } }));
        }
      }
      if (this._isCurrentlySpeaking === true) {
        const timeSinceLastSound = now - this._lastSoundTime;
        const speechDuration = now - this._speechStartTime;
        const isSilenceOverThreshold = timeSinceLastSound > this._silenceThresholdMs && speechDuration > this._minSpeechDurationMs;
        const isMaxSegmentReached = speechDuration > this._maxSegmentLengthMs;
        if (isSilenceOverThreshold === true || isMaxSegmentReached === true) {
          this._endSpeechSegment();
        }
      }
      this._animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }
  /**
   * End the current speaking segment and trigger processing.
   */
  _endSpeechSegment() {
    if (this._isCurrentlySpeaking === false)
      return;
    this._isCurrentlySpeaking = false;
    const endedAt = Date.now();
    const durationMs = endedAt - this._speechStartTime;
    this._stopSpeechRecording();
    this.dispatchEvent(new CustomEvent("segmentend", { detail: { endedAt, durationMs } }));
  }
  /**
   * Process an audio blob by sending it to the Whisper API.
   */
  async _processAudioBlob(audioBlob) {
    if (audioBlob == null || audioBlob.size < 1e4) {
      return;
    }
    this._processingQueue++;
    try {
      const transcript = await this._transcribeWithWhisper(audioBlob);
      const trimmed = transcript == null ? "" : String(transcript).trim();
      if (trimmed.length === 0)
        return;
      const cleaned = this._filterHallucinations(trimmed);
      if (cleaned == null)
        return;
      this.dispatchEvent(new CustomEvent("transcript", { detail: { text: cleaned } }));
    } catch (error) {
      const err = error;
      this.dispatchEvent(new CustomEvent("error", { detail: { error: err } }));
      this._announceStatus("Error processing speech segment");
    } finally {
      this._processingQueue--;
    }
  }
  /**
   * Reduce common false positives from Whisper on silence/noise.
   */
  _filterHallucinations(transcript) {
    const hallucinations = [
      "thank you for watching",
      "thank you for watching!",
      "thank you for watching.",
      "thanks for watching",
      "thanks for watching.",
      "thanks for watching!",
      "subscribe to our channel",
      "like and subscribe",
      "don't forget to subscribe",
      "please subscribe",
      "hit the subscribe button",
      "ring the bell",
      "see you next time",
      "see you in the next video",
      "bye",
      "goodbye",
      "thank you",
      "thanks",
      "you",
      "the",
      "and",
      "a",
      "to",
      "of"
    ];
    const lower = transcript.toLowerCase().trim();
    if (lower.length <= 3)
      return null;
    if (hallucinations.includes(lower) === true)
      return null;
    if (lower.split(" ").length <= 2 && lower.length < 10)
      return null;
    return transcript;
  }
  /**
   * Send audio to the Whisper transcription endpoint.
   */
  async _transcribeWithWhisper(audioBlob) {
    const formData = new FormData();
    let fileName = "audio.webm";
    const type = audioBlob.type || "";
    if (type.includes("ogg"))
      fileName = "audio.ogg";
    else if (type.includes("wav"))
      fileName = "audio.wav";
    else if (type.includes("mp4"))
      fileName = "audio.mp4";
    formData.append("file", audioBlob, fileName);
    formData.append("model", this._model);
    formData.append("language", "en");
    formData.append("response_format", "text");
    formData.append("temperature", "0");
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${this._apiKey}` },
      body: formData
    });
    if (response.ok === false) {
      const errorText = await response.text();
      let parsed;
      try {
        parsed = JSON.parse(errorText);
      } catch (_) {
      }
      const message = parsed && parsed.error && parsed.error.message ? parsed.error.message : `HTTP ${response.status}`;
      throw new Error(message);
    }
    const resultText = await response.text();
    return resultText;
  }
  /**
   * Announce a status message to live regions if present, and emit a status event.
   */
  _announceStatus(message) {
    if (typeof message !== "string" || message.trim().length === 0)
      return;
    try {
      announce(message, "polite", true);
    } catch (_) {
    }
    this.dispatchEvent(new CustomEvent("status", { detail: { message } }));
  }
}
const whisper = new WhisperDictation({ apiKey: "" });
const WHISPER_FIXED_SETTINGS = {
  model: "whisper-1",
  silenceThresholdMs: 1500,
  minSpeechDurationMs: 1e3,
  maxSegmentLengthMs: 1e4,
  volumeThreshold: 30,
  silenceDetectionDb: -35
};
whisper.configure(WHISPER_FIXED_SETTINGS);
window.interlocutor = window.interlocutor || {};
window.interlocutor.whisper = whisper;
window.interlocutor.startDictation = async () => {
  const indicator = document.querySelector("app-record-indicator");
  if (indicator) indicator.setAttribute("state", "not-ready");
  await whisper.start();
};
window.interlocutor.stopDictation = () => {
  whisper.stop();
  const indicator = document.querySelector("app-record-indicator");
  if (indicator) indicator.setAttribute("state", "idle");
};
whisper.addEventListener("status", (e) => {
  const detail = e.detail;
  if (detail && detail.message) {
    console.log("[Whisper][status]", detail.message);
  }
});
whisper.addEventListener("transcript", (e) => {
  const detail = e.detail;
  if (detail && detail.text) {
    console.log("[Whisper][transcript]", detail.text);
    const out = document.getElementById("transcript-output");
    if (out) {
      const prev = out.textContent || "";
      const next = prev.length > 0 ? `${prev}
${detail.text}` : detail.text;
      out.textContent = next;
      out.scrollTop = out.scrollHeight || 0;
    }
  }
});
whisper.addEventListener("error", (e) => {
  const detail = e.detail;
  console.error("[Whisper][error]", detail && detail.error);
});
whisper.addEventListener("recordingstart", () => {
  const indicator = document.querySelector("app-record-indicator");
  if (indicator) indicator.setAttribute("state", "ready");
});
whisper.addEventListener("recordingstop", () => {
  const indicator = document.querySelector("app-record-indicator");
  if (indicator) indicator.setAttribute("state", "idle");
});
whisper.addEventListener("segmentstart", () => {
  const indicator = document.querySelector("app-record-indicator");
  if (indicator) indicator.setAttribute("state", "ready");
});
document.addEventListener("DOMContentLoaded", () => {
  let hasApiKeyConfigured = false;
  try {
    const saved = localStorage.getItem("interlocutor.whisper.settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.apiKey === "string") {
        const key = String(parsed.apiKey);
        hasApiKeyConfigured = key.trim().length > 0;
        whisper.configure({ apiKey: key });
      }
    }
  } catch (err) {
    console.warn("[Settings] Failed to load saved settings on startup", err);
  }
  const listenButton = document.getElementById("btn-listen");
  const stopButton = document.getElementById("btn-stop");
  const clearButton = document.getElementById("btn-clear-transcript");
  const copyButton = document.getElementById("btn-copy-to-clipboard");
  const transcriptOut = document.getElementById("transcript-output");
  if (listenButton) {
    listenButton.addEventListener("click", async () => {
      try {
        await window.interlocutor.startDictation();
      } catch (err) {
        console.error("[UI] Failed to start dictation", err);
      }
    });
  }
  if (stopButton) {
    stopButton.addEventListener("click", () => {
      try {
        window.interlocutor.stopDictation();
      } catch (err) {
        console.error("[UI] Failed to stop dictation", err);
      }
    });
  }
  if (clearButton && transcriptOut) {
    clearButton.addEventListener("click", () => {
      transcriptOut.textContent = "";
    });
  }
  async function copyTranscriptToClipboard(transcriptElement) {
    const plainText = transcriptElement.innerText || "";
    const htmlContent = transcriptElement.innerHTML || "";
    if (!plainText && !htmlContent) return;
    try {
      const clipboard = navigator.clipboard;
      const ClipboardItemCtor = window.ClipboardItem;
      if (clipboard && typeof clipboard.write === "function" && ClipboardItemCtor) {
        const item = new ClipboardItemCtor({
          "text/plain": new Blob([plainText], { type: "text/plain" }),
          "text/html": new Blob([htmlContent], { type: "text/html" })
        });
        await clipboard.write([item]);
        return;
      }
      if (clipboard && typeof clipboard.writeText === "function") {
        await clipboard.writeText(plainText);
        return;
      }
      const selection = window.getSelection ? window.getSelection() : null;
      if (selection && document.createRange) {
        const range = document.createRange();
        range.selectNodeContents(transcriptElement);
        selection.removeAllRanges();
        selection.addRange(range);
        try {
          document.execCommand("copy");
        } finally {
          selection.removeAllRanges();
        }
        return;
      }
      const textarea = document.createElement("textarea");
      textarea.value = plainText;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(textarea);
      }
    } catch (err) {
      console.error("[UI] Failed to copy transcript", err);
    }
  }
  if (copyButton && transcriptOut) {
    copyButton.addEventListener("click", async () => {
      try {
        await copyTranscriptToClipboard(transcriptOut);
      } catch (err) {
        console.error("[UI] Failed to copy transcript", err);
      }
    });
  }
  function hydrateSettingsForm(root) {
    const settingsForm = root instanceof Document ? root.getElementById("settings-form") : root.querySelector("#settings-form");
    if (!settingsForm) return;
    const apiKeyInput = settingsForm.querySelector("#settings-api-key");
    try {
      const saved = localStorage.getItem("interlocutor.whisper.settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (apiKeyInput && typeof parsed.apiKey === "string") apiKeyInput.value = parsed.apiKey;
        if (parsed && typeof parsed.apiKey === "string") {
          const key = String(parsed.apiKey);
          hasApiKeyConfigured = key.trim().length > 0;
          whisper.configure({ apiKey: key });
        }
      }
    } catch (err) {
      console.warn("[Settings] Failed to load saved settings", err);
    }
    settingsForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const options = {};
      if (apiKeyInput && apiKeyInput.value) options.apiKey = apiKeyInput.value.trim();
      try {
        whisper.configure(options);
        localStorage.setItem("interlocutor.whisper.settings", JSON.stringify({ apiKey: options.apiKey || "" }));
        hasApiKeyConfigured = Boolean(options.apiKey && String(options.apiKey).trim().length > 0);
        console.log("[Settings] Saved");
      } catch (err) {
        console.error("[Settings] Failed to apply settings", err);
      }
    });
  }
  hydrateSettingsForm(document);
  const transcriptArea = document.getElementById("transcript-area");
  const mainPanel = document.getElementById("main-panel");
  if (window.htmx && transcriptArea && mainPanel) {
    document.body.addEventListener("htmx:afterSwap", (ev) => {
      const detail = ev.detail;
      if (!detail || !detail.target) return;
      if (detail.target === mainPanel) {
        const hasElementContent = mainPanel.firstElementChild !== null;
        if (hasElementContent) transcriptArea.classList.add("hidden");
        else transcriptArea.classList.remove("hidden");
        hydrateSettingsForm(mainPanel);
      }
    });
  }
  function showTranscript() {
    if (!transcriptArea || !mainPanel) return;
    mainPanel.innerHTML = "";
    transcriptArea.classList.remove("hidden");
  }
  async function loadSettingsFragment() {
    if (!transcriptArea || !mainPanel) return;
    const htmxRef = window.htmx;
    if (htmxRef && typeof htmxRef.ajax === "function") {
      htmxRef.ajax("GET", "./settings.html", "#main-panel");
    } else {
      try {
        const res = await fetch("./settings.html", { credentials: "same-origin" });
        const html = await res.text();
        mainPanel.innerHTML = html;
        hydrateSettingsForm(mainPanel);
      } catch (err) {
        console.error("[Router] Failed to load settings fragment", err);
      }
    }
    transcriptArea.classList.add("hidden");
  }
  function routeTo(hash) {
    const normalized = (hash || "").toLowerCase();
    if (normalized === "#settings") {
      const alreadyLoaded = (mainPanel == null ? void 0 : mainPanel.querySelector("#settings-form")) !== null;
      if (!alreadyLoaded) void loadSettingsFragment();
      else if (transcriptArea) transcriptArea.classList.add("hidden");
      return;
    }
    showTranscript();
  }
  window.addEventListener("hashchange", () => routeTo(window.location.hash));
  routeTo(window.location.hash);
  if (!hasApiKeyConfigured && window.location.hash.toLowerCase() !== "#settings") {
    window.location.hash = "#settings";
  }
});
export {
  WebPlugin as W
};
