// client/src/App.jsx
import { useState, useEffect } from 'react';
const SERVER_URL = import.meta.env.VITE_API_URL; // 주소 가져오기

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  
  // [★핵심] 지금 수정 중인지 아닌지 판단하는 상태 (null이면 입력모드, 숫자가 있으면 수정모드)
  const [editingId, setEditingId] = useState(null); 

  const fetchUsers = () => {
    fetch(`${SERVER_URL}/api/users`)
      .then(response => response.json())
      .then(result => setUsers(result))
      .catch(error => console.error("에러:", error));
  };

  useEffect(() => { fetchUsers(); }, []);

  // [★핵심] 폼 제출 하나로 "추가"와 "수정"을 모두 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !job) return alert("값을 입력하세요!");

    // 1. 수정 모드일 때 (PUT 요청)
    if (editingId) {
      fetch(`${SERVER_URL}/api/users/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, job }),
      })
      .then(() => {
        alert("수정 완료!");
        endEditMode(); // 수정 모드 종료
        fetchUsers();
      });
    } 
    // 2. 입력 모드일 때 (POST 요청)
    else {
      fetch(`${SERVER_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, job }),
      })
      .then(() => {
        setName("");
        setJob("");
        fetchUsers();
      });
    }
  };

  // 수정 버튼 눌렀을 때: 입력창에 값 채워넣기
  const startEdit = (user) => {
    setEditingId(user.id); // "지금 이 ID를 수정 중이야"라고 표시
    setName(user.name);    // 입력창에 기존 이름 넣기
    setJob(user.job);      // 입력창에 기존 직업 넣기
  };

  // 수정 취소 혹은 완료 시 초기화
  const endEditMode = () => {
    setEditingId(null);
    setName("");
    setJob("");
  };

  const deleteUser = (id) => {
    if(window.confirm("삭제하시겠습니까?")) {
      fetch(`${SERVER_URL}/api/users/${id}`, { method: 'DELETE' })
      .then(() => fetchUsers());
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>🚀 인재 영입 시스템</h1>
      
      {/* 폼 (onSubmit이 handleSubmit으로 연결됨) */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px", padding: "20px", background: "#f9f9f9", borderRadius: "10px", display: "inline-block" }}>
        
        {/* 수정 모드일 때만 보이는 안내 문구 */}
        {editingId && <p style={{color: "blue", fontWeight: "bold"}}>✏️ 정보를 수정하고 있습니다</p>}

        <input 
          placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <input 
          placeholder="직업" value={job} onChange={(e) => setJob(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        
        {/* 버튼 글자가 상황에 따라 바뀜 */}
        <button type="submit" style={{ padding: "10px 20px", background: editingId ? "blue" : "green", color: "white", border: "none" }}>
          {editingId ? "수정 완료" : "추가하기"}
        </button>

        {/* 수정 취소 버튼 */}
        {editingId && (
          <button type="button" onClick={endEditMode} style={{ marginLeft: "10px", padding: "10px", background: "gray", color: "white", border: "none" }}>
            취소
          </button>
        )}
      </form>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {users.map((user) => (
          <div key={user.id} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", minWidth: "150px", position: "relative" }}>
            <h3 style={{ margin: "0 0 10px 0" }}>{user.name}</h3>
            <p>{user.job}</p>
            
            <div style={{ marginTop: "10px", display: "flex", gap: "5px", justifyContent: "center" }}>
              {/* [★추가] 수정 버튼 */}
              <button onClick={() => startEdit(user)} style={{ background: "orange", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
                수정
              </button>
              {/* 삭제 버튼 */}
              <button onClick={() => deleteUser(user.id)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;