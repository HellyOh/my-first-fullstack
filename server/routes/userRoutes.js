// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // 실무자 소환

// 주소 매칭 시키기
// (이미 index.js에서 /api/users로 들어왔으므로, 여기선 나머지 경로만 씀)
router.get('/', userController.getUsers);      // 조회
router.post('/', userController.addUser);      // 추가
router.delete('/:id', userController.deleteUser); // 삭제
router.put('/:id', userController.updateUser);    // 수정

module.exports = router;