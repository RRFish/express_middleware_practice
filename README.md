# middleware建立
## frontend
```
# install
npm install

# runserver
npm run dev
```

## backend
```
# install
npm install

# runserver
npm run dev
```
## middleware function可以執行下列作業：
* 執行任何程式碼。
* 對要求和回應物件進行變更。
* 結束要求/回應循環。
* 呼叫堆疊中的下一個中介軟體。

## middleware使用方法
```
# src\utils\middleware.js 撰寫一個新的function
function myLogger(req, res, next){
    console.log("LOGGED")
    next()
}

# src\app.js
const { myLogger } = require("./utils/middleware.js")
app.use(myLogger)

```

## middleware相關參數
```
# req 傳入的request
# res 回傳的response
# next 再佇列內的下一個function
function myLogger(req, res, next){
    console.log("LOGGED")
    next()
}
```

## Express 應用程式可以使用下列類型的中介軟體：
* 應用程式層次的中介軟體
    ```
    # 將應用程式層次的中介軟體連結至 app object 實例
    var app = express();

    app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
    });    
    ``` 
* 路由器層次的中介軟體
    ```
    var app = express();
    var router = express.Router();

    // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
    });    
    ```
* 錯誤處理中介軟體

* 內建中介軟體
    ```
    Express 唯一的內建中介軟體函數是 express.static。此函數以 serve-static 為基礎，負責在 Express 應用程式中提供靜態資產。
    ```
* 協力廠商中介軟體
    ```
    var express = require('express');
    var app = express();
    var cookieParser = require('cookie-parser');

    // load the cookie-parsing middleware
    app.use(cookieParser());    
    ```
