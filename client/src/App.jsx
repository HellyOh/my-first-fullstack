// client/src/App.jsx
import { useState, useEffect } from 'react';

// 환경 변수에서 서버 주소 가져오기 (배포 환경 고려)
const SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = () => {
    fetch(`${SERVER_URL}/api/users`)
      .then(response => response.json())
      .then(result => setUsers(result))
      .catch(error => console.error("Error:", error));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !job) return alert("이름과 직업을 입력해주세요.");

    const url = editingId ? `${SERVER_URL}/api/users/${editingId}` : `${SERVER_URL}/api/users`;
    const method = editingId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, job }),
    })
    .then(() => {
        if(editingId) setEditingId(null);
        setName("");
        setJob("");
        fetchUsers(); 
    });
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setJob(user.job);
  };

  const deleteUser = (id) => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      fetch(`${SERVER_URL}/api/users/${id}`, { method: 'DELETE' })
      .then(() => fetchUsers());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* 헤더 섹션 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🚀 Team Management</h1>
          <p className="text-gray-500">전 세계 어디서나 우리 팀을 관리하세요</p>
        </div>

        {/* 입력 폼 카드 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
              {editingId ? "✏️ 정보 수정하기" : "✨ 새 멤버 등록"}
            </h2>
            
            <div className="flex gap-2">
              <input 
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="이름 (Name)" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input 
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="직업 (Job)" 
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button 
                type="submit" 
                className={`flex-1 text-white font-bold py-3 rounded-lg transition duration-200 
                  ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {editingId ? "수정 완료" : "등록하기"}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => { setEditingId(null); setName(""); setJob(""); }}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  취소
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 리스트 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                      {user.job}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => startEdit(user)}
                    className="flex-1 bg-yellow-50 text-yellow-600 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-100 transition"
                  >
                    수정
                  </button>
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;