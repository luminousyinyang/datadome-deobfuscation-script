// following 7 objects are dictionary type objs for modules to access other modules
// the module names are the keys in the objs and they kinda describe themselves.
// 1: common/DataDomeOptions sets current dd api options like host, version, listener paths, etc...
// 2: common/DataDomeTools" slight tools to add event listeners, get cookies, check dd status, etc...
// 3: fingerprint/DataDomeAnalyzer helps analyze the browser. most of the dd payload attributes are here
// 4: http/DataDomeRequest helps make the HTTP request for the user to get a dd cookie
// 5: http/DataDomeResponse helps analyze dd responses like captcha requests and such to satisfy user requirements while getting cookies and such.
// 6: loader func. first module accessed by script 
// 7: live-events/DataDomeAsyncChallengesTracking helps create challenges async.
// 8: live-events/DataDomeEventsTracking helps create mouse event listeners and trackers to analyze user movements.
// 9: services/DataDomeApiClient dd api client to help processing requests and such.

// easy way to check for how parts of the payload are calculated is 
// do a CTRL + F search on this script with the payload attribute name
// "ttst" for example shows 253. Normally recommended to add a "." in search since these are normally object properties
// if you look around ttst it just is the time taken for the script to run last async task.

// another example... "mmt" gets all the "docTypesBrowserSupportArr" elements in a string.
// its the mimtypes but I called it doctypes in the variable. basically just shows what pdf types are supported.

// one last example before I hit the road... "cokys" gets all the metric funcs and then base64 encodes it.
// after b64 encoding it just adds the "L=" string to the end. 

