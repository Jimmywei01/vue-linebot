<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.15.0-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://manager.line.biz/">
    <img src="https://img.shields.io/badge/line-2.1.0-brightgreen" alt="line">
  </a>
  <a href="https://github.com/axios/axios">
    <img src="https://img.shields.io/badge/axios-0.21.1-brightgreen" alt="axios">
  </a>
  <a href="https://github.com/nodejs/Release">
    <img src="https://img.shields.io/badge/node.js-12.x-brightgreen" alt="node.js">
  </a>
  <a href="https://github.com/expressjs/express">
    <img src="https://img.shields.io/badge/express-4.17.1-brightgreen" alt="express">
  </a>
  <a href="https://github.com/sidorares/node-mysql2">
    <img src="https://img.shields.io/badge/mysql2-2.2.5-brightgreen" alt="mysql2">
  </a>
</p>

## 簡介
是一個前後台練習專案，可利用 Linbot 查詢機車資訊
由 Line 第三方登入、一般註冊登入，進入 Dashboard 後台設定資料，Linebot 顯示回覆 User 資料


## 預覽
### Line 第三方登入、一般註冊登入
<img alt="online_架構_drawio_-_diagrams_net_🔊" src="https://user-images.githubusercontent.com/28379251/123514532-1179dd80-d6c6-11eb-8074-a73018caf418.png" width="100%">


### Dashboard
<img width="1066" alt="online_架構_drawio_-_diagrams_net_🔊" src="https://user-images.githubusercontent.com/28379251/123514642-982eba80-d6c6-11eb-8124-7ec2b9e1df44.png">


### Linebot 
<img width="1004" alt="online_架構_drawio_-_diagrams_net_🔊" src="https://user-images.githubusercontent.com/28379251/123514893-b3e69080-d6c7-11eb-9b9a-0ab29166b932.png">


## 功能
**前端 Dashboard**
- User 可使用 Line 登入，顯示對應頁面＆選項
- User 可使用 一般註冊登入，顯示對應頁面＆選項
- User 可以對機車、詳細資料進行新增、修改、刪除、查詢篩選

**後端 Node.js**
- 串連 SSO (single sign-on)服務，透過 OAuth2 機制認證
- 使用 JSON Web Tokens 對 RESTful API 進行驗證
- 使用 Imgur API 進行圖片上傳功能
- 使用 bcrypt 進行加密
- 使用 sequelize 進行 ORM 對 Mysql 操作新增、修改、刪除、查詢

**平台**
- 使用 gitHub 版控並自動部署至 Heroku 顯示頁面


## 使用方式

一般登入
- email: admin@gmail.com
- password: 123123qwe

Line 後台資料設定：[Dashboard_Line_login](https://linbot-jimmy.herokuapp.com/)

LineID：@637lkmfj

QR code：

<img src="https://i.imgur.com/CFeyMZa.png" title="source: imgur.com" width="25%"/>
