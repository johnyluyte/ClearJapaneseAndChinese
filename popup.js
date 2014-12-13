/*
  There are two values stored in Chrome Storage Sync.

  chrome.storage.sync.set({'auto_apply': 'false'});
  chrome.storage.sync.set({'css_code': css_customized.code});
  chrome.storage.sync.set({'css_customized': css_customized});

  TODO: should add on failure callback function for storage.sync.set() and get().
  see https://developer.chrome.com/extensions/storage
*/


// Array that store font datas loaded from fonts.json
fontDatas = "";


$(function(){
  init();
});


function init(){
  initButtons();
  initDOM();

  /* Parse external JSON file */
  $.getJSON("fonts.json", function(data) {
    parsefontDatas(data);
  });

  /* Initialize variables */
  css_sans_serif = {
    code:
    '*{font-family:"sans-serif" !important;'+
    'text-shadow:default !important;'+
    'font-weight:default !important;'+
    '}',
    allFrames: true
  };

  /* Detect browser's current locale (en, ja, zh_CN, zh_TW) */
  showMessage("@@ui_local = " + chrome.i18n.getMessage("@@ui_locale"));

}


function initButtons(){
  $("#btn_cancel").click(function(event){
    applyCSS(css_sans_serif);
  });

  $("#btn_apply").click(function(event){
    css_customized = getSelected();
    applyCSS(css_customized);

    chrome.storage.sync.set({'css_code': css_customized.code}, function() {
      showMessage('已將下列設為預設：<br/>'+ css_customized.code);
      console.debug("[set css_customized] "+css_customized.code);
    });
  });


  $("#btn_auto_apply").click(function(event){
    var value = $("#btn_auto_apply span").attr('value');
    console.debug(value);
    var tmp;
    if(value=="true"){
      tmp = '<span class="glyphicon glyphicon-unchecked" value="false"></span> 自動套用在所有頁面<br>';
      chrome.storage.sync.set({'auto_apply': 'false'});
      showMessage("自動套用已關閉。");
    }else{
      tmp = '<span class="glyphicon glyphicon-check" value="true"></span> 自動套用在所有頁面<br>';
      chrome.storage.sync.set({'auto_apply': 'true'});
      showMessage("自動套用已開啟，之後開啟的頁面都會自動套用字體效果。");
    }
    $("#btn_auto_apply").html(tmp);
  });
}


function initDOM(){
  chrome.storage.sync.get('auto_apply', function(data){
    var text_auto_apply;
    if(data.auto_apply=="true"){
      text_auto_apply = '<span class="glyphicon glyphicon-check" value="true"></span> 自動套用在所有頁面<br>';
    }else{
      text_auto_apply = '<span class="glyphicon glyphicon-unchecked" value="false"></span> 自動套用在所有頁面<br>';
    }
    $("#btn_auto_apply").html(text_auto_apply);
  });
}



// TODO: add informative comment, function refactory, code refactory

function getFontFamily(value){
  var fontFamily = '*{font-family:';
  /* Use JSON here? */
  for(var i in fontDatas){
    //console.debug(fontDatas[i].name);
    if(value==fontDatas[i].value){
      fontFamily += '"' + fontDatas[i].fontFamily + '",';
      current_applied_font_name = fontDatas[i].name;
    }
  }
  fontFamily += '"sans-serif"';

  // TODO isImportant? append"
  fontFamily += ' !important';
  fontFamily += ';';
  return fontFamily;
}

function getSelected(){
  var fontFamily = getFontFamily($("#select_font").val());
  var selectedParameter = {
    code:
    fontFamily+
      //'font-weight:' + document.getElementById("weight-customized").value + ' !important;'+
      // 'font-weight:100 !important;'+
    '}',
    allFrames: true
  };
  return selectedParameter;
}



/*
1. Disable CSS style inerted by "auto_apply".
2. Apply CSS style.
*/
function applyCSS(parameter){
  /* Get the current tab the User is viewing, which is returned as tabs[0]. */
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    /*
       Send a message to tabs[0], telling 'content_script.js' to disable ClearJC style,
       which was added automatically by 'content_script.js' if the 'auto_apply' was 'true' in Storage.
    */
    chrome.tabs.sendMessage(tabs[0].id, { text: "msg_disable_auto_style_node" });
  });
  // Apply CSS style
  chrome.tabs.insertCSS(null, parameter);
  console.debug("[applyCSS()]" + parameter.code);
}


function showMessage(msg){
  var message = '<div class="alert alert-dismissable alert-warning">';
  // message += '<button type="button" class="close" data-dismiss="alert">×</button>';
  message += msg + '</div>';
  $("#show_message").html(message);
}


function parsefontDatas(data){
  fontDatas = data.fonts;
  // console.debug(fontDatas[1].name);

  /*
    We construct the following single-selected-options from JSON file.

    <select style="width:210px" id="select_font" tabindex="1">
      <option value="MS_YaHei">微軟雅黑體 Microsoft YaHei</option>
      <option value="MS_JhengHei">微軟正黑體 Microsoft JhengHei</option>
      ...
    </select>
  */
  var select = '<select style="width:210px" class="select_form" id="select_font" tabindex="1">';
  for(var i in fontDatas){
    select += '<option value="' + fontDatas[i].value + '">' + fontDatas[i].label + '</option>';
  }
  select += '</select>';
  $("#div_select").html(select);
}

