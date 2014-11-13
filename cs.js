/* 
(1)
  This file (cs.js) implements the "automatically apply" function.
  It will 
  - Check if the "auto_apply" variable in chrome.storage.sync is true.
  - Make sure the site is not in the "excluded_lists" using Regex.
  - Create a style node: <style> our_css_rules </style>, append to <header>.

(2)
  If the user "manually applies" a font setting, we have to disable the <style> node mentioned above.
  
  When the user "manually applies" a font setting, popup.js will send a "msg_disable_auto_style_node" Message to this file (cs.js). 
  The runtime.onMessage.addListener() will listen this Message.

(3)
  Since we have registerd this file (cs.js) as "content_scripts" in manifest.json,
  this file (cs.js) will be excuted everytime the user refreshes a page, visits a page or creates a tab as long as ClearJC is enabled in Chrome plug-in.

  As a result, if we use any 3rd-party API in this file (cs.js), we should also register them in manifest.json.
  
  So, for simplicity, we use native (vanilla) javascript DOM here.
  e.g. 
    window.onload();
    document.getElementsByTagName();
*/

ID_OF_AUTO_INJECTION_NODE = "clearJC_auto_style";


window.onload = function(){
  /* Check if the user want ClearJC to automatically inject CSS on every page. */
  chrome.storage.sync.get('auto_apply', function(data){
    if(data.auto_apply=="true" && isValidURL(document.URL)){
      /* Load the customized css from storage */
      chrome.storage.sync.get('css_code', function(data){
        autoInjectCSS(data.css_code);
      });  
    }
  });
}


/* We should not inject CSS to URLs that are in the "excluded lists" */
// TODO: customized REGEX filter
function isValidURL(url){
  console.debug("[content_script isValidURL()] url=" + url);
  // Remember, if we use jQuery here, we should update manifest.json to include jQuery in the "content_scripts" field.
  /* For example, if the URL "https://github.com/" is in the User's excluded lists: */
  if(url.match(/http[s]?:\/\/*github.com\/*/)){
    return false;
  }
  return true;
}


/* 
  When autoInjecting, we create a style node:
    <style> our_css_rules </style>
   and append it to the header of the page.
*/
function autoInjectCSS(css_code){
  var node = document.createTextNode(css_code);
  var style = document.createElement("style");
  style.id = ID_OF_AUTO_INJECTION_NODE;
  style.appendChild(node);
  document.getElementsByTagName("head")[0].appendChild(style);
  console.debug("[content_script autoInjectCSS()]" + css_code);
  // TODO: 自動套用時，是不是應該在網址列後方顯示一個icon，提示使用者"目前這個網頁自動套用ClearJC"
}

/*
Diable CSS style inserted by autoInjectCSS() when receive message from popup.js
Please see the descriptions at the top of this file.
*/
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text && (msg.text == "msg_disable_auto_style_node")) {
      if(document.getElementById(ID_OF_AUTO_INJECTION_NODE)){
        document.getElementById(ID_OF_AUTO_INJECTION_NODE).disabled = true;
      }
      /* Job done, no need to send response. */
    }
});
