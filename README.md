# Dcard Frontend intern hw

透過串接 Github API，查找使用者所擁有的 repositories 以及各 repository 的詳細內容。

## 使用說明
可以至部屬在 Github Page 的線上環境進行測試: [link](https://aleetsaiya.github.io/dcard-frontend-hw/)

## 待辦
- [x] Infinite scroll
- [x] 使用 cache 減少 API 重複送出
- [x] 紀錄使用者搜尋紀錄
- [x] 例外處理 (no user、no repository、no repository description)
- [x] RWD
- [ ] style Repo page
- [ ] Scroll to the top button


##  目錄
```
│  App.css
│  App.js
│  githubAPI.js            // 處理 github API
│  globalSetting.js
│  index.css
│  index.js
│
├─components
│      Header.jsx
│      Layout.jsx
│      List.jsx
│
└─pages
        Home.jsx           // 首頁
        NotFound.jsx       // 404 Error頁面
        Repo.jsx           // Repository List 頁面
        Repos.jsx          // Repository Detail 頁面
```

## 路由

因為是上架在 GithubPage 上，因此我將 root 設定成這份 repository 的名稱。  

+ root: `/dcard-frontend-hw`。
+ Home Page: `root`。
+ Repository List Page: `root` + `/users/{username}/repos`。
+ Repository Detail Page:  `root` + `/users/{username}/repos/{repo}`。

