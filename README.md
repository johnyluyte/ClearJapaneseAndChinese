# Clear Japanese and Chinese (chrome extension)

To be updated.


## Introduction

To be updated.


## Install

To be updated.


## Usage

- The user can manually choose a specific "font setting" and apply it to current page.
- The user can set ClearJC to automatically apply a specfic "font setting" to every new page.
  - Sites that are in the "excluded lists" will not be automatically applied.


## Settings

To be updated.


## Todo Lists

已經被別人做走了
http://www.ghacks.net/2013/08/27/change-font-sizes-styles-website-font-changer-chrome/
https://chrome.google.com/webstore/detail/font-changer-with-google/jgjhhoglgjdklldfgoffdiaceffijeke
可以直接裝上與卸下字體，並且卸下後正常瀏覽 github，觀察程式碼並找出是如何做到的
複製他的方式，就可以不用"按此關閉效果"

Google Font Previewer for Chrome
https://chrome.google.com/webstore/detail/google-font-previewer-for/engndlnldodigdjamndkplafgmkkencc



Font Playground
https://chrome.google.com/webstore/detail/font-playground/hdpmpnhaoddjelneingmbnhaibbmjgno
可以讀取到 local 端的 font !!


強調 中文 日文

我們也提供兩種方式選字體
第一種是 local 端的字體，這樣中文使用者就可以選擇 微軟正黑體
第二種是 google fonts，這樣西洋系統也可以選擇 google noto 字體

但是 google fonts 基本上沒有中文，
而因為中文字體檔案大小的關係，也找不太到免費的 web fonts
http://en.justfont.com/fontdetail/161
http://fundesigner.net/google-web-font/

meiryo, M+


四種模式: 中文、日文、其他(包含英文)、預設(不更動)

每個模式都有一個 CSS
每個模式都有一個 filter REGEX
都儲存在 storage sync 裡面

有沒有辦法自動偵測使用者電腦裡面有哪些字體
然後直接幫他設定好，有就用 微軟正黑，沒有就用 google font
filter 也自動設定好



- Save all ClearJC settings (auto_apply, css-code, css-customized) into a SINGLE file in chrome.storage.sync, write down the structure of that file in the comments of the codes.
- 滑鼠移動到 popup.html 上面時，要出現正確的游標圖案(手勢、指標等)
- The user should be able customize his/her own "font setting" in the setting page, and choose his/her "font setting" from <select></select> in popup.html.
- 列出總共存哪些東西 css_customized,
auto_apply
css_code
- 列出 global variable: fontDatas
- 寫 fonts.json 的各個 attribute 註解
- 全部加上註解

- 提醒使用者：啟動後就是完全取代頁面上所有字體。要關閉的話需要取消勾選自動套用並重新整理。能不能用 code 自動重新整理頁面？
- 最上面的 “目前字體” 是不是有錯？若沒設為預設字體時要改行為？
- [網頁中英文字型(font-family)跨平台設定最佳化](http://www.wfublog.com/2014/02/font-family-chinese-cross-platform.html)
- Code refactory, fonts.json refactory
- MAC 也可（字體簿），先 ignore， 但demo影片要有
- MAC font 跟 windows font 跟第三方 font 分開
- Edit the icon to fit 128x128 (96x96) as [reference](https://developer.chrome.com/webstore/images?hl=zh-TW)
- Popup.html should use i18n, _locales/en/messages.json.
- Public_html should not, because the users can choose languages simply by clicking the nav.
- Do we really need the "還原所有設定" option?
- Publish to dashboard and test.
- 把自動套用抽出其他設定。把其他設定更名，功用一樣是防止按到還原所有設定至初始值
- Add Customized CSS Style functionality.
- Add REGEX functionality.
- Clean manifest.json after code refactory. [reference link](https://developer.chrome.com/extensions/manifest)
- change the CSS to mm3 style.
- A lot.


## License

This project is licensed under the terms of the [MIT license](http://opensource.org/licenses/MIT).

Please note that this project is built with materials from the following parties:

- [Bootstrap](http://getbootstrap.com/)
- [glyphicons](http://glyphicons.com/license/)
- [darkly](http://bootswatch.com/darkly/)
- [jQuery](https://jquery.com/)

Please also refer to their Licenses for further information.
