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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  /* Check if the user want ClearJC to automatically inject CSS to every page. */
  chrome.storage.sync.get('auto_apply', function(data){
    if(data.auto_apply=="true"){
      injectCSStoTab(tab);
    }
  });
});

function injectCSStoTab(tab){
  if(isValidURL(tab.url)){
    chrome.storage.sync.get('css_code', function(data){
      injectCSS(setCSS(data.css_code));
    });
  }
}

function isValidURL(url){
  /* We only inject CSS to URLs with "http://" or "https://" prefix */
  if(url.match(/http[s]?:\/\/*/)){
    return true;
  }
  return false;
}

function setCSS(css_code){
  css_customized = {
    code: css_code,
    allFrames: true
  };
  return css_customized;
}

function injectCSS(parameter){
  /* here the CSS(The customizeded fonts) is injected to the browser(contents) */
  chrome.tabs.insertCSS(null, parameter);
  console.debug("[injectCSS()]" + parameter.code);
}

