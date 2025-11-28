// server/controllers/userController.js
const db = require('../config/db'); // 아까 만든 DB 가져오기

// 1. 조회 함수
exports.getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// 2. 추가 함수
exports.addUser = (req, res) => {
    const { name, job } = req.body;
    const sql = "INSERT INTO users (name, job) VALUES (?, ?)";
    db.query(sql, [name, job], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "성공적으로 저장됨!" });
    });
};

// 3. 삭제 함수
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "삭제되었습니다!" });
    });
};

// 4. 수정 함수 (UPDATE)
exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { name, job } = req.body;
    const sql = "UPDATE users SET name = ?, job = ? WHERE id = ?";
    db.query(sql, [name, job, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "성공적으로 수정됨!" });
    });
};