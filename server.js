// server.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// アップロードフォルダを指定
const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multerの設定
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, "latest.jpg"); // 常に latest.jpg に上書き
    }
});
const upload = multer({ storage });

app.use(express.static("public"));

// 画像アップロードエンドポイント
app.post("/upload", upload.single("image"), (req, res) => {
    res.send("画像がアップロードされました！");
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
