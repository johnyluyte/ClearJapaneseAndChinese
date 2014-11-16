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
