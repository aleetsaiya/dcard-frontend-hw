# GitHub repository


要求: 串接 github api，做一個能夠根據網址來瀏覽使用者所擁有的所有 git repositories

想法: 

UI部分: 
1.  建立 homepage，包含一個 input field，可以讓使用者輸入要查找的 username (#API1)
2. 根據輸入的 username，將 route 改為 /users/{username}/repos，並在這個網址內顯示使用者所擁有的所有 respos，並可以點擊查看詳細
    (每個 repo 的更多內容)。此外還需要類似 infinite loading 的效果讓滾輪滑到最下面的時候要自動 loading 更多的 respos。

3. 點到單一 repo 的頁面後，再顯示更多這個 repo 的詳細內容 (#API2)


API folder:

從 components folder 裡面額外抽出來一個 js 檔，負責送出 api 的詳細操作。包含:

+ API1: 獲得一個 users 的所有 repos
+ API2: 獲得一個 user 的特定 repo 的詳細資料
