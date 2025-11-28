// server/config/db.js
const mysql = require('mysql2');
require('dotenv').config(); // .env 파일 불러오기

const db = mysql.createConnection({
    host: process.env.DB_HOST,     // 이제 코드에 비밀 정보가 없습니다!
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
      // TiDB Serverless: TLS 필수
  ssl: { minVersion: 'TLSv1.2' } // Node 기본 신뢰 스토어 사용
  // 필요 시 servername: process.env.DB_HOST 를 추가해 SNI 명시 가능
});

db.connect((err) => {
    if (err) console.error('DB 연결 실패:', err);
    else console.log('✅ MySQL DB 연결 성공! (from config)');
});

module.exports = db; // 다른 파일에서 이 db를 쓸 수 있게 수출(export)