// almost all if not all of the payload for jsData can be found in the "reqBodyParamObj" Obj with its params being parts of the jsData params.
// reqBodyParamObj obj is found and filled up in module 3. (DataDomeAnalyzer)
var DictModForModule3 = {
  "./../common/DataDomeTools": 2
};
var DictModForModule4 = {
  "./../common/DataDomeTools": 2
};
var DictModForModule5 = {
  "./../common/DataDomeTools": 2
};
var DictModForModule6 = {
  "./common/DataDomeOptions": 1,
  "./common/DataDomeTools": 2,
  "./http/DataDomeResponse": 5,
  "./live-events/DataDomeAsyncChallengesTracking": 7,
  "./live-events/DataDomeEventsTracking": 8,
  "./services/DataDomeApiClient": 9
};
var DictModForModule7 = {
  "./../common/DataDomeTools": 2,
  "./../http/DataDomeRequest": 4
};
var DictModForModule8 = {
  "./../common/DataDomeTools": 2,
  "./../http/DataDomeRequest": 4
};
var DictModForModule9 = {
  "../common/DataDomeTools": 2,
  "./../fingerprint/DataDomeAnalyzer": 3,
  "./../http/DataDomeRequest": 4,
  "./../http/DataDomeResponse": 5
};
// Basically just a module loader func. Also IIFE to start at start of program.
! function i(moduleObj, objHoldingExports, intArray) {
  function moduleLoadFunc(intArrNumber, throwAwayVar) {
    if (!objHoldingExports[intArrNumber]) {
      if (!moduleObj[intArrNumber]) {
        var alwaysFalse = false;
        if (!throwAwayVar && alwaysFalse) return alwaysFalse(intArrNumber, true);
        if (alwaysFalse) return alwaysFalse(intArrNumber, true);
        var modError = new Error("Cannot find module '" + intArrNumber + "'");
        throw modError.code = "MODULE_NOT_FOUND", modError;
      }
      var emptyExportsObj = {
        "exports": {}
      };
      var exportAttrVal = objHoldingExports[intArrNumber] = emptyExportsObj;
      moduleObj[intArrNumber][0].call(exportAttrVal.exports, function(moduleAttrKey) {
        return moduleLoadFunc(moduleObj[intArrNumber][1][moduleAttrKey] || moduleAttrKey);
      }, exportAttrVal);
    }
    return objHoldingExports[intArrNumber].exports;
  }
  for (var alwaysFalse = false, idx = 0; idx < intArray.length; idx++) moduleLoadFunc(intArray[idx]);
  return moduleLoadFunc;
}({
  1: [function(throwAwayVar1, exportObj, throwAwayVar2) {
    exportObj.exports = function() {
      this.endpoint = "https://api-js.datadome.co/js/", this.version = "4.6.11", this.ajaxListenerPath = null, this.ajaxListenerPathExclusion = null, this.customParam = null, this.exposeCaptchaFunction = false, this.abortAsyncOnCaptchaDisplay = true, this.patternToRemoveFromReferrerUrl = null, this.eventsTrackingEnabled = true, this.overrideAbortFetch = false, this.ddResponsePage = "origin", this.isSalesforce = false, this.allowHtmlContentTypeOnCaptcha = false, this.disableAutoRefreshOnCaptchaPassed = false, this.enableTagEvents = false, this.withCredentials = false, this.overrideCookieDomain = false;
    };
  }, {}],
  2: [function(throwAwayVar1, exportObj, throwAwayVar2) {
    exportObj.exports = function() {
      var localStorageStatus,
        ddStatusObj = {};
      ddStatusObj.ready = "dd_ready", ddStatusObj.posting = "dd_post", ddStatusObj.posted = "dd_post_done", ddStatusObj.blocked = "dd_blocked", ddStatusObj.captchaDisplayed = "dd_captcha_displayed", ddStatusObj.captchaError = "dd_captcha_error", ddStatusObj.captchaPassed = "dd_captcha_passed", (this.dataDomeCookieName = "datadome", this.IECustomEvent = null, this.eventNames = ddStatusObj, this.getCookie = function(correlation_id) {
        correlation_id || (correlation_id = this.dataDomeCookieName);
        var cookieFound = new RegExp(correlation_id + "=([^;]+)").exec(document.cookie);
        return null != cookieFound ? unescape(cookieFound[1]) : null;
      }, this.setCookie = function(cookieToSet) {
        try {
          document.cookie = cookieToSet;
        } catch (err) {}
      }, this.replaceCookieDomain = function(cookie, hostName) {
        try {
          cookie = cookie.replace(/Domain=.*?;/, "Domain=" + hostName + ";");
        } catch (err) {}
        return cookie;
      }, this.debug = function(throwAwayVar1, throwAwayVar2) {
        "undefined" != typeof console && void 0 !== console.log && window.dataDomeOptions.debug;
      }, this.removeSubstringPattern = function(windowHref, regPattern) {
        return regPattern ? windowHref.replace(new RegExp(regPattern), function(stringtoReplace, regPattern) {
          return stringtoReplace.replace(regPattern, "");
        }) : windowHref;
      }, this.addEventListener = function(window, eventType, mousePosition, useCapture) {
        window.addEventListener ? window.addEventListener(eventType, mousePosition, useCapture) : void 0 !== window.attachEvent ? window.attachEvent("on" + eventType, mousePosition) : window["on" + eventType] = mousePosition;
      }, this.removeEventListener = function(window, eventType, mousePosition, useCapture) {
        window.removeEventListener ? window.removeEventListener(eventType, mousePosition, useCapture) : window.detachEvent && window.detachEvent("on" + eventType, mousePosition);
      }, this.noscroll = function() {
        window.scrollTo(0, 0);
      }, this.isSafariUA = function() {
        return !!window.navigator && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      });
      try {
        localStorageStatus = !!window.localStorage;
      } catch (err) {
        localStorageStatus = false;
      }
      this.isLocalStorageEnabled = localStorageStatus, this.dispatchEvent = function(eventName, objHoldingEndpoint) {
        var newCustomEvent;
        (objHoldingEndpoint = objHoldingEndpoint || {}).context = "tags", "function" == typeof window.CustomEvent ? newCustomEvent = new CustomEvent(eventName, {
          "detail": objHoldingEndpoint
        }) : (this.IECustomEvent || (this.IECustomEvent = function(eventNameType, eventDetails) {
          var webPageCustomEvent = document.createEvent("CustomEvent");
          return webPageCustomEvent.initCustomEvent(eventNameType, false, false, eventDetails), webPageCustomEvent;
        }), newCustomEvent = new this.IECustomEvent(eventName, objHoldingEndpoint)), newCustomEvent && window.dispatchEvent(newCustomEvent);
      }, this.matchURLParts = function(serverListenPath, responseURLwProtocol) {
        if ("string" != typeof responseURLwProtocol) return false;
        if (null == serverListenPath.host && null == serverListenPath.path && null == serverListenPath.query && null == serverListenPath.fragment) return null != serverListenPath.url && responseURLwProtocol.indexOf(serverListenPath.url) > -1;
        var responseURN,
          URNDomain = "",
          URNResourceSubDirectory = "",
          URNQuery = "",
          URNFragmentIdentifier = "",
          URLProtocolEnding = "//",
          URNDomainEnding = "/",
          indexOfURNStart = responseURLwProtocol.indexOf(URLProtocolEnding);
        if (responseURLwProtocol.indexOf("://") > -1 || 0 === indexOfURNStart) {
          var URLDomainEndingIDX = (responseURN = responseURLwProtocol.slice(indexOfURNStart + URLProtocolEnding.length)).indexOf(URNDomainEnding);
          URNDomain = responseURN.slice(0, URLDomainEndingIDX > -1 ? URLDomainEndingIDX : void 0);
        } else responseURN = responseURLwProtocol, URNDomain = document.location.host;
        var URNSubdirectoryStartIDX = responseURN.indexOf(URNDomainEnding),
          URNQueryStartIDX = responseURN.indexOf("?"),
          URNFragIdentifierStartIDX = responseURN.indexOf("#"),
          URNSubDirIndexElse0 = URNSubdirectoryStartIDX > -1 ? URNSubdirectoryStartIDX : 0;
        return URNQueryStartIDX > -1 && (URNResourceSubDirectory || (URNResourceSubDirectory = responseURN.slice(URNSubDirIndexElse0, URNQueryStartIDX)), URNQuery = responseURN.slice(URNQueryStartIDX, URNFragIdentifierStartIDX > -1 ? URNFragIdentifierStartIDX : void 0)), URNFragIdentifierStartIDX > -1 && (URNResourceSubDirectory || (URNResourceSubDirectory = responseURN.slice(URNSubDirIndexElse0, URNFragIdentifierStartIDX)), URNFragmentIdentifier = responseURN.slice(URNFragIdentifierStartIDX)), URNResourceSubDirectory || (URNResourceSubDirectory = responseURN.slice(URNSubDirIndexElse0)), null != serverListenPath.host && URNDomain.indexOf(serverListenPath.host) > -1 || null != serverListenPath.path && URNResourceSubDirectory.indexOf(serverListenPath.path) > -1 || null != serverListenPath.query && URNQuery.indexOf(serverListenPath.query) > -1 || null != serverListenPath.fragment && URNFragmentIdentifier.indexOf(serverListenPath.fragment) > -1 || null != serverListenPath.url && responseURLwProtocol.indexOf(serverListenPath.url) > -1;
      }, this.isAbsoluteUrl = function(urlParam) {
        return "string" == typeof urlParam && (-1 !== urlParam.indexOf("://") || 0 === urlParam.indexOf("//"));
      };
    };
  }, {}],
  3: [function(moduleLoadFuncParam, exportObj, throwAwayVar1) {
    var ddToolsModule = moduleLoadFuncParam("./../common/DataDomeTools"),
      funcToolsFunc = function(reqBodyParamObj) {
        function mobileUACheck() {
          return -1 === navigator.userAgent.toLowerCase().indexOf("android") && -1 === navigator.userAgent.toLowerCase().indexOf("iphone") && -1 === navigator.userAgent.toLowerCase().indexOf("ipad");
        }

        function StrToB64(strToEncode) {
          if (window.btoa) try {
            return window.btoa(strToEncode);
          } catch (err) {
            return "b_e";
          }
          return "b_u";
        }

        function reqContainsErr() {
          return !!(reqBodyParamObj.cfpp || reqBodyParamObj.slat || reqBodyParamObj.cfcpw || reqBodyParamObj.cffpw || reqBodyParamObj.cffrb || reqBodyParamObj.cfse);
        }

        function createChallEvent(eventChallName) {
          if (void 0 !== window.Event && "function" == typeof window.dispatchEvent) {
            var newEvent = new Event(eventChallName);
            window.dispatchEvent(newEvent);
          }
        }

        function finalWebGLPassFunc(msToGetCliInfo) {
          try {
            var checkIfErr = function() {
                var errBoolean = false;
                if (Object.defineProperty) try {
                  var newErr = new Error(),
                    errProps = {};
                  errProps.configurable = false, errProps.enumerable = false, errProps.get = function() {
                    return errBoolean = true, "";
                  }, (window.Object.defineProperty(newErr, "stack", errProps), window.console.debug(newErr));
                } catch (err) {}
                return errBoolean;
              }(),
              usedForDecimalLength = "4644811086";
            if ("NA" == msToGetCliInfo) return checkIfErr ? "NA0" : msToGetCliInfo;
            for (var msDecimalIndex = (msToGetCliInfo = msToGetCliInfo.toString().split("")).indexOf("."), index = 0; index < usedForDecimalLength.length; index++) msToGetCliInfo[msDecimalIndex + 1 + index] = checkIfErr ? usedForDecimalLength[index] : msToGetCliInfo[msDecimalIndex + 1 + index];
            return parseFloat(msToGetCliInfo.join(""));
          } catch (err) {
            return msToGetCliInfo;
          }
        }

        function windowAttributesForReq(browserWindow) {
          var windowNavigator = browserWindow.navigator,
            webGLBrowserCheck = function(browserWindow) {
              var timeToGetClientInfo,
                GPU_InfoObjCopy = {};
              if (mobileUACheck()) try {
                var debugGPUCompanyInfo,
                  debugGPUInfo,
                  timeSinceScriptStart = performance.now(),
                  elementObjContext = browserWindow.document.createElement("canvas").getContext("webgl");
                if (browserWindow.navigator.buildID && +/Firefox\/(\d+)/.exec(browserWindow.navigator.userAgent)[1] > 91) debugGPUCompanyInfo = elementObjContext.VENDOR, debugGPUInfo = elementObjContext.RENDERER;
                else {
                  var debugInfoObj = elementObjContext.getExtension("WEBGL_debug_renderer_info");
                  debugGPUCompanyInfo = debugInfoObj.UNMASKED_VENDOR_WEBGL, debugGPUInfo = debugInfoObj.UNMASKED_RENDERER_WEBGL;
                }
                var GPU_Company = elementObjContext.getParameter(debugGPUCompanyInfo),
                  GPU_Used = elementObjContext.getParameter(debugGPUInfo),
                  GPU_InfoOBJ = {};
                GPU_InfoOBJ.vd = GPU_Company, GPU_InfoOBJ.rd = GPU_Used, (timeToGetClientInfo = performance.now() - timeSinceScriptStart + Math.random(), GPU_InfoObjCopy = GPU_InfoOBJ);
              } catch (err) {
                var NAObjAttrs = {
                  "vd": "NA",
                  "rd": "NA"
                };
                (timeToGetClientInfo = "NA", GPU_InfoObjCopy = NAObjAttrs);
              } else timeToGetClientInfo = 10 * Math.random();
              return reqBodyParamObj.tagpu = finalWebGLPassFunc(timeToGetClientInfo), GPU_InfoObjCopy;
            }(browserWindow);
          return {
            "glvd": webGLBrowserCheck.vd,
            "glrd": webGLBrowserCheck.rd,
            "br_oh": browserWindow.outerHeight,
            "br_ow": browserWindow.outerWidth,
            "ua": windowNavigator.userAgent,
            "hc": windowNavigator.hardwareConcurrency,
            "wbd": !!windowNavigator.webdriver,
            "pf": windowNavigator.platform,
            "mob": windowNavigator.userAgentData ? windowNavigator.userAgentData.mobile : "NA",
            "lngs": JSON.stringify(windowNavigator.languages),
            "mtp": windowNavigator.maxTouchPoints,
            "sel": !!browserWindow.cdc_adoQpoasnfa76pfcZLmcfl_Array || !(!browserWindow.document || !browserWindow.document.$cdc_asdjflasutopfhvcZLmcfl_)
          };
        }

        function getContentWinProps(contentWindow) {
          var contextWinPropsObj = {
            "ts": contentWindow.toString,
            "plu": contentWindow.navigator.plugins,
            "ce": contentWindow.document.createElement
          };
          return contextWinPropsObj;
        }
        var MouseEveObj;
        this.dataDomeTools = new ddToolsModule(), this.i = null, this.process = function() {
          this.checkMousePosition(), this.asynchronizeTask(this.dd_a), this.asynchronizeTask(this.dd_b), this.asynchronizeTask(this.dd_c), this.asynchronizeTask(this.dd_d), this.asynchronizeTask(this.dd_e), this.asynchronizeTask(this.dd_f), this.asynchronizeTask(this.dd_g), this.asynchronizeTask(this.dd_h), this.asynchronizeTask(this.dd_i), this.asynchronizeTask(this.dd_j), this.asynchronizeTask(this.dd_k), this.asynchronizeTask(this.dd_l), this.asynchronizeTask(this.dd_m), this.asynchronizeTask(this.dd_n), this.asynchronizeTask(this.dd_o), this.asynchronizeTask(this.dd_p), this.asynchronizeTask(this.dd_q), this.asynchronizeTask(this.dd_r), this.asynchronizeTask(this.dd_s), this.asynchronizeTask(this.dd_t), this.asynchronizeTask(this.dd_u), this.asynchronizeTask(this.dd_v), this.asynchronizeTask(this.dd_w), this.asynchronizeTask(this.dd_x), this.asynchronizeTask(this.dd_y), this.asynchronizeTask(this.dd_z), this.asynchronizeTask(this.dd_A), this.asynchronizeTask(this.dd_B), this.asynchronizeTask(this.dd_C), this.asynchronizeTask(this.dd_D), this.asynchronizeTask(this.dd_E), this.asynchronizeTask(this.dd_F), this.asynchronizeTask(this.dd_G), this.asynchronizeTask(this.dd_H), this.asynchronizeTask(this.dd_I), this.asynchronizeTask(this.dd_J), this.asynchronizeTask(this.dd_K), this.asynchronizeTask(this.dd_L), this.asynchronizeTask(this.dd_M), this.asynchronizeTask(this.dd_N), this.asynchronizeTask(this.dd_O), this.asynchronizeTask(this.dd_P), this.asynchronizeTask(this.dd_Q), this.asynchronizeTask(this.dd_R), this.asynchronizeTask(this.dd_S), this.asynchronizeTask(this.dd_T), this.asynchronizeTask(this.dd_U), this.asynchronizeTask(this.dd_V), this.asynchronizeTask(this.dd_W), this.asynchronizeTask(this.dd_X), this.asynchronizeTask(this.dd_Y), this.asynchronizeTask(this.dd_Z), mobileUACheck() && (this.asynchronizeTask(this.dd_aa), this.asynchronizeTask(this.dd_ab), this.asynchronizeTask(this.dd_ac), this.asynchronizeTask(this.dd_ad)), "05B30BD9055986BD2EE8F5A199D973" === window.ddjskey && this.asynchronizeTask(this.dd_ae), "2211F522B61E269B869FA6EAFFB5E1" === window.ddjskey && this.asynchronizeTask(this.dd_af);
        }, this.asynchronizeTask = function(callbackFunc, throwAwayParam, milliseconds) {
          var selfFuncCalller = this;
          setTimeout(function() {
            reqBodyParamObj.ttst || (reqBodyParamObj.ttst = 0);
            var timeSinceScriptStart = performance.now();
            try {
              callbackFunc.call(selfFuncCalller, throwAwayParam);
            } catch (err) {} finally {
              reqBodyParamObj.ttst += performance.now() - timeSinceScriptStart;
            }
          }, milliseconds);
        }, this.clean = function() {
          this.dataDomeTools.removeEventListener(window, "mousemove", this.getMousePosition);
        }, this.dd_a = function() {
          try {
            document.createElement(34);
          } catch (err) {
            try {
              var stack = err.stack.split("\n");
              stack.length >= 2 ? reqBodyParamObj.ifov = !!stack[1].match(/Ob[cej]{3}t\.a[lp]{3}y[\(< ]{3}an[oynm]{5}us>/) : reqBodyParamObj.ifov = "e1";
            } catch (err) {
              reqBodyParamObj.ifov = "e2";
            }
          }
        }, this.dd_b = function() {
          try {
            var iframeEleme = document.createElement("iframe");
            iframeEleme.srcdoc = "/**/", iframeEleme.setAttribute("style", "display: none;"), document && document.head && (document.head.appendChild(iframeEleme), this.i = iframeEleme, this.o = windowAttributesForReq(iframeEleme.contentWindow), this.h = getContentWinProps(iframeEleme.contentWindow));
          } catch (err) {}
        }, this.dd_f = function() {
          try {
            var iframeEleContentWinNav = this.i.contentWindow.navigator;
            document.head.removeChild(this.i), this.i = null;
            var userWinOSPlatform = window.navigator.platform,
              iframeEleOSPlatform = iframeEleContentWinNav.platform;
            iframeEleOSPlatform !== userWinOSPlatform && (reqBodyParamObj.dil = StrToB64(iframeEleOSPlatform + "__" + userWinOSPlatform));
          } catch (err) {}
        }, this.dd_c = function() {
          var windowAttributes = windowAttributesForReq(window);
          reqBodyParamObj.glvd = windowAttributes.glvd, reqBodyParamObj.glrd = windowAttributes.glrd, reqBodyParamObj.hc = windowAttributes.hc, reqBodyParamObj.br_oh = windowAttributes.br_oh, reqBodyParamObj.br_ow = windowAttributes.br_ow, reqBodyParamObj.ua = windowAttributes.ua, reqBodyParamObj.wbd = windowAttributes.wbd;
          try {
            function getIframeAttrKeyIndexes(winAttributesObjiFrame, contentWinPropObj) {
              var iFrameWinAttrKeyIndexesArr = [],
                iFrameWinAttrValsArr = [];
              for (var iFrameWinAttrIndex in winAttributesObjiFrame) winAttributesObjiFrame[iFrameWinAttrIndex] !== contentWinPropObj[iFrameWinAttrIndex] && (iFrameWinAttrKeyIndexesArr.push(iFrameWinAttrIndex), iFrameWinAttrValsArr.push(winAttributesObjiFrame[iFrameWinAttrIndex]));
              return {
                "keysDelta": iFrameWinAttrKeyIndexesArr.join(),
                "deltaVals": iFrameWinAttrValsArr.join()
              };
            }
            var iFrameWinAttrObj1 = getIframeAttrKeyIndexes(this.o, windowAttributes);
            iFrameWinAttrObj1.keysDelta && (reqBodyParamObj.sivd = iFrameWinAttrObj1.keysDelta, reqBodyParamObj.log2 = StrToB64(iFrameWinAttrObj1.deltaVals.slice(0, 300)));
            var contentWinPropObj = getContentWinProps(this.i.contentWindow),
              iFrameWinAttrObj2 = getIframeAttrKeyIndexes(this.h, contentWinPropObj);
            iFrameWinAttrObj2.keysDelta && (reqBodyParamObj.sird = iFrameWinAttrObj2.keysDelta);
          } catch (err) {
            reqBodyParamObj.log1 = StrToB64(err.message);
          }
        }, this.dd_v = function() {
          function checkRangeErrFunc(ObjErr) {
            return "RangeError" === ObjErr.name;
          }

          function checkIfString(objPrototype) {
            if ("string" == typeof objPrototype.stack) {
              var objPrototypeStack = objPrototype.stack.split("\n");
              if (objPrototypeStack.length > 2) return 0 === objPrototypeStack[0].indexOf("TypeError: Cyclic") && objPrototypeStack[1].indexOf("at Object.setPro") > -1;
            }
          }

          function printObjToString(objectParam) {
            var typeOfObj = Object.getPrototypeOf(objectParam);
            try {
              Object.setPrototypeOf(objectParam, objectParam).toString();
            } catch (err) {
              return err;
            } finally {
              Object.setPrototypeOf(objectParam, typeOfObj);
            }
            return false;
          }
          window.chrome || (reqBodyParamObj.hcovdr = false, reqBodyParamObj.plovdr = false, reqBodyParamObj.ftsovdr = false, reqBodyParamObj.hcovdr2 = false, reqBodyParamObj.plovdr2 = false, reqBodyParamObj.ftsovdr2 = false);
          try {
            var returnedErr = printObjToString(Object.getOwnPropertyDescriptor(navigator.__proto__, "hardwareConcurrency").get);
            reqBodyParamObj.hcovdr = checkRangeErrFunc(returnedErr), reqBodyParamObj.hcovdr2 = checkIfString(returnedErr);
          } catch (err) {
            reqBodyParamObj.hcovdr = false, reqBodyParamObj.hcovdr2 = false;
          }
          try {
            var returnedErr = printObjToString(Object.getOwnPropertyDescriptor(navigator.__proto__, "platform").get);
            reqBodyParamObj.plovdr = checkRangeErrFunc(returnedErr), reqBodyParamObj.plovdr2 = checkIfString(returnedErr);
          } catch (err) {
            reqBodyParamObj.plovdr = false, reqBodyParamObj.plovdr2 = false;
          }
          try {
            var returnedErr = printObjToString(Function.prototype.toString);
            reqBodyParamObj.ftsovdr = checkRangeErrFunc(returnedErr), reqBodyParamObj.ftsovdr2 = checkIfString(returnedErr);
          } catch (err) {
            reqBodyParamObj.ftsovdr = false, reqBodyParamObj.ftsovdr2 = false;
          }
        }, this.dd_d = function() {
          try {
            var iFrameEle = this.i;
            reqBodyParamObj.wdif = !!iFrameEle.contentWindow.navigator.webdriver, reqBodyParamObj.wdifrm = iFrameEle.contentWindow === window || iFrameEle.contentWindow.setTimeout === window.setTimeout, reqBodyParamObj.iwgl = iFrameEle.contentWindow.self && iFrameEle.contentWindow.self.get && iFrameEle.contentWindow.self.get.toString && iFrameEle.contentWindow.self.get.toString().length;
          } catch (err) {
            reqBodyParamObj.wdif = "err";
          }
        }, this.dd_g = function() {
          reqBodyParamObj.br_h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), reqBodyParamObj.br_w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }, this.dd_i = function() {
          reqBodyParamObj.rs_h = window.screen.height, reqBodyParamObj.rs_w = window.screen.width, reqBodyParamObj.rs_cd = window.screen.colorDepth;
        }, this.dd_ac = function() {
          try {
            var canvasElement = document.createElement("canvas");
            reqBodyParamObj.cvs = !(!canvasElement.getContext || !canvasElement.getContext("2d"));
          } catch (err) {
            reqBodyParamObj.cvs = false;
          }
        }, this.dd_j = function() {
          reqBodyParamObj.phe = !(!window.callPhantom && !window._phantom);
        }, this.dd_k = function() {
          reqBodyParamObj.nm = !!window.__nightmare;
        }, this.dd_l = function() {
          reqBodyParamObj.jsf = false, (!Function.prototype.bind || Function.prototype.bind.toString().replace(/bind/g, "Error") != Error.toString() && void 0 === window.Prototype) && (reqBodyParamObj.jsf = true);
        }, this.dd_n = function() {
          reqBodyParamObj.lg = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "";
        }, this.dd_o = function() {
          reqBodyParamObj.pr = window.devicePixelRatio || "unknown";
        }, this.dd_q = function() {
          reqBodyParamObj.ars_h = screen.availHeight || 0, reqBodyParamObj.ars_w = screen.availWidth || 0;
        }, this.dd_r = function() {
          reqBodyParamObj.tz = new Date().getTimezoneOffset();
        }, this.dd_ab = function() {
          reqBodyParamObj.tzp = "NA", window.Intl && Intl.DateTimeFormat && "function" == typeof Intl.DateTimeFormat.prototype.resolvedOptions && (reqBodyParamObj.tzp = Intl.DateTimeFormat().resolvedOptions().timeZone || "NA");
        }, this.dd_s = function() {
          try {
            reqBodyParamObj.str_ss = !!window.sessionStorage;
          } catch (err) {
            reqBodyParamObj.str_ss = "NA";
          }
          try {
            reqBodyParamObj.str_ls = !!window.localStorage;
          } catch (err) {
            reqBodyParamObj.str_ls = "NA";
          }
          try {
            reqBodyParamObj.str_idb = !!window.indexedDB;
          } catch (err) {
            reqBodyParamObj.str_idb = "NA";
          }
          try {
            reqBodyParamObj.str_odb = !!window.openDatabase;
          } catch (err) {
            reqBodyParamObj.str_odb = "NA";
          }
        }, this.dd_t = function() {
          try {
            if (reqBodyParamObj.plgod = false, reqBodyParamObj.plg = navigator.plugins.length, reqBodyParamObj.plgne = "NA", reqBodyParamObj.plgre = "NA", reqBodyParamObj.plgof = "NA", reqBodyParamObj.plggt = "NA", reqBodyParamObj.plgod = !!Object.getOwnPropertyDescriptor(navigator, "plugins"), navigator.plugins && navigator.plugins.length > 0 && "string" == typeof navigator.plugins[0].name) {
              try {
                navigator.plugins[0].length;
              } catch (err) {
                reqBodyParamObj.plgod = true;
              }
              try {
                reqBodyParamObj.plgne = navigator.plugins[0].name === navigator.plugins[0][0].enabledPlugin.name, reqBodyParamObj.plgre = navigator.plugins[0][0].enabledPlugin === navigator.plugins[0], reqBodyParamObj.plgof = navigator.plugins.item(859523698994125) === navigator.plugins[0], reqBodyParamObj.plggt = Object.getOwnPropertyDescriptor(navigator.__proto__, "plugins").get.toString().indexOf("return") > -1;
              } catch (err) {
                reqBodyParamObj.plgne = "err", reqBodyParamObj.plgre = "err", reqBodyParamObj.plgof = "err", reqBodyParamObj.plggt = "err";
              }
            }
          } catch (err) {
            reqBodyParamObj.plg = 0;
          }
        }, this.dd_u = function() {
          reqBodyParamObj.pltod = !!Object.getOwnPropertyDescriptor(navigator, "platform");
        }, this.dd_w = function() {
          reqBodyParamObj.lb = false;
          var typeOfBrowser,
            userAgentLowerCase = navigator.userAgent.toLowerCase();
          "Chrome" !== (typeOfBrowser = userAgentLowerCase.indexOf("firefox") >= 0 ? "Firefox" : userAgentLowerCase.indexOf("opera") >= 0 || userAgentLowerCase.indexOf("opr") >= 0 ? "Opera" : userAgentLowerCase.indexOf("chrome") >= 0 ? "Chrome" : userAgentLowerCase.indexOf("safari") >= 0 ? "Safari" : userAgentLowerCase.indexOf("trident") >= 0 ? "Internet Explorer" : "Other") && "Safari" !== typeOfBrowser && "Opera" !== typeOfBrowser || "20030107" === navigator.productSub || (reqBodyParamObj.lb = true);
          var browserUAlength = eval.toString().length;
          reqBodyParamObj.eva = browserUAlength, (37 === browserUAlength && "Safari" !== typeOfBrowser && "Firefox" !== typeOfBrowser && "Other" !== typeOfBrowser || 39 === browserUAlength && "Internet Explorer" !== typeOfBrowser && "Other" !== typeOfBrowser || 33 === browserUAlength && "Chrome" !== typeOfBrowser && "Opera" !== typeOfBrowser && "Other" !== typeOfBrowser) && (reqBodyParamObj.lb = true);
        }, this.dd_x = function() {
          reqBodyParamObj.lo = false;
          var typeOfUserAgent,
            userAgentLowerCase = navigator.userAgent.toLowerCase(),
            CPUOperatingSystem = navigator.oscpu,
            operatingSystem = navigator.platform.toLowerCase();
          typeOfUserAgent = userAgentLowerCase.indexOf("windows phone") >= 0 ? "Windows Phone" : userAgentLowerCase.indexOf("win") >= 0 ? "Windows" : userAgentLowerCase.indexOf("android") >= 0 ? "Android" : userAgentLowerCase.indexOf("linux") >= 0 ? "Linux" : userAgentLowerCase.indexOf("iphone") >= 0 || userAgentLowerCase.indexOf("ipad") >= 0 ? "iOS" : userAgentLowerCase.indexOf("mac") >= 0 ? "Mac" : "Other", ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && "Windows Phone" !== typeOfUserAgent && "Android" !== typeOfUserAgent && "iOS" !== typeOfUserAgent && "Other" !== typeOfUserAgent && (reqBodyParamObj.lo = true), void 0 !== CPUOperatingSystem && ((CPUOperatingSystem = CPUOperatingSystem.toLowerCase()).indexOf("win") >= 0 && "Windows" !== typeOfUserAgent && "Windows Phone" !== typeOfUserAgent || CPUOperatingSystem.indexOf("linux") >= 0 && "Linux" !== typeOfUserAgent && "Android" !== typeOfUserAgent || CPUOperatingSystem.indexOf("mac") >= 0 && "Mac" !== typeOfUserAgent && "iOS" !== typeOfUserAgent || 0 === CPUOperatingSystem.indexOf("win") && 0 === CPUOperatingSystem.indexOf("linux") && CPUOperatingSystem.indexOf("mac") >= 0 && "other" !== typeOfUserAgent) && (reqBodyParamObj.lo = true), (operatingSystem.indexOf("win") >= 0 && "Windows" !== typeOfUserAgent && "Windows Phone" !== typeOfUserAgent || (operatingSystem.indexOf("linux") >= 0 || operatingSystem.indexOf("android") >= 0 || operatingSystem.indexOf("pike") >= 0) && "Linux" !== typeOfUserAgent && "Android" !== typeOfUserAgent || (operatingSystem.indexOf("mac") >= 0 || operatingSystem.indexOf("ipad") >= 0 || operatingSystem.indexOf("ipod") >= 0 || operatingSystem.indexOf("iphone") >= 0) && "Mac" !== typeOfUserAgent && "iOS" !== typeOfUserAgent || 0 === operatingSystem.indexOf("win") && 0 === operatingSystem.indexOf("linux") && operatingSystem.indexOf("mac") >= 0 && "other" !== typeOfUserAgent) && (reqBodyParamObj.lo = true), void 0 === navigator.plugins && "Windows" !== typeOfUserAgent && "Windows Phone" !== typeOfUserAgent && (reqBodyParamObj.lo = true);
        }, this.dd_y = function() {
          reqBodyParamObj.ts_mtp = navigator.maxTouchPoints || navigator.msMaxTouchPoints || 0;
          try {
            document.createEvent("TouchEvent"), reqBodyParamObj.ts_tec = true;
          } catch (err) {
            reqBodyParamObj.ts_tec = false;
          }
          reqBodyParamObj.ts_tsa = "ontouchstart" in window;
        }, this.dd_ad = function() {
          window.navigator.usb ? reqBodyParamObj.usb = "defined" : reqBodyParamObj.usb = "NA";
        }, this.dd_z = function() {
          reqBodyParamObj.vnd = window.navigator.vendor;
        }, this.dd_A = function() {
          reqBodyParamObj.bid = window.navigator.buildID || "NA";
        }, this.dd_B = function() {
          if (window.navigator.mimeTypes) {
            if (0 == window.navigator.mimeTypes.length) reqBodyParamObj.mmt = "empty";
            else {
              for (var docTypesBrowserSupportArr = [], index = 0; index < window.navigator.mimeTypes.length; index++) docTypesBrowserSupportArr.push(window.navigator.mimeTypes[index].type);
              reqBodyParamObj.mmt = docTypesBrowserSupportArr.join();
            }
          } else reqBodyParamObj.mmt = "NA";
        }, this.dd_C = function() {
          if (window.navigator.plugins) {
            if (0 == window.navigator.plugins.length) reqBodyParamObj.plu = "empty";
            else {
              for (var plugInNames = [], index = 0; index < window.navigator.plugins.length; index++) plugInNames.push(window.navigator.plugins[index].name);
              reqBodyParamObj.plu = plugInNames.join();
            }
          } else reqBodyParamObj.plu = "NA";
        }, this.dd_D = function() {
          reqBodyParamObj.hdn = !!document.hidden;
        }, this.dd_E = function() {
          reqBodyParamObj.awe = !!window.awesomium;
        }, this.dd_F = function() {
          reqBodyParamObj.geb = !!window.geb;
        }, this.dd_G = function() {
          reqBodyParamObj.dat = "domAutomation" in window || "domAutomationController" in window;
        }, this.dd_H = function() {
          window.navigator.mediaDevices ? reqBodyParamObj.med = "defined" : reqBodyParamObj.med = "NA";
        }, this.dd_I = function() {
          try {
            var audioElement = document.createElement("audio"),
              mediSource = MediaSource || WebKitMediaSource;
            reqBodyParamObj.aco = audioElement.canPlayType("audio/ogg; codecs=\"vorbis\""), reqBodyParamObj.acots = mediSource.isTypeSupported("audio/ogg; codecs=\"vorbis\""), reqBodyParamObj.acmp = audioElement.canPlayType("audio/mpeg;"), reqBodyParamObj.acmpts = mediSource.isTypeSupported("audio/mpeg;\""), reqBodyParamObj.acw = audioElement.canPlayType("audio/wav; codecs=\"1\""), reqBodyParamObj.acwts = mediSource.isTypeSupported("audio/wav; codecs=\"1\""), reqBodyParamObj.acma = audioElement.canPlayType("audio/x-m4a;"), reqBodyParamObj.acmats = mediSource.isTypeSupported("audio/x-m4a;"), reqBodyParamObj.acaa = audioElement.canPlayType("audio/aac;"), reqBodyParamObj.acaats = mediSource.isTypeSupported("audio/aac;"), reqBodyParamObj.ac3 = audioElement.canPlayType("audio/3gpp;"), reqBodyParamObj.ac3ts = mediSource.isTypeSupported("audio/3gpp;"), reqBodyParamObj.acf = audioElement.canPlayType("audio/flac;"), reqBodyParamObj.acfts = mediSource.isTypeSupported("audio/flac;"), reqBodyParamObj.acmp4 = audioElement.canPlayType("audio/mp4;"), reqBodyParamObj.acmp4ts = mediSource.isTypeSupported("audio/mp4;"), reqBodyParamObj.acmp3 = audioElement.canPlayType("audio/mp3;"), reqBodyParamObj.acmp3ts = mediSource.isTypeSupported("audio/mp3;"), reqBodyParamObj.acwm = audioElement.canPlayType("audio/webm;"), reqBodyParamObj.acwmts = mediSource.isTypeSupported("audio/webm;"), reqBodyParamObj.ocpt = -1 === audioElement.canPlayType.toString().indexOf("canPlayType");
          } catch (err) {
            reqBodyParamObj.aco = "NA", reqBodyParamObj.acmp = "NA", reqBodyParamObj.acw = "NA", reqBodyParamObj.acma = "NA", reqBodyParamObj.acaa = "NA", reqBodyParamObj.ac3 = "NA", reqBodyParamObj.acf = "NA", reqBodyParamObj.acmp4 = "NA", reqBodyParamObj.acmp3 = "NA", reqBodyParamObj.acwm = "NA", reqBodyParamObj.acots = "NA", reqBodyParamObj.acmpts = "NA", reqBodyParamObj.acwts = "NA", reqBodyParamObj.acmats = "NA", reqBodyParamObj.acaats = "NA", reqBodyParamObj.ac3ts = "NA", reqBodyParamObj.acfts = "NA", reqBodyParamObj.acmp4ts = "NA", reqBodyParamObj.acmp3ts = "NA", reqBodyParamObj.acwmts = "NA";
          }
        }, this.dd_J = function() {
          try {
            var videoElement = document.createElement("video"),
              mediSource = MediaSource || WebKitMediaSource;
            reqBodyParamObj.vco = videoElement.canPlayType("video/ogg; codecs=\"theora\""), reqBodyParamObj.vcots = mediSource.isTypeSupported("video/ogg; codecs=\"theora\""), reqBodyParamObj.vch = videoElement.canPlayType("video/mp4; codecs=\"avc1.42E01E\""), reqBodyParamObj.vchts = mediSource.isTypeSupported("video/mp4; codecs=\"avc1.42E01E\""), reqBodyParamObj.vcw = videoElement.canPlayType("video/webm; codecs=\"vp8, vorbis\""), reqBodyParamObj.vcwts = mediSource.isTypeSupported("video/webm; codecs=\"vp8, vorbis\""), reqBodyParamObj.vc3 = videoElement.canPlayType("video/3gpp;"), reqBodyParamObj.vc3ts = mediSource.isTypeSupported("video/3gpp;"), reqBodyParamObj.vcmp = videoElement.canPlayType("video/mpeg;"), reqBodyParamObj.vcmpts = mediSource.isTypeSupported("video/mpeg"), reqBodyParamObj.vcq = videoElement.canPlayType("video/quicktime;"), reqBodyParamObj.vcqts = mediSource.isTypeSupported("video/quicktime;"), reqBodyParamObj.vc1 = videoElement.canPlayType("video/mp4; codecs=\"av01.0.08M.08\""), reqBodyParamObj.vc1ts = mediSource.isTypeSupported("video/mp4; codecs=\"av01.0.08M.08\"");
          } catch (err) {
            reqBodyParamObj.vco = "NA", reqBodyParamObj.vch = "NA", reqBodyParamObj.vcw = "NA", reqBodyParamObj.vc3 = "NA", reqBodyParamObj.vcmp = "NA", reqBodyParamObj.vcq = "NA", reqBodyParamObj.vc1 = "NA", reqBodyParamObj.vcots = "NA", reqBodyParamObj.vchts = "NA", reqBodyParamObj.vcwts = "NA", reqBodyParamObj.vc3ts = "NA", reqBodyParamObj.vcmpts = "NA", reqBodyParamObj.vcqts = "NA", reqBodyParamObj.vc1ts = "NA";
          }
        }, this.dd_K = function() {
          reqBodyParamObj.dvm = navigator.deviceMemory || -1;
        }, this.dd_L = function() {
          reqBodyParamObj.sqt = window.external && window.external.toString && window.external.toString().indexOf("Sequentum") > -1;
        }, this.dd_M = function() {
          try {
            reqBodyParamObj.so = window.screen.orientation.type;
          } catch (err) {
            try {
              reqBodyParamObj.so = window.screen.msOrientation;
            } catch (err) {
              reqBodyParamObj.so = "NA";
            }
          }
        }, this.dd_R = function() {
          "object" == typeof window.process && "renderer" === window.process.type || "undefined" != typeof process && "object" == typeof process.versions && process.versions.electron || window.close.toString().indexOf("ELECTRON") > -1 ? reqBodyParamObj.ecpc = true : reqBodyParamObj.ecpc = !!window.process;
        }, this.dd_Q = function() {
          if (reqBodyParamObj.wdw = true, navigator.userAgent.toLowerCase().indexOf("chrome") >= 0 && !window.chrome && (reqBodyParamObj.wdw = false), window.chrome) {
            var allChromeMetrics = "";
            for (var chromeMetricsAttrs in window.chrome) allChromeMetrics += chromeMetricsAttrs;
            reqBodyParamObj.cokys = StrToB64(allChromeMetrics) + "L=";
          }
        }, this.dd_aa = function() {
          var notificationsObj = {
            "name": "notifications"
          };
          (reqBodyParamObj.prm = true, void 0 !== navigator.permissions && void 0 !== navigator.permissions.query && navigator.permissions.query(notificationsObj).then(function(notificationsObj) {
            "undefined" != typeof Notification && "denied" == Notification.permission && "prompt" == notificationsObj.state && (reqBodyParamObj.prm = false);
          })["catch"](function() {}));
        }, this.dd_S = function() {
          reqBodyParamObj.lgs = "" !== navigator.languages, reqBodyParamObj.lgsod = !!Object.getOwnPropertyDescriptor(navigator, "languages");
        }, this.dd_T = function() {
          var allDocElesWork = true,
            hasDeviceMemory = !!navigator.deviceMemory,
            hasBrowserBuildID = !!navigator.buildID,
            errStackPuppeteer = /[p_]{3}up[tep]{4}er[ae_v]{4}lua[noti]{4}/,
            errStackRegexCodeExecution = /eval\sat\sevaluate|@chrome|evaluate@/,
            errStackRegexApplyEle = /apply\.(css\sselector|xpath|(partial\s)?link\stext)/,
            intNum50 = 50;

          function testDocumentEleFuncs(documentGetEleFunc) {
            return "function" != typeof documentGetEleFunc || true === navigator.webdriver ? documentGetEleFunc : documentGetEleFunc.toString().match(/\{\s*\[native code\]\s*\}$/m) && documentGetEleFunc.toString.toString().match(/\{\s*\[native code\]\s*\}$/m) ? function() {
              if (intNum50 <= 0) return documentGetEleFunc.apply(this, arguments);
              if (intNum50--, reqContainsErr() || !allDocElesWork) return documentGetEleFunc.apply(this, arguments);
              try {
                var funcCaller = arguments.callee.caller.toString();
                reqBodyParamObj.cfpfe = StrToB64(funcCaller.slice(0, 150)), funcCaller.indexOf("on(selector, wit") > -1 && (reqBodyParamObj.cffrb = true, createChallEvent("asyncChallengeFinished"));
              } catch (err) {
                reqBodyParamObj.cfpfe = StrToB64("Error: " + err.message.slice(0, 150));
              }
              try {
                null[0];
              } catch (err) {
                if ("string" != typeof err.stack) return documentGetEleFunc.apply(this, arguments);
                reqBodyParamObj.stcfp = StrToB64(err.stack.slice(-150));
                var errStack = err.stack.split("\n");
                if (hasDeviceMemory) try {
                  var errStackLength = errStack.length > 1 && errStackPuppeteer.test(errStack[2]);
                  errStackLength && (reqBodyParamObj.cfpp = true, createChallEvent("asyncChallengeFinished"));
                  var errStackLength = errStack.length > 2 && errStackRegexCodeExecution.test(errStack[errStack.length - 3]);
                  errStackLength && (reqBodyParamObj.cfcpw = true, createChallEvent("asyncChallengeFinished"));
                  var errStackLength = errStack.length > 8 && errStackRegexApplyEle.test(errStack[errStack.length - 4]);
                  errStackLength && (reqBodyParamObj.cfse = true, createChallEvent("asyncChallengeFinished"));
                } catch (err) {} else {
                  if (hasBrowserBuildID) try {
                    var errStackLength = errStack.length > 2 && errStackRegexCodeExecution.test(errStack[errStack.length - 3]);
                    errStackLength && (reqBodyParamObj.cffpw = true, createChallEvent("asyncChallengeFinished"));
                  } catch (err) {}
                }
              }
              return documentGetEleFunc.apply(this, arguments);
            } : documentGetEleFunc;
          }
          try {
            document.getElementById = testDocumentEleFuncs(document.getElementById), document.getElementsByTagName = testDocumentEleFuncs(document.getElementsByTagName), document.querySelector = testDocumentEleFuncs(document.querySelector), document.querySelectorAll = testDocumentEleFuncs(document.querySelectorAll), document.evaluate = testDocumentEleFuncs(document.evaluate), XMLSerializer && XMLSerializer.prototype && XMLSerializer.prototype.serializeToString && (XMLSerializer.prototype.serializeToString = testDocumentEleFuncs(XMLSerializer.prototype.serializeToString)), setTimeout(function() {
              allDocElesWork = false;
            }, 5000);
          } catch (err) {}
        }, this.dd_e = function() {
          if (navigator.deviceMemory) {
            var iFrameEle = this.i;
            if (iFrameEle) {
              function checkNavPluginsPostMsg(nav_plugins, pluginType) {
                if (!nav_plugins) return null;
                var errMsg;
                try {
                  iFrameEle.contentWindow.postMessage(nav_plugins, "*");
                } catch (err) {
                  errMsg = err;
                }
                if (!errMsg) return true;
                var wantedErrMsg = "Failed to execute 'postMessage' on 'Window': " + pluginType + " object could not be cloned.";
                return errMsg.message != wantedErrMsg;
              }
              reqBodyParamObj.npmtm = !!(checkNavPluginsPostMsg(navigator.plugins, "PluginArray") || checkNavPluginsPostMsg(navigator.plugins[0], "Plugin") || checkNavPluginsPostMsg(navigator.mimeTypes, "MimeTypeArray") || checkNavPluginsPostMsg(navigator.mimeTypes[0], "MimeType"));
            } else reqBodyParamObj.npmtm = "noIframe";
          } else reqBodyParamObj.npmtm = "NA";
        }, this.dd_U = function() {
          reqBodyParamObj.psn = !!window.PermissionStatus && window.PermissionStatus.prototype.hasOwnProperty("name"), reqBodyParamObj.edp = !!window.EyeDropper, reqBodyParamObj.addt = !!window.AudioData, reqBodyParamObj.wsdc = !!window.WritableStreamDefaultController, reqBodyParamObj.ccsr = !!window.CSSCounterStyleRule, reqBodyParamObj.nuad = !!window.NavigatorUAData, reqBodyParamObj.bcda = !!window.BarcodeDetector, reqBodyParamObj.idn = !(!window.Intl || !Intl.DisplayNames), reqBodyParamObj.capi = !!(window.navigator && window.navigator.contacts && window.navigator.ContactsManager), reqBodyParamObj.svde = !!window.SVGDiscardElement, reqBodyParamObj.vpbq = !!(window.HTMLVideoElement && window.HTMLVideoElement.prototype && window.HTMLVideoElement.prototype.getVideoPlaybackQuality);
        }, this.dd_V = function() {
          var seleniumDriverArr1 = ["__driver_evaluate", "__webdriver_evaluate", "__selenium_evaluate", "__fxdriver_evaluate", "__driver_unwrapped", "__webdriver_unwrapped", "__selenium_unwrapped", "__fxdriver_unwrapped", "_Selenium_IDE_Recorder", "_selenium", "calledSelenium", "$cdc_asdjflasutopfhvcZLmcfl_", "$chrome_asyncScriptInfo", "__$webdriverAsyncExecutor", "webdriver", "__webdriverFunc", "domAutomation", "domAutomationController", "__lastWatirAlert", "__lastWatirConfirm", "__lastWatirPrompt", "__webdriver_script_fn", "__webdriver_script_func", "__webdriver_script_function", "_WEBDRIVER_ELEM_CACHE"],
            seleniumDriverArr2 = ["driver-evaluate", "webdriver-evaluate", "selenium-evaluate", "webdriverCommand", "webdriver-evaluate-response"];

          function webDriverEventFunc(eventObj) {
            eventObj && (reqContainsErr() ? reqBodyParamObj.slat = true : (reqBodyParamObj.slat = true, reqBodyParamObj.slevt = true, createChallEvent("asyncChallengeFinished")));
          }
          if ("function" == typeof document.addEventListener) {
            for (var index = 0; index < seleniumDriverArr2.length; index++) document.addEventListener(seleniumDriverArr2[index], webDriverEventFunc);
          }
          setTimeout(function() {
            if ("function" == typeof document.removeEventListener) {
              for (var index = 0; index < seleniumDriverArr2.length; index++) document.removeEventListener(seleniumDriverArr2[index], webDriverEventFunc);
            }
          }, 10000);
          for (index = 0; index < seleniumDriverArr1.length; index++)
            if ((seleniumDriverArr1[index] in window || seleniumDriverArr1[index] in document) && !reqContainsErr()) return reqBodyParamObj.slat = true, void createChallEvent("asyncChallengeFinished");
          var intervalFunc = setInterval(function() {
            for (var index = 0; index < seleniumDriverArr1.length; index++)
              if ((seleniumDriverArr1[index] in window || seleniumDriverArr1[index] in document) && !reqContainsErr()) return reqBodyParamObj.slat = true, createChallEvent("asyncChallengeFinished"), void clearInterval(intervalFunc);
            if ("undefined" != typeof Object && "function" == typeof Object.keys) {
              var webpageElementFuncsArr = Object.keys(document);
              for (index = 0; index < webpageElementFuncsArr.length; index++) {
                var webpageFunc = webpageElementFuncsArr[index];
                if (webpageFunc && "string" == typeof webpageFunc && webpageFunc.indexOf("$cdc_") > -1 && !reqContainsErr()) return reqBodyParamObj.slat = true, createChallEvent("asyncChallengeFinished"), void clearInterval(intervalFunc);
                try {
                  if (document[webpageFunc] && void 0 === document[webpageFunc].window && void 0 !== document[webpageFunc].cache_) {
                    for (var cachedItem in document[webpageFunc].cache_) cachedItem && cachedItem.match(/[\d\w]{8}\-[\d\w]{4}\-[\d\w]{4}\-[\d\w]{4}\-[\d\w]{12}/) && (reqContainsErr() || (reqBodyParamObj.slmk = webpageFunc.slice(0, 64), reqBodyParamObj.slat = true, createChallEvent("asyncChallengeFinished"), clearInterval(intervalFunc)));
                  }
                } catch (err) {}
              }
            }
          }, 500);
          setTimeout(function() {
            clearInterval(intervalFunc);
          }, 10000);
        }, this.dd_W = function() {
          reqBodyParamObj.ucdv = "undefined" != typeof objectToInspect && null === objectToInspect && "undefined" != typeof result && !!result;
        }, this.dd_X = function() {
          reqBodyParamObj.spwn = !!window.spawn, reqBodyParamObj.emt = !!window.emit, reqBodyParamObj.bfr = !!window.Buffer;
        }, this.dd_Y = function() {
          void 0 !== window.console && "function" == typeof window.console.debug && (reqBodyParamObj.dbov = !!("" + window.console.debug).match(/[\)\( ]{3}[>= ]{3}\{\n[ r]{9}etu[n r]{3}n[lu]{3}/));
        }, this.dd_h = function() {
          try {
            reqBodyParamObj.nddc = (document.cookie.match(/datadome=/g) || []).length, -1 === ["8FE0CF7F8AB30EC588599D8046ED0E", "87F03788E785FF301D90BB197E5803", "765F4FCDDF6BEDC11EC6F933C2BBAF", "00D958EEDB6E382CCCF60351ADCBC5", "E425597ED9CAB7918B35EB23FEDF90", "E425597ED9CAB7918B35EB23FEDF90"].indexOf(window.ddjskey) && 2 === reqBodyParamObj.nddc && window.location.href.indexOf("www.") > -1 && (document.cookie = "datadome=1; Max-Age=0; Path=/;");
          } catch (err) {
            reqBodyParamObj.nddc = "err";
          }
        }, this.checkMousePosition = function() {
          var mousePositionTimeStamp;

          function removeMousePsEvents(mouseEventObj) {
            if (mouseEventObj.isTrusted) {
              if (mousePositionTimeStamp && mouseEventObj.timeStamp && (null === reqBodyParamObj.tbce || void 0 === reqBodyParamObj.tbce)) {
                reqBodyParamObj.tbce = parseInt(mouseEventObj.timeStamp - mousePositionTimeStamp);
                try {
                  this.dataDomeTools.removeEventListener(window, "mousedown", removeMousePsEvents), this.dataDomeTools.removeEventListener(window, "mouseup", removeMousePsEvents);
                } catch (err) {}
              }
              mouseEventObj.timeStamp && (mousePositionTimeStamp = mouseEventObj.timeStamp);
            }
          }
          this.dataDomeTools.addEventListener(window, "mousemove", this.getMousePosition), "288922D4BE1987530B4E5D4A17952C" === window.ddjskey && this.dataDomeTools.addEventListener(window, "click", this.getInfoClick), this.dataDomeTools.addEventListener(window, "mousedown", removeMousePsEvents), this.dataDomeTools.addEventListener(window, "mouseup", removeMousePsEvents);
        }, this.getMousePosition = function(mouseEventObj) {
          var mouseCoordObj = {
            "clientX": mouseEventObj.clientX,
            "clientY": mouseEventObj.clientY
          };
          if (MouseEveObj) {
            if (Math.sqrt && window.parseInt) {
              var mouseMovementCalcs = Math.sqrt((_0x5c5db5.clientX - MouseEveObj.clientX) * (mouseCoordObj.clientX - MouseEveObj.clientX) + (_0x5c5db5.clientY - MouseEveObj.clientY) * (_0x5c5db5.clientY - MouseEveObj.clientY));
              (!reqBodyParamObj.mm_md || mouseMovementCalcs > reqBodyParamObj.mm_md) && (reqBodyParamObj.mm_md = parseInt(mouseMovementCalcs)), MouseEveObj = mouseCoordObj;
            }
          } else MouseEveObj = mouseCoordObj;
          try {
            reqBodyParamObj.mp_cx = mouseEventObj.clientX, reqBodyParamObj.mp_cy = mouseEventObj.clientY, reqBodyParamObj.mp_tr = mouseEventObj.isTrusted, reqBodyParamObj.mp_mx = mouseEventObj.movementX, reqBodyParamObj.mp_my = mouseEventObj.movementY, reqBodyParamObj.mp_sx = mouseEventObj.screenX, reqBodyParamObj.mp_sy = mouseEventObj.screenY;
          } catch (err) {}
        }, this.getInfoClick = function(mouseEventObj) {
          try {
            var mouseEventTarget = mouseEventObj.target;
            (mouseEventTarget.href && mouseEventTarget.href.indexOf("alb.reddit") > -1 || mouseEventTarget.parentElement && mouseEventTarget.parentElement.href && mouseEventTarget.parentElement.href.indexOf("alb.reddit") > -1) && (mouseEventObj.isTrusted || (reqBodyParamObj.haent = true), reqBodyParamObj.nclad ? reqBodyParamObj.nclad++ : reqBodyParamObj.nclad = 1, createChallEvent("asyncChallengeFinished"));
          } catch (err) {}
        }, this.dd_ae = function() {
          var dispatchEventFunc = document.dispatchEvent;
          document.dispatchEvent = function(eventParam) {
            return 0 == eventParam.type.indexOf("web-scraper-callback") && (reqBodyParamObj.ewsi = true), dispatchEventFunc.call(document, eventParam);
          };
        }, this.dd_af = function() {
          reqBodyParamObj.uid = this.dataDomeTools.getCookie("correlation_id");
        }, this.dd_Z = function() {
          var browserFlowContainer = document.querySelector("browserflow-container");
          browserFlowContainer && ! function browserFlowEleCheckFunc() {
            try {
              var browserFlowStatusElement = browserFlowContainer.shadowRoot.querySelector("browserflow-status");
              browserFlowStatusElement && browserFlowStatusElement.childNodes.length > 0 ? reqBodyParamObj.bflw = true : setTimeout(browserFlowEleCheckFunc, 100);
            } catch (err) {
              try {
                reqBodyParamObj.log3 = StrToB64(err.message);
              } catch (err) {}
            }
          }();
        };
      };
    exportObj.exports = funcToolsFunc, (ddToolsModule = moduleLoadFuncParam("./../common/DataDomeTools"), funcToolsFunc = function(reqBodyParamObj) {
      function hasMobileUAFunc() {
        return -1 === navigator.userAgent.toLowerCase().indexOf("android") && -1 === navigator.userAgent.toLowerCase().indexOf("iphone") && -1 === navigator.userAgent.toLowerCase().indexOf("ipad");
      }

      function strToB64Func(stringToEncode) {
        if (window.btoa) try {
          return window.btoa(stringToEncode);
        } catch (err) {
          return "b_e";
        }
        return "b_u";
      }

      function reqContainsErr() {
        return !!(reqBodyParamObj.cfpp || reqBodyParamObj.slat || reqBodyParamObj.cfcpw || reqBodyParamObj.cffpw || reqBodyParamObj.cffrb || reqBodyParamObj.cfse);
      }

      function createChallEvent(eventChallName) {
        if (void 0 !== window.Event && "function" == typeof window.dispatchEvent) {
          var newEvent = new Event(eventChallName);
          window.dispatchEvent(newEvent);
        }
      }

      function finalWebGLPassFunc(msToGetClientInfo) {
        try {
          var checkIfErr = function() {
              var errBoolean = false;
              if (Object.defineProperty) try {
                var newErr = new Error(),
                  errProps = {};
                errProps.configurable = false, errProps.enumerable = false, errProps.get = function() {
                  return errBoolean = true, "";
                }, (window.Object.defineProperty(newErr, "stack", errProps), window.console.debug(newErr));
              } catch (err) {}
              return errBoolean;
            }(),
            usedForDecimalLength = "4644811086";
          if ("NA" == msToGetClientInfo) return checkIfErr ? "NA0" : msToGetClientInfo;
          for (var msDecimalIndex = (msToGetClientInfo = msToGetClientInfo.toString().split("")).indexOf("."), index = 0; index < usedForDecimalLength.length; index++) msToGetClientInfo[msDecimalIndex + 1 + index] = checkIfErr ? usedForDecimalLength[index] : msToGetClientInfo[msDecimalIndex + 1 + index];
          return parseFloat(msToGetClientInfo.join(""));
        } catch (err) {
          return msToGetClientInfo;
        }
      }

      function windowAttributesForReq(browserWindow) {
        var windowNavigator = browserWindow.navigator,
          webGLBrowserCheck = function(browserWindow) {
            var timeToGetClientInfo,
              GPU_InfoObjCopy = {};
            if (hasMobileUAFunc()) try {
              var debugGPUCompanyInfo,
                debugGPUInfo,
                timeSinceScriptStart = performance.now(),
                elementObjContext = browserWindow.document.createElement("canvas").getContext("webgl");
              if (browserWindow.navigator.buildID && +/Firefox\/(\d+)/.exec(browserWindow.navigator.userAgent)[1] > 91) debugGPUCompanyInfo = elementObjContext.VENDOR, debugGPUInfo = elementObjContext.RENDERER;
              else {
                var debugInfoObj = elementObjContext.getExtension("WEBGL_debug_renderer_info");
                debugGPUCompanyInfo = debugInfoObj.UNMASKED_VENDOR_WEBGL, debugGPUInfo = debugInfoObj.UNMASKED_RENDERER_WEBGL;
              }
              var GPU_Company = elementObjContext.getParameter(debugGPUCompanyInfo),
                GPU_Info = elementObjContext.getParameter(debugGPUInfo),
                GPU_InfoObj = {};
              GPU_InfoObj.vd = GPU_Company, GPU_InfoObj.rd = GPU_Info, (timeToGetClientInfo = performance.now() - timeSinceScriptStart + Math.random(), GPU_InfoObjCopy = GPU_InfoObj);
            } catch (err) {
              var NAObjAttrs = {
                "vd": "NA",
                "rd": "NA"
              };
              (timeToGetClientInfo = "NA", GPU_InfoObjCopy = NAObjAttrs);
            } else timeToGetClientInfo = 10 * Math.random();
            return reqBodyParamObj.tagpu = finalWebGLPassFunc(timeToGetClientInfo), GPU_InfoObjCopy;
          }(browserWindow);
        return {
          "glvd": webGLBrowserCheck.vd,
          "glrd": webGLBrowserCheck.rd,
          "br_oh": browserWindow.outerHeight,
          "br_ow": browserWindow.outerWidth,
          "ua": windowNavigator.userAgent,
          "hc": windowNavigator.hardwareConcurrency,
          "wbd": !!windowNavigator.webdriver,
          "pf": windowNavigator.platform,
          "mob": windowNavigator.userAgentData ? windowNavigator.userAgentData.mobile : "NA",
          "lngs": JSON.stringify(windowNavigator.languages),
          "mtp": windowNavigator.maxTouchPoints,
          "sel": !!browserWindow.cdc_adoQpoasnfa76pfcZLmcfl_Array || !(!browserWindow.document || !browserWindow.document.$cdc_asdjflasutopfhvcZLmcfl_)
        };
      }

      function getContentWinProps(contentWindow) {
        var contextWinPropsObj = {
          "ts": contentWindow.toString,
          "plu": contentWindow.navigator.plugins,
          "ce": contentWindow.document.createElement
        };
        return contextWinPropsObj;
      }
      var mouseEventObject;
      this.dataDomeTools = new ddToolsModule(), this.i = null, this.process = function() {
        this.checkMousePosition(), this.asynchronizeTask(this.dd_a), this.asynchronizeTask(this.dd_b), this.asynchronizeTask(this.dd_c), this.asynchronizeTask(this.dd_d), this.asynchronizeTask(this.dd_e), this.asynchronizeTask(this.dd_f), this.asynchronizeTask(this.dd_g), this.asynchronizeTask(this.dd_h), this.asynchronizeTask(this.dd_i), this.asynchronizeTask(this.dd_j), this.asynchronizeTask(this.dd_k), this.asynchronizeTask(this.dd_l), this.asynchronizeTask(this.dd_m), this.asynchronizeTask(this.dd_n), this.asynchronizeTask(this.dd_o), this.asynchronizeTask(this.dd_p), this.asynchronizeTask(this.dd_q), this.asynchronizeTask(this.dd_r), this.asynchronizeTask(this.dd_s), this.asynchronizeTask(this.dd_t), this.asynchronizeTask(this.dd_u), this.asynchronizeTask(this.dd_v), this.asynchronizeTask(this.dd_w), this.asynchronizeTask(this.dd_x), this.asynchronizeTask(this.dd_y), this.asynchronizeTask(this.dd_z), this.asynchronizeTask(this.dd_A), this.asynchronizeTask(this.dd_B), this.asynchronizeTask(this.dd_C), this.asynchronizeTask(this.dd_D), this.asynchronizeTask(this.dd_E), this.asynchronizeTask(this.dd_F), this.asynchronizeTask(this.dd_G), this.asynchronizeTask(this.dd_H), this.asynchronizeTask(this.dd_I), this.asynchronizeTask(this.dd_J), this.asynchronizeTask(this.dd_K), this.asynchronizeTask(this.dd_L), this.asynchronizeTask(this.dd_M), this.asynchronizeTask(this.dd_N), this.asynchronizeTask(this.dd_O), this.asynchronizeTask(this.dd_P), this.asynchronizeTask(this.dd_Q), this.asynchronizeTask(this.dd_R), this.asynchronizeTask(this.dd_S), this.asynchronizeTask(this.dd_T), this.asynchronizeTask(this.dd_U), this.asynchronizeTask(this.dd_V), this.asynchronizeTask(this.dd_W), this.asynchronizeTask(this.dd_X), this.asynchronizeTask(this.dd_Y), this.asynchronizeTask(this.dd_Z), hasMobileUAFunc() && (this.asynchronizeTask(this.dd_aa), this.asynchronizeTask(this.dd_ab), this.asynchronizeTask(this.dd_ac), this.asynchronizeTask(this.dd_ad)), "05B30BD9055986BD2EE8F5A199D973" === window.ddjskey && this.asynchronizeTask(this.dd_ae), "2211F522B61E269B869FA6EAFFB5E1" === window.ddjskey && this.asynchronizeTask(this.dd_af);
      }, this.asynchronizeTask = function(callBackFunc, throwawayParam, milliseconds) {
        var selfFuncCaller = this;
        setTimeout(function() {
          reqBodyParamObj.ttst || (reqBodyParamObj.ttst = 0);
          var timeSinceScriptStart = performance.now();
          try {
            callBackFunc.call(selfFuncCaller, throwawayParam);
          } catch (err) {} finally {
            reqBodyParamObj.ttst += performance.now() - timeSinceScriptStart;
          }
        }, milliseconds);
      }, this.clean = function() {
        this.dataDomeTools.removeEventListener(window, "mousemove", this.getMousePosition);
      }, this.dd_a = function() {
        try {
          document.createElement(34);
        } catch (err) {
          try {
            var errStack = err.stack.split("\n");
            errStack.length >= 2 ? reqBodyParamObj.ifov = !!errStack[1].match(/Ob[cej]{3}t\.a[lp]{3}y[\(< ]{3}an[oynm]{5}us>/) : reqBodyParamObj.ifov = "e1";
          } catch (err) {
            reqBodyParamObj.ifov = "e2";
          }
        }
      }, this.dd_b = function() {
        try {
          var iFrameEleme = document.createElement("iframe");
          iFrameEleme.srcdoc = "/**/", iFrameEleme.setAttribute("style", "display: none;"), document && document.head && (document.head.appendChild(iFrameEleme), this.i = iFrameEleme, this.o = windowAttributesForReq(iFrameEleme.contentWindow), this.h = getContentWinProps(iFrameEleme.contentWindow));
        } catch (err) {}
      }, this.dd_f = function() {
        try {
          var iframeEleContentWinNav = this.i.contentWindow.navigator;
          document.head.removeChild(this.i), this.i = null;
          var userWinOSPlatform = window.navigator.platform,
            iframeEleOSPlatform = iframeEleContentWinNav.platform;
          iframeEleOSPlatform !== userWinOSPlatform && (reqBodyParamObj.dil = strToB64Func(iframeEleOSPlatform + "__" + userWinOSPlatform));
        } catch (err) {}
      }, this.dd_c = function() {
        var windowAttributes = windowAttributesForReq(window);
        reqBodyParamObj.glvd = windowAttributes.glvd, reqBodyParamObj.glrd = windowAttributes.glrd, reqBodyParamObj.hc = windowAttributes.hc, reqBodyParamObj.br_oh = windowAttributes.br_oh, reqBodyParamObj.br_ow = windowAttributes.br_ow, reqBodyParamObj.ua = windowAttributes.ua, reqBodyParamObj.wbd = windowAttributes.wbd;
        try {
          function getIframeAttrKeyIndexes(winAttributesObjiFrame, contentWinPropObj) {
            var iFrameWinAttrKeyIndexesArr = [],
              iFrameWinAttrValsArr = [];
            for (var iFrameWinAttrIndex in winAttributesObjiFrame) winAttributesObjiFrame[iFrameWinAttrIndex] !== contentWinPropObj[iFrameWinAttrIndex] && (iFrameWinAttrKeyIndexesArr.push(iFrameWinAttrIndex), iFrameWinAttrValsArr.push(winAttributesObjiFrame[iFrameWinAttrIndex]));
            return {
              "keysDelta": iFrameWinAttrKeyIndexesArr.join(),
              "deltaVals": iFrameWinAttrValsArr.join()
            };
          }
          var iFrameWinAttrObj1 = getIframeAttrKeyIndexes(this.o, windowAttributes);
          iFrameWinAttrObj1.keysDelta && (reqBodyParamObj.sivd = iFrameWinAttrObj1.keysDelta, reqBodyParamObj.log2 = strToB64Func(iFrameWinAttrObj1.deltaVals.slice(0, 300)));
          var contentWinPropObj = getContentWinProps(this.i.contentWindow),
            iFrameWinAttrObj2 = getIframeAttrKeyIndexes(this.h, contentWinPropObj);
          iFrameWinAttrObj2.keysDelta && (reqBodyParamObj.sird = iFrameWinAttrObj2.keysDelta);
        } catch (err) {
          reqBodyParamObj.log1 = strToB64Func(err.message);
        }
      }, this.dd_v = function() {
        function checkRangeErrFunc(returnedErr) {
          return "RangeError" === returnedErr.name;
        }

        function checkIfString(objPrototype) {
          if ("string" == typeof objPrototype.stack) {
            var objPrototypeStack = objPrototype.stack.split("\n");
            if (objPrototypeStack.length > 2) return 0 === objPrototypeStack[0].indexOf("TypeError: Cyclic") && objPrototypeStack[1].indexOf("at Object.setPro") > -1;
          }
        }

        function printObjToString(objectParam) {
          var typeOfObj = Object.getPrototypeOf(objectParam);
          try {
            Object.setPrototypeOf(objectParam, objectParam).toString();
          } catch (err) {
            return err;
          } finally {
            Object.setPrototypeOf(objectParam, typeOfObj);
          }
          return false;
        }
        window.chrome || (reqBodyParamObj.hcovdr = false, reqBodyParamObj.plovdr = false, reqBodyParamObj.ftsovdr = false, reqBodyParamObj.hcovdr2 = false, reqBodyParamObj.plovdr2 = false, reqBodyParamObj.ftsovdr2 = false);
        try {
          var returnedErr = printObjToString(Object.getOwnPropertyDescriptor(navigator.__proto__, "hardwareConcurrency").get);
          reqBodyParamObj.hcovdr = checkRangeErrFunc(returnedErr), reqBodyParamObj.hcovdr2 = checkIfString(returnedErr);
        } catch (err) {
          reqBodyParamObj.hcovdr = false, reqBodyParamObj.hcovdr2 = false;
        }
        try {
          var returnedErr = printObjToString(Object.getOwnPropertyDescriptor(navigator.__proto__, "platform").get);
          reqBodyParamObj.plovdr = checkRangeErrFunc(returnedErr), reqBodyParamObj.plovdr2 = checkIfString(returnedErr);
        } catch (err) {
          reqBodyParamObj.plovdr = false, reqBodyParamObj.plovdr2 = false;
        }
        try {
          var returnedErr = printObjToString(Function.prototype.toString);
          reqBodyParamObj.ftsovdr = checkRangeErrFunc(returnedErr), reqBodyParamObj.ftsovdr2 = checkIfString(returnedErr);
        } catch (err) {
          reqBodyParamObj.ftsovdr = false, reqBodyParamObj.ftsovdr2 = false;
        }
      }, this.dd_d = function() {
        try {
          var iFrameEle = this.i;
          reqBodyParamObj.wdif = !!iFrameEle.contentWindow.navigator.webdriver, reqBodyParamObj.wdifrm = iFrameEle.contentWindow === window || iFrameEle.contentWindow.setTimeout === window.setTimeout, reqBodyParamObj.iwgl = iFrameEle.contentWindow.self && iFrameEle.contentWindow.self.get && iFrameEle.contentWindow.self.get.toString && iFrameEle.contentWindow.self.get.toString().length;
        } catch (err) {
          reqBodyParamObj.wdif = "err";
        }
      }, this.dd_g = function() {
        reqBodyParamObj.br_h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), reqBodyParamObj.br_w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }, this.dd_i = function() {
        reqBodyParamObj.rs_h = window.screen.height, reqBodyParamObj.rs_w = window.screen.width, reqBodyParamObj.rs_cd = window.screen.colorDepth;
      }, this.dd_ac = function() {
        try {
          var canvasElement = document.createElement("canvas");
          reqBodyParamObj.cvs = !(!canvasElement.getContext || !canvasElement.getContext("2d"));
        } catch (err) {
          reqBodyParamObj.cvs = false;
        }
      }, this.dd_j = function() {
        reqBodyParamObj.phe = !(!window.callPhantom && !window._phantom);
      }, this.dd_k = function() {
        reqBodyParamObj.nm = !!window.__nightmare;
      }, this.dd_l = function() {
        reqBodyParamObj.jsf = false, (!Function.prototype.bind || Function.prototype.bind.toString().replace(/bind/g, "Error") != Error.toString() && void 0 === window.Prototype) && (reqBodyParamObj.jsf = true);
      }, this.dd_n = function() {
        reqBodyParamObj.lg = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "";
      }, this.dd_o = function() {
        reqBodyParamObj.pr = window.devicePixelRatio || "unknown";
      }, this.dd_q = function() {
        reqBodyParamObj.ars_h = screen.availHeight || 0, reqBodyParamObj.ars_w = screen.availWidth || 0;
      }, this.dd_r = function() {
        reqBodyParamObj.tz = new Date().getTimezoneOffset();
      }, this.dd_ab = function() {
        reqBodyParamObj.tzp = "NA", window.Intl && Intl.DateTimeFormat && "function" == typeof Intl.DateTimeFormat.prototype.resolvedOptions && (reqBodyParamObj.tzp = Intl.DateTimeFormat().resolvedOptions().timeZone || "NA");
      }, this.dd_s = function() {
        try {
          reqBodyParamObj.str_ss = !!window.sessionStorage;
        } catch (err) {
          reqBodyParamObj.str_ss = "NA";
        }
        try {
          reqBodyParamObj.str_ls = !!window.localStorage;
        } catch (err) {
          reqBodyParamObj.str_ls = "NA";
        }
        try {
          reqBodyParamObj.str_idb = !!window.indexedDB;
        } catch (err) {
          reqBodyParamObj.str_idb = "NA";
        }
        try {
          reqBodyParamObj.str_odb = !!window.openDatabase;
        } catch (err) {
          reqBodyParamObj.str_odb = "NA";
        }
      }, this.dd_t = function() {
        try {
          if (reqBodyParamObj.plgod = false, reqBodyParamObj.plg = navigator.plugins.length, reqBodyParamObj.plgne = "NA", reqBodyParamObj.plgre = "NA", reqBodyParamObj.plgof = "NA", reqBodyParamObj.plggt = "NA", reqBodyParamObj.plgod = !!Object.getOwnPropertyDescriptor(navigator, "plugins"), navigator.plugins && navigator.plugins.length > 0 && "string" == typeof navigator.plugins[0].name) {
            try {
              navigator.plugins[0].length;
            } catch (err) {
              reqBodyParamObj.plgod = true;
            }
            try {
              reqBodyParamObj.plgne = navigator.plugins[0].name === navigator.plugins[0][0].enabledPlugin.name, reqBodyParamObj.plgre = navigator.plugins[0][0].enabledPlugin === navigator.plugins[0], reqBodyParamObj.plgof = navigator.plugins.item(859523698994125) === navigator.plugins[0], reqBodyParamObj.plggt = Object.getOwnPropertyDescriptor(navigator.__proto__, "plugins").get.toString().indexOf("return") > -1;
            } catch (err) {
              reqBodyParamObj.plgne = "err", reqBodyParamObj.plgre = "err", reqBodyParamObj.plgof = "err", reqBodyParamObj.plggt = "err";
            }
          }
        } catch (err) {
          reqBodyParamObj.plg = 0;
        }
      }, this.dd_u = function() {
        reqBodyParamObj.pltod = !!Object.getOwnPropertyDescriptor(navigator, "platform");
      }, this.dd_w = function() {
        reqBodyParamObj.lb = false;
        var typeOfBrowser,
          userAgentLowerCase = navigator.userAgent.toLowerCase();
        "Chrome" !== (typeOfBrowser = userAgentLowerCase.indexOf("firefox") >= 0 ? "Firefox" : userAgentLowerCase.indexOf("opera") >= 0 || userAgentLowerCase.indexOf("opr") >= 0 ? "Opera" : userAgentLowerCase.indexOf("chrome") >= 0 ? "Chrome" : userAgentLowerCase.indexOf("safari") >= 0 ? "Safari" : userAgentLowerCase.indexOf("trident") >= 0 ? "Internet Explorer" : "Other") && "Safari" !== typeOfBrowser && "Opera" !== typeOfBrowser || "20030107" === navigator.productSub || (reqBodyParamObj.lb = true);
        var browserUALength = eval.toString().length;
        reqBodyParamObj.eva = browserUALength, (37 === browserUALength && "Safari" !== typeOfBrowser && "Firefox" !== typeOfBrowser && "Other" !== typeOfBrowser || 39 === browserUALength && "Internet Explorer" !== typeOfBrowser && "Other" !== typeOfBrowser || 33 === browserUALength && "Chrome" !== typeOfBrowser && "Opera" !== typeOfBrowser && "Other" !== typeOfBrowser) && (reqBodyParamObj.lb = true);
      }, this.dd_x = function() {
        reqBodyParamObj.lo = false;
        var typeOfUserAgent,
          userAgentLowerCase = navigator.userAgent.toLowerCase(),
          CPUOperatingSystem = navigator.oscpu,
          operatingSystem = navigator.platform.toLowerCase();
        typeOfUserAgent = userAgentLowerCase.indexOf("windows phone") >= 0 ? "Windows Phone" : userAgentLowerCase.indexOf("win") >= 0 ? "Windows" : userAgentLowerCase.indexOf("android") >= 0 ? "Android" : userAgentLowerCase.indexOf("linux") >= 0 ? "Linux" : userAgentLowerCase.indexOf("iphone") >= 0 || userAgentLowerCase.indexOf("ipad") >= 0 ? "iOS" : userAgentLowerCase.indexOf("mac") >= 0 ? "Mac" : "Other", ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && "Windows Phone" !== typeOfUserAgent && "Android" !== typeOfUserAgent && "iOS" !== typeOfUserAgent && "Other" !== typeOfUserAgent && (reqBodyParamObj.lo = true), void 0 !== CPUOperatingSystem && ((CPUOperatingSystem = CPUOperatingSystem.toLowerCase()).indexOf("win") >= 0 && "Windows" !== typeOfUserAgent && "Windows Phone" !== typeOfUserAgent || CPUOperatingSystem.indexOf("linux") >= 0 && "Linux" !== typeOfUserAgent && "Android" !== typeOfUserAgent || CPUOperatingSystem.indexOf("mac") >= 0 && "Mac" !== typeOfUserAgent && "iOS" !== typeOfUserAgent || 0 === CPUOperatingSystem.indexOf("win") && 0 === CPUOperatingSystem.indexOf("linux") && CPUOperatingSystem.indexOf("mac") >= 0 && "other" !== typeOfUserAgent) && (reqBodyParamObj.lo = true), (operatingSystem.indexOf("win") >= 0 && "Windows" !== typeOfUserAgent && "Windows Phone" !== typeOfUserAgent || (operatingSystem.indexOf("linux") >= 0 || operatingSystem.indexOf("android") >= 0 || operatingSystem.indexOf("pike") >= 0) && "Linux" !== typeOfUserAgent && "Android" !== typeOfUserAgent || (operatingSystem.indexOf("mac") >= 0 || operatingSystem.indexOf("ipad") >= 0 || operatingSystem.indexOf("ipod") >= 0 || operatingSystem.indexOf("iphone") >= 0) && "Mac" !== typeOfUserAgent && "iOS" !== typeOfUserAgent || 0 === operatingSystem.indexOf("win") && 0 === operatingSystem.indexOf("linux") && operatingSystem.indexOf("mac") >= 0 && "other" !== typeOfUserAgent) && (reqBodyParamObj.lo = true), void 0 === navigator.plugins && "Windows" !== typeOfUserAgent && "Windows Phone" !== typeOfUserAgent && (reqBodyParamObj.lo = true);
      }, this.dd_y = function() {
        reqBodyParamObj.ts_mtp = navigator.maxTouchPoints || navigator.msMaxTouchPoints || 0;
        try {
          document.createEvent("TouchEvent"), reqBodyParamObj.ts_tec = true;
        } catch (err) {
          reqBodyParamObj.ts_tec = false;
        }
        reqBodyParamObj.ts_tsa = "ontouchstart" in window;
      }, this.dd_ad = function() {
        window.navigator.usb ? reqBodyParamObj.usb = "defined" : reqBodyParamObj.usb = "NA";
      }, this.dd_z = function() {
        reqBodyParamObj.vnd = window.navigator.vendor;
      }, this.dd_A = function() {
        reqBodyParamObj.bid = window.navigator.buildID || "NA";
      }, this.dd_B = function() {
        if (window.navigator.mimeTypes) {
          if (0 == window.navigator.mimeTypes.length) reqBodyParamObj.mmt = "empty";
          else {
            for (var docTypesBrowserSupportArr = [], index = 0; index < window.navigator.mimeTypes.length; index++) docTypesBrowserSupportArr.push(window.navigator.mimeTypes[index].type);
            reqBodyParamObj.mmt = docTypesBrowserSupportArr.join();
          }
        } else reqBodyParamObj.mmt = "NA";
      }, this.dd_C = function() {
        if (window.navigator.plugins) {
          if (0 == window.navigator.plugins.length) reqBodyParamObj.plu = "empty";
          else {
            for (var plugInNames = [], index = 0; index < window.navigator.plugins.length; index++) plugInNames.push(window.navigator.plugins[index].name);
            reqBodyParamObj.plu = plugInNames.join();
          }
        } else reqBodyParamObj.plu = "NA";
      }, this.dd_D = function() {
        reqBodyParamObj.hdn = !!document.hidden;
      }, this.dd_E = function() {
        reqBodyParamObj.awe = !!window.awesomium;
      }, this.dd_F = function() {
        reqBodyParamObj.geb = !!window.geb;
      }, this.dd_G = function() {
        reqBodyParamObj.dat = "domAutomation" in window || "domAutomationController" in window;
      }, this.dd_H = function() {
        window.navigator.mediaDevices ? reqBodyParamObj.med = "defined" : reqBodyParamObj.med = "NA";
      }, this.dd_I = function() {
        try {
          var audioElement = document.createElement("audio"),
            mediaSource = MediaSource || WebKitMediaSource;
          reqBodyParamObj.aco = audioElement.canPlayType("audio/ogg; codecs=\"vorbis\""), reqBodyParamObj.acots = mediaSource.isTypeSupported("audio/ogg; codecs=\"vorbis\""), reqBodyParamObj.acmp = audioElement.canPlayType("audio/mpeg;"), reqBodyParamObj.acmpts = mediaSource.isTypeSupported("audio/mpeg;\""), reqBodyParamObj.acw = audioElement.canPlayType("audio/wav; codecs=\"1\""), reqBodyParamObj.acwts = mediaSource.isTypeSupported("audio/wav; codecs=\"1\""), reqBodyParamObj.acma = audioElement.canPlayType("audio/x-m4a;"), reqBodyParamObj.acmats = mediaSource.isTypeSupported("audio/x-m4a;"), reqBodyParamObj.acaa = audioElement.canPlayType("audio/aac;"), reqBodyParamObj.acaats = mediaSource.isTypeSupported("audio/aac;"), reqBodyParamObj.ac3 = audioElement.canPlayType("audio/3gpp;"), reqBodyParamObj.ac3ts = mediaSource.isTypeSupported("audio/3gpp;"), reqBodyParamObj.acf = audioElement.canPlayType("audio/flac;"), reqBodyParamObj.acfts = mediaSource.isTypeSupported("audio/flac;"), reqBodyParamObj.acmp4 = audioElement.canPlayType("audio/mp4;"), reqBodyParamObj.acmp4ts = mediaSource.isTypeSupported("audio/mp4;"), reqBodyParamObj.acmp3 = audioElement.canPlayType("audio/mp3;"), reqBodyParamObj.acmp3ts = mediaSource.isTypeSupported("audio/mp3;"), reqBodyParamObj.acwm = audioElement.canPlayType("audio/webm;"), reqBodyParamObj.acwmts = mediaSource.isTypeSupported("audio/webm;"), reqBodyParamObj.ocpt = -1 === audioElement.canPlayType.toString().indexOf("canPlayType");
        } catch (err) {
          reqBodyParamObj.aco = "NA", reqBodyParamObj.acmp = "NA", reqBodyParamObj.acw = "NA", reqBodyParamObj.acma = "NA", reqBodyParamObj.acaa = "NA", reqBodyParamObj.ac3 = "NA", reqBodyParamObj.acf = "NA", reqBodyParamObj.acmp4 = "NA", reqBodyParamObj.acmp3 = "NA", reqBodyParamObj.acwm = "NA", reqBodyParamObj.acots = "NA", reqBodyParamObj.acmpts = "NA", reqBodyParamObj.acwts = "NA", reqBodyParamObj.acmats = "NA", reqBodyParamObj.acaats = "NA", reqBodyParamObj.ac3ts = "NA", reqBodyParamObj.acfts = "NA", reqBodyParamObj.acmp4ts = "NA", reqBodyParamObj.acmp3ts = "NA", reqBodyParamObj.acwmts = "NA";
        }
      }, this.dd_J = function() {
        try {
          var videoElement = document.createElement("video"),
            mediaSource = MediaSource || WebKitMediaSource;
          reqBodyParamObj.vco = videoElement.canPlayType("video/ogg; codecs=\"theora\""), reqBodyParamObj.vcots = mediaSource.isTypeSupported("video/ogg; codecs=\"theora\""), reqBodyParamObj.vch = videoElement.canPlayType("video/mp4; codecs=\"avc1.42E01E\""), reqBodyParamObj.vchts = mediaSource.isTypeSupported("video/mp4; codecs=\"avc1.42E01E\""), reqBodyParamObj.vcw = videoElement.canPlayType("video/webm; codecs=\"vp8, vorbis\""), reqBodyParamObj.vcwts = mediaSource.isTypeSupported("video/webm; codecs=\"vp8, vorbis\""), reqBodyParamObj.vc3 = videoElement.canPlayType("video/3gpp;"), reqBodyParamObj.vc3ts = mediaSource.isTypeSupported("video/3gpp;"), reqBodyParamObj.vcmp = videoElement.canPlayType("video/mpeg;"), reqBodyParamObj.vcmpts = mediaSource.isTypeSupported("video/mpeg"), reqBodyParamObj.vcq = videoElement.canPlayType("video/quicktime;"), reqBodyParamObj.vcqts = mediaSource.isTypeSupported("video/quicktime;"), reqBodyParamObj.vc1 = videoElement.canPlayType("video/mp4; codecs=\"av01.0.08M.08\""), reqBodyParamObj.vc1ts = mediaSource.isTypeSupported("video/mp4; codecs=\"av01.0.08M.08\"");
        } catch (err) {
          reqBodyParamObj.vco = "NA", reqBodyParamObj.vch = "NA", reqBodyParamObj.vcw = "NA", reqBodyParamObj.vc3 = "NA", reqBodyParamObj.vcmp = "NA", reqBodyParamObj.vcq = "NA", reqBodyParamObj.vc1 = "NA", reqBodyParamObj.vcots = "NA", reqBodyParamObj.vchts = "NA", reqBodyParamObj.vcwts = "NA", reqBodyParamObj.vc3ts = "NA", reqBodyParamObj.vcmpts = "NA", reqBodyParamObj.vcqts = "NA", reqBodyParamObj.vc1ts = "NA";
        }
      }, this.dd_K = function() {
        reqBodyParamObj.dvm = navigator.deviceMemory || -1;
      }, this.dd_L = function() {
        reqBodyParamObj.sqt = window.external && window.external.toString && window.external.toString().indexOf("Sequentum") > -1;
      }, this.dd_M = function() {
        try {
          reqBodyParamObj.so = window.screen.orientation.type;
        } catch (err) {
          try {
            reqBodyParamObj.so = window.screen.msOrientation;
          } catch (err) {
            reqBodyParamObj.so = "NA";
          }
        }
      }, this.dd_R = function() {
        "object" == typeof window.process && "renderer" === window.process.type || "undefined" != typeof process && "object" == typeof process.versions && process.versions.electron || window.close.toString().indexOf("ELECTRON") > -1 ? reqBodyParamObj.ecpc = true : reqBodyParamObj.ecpc = !!window.process;
      }, this.dd_Q = function() {
        if (reqBodyParamObj.wdw = true, navigator.userAgent.toLowerCase().indexOf("chrome") >= 0 && !window.chrome && (reqBodyParamObj.wdw = false), window.chrome) {
          var allChromeMetrics = "";
          for (var chromeMetricsAttrs in window.chrome) allChromeMetrics += chromeMetricsAttrs;
          reqBodyParamObj.cokys = strToB64Func(allChromeMetrics) + "L=";
        }
      }, this.dd_aa = function() {
        var notificationsObj = {
          "name": "notifications"
        };
        (reqBodyParamObj.prm = true, void 0 !== navigator.permissions && void 0 !== navigator.permissions.query && navigator.permissions.query(notificationsObj).then(function(notificationsObj) {
          "undefined" != typeof Notification && "denied" == Notification.permission && "prompt" == notificationsObj.state && (reqBodyParamObj.prm = false);
        })["catch"](function() {}));
      }, this.dd_S = function() {
        reqBodyParamObj.lgs = "" !== navigator.languages, reqBodyParamObj.lgsod = !!Object.getOwnPropertyDescriptor(navigator, "languages");
      }, this.dd_T = function() {
        var allDocElesWork = true,
          hasDeviceMemory = !!navigator.deviceMemory,
          hasBrowserBuildID = !!navigator.buildID,
          errStackPuppeteer = /[p_]{3}up[tep]{4}er[ae_v]{4}lua[noti]{4}/,
          errStackRegexCodeExecution = /eval\sat\sevaluate|@chrome|evaluate@/,
          errStackRegexApplyEle = /apply\.(css\sselector|xpath|(partial\s)?link\stext)/,
          intNum50 = 50;

        function testDocumentEleFuncs(documentgetEleFunc) {
          return "function" != typeof documentgetEleFunc || true === navigator.webdriver ? documentgetEleFunc : documentgetEleFunc.toString().match(/\{\s*\[native code\]\s*\}$/m) && documentgetEleFunc.toString.toString().match(/\{\s*\[native code\]\s*\}$/m) ? function() {
            if (intNum50 <= 0) return documentgetEleFunc.apply(this, arguments);
            if (intNum50--, reqContainsErr() || !allDocElesWork) return documentgetEleFunc.apply(this, arguments);
            try {
              var funcCaller = arguments.callee.caller.toString();
              reqBodyParamObj.cfpfe = strToB64Func(funcCaller.slice(0, 150)), funcCaller.indexOf("on(selector, wit") > -1 && (reqBodyParamObj.cffrb = true, createChallEvent("asyncChallengeFinished"));
            } catch (err) {
              reqBodyParamObj.cfpfe = strToB64Func("Error: " + err.message.slice(0, 150));
            }
            try {
              null[0];
            } catch (err) {
              if ("string" != typeof err.stack) return documentgetEleFunc.apply(this, arguments);
              reqBodyParamObj.stcfp = strToB64Func(err.stack.slice(-150));
              var errStack = err.stack.split("\n");
              if (hasDeviceMemory) try {
                var errStackLength = errStack.length > 1 && errStackPuppeteer.test(errStack[2]);
                errStackLength && (reqBodyParamObj.cfpp = true, createChallEvent("asyncChallengeFinished"));
                var errStackLength = errStack.length > 2 && errStackRegexCodeExecution.test(errStack[errStack.length - 3]);
                errStackLength && (reqBodyParamObj.cfcpw = true, createChallEvent("asyncChallengeFinished"));
                var errStackLength = errStack.length > 8 && errStackRegexApplyEle.test(errStack[errStack.length - 4]);
                errStackLength && (reqBodyParamObj.cfse = true, createChallEvent("asyncChallengeFinished"));
              } catch (err) {} else {
                if (hasBrowserBuildID) try {
                  var errStackLength = errStack.length > 2 && errStackRegexCodeExecution.test(errStack[errStack.length - 3]);
                  errStackLength && (reqBodyParamObj.cffpw = true, createChallEvent("asyncChallengeFinished"));
                } catch (err) {}
              }
            }
            return documentgetEleFunc.apply(this, arguments);
          } : documentgetEleFunc;
        }
        try {
          document.getElementById = testDocumentEleFuncs(document.getElementById), document.getElementsByTagName = testDocumentEleFuncs(document.getElementsByTagName), document.querySelector = testDocumentEleFuncs(document.querySelector), document.querySelectorAll = testDocumentEleFuncs(document.querySelectorAll), document.evaluate = testDocumentEleFuncs(document.evaluate), XMLSerializer && XMLSerializer.prototype && XMLSerializer.prototype.serializeToString && (XMLSerializer.prototype.serializeToString = testDocumentEleFuncs(XMLSerializer.prototype.serializeToString)), setTimeout(function() {
            allDocElesWork = false;
          }, 5000);
        } catch (err) {}
      }, this.dd_e = function() {
        if (navigator.deviceMemory) {
          var iFrameEle = this.i;
          if (iFrameEle) {
            function checkNavPluginsPostMsg(nav_plugins, pluginType) {
              if (!nav_plugins) return null;
              var errMsg;
              try {
                iFrameEle.contentWindow.postMessage(nav_plugins, "*");
              } catch (err) {
                errMsg = err;
              }
              if (!errMsg) return true;
              var wantedErrMsg = "Failed to execute 'postMessage' on 'Window': " + pluginType + " object could not be cloned.";
              return errMsg.message != wantedErrMsg;
            }
            reqBodyParamObj.npmtm = !!(checkNavPluginsPostMsg(navigator.plugins, "PluginArray") || checkNavPluginsPostMsg(navigator.plugins[0], "Plugin") || checkNavPluginsPostMsg(navigator.mimeTypes, "MimeTypeArray") || checkNavPluginsPostMsg(navigator.mimeTypes[0], "MimeType"));
          } else reqBodyParamObj.npmtm = "noIframe";
        } else reqBodyParamObj.npmtm = "NA";
      }, this.dd_U = function() {
        reqBodyParamObj.psn = !!window.PermissionStatus && window.PermissionStatus.prototype.hasOwnProperty("name"), reqBodyParamObj.edp = !!window.EyeDropper, reqBodyParamObj.addt = !!window.AudioData, reqBodyParamObj.wsdc = !!window.WritableStreamDefaultController, reqBodyParamObj.ccsr = !!window.CSSCounterStyleRule, reqBodyParamObj.nuad = !!window.NavigatorUAData, reqBodyParamObj.bcda = !!window.BarcodeDetector, reqBodyParamObj.idn = !(!window.Intl || !Intl.DisplayNames), reqBodyParamObj.capi = !!(window.navigator && window.navigator.contacts && window.navigator.ContactsManager), reqBodyParamObj.svde = !!window.SVGDiscardElement, reqBodyParamObj.vpbq = !!(window.HTMLVideoElement && window.HTMLVideoElement.prototype && window.HTMLVideoElement.prototype.getVideoPlaybackQuality);
      }, this.dd_V = function() {
        var seleniumDriverArr1 = ["__driver_evaluate", "__webdriver_evaluate", "__selenium_evaluate", "__fxdriver_evaluate", "__driver_unwrapped", "__webdriver_unwrapped", "__selenium_unwrapped", "__fxdriver_unwrapped", "_Selenium_IDE_Recorder", "_selenium", "calledSelenium", "$cdc_asdjflasutopfhvcZLmcfl_", "$chrome_asyncScriptInfo", "__$webdriverAsyncExecutor", "webdriver", "__webdriverFunc", "domAutomation", "domAutomationController", "__lastWatirAlert", "__lastWatirConfirm", "__lastWatirPrompt", "__webdriver_script_fn", "__webdriver_script_func", "__webdriver_script_function", "_WEBDRIVER_ELEM_CACHE"],
          seleniumDriverArr2 = ["driver-evaluate", "webdriver-evaluate", "selenium-evaluate", "webdriverCommand", "webdriver-evaluate-response"];

        function webDriverEventFunc(eventObj) {
          eventObj && (reqContainsErr() ? reqBodyParamObj.slat = true : (reqBodyParamObj.slat = true, reqBodyParamObj.slevt = true, createChallEvent("asyncChallengeFinished")));
        }
        if ("function" == typeof document.addEventListener) {
          for (var index = 0; index < seleniumDriverArr2.length; index++) document.addEventListener(seleniumDriverArr2[index], webDriverEventFunc);
        }
        setTimeout(function() {
          if ("function" == typeof document.removeEventListener) {
            for (var index = 0; index < seleniumDriverArr2.length; index++) document.removeEventListener(seleniumDriverArr2[index], webDriverEventFunc);
          }
        }, 10000);
        for (index = 0; index < seleniumDriverArr1.length; index++)
          if ((seleniumDriverArr1[index] in window || seleniumDriverArr1[index] in document) && !reqContainsErr()) return reqBodyParamObj.slat = true, void createChallEvent("asyncChallengeFinished");
        var intervalFunc = setInterval(function() {
          for (var index = 0; index < seleniumDriverArr1.length; index++)
            if ((seleniumDriverArr1[index] in window || seleniumDriverArr1[index] in document) && !reqContainsErr()) return reqBodyParamObj.slat = true, createChallEvent("asyncChallengeFinished"), void clearInterval(intervalFunc);
          if ("undefined" != typeof Object && "function" == typeof Object.keys) {
            var webpageElementFuncsArr = Object.keys(document);
            for (index = 0; index < webpageElementFuncsArr.length; index++) {
              var webpageFunc = webpageElementFuncsArr[index];
              if (webpageFunc && "string" == typeof webpageFunc && webpageFunc.indexOf("$cdc_") > -1 && !reqContainsErr()) return reqBodyParamObj.slat = true, createChallEvent("asyncChallengeFinished"), void clearInterval(intervalFunc);
              try {
                if (document[webpageFunc] && void 0 === document[webpageFunc].window && void 0 !== document[webpageFunc].cache_) {
                  for (var cachedItem in document[webpageFunc].cache_) cachedItem && cachedItem.match(/[\d\w]{8}\-[\d\w]{4}\-[\d\w]{4}\-[\d\w]{4}\-[\d\w]{12}/) && (reqContainsErr() || (reqBodyParamObj.slmk = webpageFunc.slice(0, 64), reqBodyParamObj.slat = true, createChallEvent("asyncChallengeFinished"), clearInterval(intervalFunc)));
                }
              } catch (err) {}
            }
          }
        }, 500);
        setTimeout(function() {
          clearInterval(intervalFunc);
        }, 10000);
      }, this.dd_W = function() {
        reqBodyParamObj.ucdv = "undefined" != typeof objectToInspect && null === objectToInspect && "undefined" != typeof result && !!result;
      }, this.dd_X = function() {
        reqBodyParamObj.spwn = !!window.spawn, reqBodyParamObj.emt = !!window.emit, reqBodyParamObj.bfr = !!window.Buffer;
      }, this.dd_Y = function() {
        void 0 !== window.console && "function" == typeof window.console.debug && (reqBodyParamObj.dbov = !!("" + window.console.debug).match(/[\)\( ]{3}[>= ]{3}\{\n[ r]{9}etu[n r]{3}n[lu]{3}/));
      }, this.dd_h = function() {
        try {
          reqBodyParamObj.nddc = (document.cookie.match(/datadome=/g) || []).length, -1 === ["8FE0CF7F8AB30EC588599D8046ED0E", "87F03788E785FF301D90BB197E5803", "765F4FCDDF6BEDC11EC6F933C2BBAF", "00D958EEDB6E382CCCF60351ADCBC5", "E425597ED9CAB7918B35EB23FEDF90", "E425597ED9CAB7918B35EB23FEDF90"].indexOf(window.ddjskey) && 2 === reqBodyParamObj.nddc && window.location.href.indexOf("www.") > -1 && (document.cookie = "datadome=1; Max-Age=0; Path=/;");
        } catch (err) {
          reqBodyParamObj.nddc = "err";
        }
      }, this.checkMousePosition = function() {
        var mousePositionTimeStamp;

        function removeMousePsEvents(mouseEventObj) {
          if (mouseEventObj.isTrusted) {
            if (mousePositionTimeStamp && mouseEventObj.timeStamp && (null === reqBodyParamObj.tbce || void 0 === reqBodyParamObj.tbce)) {
              reqBodyParamObj.tbce = parseInt(mouseEventObj.timeStamp - mousePositionTimeStamp);
              try {
                this.dataDomeTools.removeEventListener(window, "mousedown", removeMousePsEvents), this.dataDomeTools.removeEventListener(window, "mouseup", removeMousePsEvents);
              } catch (err) {}
            }
            mouseEventObj.timeStamp && (mousePositionTimeStamp = mouseEventObj.timeStamp);
          }
        }
        this.dataDomeTools.addEventListener(window, "mousemove", this.getMousePosition), "288922D4BE1987530B4E5D4A17952C" === window.ddjskey && this.dataDomeTools.addEventListener(window, "click", this.getInfoClick), this.dataDomeTools.addEventListener(window, "mousedown", removeMousePsEvents), this.dataDomeTools.addEventListener(window, "mouseup", removeMousePsEvents);
      }, this.getMousePosition = function(mouseEvent) {
        var mouseCoordObj = {
          "clientX": mouseEvent.clientX,
          "clientY": mouseEvent.clientY
        };
        if (mouseEventObject) {
          if (Math.sqrt && window.parseInt) {
            var mouseMovementCalcs = Math.sqrt((_0xe38b9.clientX - mouseEventObject.clientX) * (mouseCoordObj.clientX - mouseEventObject.clientX) + (mouseCoordObj.clientY - mouseEventObject.clientY) * (mouseCoordObj.clientY - mouseEventObject.clientY));
            (!reqBodyParamObj.mm_md || mouseMovementCalcs > reqBodyParamObj.mm_md) && (reqBodyParamObj.mm_md = parseInt(mouseMovementCalcs)), mouseEventObject = mouseCoordObj;
          }
        } else mouseEventObject = mouseCoordObj;
        try {
          reqBodyParamObj.mp_cx = mouseEvent.clientX, reqBodyParamObj.mp_cy = mouseEvent.clientY, reqBodyParamObj.mp_tr = mouseEvent.isTrusted, reqBodyParamObj.mp_mx = mouseEvent.movementX, reqBodyParamObj.mp_my = mouseEvent.movementY, reqBodyParamObj.mp_sx = mouseEvent.screenX, reqBodyParamObj.mp_sy = mouseEvent.screenY;
        } catch (err) {}
      }, this.getInfoClick = function(mouseEventObj) {
        try {
          var mouseEventTarget = mouseEventObj.target;
          (mouseEventTarget.href && mouseEventTarget.href.indexOf("alb.reddit") > -1 || mouseEventTarget.parentElement && mouseEventTarget.parentElement.href && mouseEventTarget.parentElement.href.indexOf("alb.reddit") > -1) && (mouseEventObj.isTrusted || (reqBodyParamObj.haent = true), reqBodyParamObj.nclad ? reqBodyParamObj.nclad++ : reqBodyParamObj.nclad = 1, createChallEvent("asyncChallengeFinished"));
        } catch (err) {}
      }, this.dd_ae = function() {
        var dispatchEventFunc = document.dispatchEvent;
        document.dispatchEvent = function(eventParam) {
          return 0 == eventParam.type.indexOf("web-scraper-callback") && (reqBodyParamObj.ewsi = true), dispatchEventFunc.call(document, eventParam);
        };
      }, this.dd_af = function() {
        reqBodyParamObj.uid = this.dataDomeTools.getCookie("correlation_id");
      }, this.dd_Z = function() {
        var browserFlowContainer = document.querySelector("browserflow-container");
        browserFlowContainer && ! function browserFlowEleCheckFunc() {
          try {
            var browserFlowStatusElement = browserFlowContainer.shadowRoot.querySelector("browserflow-status");
            browserFlowStatusElement && browserFlowStatusElement.childNodes.length > 0 ? reqBodyParamObj.bflw = true : setTimeout(browserFlowEleCheckFunc, 100);
          } catch (err) {
            try {
              reqBodyParamObj.log3 = strToB64Func(err.message);
            } catch (err) {}
          }
        }();
      };
    }), exportObj.exports = funcToolsFunc;
  }, DictModForModule3],
  4: [function(moduleLoadFuncParam, exportObj, throwAwayVar1) {
    'use strict';

    var ddToolsModule = moduleLoadFuncParam("./../common/DataDomeTools");
    exportObj.exports = function(objToAttachModuleAttributesTo) {
      this.jsType = objToAttachModuleAttributesTo, this.requestApi = function(ddjskey, objToAttachModuleAttributesTo, array, patternToRemoveFromReferrerUrl, isAsync, ddResponsePage) {
        var newDDToolsModule = new ddToolsModule();
        if (objToAttachModuleAttributesTo.jset = Math.floor(Date.now() / 1000), !newDDToolsModule.isSafariUA() && !isAsync && window.navigator && window.navigator.sendBeacon && window.Blob) {
          var HttpReqContentTypeObj = {
            "type": "application/x-www-form-urlencoded"
          };
          var queryStr = this.getQueryParamsString(objToAttachModuleAttributesTo, array, ddjskey, patternToRemoveFromReferrerUrl, ddResponsePage),
            searchParams = "URLSearchParams" in window ? new URLSearchParams(queryStr) : new Blob([queryStr], HttpReqContentTypeObj);
          window.navigator.sendBeacon(window.dataDomeOptions.endpoint, searchParams), window.dataDomeOptions.enableTagEvents && newDDToolsModule.dispatchEvent(newDDToolsModule.eventNames.posting, {
            "endpointUrl": window.dataDomeOptions.endpoint
          });
        } else {
          if (window.XMLHttpRequest) {
            var httpClient = new XMLHttpRequest();
            try {
              httpClient.open("POST", window.dataDomeOptions.endpoint, isAsync), httpClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              var queryStr = this.getQueryParamsString(objToAttachModuleAttributesTo, array, ddjskey, patternToRemoveFromReferrerUrl, ddResponsePage);
              newDDToolsModule.debug("xmlHttpString built.", queryStr), null !== window.dataDomeOptions.customParam && (queryStr += "&custom=" + window.dataDomeOptions.customParam), httpClient.onreadystatechange = function() {
                if (this && 4 == this.readyState && 200 == this.status) try {
                  if ("string" == typeof this.responseText && !window.DataDomeCaptchaDisplayed) {
                    var parsedJSONResp = JSON.parse(httpClient.responseText);
                    if (parsedJSONResp.cookie) {
                      var cookieDomainIndex = parsedJSONResp.cookie.indexOf("Domain="),
                        cookiePathIndex = parsedJSONResp.cookie.indexOf("Path="),
                        cookieDomain = parsedJSONResp.cookie.slice(cookieDomainIndex + "Domain=".length, cookiePathIndex - "; ".length);
                      if (cookieDomainIndex > -1) {
                        if (window.dataDomeOptions.overrideCookieDomain ? (parsedJSONResp.cookie = newDDToolsModule.replaceCookieDomain(parsedJSONResp.cookie, window.location.hostname), objToAttachModuleAttributesTo.dcok = window.location.hostname) : objToAttachModuleAttributesTo.dcok = cookieDomain, window.ddCbh && newDDToolsModule.isLocalStorageEnabled && localStorage.setItem) {
                          var ddCookiewRegex = new RegExp("datadome=([^;]+)").exec(parsedJSONResp.cookie),
                            isNull = null != ddCookiewRegex ? unescape(ddCookiewRegex[1]) : null;
                          localStorage.setItem("ddSession", isNull);
                        }
                        newDDToolsModule.setCookie(parsedJSONResp.cookie);
                      }
                    }
                  }
                  window.dataDomeOptions.enableTagEvents && newDDToolsModule.dispatchEvent(newDDToolsModule.eventNames.posted, {
                    "endpointUrl": window.dataDomeOptions.endpoint
                  });
                } catch (err) {}
              }, newDDToolsModule.debug("Request sent.", httpClient), httpClient.send(queryStr), window.dataDomeOptions.enableTagEvents && newDDToolsModule.dispatchEvent(newDDToolsModule.eventNames.posting, {
                "endpointUrl": window.dataDomeOptions.endpoint
              });
            } catch (err) {
              newDDToolsModule.debug("Error when trying to send request.", err);
            }
          }
        }
      }, this.getQueryParamsString = function(objToAttachModuleAttributesTo, array, ddJSKey, patternToRemoveFromReferrerUrl, ddResponsePage, isTrue) {
        var newDDToolsModule = new ddToolsModule();
        objToAttachModuleAttributesTo.plos && !isTrue && (objToAttachModuleAttributesTo.plos = "cleared");
        var ddCookie = newDDToolsModule.getCookie();
        !ddCookie && window.ddm && (ddCookie = window.ddm.cid);
        var jsDataStr = "jsData=" + encodeURIComponent(JSON.stringify(objToAttachModuleAttributesTo)) + "&eventCounters=" + encodeURIComponent(JSON.stringify(array)) + "&jsType=" + this.jsType + "&cid=" + encodeURIComponent(ddCookie) + "&ddk=" + escape(encodeURIComponent(ddJSKey)) + "&Referer=" + escape(encodeURIComponent(newDDToolsModule.removeSubstringPattern(window.location.href, patternToRemoveFromReferrerUrl).slice(0, 1024))) + "&request=" + escape(encodeURIComponent((window.location.pathname + window.location.search + window.location.hash).slice(0, 1024))) + "&responsePage=" + escape(encodeURIComponent(ddResponsePage)) + "&ddv=" + window.dataDomeOptions.version;
        if (jsDataStr.length < 16000 || isTrue) return window.dataDomeOptions.testingMode && (window.testJsData = objToAttachModuleAttributesTo), jsDataStr;
        var msgLog = "";
        try {
          var startIdxJSData = jsDataStr.indexOf("jsType=", startIdxJSData),
            jsDataLength = jsDataStr.length - startIdxJSData;
          msgLog = "Total: " + jsDataStr.length + ", jsData: " + startIdxJSData + ", rest: " + jsDataLength;
          var objStoreModAttr1 = {
            "name": "",
            "len": 0
          };
          var objStoreModAttr2 = {
            "name": "",
            "len": 0
          };
          var objStoreModAttr3 = {
            "name": "",
            "len": 0
          };
          var objsToStoreModAttrs = [objStoreModAttr1, objStoreModAttr2, objStoreModAttr3];
          for (var moduleAttribute in objToAttachModuleAttributesTo) {
            var modAttrEncodedLength = encodeURIComponent(JSON.stringify(objToAttachModuleAttributesTo[moduleAttribute])).length;
            modAttrEncodedLength > objsToStoreModAttrs[2].len && (objsToStoreModAttrs[2].len = modAttrEncodedLength, objsToStoreModAttrs[2].name = moduleAttribute, objsToStoreModAttrs.sort(function(modAttrArrObj2, modAttrArrObj1) {
              return modAttrArrObj1.len - modAttrArrObj2.len;
            }));
          }
          var trueIfJsDataOver24000 = false;
          jsDataStr.length > 24000 && (trueIfJsDataOver24000 = true, msgLog = "[>24k!] " + msgLog);
          for (var index = 0; index < 3; index++) msgLog += ", " + objsToStoreModAttrs[index].name + ": " + objsToStoreModAttrs[index].len, trueIfJsDataOver24000 && objsToStoreModAttrs[index].len > 300 && (objToAttachModuleAttributesTo[objsToStoreModAttrs[index].name] = objToAttachModuleAttributesTo[objsToStoreModAttrs[index].name].slice(0, 300) + "...");
        } catch (err) {
          try {
            msgLog = "Err: " + err.message;
          } catch (err) {
            msgLog = "GE";
          }
        }
        return msgLog.length > 200 && (msgLog = msgLog.slice(0, 200) + "..."), objToAttachModuleAttributesTo.plos = msgLog, this.getQueryParamsString(objToAttachModuleAttributesTo, array, ddJSKey, patternToRemoveFromReferrerUrl, ddResponsePage, true);
      };
    };
  }, DictModForModule4],
  5: [function(moduleLoadFuncParam, exportObj, throwAwayVar1) {
    'use strict';

    var ddToolsModule = moduleLoadFuncParam("./../common/DataDomeTools");
    exportObj.exports = function(objToAttachModuleAttributesTo) {
      function checkDDKey(ddJavaScriptKey, isSalesForce) {
        return ["5B45875B653A484CC79E57036CE9FC", "EFDDEA6D6717FECF127911F870F88A", "A8074FDFEB4241633ED1C1FA7E2AF8", "9D463B509A4C91FDFF39B265B3E2BC"].indexOf(ddJavaScriptKey) > -1 || isSalesForce;
      }
      this.dataDomeStatusHeader = "x-dd-b", this.parseCAPTCHAResponse = function(isSalesForce, httpResponseText, responseURL, hasRespHeaders) {
        try {
          var ddRespJSONURL,
            hasHTMLResp,
            hasURLResp,
            hasDDResp,
            isURLResp,
            startOfDDRespObj,
            startOfContentID,
            endOfRespBodyIndex,
            isStringResp = "string" == typeof httpResponseText;
          if (isStringResp && (startOfDDRespObj = httpResponseText.indexOf("dd={"), startOfContentID = httpResponseText.indexOf("'cid':"), endOfRespBodyIndex = httpResponseText.slice(startOfDDRespObj).indexOf("}"), hasHTMLResp = httpResponseText.indexOf("<style>") > -1 || httpResponseText.indexOf("<script>") > -1, hasURLResp = httpResponseText.indexOf("{\"url\":\"") > -1, isURLResp = (hasDDResp = startOfDDRespObj > -1 && startOfContentID > startOfDDRespObj && startOfContentID < startOfDDRespObj + endOfRespBodyIndex) || hasURLResp), (checkDDKey(window.ddjskey, isSalesForce) || window.dataDomeOptions.allowHtmlContentTypeOnCaptcha) && isStringResp && isURLResp && hasHTMLResp) {
            if (hasDDResp) {
              var startIndex = startOfDDRespObj + "dd=".length,
                EndOfRespIndex = startIndex + httpResponseText.slice(startIndex).indexOf("}") + 1,
                fixedHTTPResponseText = httpResponseText.slice(startIndex, EndOfRespIndex).replace("&#x2d;", "-"),
                parsedJSONObj = JSON.parse(fixedHTTPResponseText.replace(/'/g, "\"")),
                parsedJSONText = parsedJSONObj.s ? "&s=" + parsedJSONObj.s : "";
              ddRespJSONURL = {
                "url": "https://" + parsedJSONObj.host + "/captcha/?initialCid=" + parsedJSONObj.cid + "&hash=" + parsedJSONObj.hsh + "&t=" + parsedJSONObj.t + parsedJSONText + "&referer=" + encodeURIComponent(document.location.href) + (parsedJSONObj.e ? "&e=" + parsedJSONObj.e : "")
              };
            } else {
              if (hasURLResp) {
                var startIndex = httpResponseText.indexOf("{\"url\":\""),
                  EndOfRespIndex = startIndex + httpResponseText.slice(startIndex).indexOf("}") + 1;
                ddRespJSONURL = JSON.parse(decodeURIComponent(httpResponseText.slice(startIndex, EndOfRespIndex).replace("&#x2d;", "-")));
              }
            }
            (checkDDKey(window.ddjskey, isSalesForce) || window.dataDomeOptions.allowHtmlContentTypeOnCaptcha) && (objToAttachModuleAttributesTo.chtp = responseURL);
          } else hasRespHeaders && (ddRespJSONURL = isStringResp ? JSON.parse(httpResponseText) : httpResponseText);
        } catch (err) {
          if (err && err.message) try {
            objToAttachModuleAttributesTo.cdcx = err.message.slice(0, 150), window.dataDomeOptions.testingMode && (window.testJsData = objToAttachModuleAttributesTo);
          } catch (err) {}
          return;
        }
        return ddRespJSONURL;
      }, this.process = function(httpResponseText, responseHeaders, abortAsyncOnCaptcha, exposeCaptchaFunc, responseObj, isSalesForce, responseURL) {
        if (true !== window.DataDomeCaptchaDisplayed) {
          var hasRespHeaders = false,
            exportObj = this;
          if ("string" == typeof responseHeaders) {
            if (String.prototype.trim || (String.prototype.trim = function() {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
              }), Array.prototype.forEach) responseHeaders.trim().split(/[\r\n]+/).forEach(function(respHeader) {
              respHeader.split(": ").shift().toLowerCase() === exportObj.dataDomeStatusHeader && (hasRespHeaders = true);
            });
            else {
              responseHeaders = responseHeaders.trim().split(/[\r\n]+/);
              for (var index = 0; index < responseHeaders.length; index++) {
                responseHeaders[index].split(": ").shift().toLowerCase() === exportObj.dataDomeStatusHeader && (hasRespHeaders = true);
              }
            }
          } else "object" == typeof responseHeaders && "Headers" === responseHeaders.constructor.name && (hasRespHeaders = !!responseHeaders.get(exportObj.dataDomeStatusHeader));
          if ((false !== hasRespHeaders || checkDDKey(window.ddjskey, isSalesForce) || window.dataDomeOptions.allowHtmlContentTypeOnCaptcha) && httpResponseText) {
            var parsedCaptcha = this.parseCAPTCHAResponse(isSalesForce, httpResponseText, responseURL, hasRespHeaders);
            if (parsedCaptcha && parsedCaptcha.url && function(captchaURL) {
                for (var index = 0; index < captchaURLsArr.length; ++index)
                  if (0 === captchaURL.indexOf(captchaURLsArr[index])) return true;
                return false;
              }(parsedCaptcha.url)) {
              if (window.dataDomeOptions.enableTagEvents) {
                var newDDToolsModule = new ddToolsModule(),
                  eventPropsObj = {};
                eventPropsObj.url = responseURL, eventPropsObj.captchaUrl = parsedCaptcha.url, newDDToolsModule.dispatchEvent(newDDToolsModule.eventNames.blocked, eventPropsObj);
              }
              exposeCaptchaFunc && this.displayCaptchaPage(parsedCaptcha.url), abortAsyncOnCaptcha && responseObj && responseObj.abort();
            }
          }
        }
      };
      var captchaURLsArr = ["https://c.datado.me", "https://c.captcha-delivery.com", "https://ct.captcha-delivery.com", "https://geo.captcha-delivery.com"];
      this.displayCaptchaPage = function(capURL) {
        var newDDToolsModule = new ddToolsModule(),
          ddCookie = newDDToolsModule.getCookie(),
          msgCaptEvent = function(msgEvent) {
            try {
              if (msgEvent.isTrusted && (eventOrigin = msgEvent.origin, capDeliverURLEnding = ".captcha-delivery.com", wasOnCapSite = eventOrigin.slice(eventOrigin.indexOf(capDeliverURLEnding)) === capDeliverURLEnding, captchaURLsArr.indexOf(eventOrigin) > -1 || wasOnCapSite) && msgEvent.data) {
                var eventParsedJSON = JSON.parse(msgEvent.data);
                if (!eventParsedJSON.cookie) return void(eventParsedJSON.url && setTimeout(function() {
                  window.location.reload();
                }, 100));
                if (window.dataDomeOptions.overrideCookieDomain && (eventParsedJSON.cookie = newDDToolsModule.replaceCookieDomain(eventParsedJSON.cookie, window.location.hostname)), newDDToolsModule.setCookie(eventParsedJSON.cookie), window.ddCbh && window.dataDomeOptions.disableAutoRefreshOnCaptchaPassed && newDDToolsModule.isLocalStorageEnabled && localStorage.setItem) {
                  var ddCookie = newDDToolsModule.getCookie();
                  localStorage.setItem("ddSession", ddCookie);
                }
                window.dataDomeOptions.enableTagEvents && newDDToolsModule.dispatchEvent(newDDToolsModule.eventNames.captchaPassed), setTimeout(function() {
                  if (window.dataDomeOptions.disableAutoRefreshOnCaptchaPassed) {
                    var capiFrames = document.querySelector("iframe[src^=\"" + capURL + "\"]");
                    if (capiFrames) {
                      var capiFramesParent = capiFrames.parentNode;
                      capiFramesParent && capiFramesParent.parentNode && capiFramesParent.parentNode.removeChild(capiFramesParent);
                    }
                    newDDToolsModule.removeEventListener(window, "scroll", newDDToolsModule.noscroll);
                    var capiElement = document.getElementById("ddStyleCaptchaBody" + currentDate);
                    capiElement && capiElement.parentNode && capiElement.parentNode.removeChild(capiElement), window.DataDomeCaptchaDisplayed = false, window.postMessage("dd_captcha_passed", window.origin);
                  } else window.location.reload();
                }, 500);
              }
            } catch (err) {}
            var eventOrigin, capDeliverURLEnding, wasOnCapSite;
          };
        if (window.addEventListener ? window.addEventListener("message", msgCaptEvent, false) : window.attachEvent && window.attachEvent("onmessage", msgCaptEvent), true !== window.DataDomeCaptchaDisplayed) {
          var safariUAHeightProp = newDDToolsModule.isSafariUA() ? "height: -webkit-fill-available;" : "",
            msgEleDiv = "<div style=\"height:100vh;" + safariUAHeightProp + "width:100%;position:absolute;top:0;left:0;z-index:2147483647;background-color:#ffffff;\">";
          if (msgEleDiv += "    <iframe src=\"" + capURL + "&cid=" + ddCookie + "\"  width=\"100%\" height=\"100%\" style=\"height:100vh;" + safariUAHeightProp + "\" FRAMEBORDER=\"0\" border=\"0\" scrolling=\"yes\"></iframe>", msgEleDiv += "</div>", ddCookie) {
            newDDToolsModule.addEventListener(window, "scroll", newDDToolsModule.noscroll), newDDToolsModule.noscroll();
            var currentDate = Date.now();
            document.body.insertAdjacentHTML("beforeend", "<style id=\"ddStyleCaptchaBody" + currentDate + "\"> html, body { margin: 0 !important; padding:0 !important; } " + "body { overflow: hidden; -webkit-transform: scale(1) !important;" + " -moz-transform: scale(1) !important; transform: scale(1) !important; } </style>"), document.body.insertAdjacentHTML("beforeend", msgEleDiv), window.DataDomeCaptchaDisplayed = true, window.dataDomeOptions.enableTagEvents && newDDToolsModule.dispatchEvent(newDDToolsModule.eventNames.captchaDisplayed, {
              "captchaUrl": capURL,
              "rootElement": document.body
            });
          } else {
            var msgEleDivNotiFrame = "<div style=\"display:none;\">" + msgEleDiv + "</div>";
            document.body.insertAdjacentHTML("beforeend", msgEleDivNotiFrame), window.dataDomeOptions.enableTagEvents && newDDToolsModule.dispatchEvent(newDDToolsModule.eventNames.captchaError, {
              "captchaUrl": capURL,
              "rootElement": document.body,
              "reason": "DataDome session not found"
            });
          }
        }
      };
    };
  }, DictModForModule5],
  6: [function(moduleLoadFuncParam, throwAwayVar1, throwAwayVar2) {
    'use strict';

    ! function() {
      if (!window.dataDomeProcessed) {
        window.dataDomeProcessed = true;
        var ddOptionsModule = moduleLoadFuncParam("./common/DataDomeOptions");
        window.dataDomeOptions = new ddOptionsModule(), window.ddoptions && void 0 !== window.ddoptions && window.dataDomeOptions.check(window.ddoptions), window.DataDomeCaptchaDisplayed = false;
        var objToAttachModuleAttributesTo = {},
          ddApiClientModule = new(moduleLoadFuncParam("./services/DataDomeApiClient"))(objToAttachModuleAttributesTo);
        if (true === window.dataDomeOptions.exposeCaptchaFunction) {
          var ddResponseModule = moduleLoadFuncParam("./http/DataDomeResponse");
          window.displayDataDomeCaptchaPage = new ddResponseModule(objToAttachModuleAttributesTo).displayCaptchaPage;
        }
        if (ddApiClientModule.processSyncRequest(), (null != window.dataDomeOptions.ajaxListenerPath || window.dataDomeOptions.isSalesforce) && ddApiClientModule.processAsyncRequests(window.dataDomeOptions.ajaxListenerPath, window.dataDomeOptions.ajaxListenerPathExclusion, window.dataDomeOptions.abortAsyncOnCaptchaDisplay, !window.dataDomeOptions.exposeCaptchaFunction, window.dataDomeOptions.isSalesforce), window.dataDomeOptions.eventsTrackingEnabled) new(moduleLoadFuncParam("./live-events/DataDomeEventsTracking"))(objToAttachModuleAttributesTo).process();
        if (new(moduleLoadFuncParam("./live-events/DataDomeAsyncChallengesTracking"))(objToAttachModuleAttributesTo).process(), window.dataDomeOptions.enableTagEvents) {
          var ddToolsModule = new(moduleLoadFuncParam("./common/DataDomeTools"))();
          ddToolsModule.dispatchEvent(ddToolsModule.eventNames.ready);
        }
      }
    }();
  }, DictModForModule6],
  7: [function(moduleLoadFuncParam, exportObj, throwAwayVar1) {
    var ddRequestModule = moduleLoadFuncParam("./../http/DataDomeRequest"),
      ddToolsModule = moduleLoadFuncParam("./../common/DataDomeTools");
    exportObj.exports = function(objToAttachModuleAttributesTo) {
      var newReqModule = new ddRequestModule("ac"),
        newToolsModule = new ddToolsModule();
      this.process = function() {
        newToolsModule.addEventListener(window, "asyncChallengeFinished", function(throwAwayVar1) {
          window.dataDomeOptions && newReqModule.requestApi(window.ddjskey, objToAttachModuleAttributesTo, [], window.dataDomeOptions.patternToRemoveFromReferrerUrl, true, window.dataDomeOptions.ddResponsePage);
        });
      };
    };
  }, DictModForModule7],
  8: [function(moduleLoadFuncParam, exportObj, throwAwayVar1) {
    var ddRequestModule = moduleLoadFuncParam("./../http/DataDomeRequest"),
      ddToolsModule = moduleLoadFuncParam("./../common/DataDomeTools");

    function returnMidPointArr(mouseEventArr, intNum50) {
      if (!mouseEventArr || 0 == mouseEventArr.length) return null;
      var sortedArr = mouseEventArr.sort(function(Element2, Element1) {
          return Element2 - Element1;
        }),
        halfWay = (sortedArr.length - 1) * intNum50 / 100,
        halfWayIndex = Math.floor(halfWay);
      if (void 0 !== sortedArr[halfWayIndex + 1]) {
        var almostZero = halfWay - halfWayIndex;
        return sortedArr[halfWayIndex] + almostZero * (sortedArr[halfWayIndex + 1] - sortedArr[halfWayIndex]);
      }
      return sortedArr[halfWayIndex];
    }

    function findMouseCoordsAngle(mouseX1, mouseY1, mouseX2, mouseY2) {
      var distanceBetweenXs = mouseX2 - mouseX1,
        distanceBetweenYs = mouseY2 - mouseY1,
        coordsAngle = Math.acos(distanceBetweenXs / Math.sqrt(distanceBetweenXs * distanceBetweenXs + distanceBetweenYs * distanceBetweenYs));
      return distanceBetweenYs < 0 ? -coordsAngle : coordsAngle;
    }

    function mouseEventFunc() {
      this.u = null, this.v = [], this.l = [], this.m = [], this.p = [], this.g = [], this.A = [], this._ = function() {
        try {
          var timesMouseMoved = this.v.length;
          if (timesMouseMoved > 1) {
            for (var allTimeStampsLog = 0, allTimeStampsLoggedSqed = 0, index = 0; index < timesMouseMoved; index++) {
              var mouseMoveTimeStampLog = Math.log(this.v[index].timeStamp);
              allTimeStampsLog += mouseMoveTimeStampLog, allTimeStampsLoggedSqed += mouseMoveTimeStampLog * mouseMoveTimeStampLog;
            }
            this.l.push(Math.sqrt((timesMouseMoved * allTimeStampsLoggedSqed - allTimeStampsLog * allTimeStampsLog) / timesMouseMoved * (timesMouseMoved - 1)) / 1000), this.m.push(allTimeStampsLog / timesMouseMoved);
            var mouseEvent1 = this.v[0],
              lastMouseEvent = this.v[timesMouseMoved - 1];
            this.p.push((mouseEvent1X = mouseEvent1.clientX, mouseEvent1Y = mouseEvent1.clientY, lastMouseEventX = lastMouseEvent.clientX, lastMouseEventY = lastMouseEvent.clientY, diffBetween1andLastX = lastMouseEventX - mouseEvent1X, diffBetween1andLastY = lastMouseEventY - mouseEvent1Y, Math.sqrt(diffBetween1andLastX * diffBetween1andLastX + diffBetween1andLastY * diffBetween1andLastY)));
            var lastIndex = timesMouseMoved < 4 ? timesMouseMoved - 1 : 3,
              lastEvent = this.v[lastIndex],
              firstMouseEvent = this.v[timesMouseMoved - lastIndex - 1],
              angleOfCords1 = findMouseCoordsAngle(mouseEvent1.clientX, mouseEvent1.clientY, lastEvent.clientX, lastEvent.clientY),
              angleOfCords2 = findMouseCoordsAngle(lastMouseEvent.clientX, lastMouseEvent.clientY, firstMouseEvent.clientX, firstMouseEvent.clientY);
            this.g.push(angleOfCords1), this.A.push(angleOfCords2);
          }
          this.v = [];
        } catch (err) {}
        var mouseEvent1X, mouseEvent1Y, lastMouseEventX, lastMouseEventY, diffBetween1andLastX, diffBetween1andLastY;
      }, this.D = function(mouseMoveEvent) {
        this.u && mouseMoveEvent.timeStamp - this.u.timeStamp > 499 && this._(), (this.v.push(mouseMoveEvent), this.u = mouseMoveEvent);
      }, this.N = function(mouseEvent) {
        if (mouseEvent.isTrusted && !mouseEvent.repeat) {
          var timeSinceProgramStart = performance.now();
          if (mouseEvent.timeStamp > 0 && mouseEvent.timeStamp > timeSinceProgramStart - 5000 && mouseEvent.timeStamp < timeSinceProgramStart) return true;
        }
        return false;
      }, this.handleEvent = function(mouseMoveEvent) {
        if (this.N(mouseMoveEvent) && "mousemove" === mouseMoveEvent.type) this.D(mouseMoveEvent);
      }, this.buildSignals = function() {
        function mouseEventMidPointArrCallbackFunc(callBackFunc) {
          return function() {
            try {
              return callBackFunc.apply(this, arguments);
            } catch (err) {
              return null;
            }
          };
        }
        return this._(), {
          "es_sigmdn": mouseEventMidPointArrCallbackFunc(returnMidPointArr)(this.l, 50),
          "es_mumdn": mouseEventMidPointArrCallbackFunc(returnMidPointArr)(this.m, 50),
          "es_distmdn": mouseEventMidPointArrCallbackFunc(returnMidPointArr)(this.p, 50),
          "es_angsmdn": mouseEventMidPointArrCallbackFunc(returnMidPointArr)(this.g, 50),
          "es_angemdn": mouseEventMidPointArrCallbackFunc(returnMidPointArr)(this.A, 50)
        };
      };
    }
    exportObj.exports = function(objToAttachModuleAttributesTo) {
      var animationFrame,
        milliseconds = 10000,
        useCapture = true,
        newDDReqModule = new ddRequestModule("le"),
        newDDToolsModule = new ddToolsModule(),
        newMouseEventFunc = new mouseEventFunc(),
        validMousePosition = false,
        checkMouseEveEvery10sec = null,
        hasAnimationFrames = false,
        false1stTime = false,
        eventTypesArr = ["mousemove", "click", "scroll", "touchstart", "touchend", "touchmove", "keydown", "keyup"],
        timesEventHappenedObj = function() {
          for (var eventAmtObj = {}, index = 0; index < eventTypesArr.length; index++) eventAmtObj[eventTypesArr[index]] = 0;
          return eventAmtObj;
        }();

      function mousePosition(mouseEvent) {
        validMousePosition = true,
          function() {
            if (null != checkMouseEveEvery10sec || !hasAnimationFrames) return;
            checkMouseEveEvery10sec = setTimeout(function() {
              attachMouseEventsToAttrObj(true);
            }, milliseconds);
          }(), timesEventHappenedObj[mouseEvent.type]++, newMouseEventFunc.handleEvent(mouseEvent);
      }

      function attachMouseEventsToAttrObj(isAsync) {
        if (!false1stTime && validMousePosition && window.dataDomeOptions) {
          false1stTime = true;
          var mouseEventMoveObj = newMouseEventFunc.buildSignals();
          for (var mouseEventsIdx in mouseEventMoveObj) objToAttachModuleAttributesTo[mouseEventsIdx] = mouseEventMoveObj[mouseEventsIdx];
          newDDReqModule.requestApi(window.ddjskey, objToAttachModuleAttributesTo, timesEventHappenedObj, window.dataDomeOptions.patternToRemoveFromReferrerUrl, isAsync, window.dataDomeOptions.ddResponsePage),
            function() {
              for (var index = 0; index < eventTypesArr.length; index++) newDDToolsModule.removeEventListener(document, eventTypesArr[index], mousePosition, useCapture);
            }();
        }
      }
      this.process = function() {
        ! function() {
          for (var index = 0; index < eventTypesArr.length; index++) newDDToolsModule.addEventListener(document, eventTypesArr[index], mousePosition, useCapture);
        }(), animationFrame = window.requestAnimationFrame(function(throwAwayVar1) {
          hasAnimationFrames = true;
        }), newDDToolsModule.addEventListener(window, "onpagehide" in window ? "pagehide" : "beforeunload", function() {
          clearTimeout(checkMouseEveEvery10sec), window.cancelAnimationFrame(animationFrame), attachMouseEventsToAttrObj(false);
        });
      };
    };
  }, DictModForModule8],
  9: [function(moduleLoadFuncParam, exportObj, throwAwayVar1) {
    var ddAnalyzeModule = moduleLoadFuncParam("./../fingerprint/DataDomeAnalyzer"),
      ddRequestModule = moduleLoadFuncParam("./../http/DataDomeRequest"),
      ddResponseModule = moduleLoadFuncParam("./../http/DataDomeResponse"),
      ddToolsModule = moduleLoadFuncParam("../common/DataDomeTools");
    exportObj.exports = function(objToAttachModuleAttributesTo) {
      if ("undefined" != typeof window && window.navigator && "serviceWorker" in window.navigator) try {
        ! function() {
          function ddCaptchaMsgHandling() {
            try {
              var msgChannel;
              window.MessageChannel && navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage && (msgChannel = new MessageChannel()).port1 && msgChannel.port2 && (navigator.serviceWorker.controller.postMessage({
                "type": "INIT_PORT",
                "ddOptions": JSON.stringify(window.dataDomeOptions)
              }, [msgChannel.port2]), msgChannel.port1.onmessage = function(msgEvent) {
                try {
                  msgEvent.data.ddCaptchaUrl ? new ddResponseModule(objToAttachModuleAttributesTo).displayCaptchaPage(msgEvent.data.ddCaptchaUrl) : msgEvent.data && msgEvent.data.indexOf && "string" == typeof msgEvent.data && (msgEvent.data.indexOf("datado") > -1 || msgEvent.data.indexOf("captcha") > -1) && new ddResponseModule(objToAttachModuleAttributesTo).displayCaptchaPage(msgEvent.data);
                } catch (err) {}
              });
            } catch (err) {}
          }
          try {
            navigator.serviceWorker.ready.then(ddCaptchaMsgHandling)["catch"](function() {}), navigator.serviceWorker.controller && ddCaptchaMsgHandling();
          } catch (err) {}
        }();
      } catch (err) {}
      this.processSyncRequest = function() {
        var newddAnalyzeModule = new ddAnalyzeModule(objToAttachModuleAttributesTo);
        newddAnalyzeModule.process(), setTimeout(function() {
          var newDDReqModule = new ddRequestModule("ch");
          window.dataDomeOptions && newDDReqModule.requestApi(window.ddjskey, objToAttachModuleAttributesTo, [], window.dataDomeOptions.patternToRemoveFromReferrerUrl, true, window.dataDomeOptions.ddResponsePage), setTimeout(function() {
            newddAnalyzeModule.clean();
          }, 2000);
        });
      }, this.processAsyncRequests = function(ajaxListenPath, listenPathExclusion, abortAsyncOnCaptcha, exposeCaptchaFunc, isSalesForce) {
        var newDDToolsModule = new ddToolsModule(),
          currentModule = this;
        if (window.XMLHttpRequest) {
          var newReqObj = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype.open = function() {
            void 0 !== this.addEventListener && this.addEventListener("load", function(eventObj) {
              var eventTarget = eventObj.currentTarget;
              if (("text" === eventTarget.responseType || "" === eventTarget.responseType || "json" === eventTarget.responseType || "blob" === eventTarget.responseType) && currentModule.filterAsyncResponse(eventTarget.responseURL, ajaxListenPath, listenPathExclusion, isSalesForce)) {
                var newDDResponseMod = new ddResponseModule(objToAttachModuleAttributesTo);
                if ("blob" === eventTarget.responseType && "undefined" != typeof FileReader) {
                  var readerObj = new FileReader();
                  readerObj.onload = function(file) {
                    "string" == typeof file.target.result && newDDResponseMod.process(file.target.result, eventTarget.getAllResponseHeaders(), abortAsyncOnCaptcha, exposeCaptchaFunc, eventTarget, isSalesForce, eventTarget.responseURL);
                  }, readerObj.readAsText(eventTarget.response);
                } else newDDResponseMod.process("json" === eventTarget.responseType ? eventTarget.response : eventTarget.responseText, eventTarget.getAllResponseHeaders(), abortAsyncOnCaptcha, exposeCaptchaFunc, eventTarget, isSalesForce, eventTarget.responseURL);
              }
            }), newReqObj && newReqObj.apply(this, arguments);
            try {
              arguments.length > 1 && arguments[1] && (!newDDToolsModule.isAbsoluteUrl(arguments[1]) || currentModule.filterAsyncResponse(arguments[1], ajaxListenPath, listenPathExclusion)) && window.dataDomeOptions.withCredentials && (this.withCredentials = true);
            } catch (err) {}
          };
        }
        var alwaysFalseVar = window.dataDomeOptions.overrideAbortFetch;
        if (alwaysFalseVar && window.Request && "function" == typeof window.Request) {
          var httpReq = window.Request;
          window.Request = function() {
            if (arguments.length > 1 && arguments[1].signal) try {
              delete arguments[1].signal;
            } catch (err) {}
            return new httpReq(arguments[0], arguments[1]);
          };
        }
        if (window.fetch) {
          var windowFetch = window.fetch;
          window.fetch = function() {
            if (alwaysFalseVar && arguments.length > 1 && arguments[1] && void 0 !== arguments[1].signal && "string" == typeof arguments[0] && (!newDDToolsModule.isAbsoluteUrl(arguments[0]) || currentModule.filterAsyncResponse(arguments[0], ajaxListenPath, listenPathExclusion, isSalesForce))) try {
              delete arguments[1].signal;
            } catch (err) {}
            var winURL;
            if (window.dataDomeOptions.withCredentials && ("string" == typeof arguments[0] ? winURL = arguments[0] : "object" == typeof arguments[0] && "string" == typeof arguments[0].url && (winURL = arguments[0].url), "string" == typeof winURL && (!newDDToolsModule.isAbsoluteUrl(winURL) || currentModule.filterAsyncResponse(winURL, ajaxListenPath, listenPathExclusion)))) {
              if ("object" == typeof arguments[0] && "string" == typeof arguments[0].url) arguments[0].credentials = "include";
              else {
                if (arguments.length >= 1) {
                  if (null == arguments[1]) {
                    for (var uselessArr = [], index = 0; index < arguments.length; ++index) uselessArr[index] = arguments[index];
                    (arguments = uselessArr)[1] = {};
                  }
                  arguments[1].credentials = "include";
                }
              }
            }
            var winFetchCall,
              index250 = 250;
            if ("1F633CDD8EF22541BD6D9B1B8EF13A" === window.ddjskey) try {
              objToAttachModuleAttributesTo.nowd = this === window, winFetchCall = windowFetch.apply(window, arguments);
            } catch (err) {
              objToAttachModuleAttributesTo.sfex = "string" == typeof err.message ? err.message.slice(0, index250) : "errorfetch";
            } else try {
              winFetchCall = windowFetch.apply(this, arguments);
            } catch (err) {
              objToAttachModuleAttributesTo.sfex = "string" == typeof err.message ? err.message.slice(0, index250) : "errorfetch";
            }
            return arguments.length > 1 && arguments[1] && arguments[1].trustToken || void 0 === winFetchCall.then || (winFetchCall["catch"](function() {}), winFetchCall.then(function(windowAttributesObj) {
              windowAttributesObj.clone().text().then(function(rawJSON) {
                try {
                  var parsedJSON = JSON.parse(rawJSON);
                  currentModule.filterAsyncResponse(windowAttributesObj.url, ajaxListenPath, listenPathExclusion) && new ddResponseModule(objToAttachModuleAttributesTo).process(parsedJSON, windowAttributesObj.headers, abortAsyncOnCaptcha, exposeCaptchaFunc, null, isSalesForce, windowAttributesObj.url);
                } catch (err) {
                  (["5B45875B653A484CC79E57036CE9FC", "EFDDEA6D6717FECF127911F870F88A", "A8074FDFEB4241633ED1C1FA7E2AF8", "9D463B509A4C91FDFF39B265B3E2BC"].indexOf(window.ddjskey) > -1 || window.dataDomeOptions.allowHtmlContentTypeOnCaptcha) && new ddResponseModule(objToAttachModuleAttributesTo).process(rawJSON, windowAttributesObj.headers, abortAsyncOnCaptcha, exposeCaptchaFunc, null, isSalesForce, windowAttributesObj.url);
                }
              });
            })), winFetchCall;
          };
        }
      }, this.filterAsyncResponse = function(responseURL, ajaxListenPath, listenPathExclusion, isSalesForce) {
        if (null == responseURL) return true;
        if (responseURL === window.dataDomeOptions.endpoint) return false;
        if (isSalesForce) {
          var userChall = "DDUser-Challenge",
            respURLModified = responseURL.replace(/\?.*/, "");
          return respURLModified.slice(respURLModified.length - userChall.length) === userChall;
        }
        if (0 === ajaxListenPath.length) return true;
        for (var newDDToolsModule = new ddToolsModule(), index = 0; index < listenPathExclusion.length; ++index)
          if (newDDToolsModule.matchURLParts(listenPathExclusion[index], responseURL)) return false;
        for (var urlPartsMatch = false, index = 0; index < ajaxListenPath.length; ++index)
          if (newDDToolsModule.matchURLParts(ajaxListenPath[index], responseURL)) {
            urlPartsMatch = true;
            break;
          }
        return urlPartsMatch;
      };
    };
  }, DictModForModule9]
}, {}, [6]);