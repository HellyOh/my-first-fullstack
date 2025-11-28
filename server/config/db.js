// server/config/db.js
const mysql = require('mysql2');
require('dotenv').config(); // .env 파일 불러오기

const db = mysql.createConnection({
    host: process.env.DB_HOST,     // 이제 코드에 비밀 정보가 없습니다!
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) console.error('DB 연결 실패:', err);
    else console.log('✅ MySQL DB 연결 성공! (from config)');
});

module.exports = db; // 다른 파일에서 이 db를 쓸 수 있게 수출(export)