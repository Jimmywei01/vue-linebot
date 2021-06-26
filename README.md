## 簡介
是一個前後台練習專案，可利用 Linbot 查詢機車資訊
由 Line 第三方登入、一般註冊登入，進入 Dashboard 後台設定資料，Linebot 顯示回覆 User 資料


## 預覽
### Line 第三方登入、一般註冊登入
<img alt="online_架構_drawio_-_diagrams_net_🔊" src="https://user-images.githubusercontent.com/28379251/123514532-1179dd80-d6c6-11eb-8074-a73018caf418.png" width="100%">


### Dashboard 後台
<img width="1066" alt="online_架構_drawio_-_diagrams_net_🔊" src="https://user-images.githubusercontent.com/28379251/123514642-982eba80-d6c6-11eb-8124-7ec2b9e1df44.png">


### Linebot 
<img width="1004" alt="online_架構_drawio_-_diagrams_net_🔊" src="https://user-images.githubusercontent.com/28379251/123514893-b3e69080-d6c7-11eb-9b9a-0ab29166b932.png">


## 功能
**Dashboard**
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

Line 後台資料設定：[Dashboard_Line_login](https://linbot-jimmy.herokuapp.com/)

LineID：@637lkmfj

QR code：

<img src="https://i.imgur.com/CFeyMZa.png" title="source: imgur.com" width="25%"/>
