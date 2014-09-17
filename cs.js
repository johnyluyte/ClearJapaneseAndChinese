// TODO: add informative comment, function refactory, code refactory
global_style_id = "clearJC_Style_Id";

/* We will not inject CSS to URLs that are excluded by the User*/
// TODO: 
// coursera, http://dictionary.goo.ne.jp/
function isValidURL(url){
  console.debug("[content_script isValidURL()] url=" + url);
  /* For example, if the URL "https://github.com/" is in the User's excluded list: */
  if(url.match(/http[s]?:\/\/*github.com\/*/)){
    return false;
  }
  return true;
}

$(function(){
  /* Check if the user want ClearJC to automatically inject CSS to every page. */
  chrome.storage.sync.get('auto_apply', function(data){
    if(data.auto_apply=="true" && isValidURL(document.URL)){
      /* Load the customized css from storage */
      chrome.storage.sync.get('css_code', function(data){
        autoInjectCSS(data.css_code);
      });  
    }
  });
});

/* 
  We create a style node:
    <style> our_css_rules </style>
   and append it to the header of the page.
*/
function autoInjectCSS(css_code){
  // TODO: code refactory
  var style = document.createElement("style");
  style.id = global_style_id;
  var node=document.createTextNode(css_code);
  style.appendChild(node);
  document.getElementsByTagName("head")[0].appendChild(style);  
  console.debug("[content_script autoInjectCSS()]" + css_code);
  /* Activated 的時候，是不是應該要在網址列那邊顯示一個tip圖案，提示使用者"目前這個網頁的字體有被優化" */
}


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text && (msg.text == "disable_ClearJC_Style_Id")) {
      if(document.getElementById(global_style_id)){
        document.getElementById(global_style_id).disabled = true;
      }
      /* Job done, no need to send response. */
    }
});



/*
  TODO/ISSUE:
  chrome.tabs.onUpdated will be evoked 2 times when loading a page(eitehr a new page or refresh current page)
  1. When the page just start loading.
  2. When the page just about to be loaded.
  Thus the injectCSS() function will be executed 2 time, which may confuse the users.
*/

/* TODO clear sync for debugging */
// chrome.storage.sync.clear(function(){
//   console.debug("successfully clear()");
// });


// 改用 content script?
// chrome.tabs.onActivated.addListener(function(activeInfo) {
//   chrome.tabs.get(activeInfo.tabId, function(tab){
//     /* Check if the user want ClearJC to automatically inject CSS to every page. */
//     chrome.storage.sync.get('auto_apply', function(data){
//       if(data.auto_apply=="true"){
//         injectCSStoTab(tab);
//       }
//     });
//   });
// });

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   /* Check if the user want ClearJC to automatically inject CSS to every page. */
//   chrome.storage.sync.get('auto_apply', function(data){
//     if(data.auto_apply=="true"){
//       injectCSStoTab(tab);
//     }
//   });
// });

// function injectCSStoTab(tab){
//   if(isValidURL(tab.url)){
//     chrome.storage.sync.get('css_code', function(data){
//       injectCSS(setCSS(data.css_code));
//     });
//   }
// }

// function isValidURL(url){
//   /* We only inject CSS to URLs with "http://" or "https://" prefix */
//   if(url.match(/http[s]?:\/\/*/)){
//     return true;
//   }
//   return false;
// }

// function setCSS(css_code){
//   css_customized = {
//     code: css_code,
//     allFrames: true
//   };
//   return css_customized;
// }

// function injectCSS(parameter){
//   /* here the CSS(The customizeded fonts) is injected to the browser(contents) */
//   chrome.tabs.insertCSS(null, parameter);
//   console.debug("[injectCSS()]" + parameter.code);
// }

