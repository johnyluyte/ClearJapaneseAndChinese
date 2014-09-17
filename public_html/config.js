function getNavi(page){
  var navi = '';
  // TODO 這邊改放 LOGO
  navi += '<div class="container-fluid"><div class="navbar-header"><span class="navbar-brand">Clear Japanese and Chinese extension</span></div><div class="navbar-collapse collapse"><ul class="nav navbar-nav"><li';
  if(page=="zh_TW"){navi+=' class="active"';}
  navi += '><a href="zh_TW.html">台灣中文</a></li><li';
  if(page=="zh_CN"){navi+=' class="active"';}
  navi += '><a href="zh_CN.html">簡体中文</a></li><li';
  if(page=="ja"){navi+=' class="active"';}
  navi += '><a href="ja.html">日本語</a></li><li';
  if(page=="en"){navi+=' class="active"';}
  navi += '><a href="en.html">English</a></li>';
  navi += '</ul><ul class="nav navbar-nav navbar-right"><li';
  if(page=="configure"){navi+=' class="active"';}
  navi += '><a href="configure.html">Configure</a></li><li';
  if(page=="about"){navi+=' class="active"';}  
  navi += '><a href="">About</a></li>';
  navi += '</ul></div><!--/.nav-collapse --></div><!--/.container-fluid -->';
  $('#Navbar').append(navi);
}

function checkFont(){
  $('#MS_YaHei').css("font-family","Microsoft YaHei");
  $('#MS_JhengHei').css("font-family","Microsoft JhengHei");
  $('#NS_Thin').css("font-family","Noto Sans T Chinese Thin");
  $('#NS_Light').css("font-family","Noto Sans T Chinese Light");
  $('#NS_DemiLight').css("font-family","Noto Sans T Chinese Demolight");
  $('#NS_Regular').css("font-family","Noto Sans T Chinese Regular");
  $('#NS_Medium').css("font-family","Noto Sans T Chinese Medium");
  $('#NS_Bold').css("font-family","Noto Sans T Chinese Bold");
  $('#NS_Black').css("font-family","Noto Sans T Chinese Black");
}


$(function(){
  var path = window.location.pathname;
  var pageName = path.split("/").pop().split(".")[0]; // zh_TW, zh_CN, ja, en, configure, about
  //console.log( page );

  getNavi(pageName);
  checkFont();
});

