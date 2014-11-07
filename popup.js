$(function(){
  init();
});


function init(){
  initButtons();
  initDOM();

  /* Parse external JSON file */
  $.getJSON("fonts.json", function(data) {
    parseFontJSON(data);
  });

  /* Initialize variables */
  css_sans_serif = {
    code: 
    '*{font-family:"sans-serif" !important;'+
    'text-shadow:default !important;'+
    'font-weight:default !important;'+
    '}',
    allFrames: true
  }

  /* Detect browser's current locale (en, ja, zh_CN, zh_TW) */
  showMessage("@@ui_local = " + chrome.i18n.getMessage("@@ui_locale"));

}


function initButtons(){
  $("#btn_deactivate").click(function(event){
    applyCSS(css_sans_serif);
  });

  $("#btn_set_selected_as_default").click(function(event){
    css_customized = getSelected();
    applyCSS(css_customized);

    chrome.storage.sync.set({'css_code': css_customized.code}, function() {
      showMessage('已將下列設為預設：<br/>'+ css_customized.code);
      console.debug("[set css_customized] "+css_customized.code);
    });

    $("#span_title_current_font").text(current_applied_font_name);
      chrome.storage.sync.set({'current_font_name': current_applied_font_name}, function() {
    });
  });

 
  $("#div_other_setting_auto_apply").click(function(event){
    var value = $("#div_other_setting_auto_apply span").attr('value');
    console.debug(value);
    var tmp;
    if(value=="true"){
      tmp = '<span class="glyphicon glyphicon-unchecked" value="false"></span> 自動套用在所有頁面<br>';
      chrome.storage.sync.set({'auto_apply': 'false'},function(){});
      showMessage("自動套用已關閉。");
    }else{
      tmp = '<span class="glyphicon glyphicon-check" value="true"></span> 自動套用在所有頁面<br>';
      chrome.storage.sync.set({'auto_apply': 'true'},function(){});
      showMessage("自動套用已開啟，之後開啟的所有頁面都會自動套用字體效果。");
    }
    $("#div_other_setting_auto_apply").html(tmp);
  });  

  $("#div_other_setting_revert_all").click(function(event){
    /* We use the first font in JSON file as the default "Current Font" */
    $("#span_title_current_font").text(fontJSON[0].name);
    css_customized = {
      code: 
      '*{font-family:"' + fontJSON[0].fontFamily + '", sans-serif !important;'+
      '}',
      allFrames: true
    };
    chrome.storage.sync.set({'css_customized': css_customized});
    chrome.storage.sync.set({'auto_apply': 'true'},function(){});
    // warning message: 
    showMessage("已將所有設定還原至初始值。");
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
    $("#div_other_setting_auto_apply").html(text_auto_apply);
  });

  // 當 auto apply 啟動時才顯示？
  chrome.storage.sync.get('current_font_name', function(data) {
    $("#span_title_current_font").text(data.current_font_name);
  });

  /* Toogle panel slide */
  $("#div_advanced_setting_heading").click(function(event){
    $("#div_advanced_setting_body").slideToggle();
  });
  $("#div_other_setting_heading").click(function(event){
    $("#div_other_setting_body").slideToggle();
  });
}



// TODO: add informative comment, function refactory, code refactory

function getFontFamily(value){
  var fontFamily = '*{font-family:';
  /* Use JSON here? */
  for(var i in fontJSON){
    //console.debug(fontJSON[i].name);
    if(value==fontJSON[i].value){
      fontFamily += '"' + fontJSON[i].fontFamily + '",';
      current_applied_font_name = fontJSON[i].name;
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



function applyCSS(parameter){
  /* Get the current tab the User is viewing, which is returned as tabs[0]. */
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    /* 
       Send a message to tabs[0], telling the 'content_script.js' to disable ClearJC style,
       which was added automatically by 'content_script.js' if the 'auto_apply' was 'true' in Storage.
    */
    chrome.tabs.sendMessage(tabs[0].id, { text: "disable_ClearJC_Style_Id" });
  }); 
  chrome.tabs.insertCSS(null, parameter);
  console.debug("[applyCSS()]" + parameter.code);
}


function showMessage(msg){
  var message = '<div class="alert alert-dismissable alert-warning">'+
    '<button type="button" class="close" data-dismiss="alert">×</button>'+ msg + '</div>';
  $("#show_message").html(message);
}


function parseFontJSON(data){
  fontJSON = data.fonts;
  // console.debug(fontJSON[1].name);

  /*
    We construct the following single-selected-options from JSON file.

    <select style="width:210px" id="select_font" tabindex="1">
      <option value="MS_YaHei">微軟雅黑體 Microsoft YaHei</option>
      <option value="MS_JhengHei">微軟正黑體 Microsoft JhengHei</option>
      ...
    </select>
  */
  var select = '<select style="width:210px" id="select_font" tabindex="1">';
  for(var i in fontJSON){
    select += '<option value="' + fontJSON[i].value + '">' + fontJSON[i].label + '</option>';
  }
  select += '</select>';
  $("#div_select").html(select);
}

