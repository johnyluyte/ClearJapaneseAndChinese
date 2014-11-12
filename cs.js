 /* 
  This file (cs.js) implements the "automatically apply" function.
  It will 
  - Check if the "auto_apply" variable in chrome.storage.sync is true.
  - Make sure the site is not in the "excluded_lists" using Regex.
  - Create a style node: <style> our_css_rules </style>, append to <header>.

  --
  If the user "manually applies" a font setting, we have to disable the <style> node mentioned above.
  
  When the user "manually applies" a font setting, popup.js will send a "msg_disable_auto_style_node" MESSAGE to this file (cs.js). 
  The runtime.onMessage.addListener() will receive this MESSAGE and process.

  --
  Since we have registerd this file (cs.js) as "content_scripts" in manifest.json,
  this file (cs.js) will be excuted everytime the user refresh a page, visits a page or creates a tab as long as ClearJC is enabled in Chrome plug-in.

  If we use any 3rd-party API in this file (cs.js), we should also register them in manifest.json.
  
  So, for simplicity, instead of using jQuery, we use basic DOM here.
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


function checkIfAutoInjectIsOn(){

}

/* We will not inject CSS to URLs that are excluded by the User*/
// TODO: 
// coursera, http://dictionary.goo.ne.jp/
function isValidURL(url){
  console.debug("[content_script isValidURL()] url=" + url);
  /* For example, if the URL "https://github.com/" is in the User's excluded list: */
  // Remember, if we use jQuery here, we should update manifest.json to include jQuery in the "content_scripts" field.
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
  // TODO: code refactory
  var style = document.createElement("style");
  style.id = ID_OF_AUTO_INJECTION_NODE;
  var node=document.createTextNode(css_code);
  style.appendChild(node);
  document.getElementsByTagName("head")[0].appendChild(style);  
  console.debug("[content_script autoInjectCSS()]" + css_code);
  /* Activated 的時候，是不是應該要在網址列那邊顯示一個tip圖案，提示使用者"目前這個網頁的字體有被優化" */
}

/*
Diable CSS style inserted by autoInjectCSS() when receive message from popup.js
*/
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text && (msg.text == "msg_disable_auto_style_node")) {
      if(document.getElementById(ID_OF_AUTO_INJECTION_NODE)){
        document.getElementById(ID_OF_AUTO_INJECTION_NODE).disabled = true;
      }
      /* Job done, no need to send response. */
    }
});
