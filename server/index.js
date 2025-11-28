// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우트(안내 데스크) 불러오기
const userRoutes = require('./routes/userRoutes');

// "앞으로 /api/users 로 오는 요청은 userRoutes 담당자가 처리해라"
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});