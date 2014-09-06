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
