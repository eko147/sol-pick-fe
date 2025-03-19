import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllergyManagement.css";
import Menu from "../../components/common/menu/Menu";
import MainHeader from "../../components/common/header/MainHeader";
const AllergyManagement = () => {
  const [allergies, setAllergies] = useState([]); // 🔹 저장된 알러지 식재료 목록
  const [newAllergy, setNewAllergy] = useState(""); // 🔹 새로 입력할 식재료
  const [error, setError] = useState(null); // 🔹 오류 메시지 상태
  const userId = 1; // 🔹 실제 로그인된 사용자 ID로 대체 필요

  // ✅ 알러지 데이터 불러오기 (DB에서 조회)
  useEffect(() => {
    fetchAllergies();
  }, []);

  const fetchAllergies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/user-allergy/${userId}`
      );
      setAllergies(response.data.map((allergy) => allergy.ingredientName)); // 🔹 ingredientName만 저장
    } catch (error) {
      console.error("❌ 알러지 정보 불러오기 실패:", error);
      setError("알러지 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // ✅ 새로운 알러지 식재료 추가
  const addAllergy = async () => {
    if (!newAllergy.trim()) return;
    if (allergies.includes(newAllergy)) {
      setError("이미 등록된 알러지 식재료입니다.");
      return;
    }

    try {
      // ✅ URL 쿼리 파라미터 형식으로 ingredientName 전달
      const response = await axios.post(
        `http://localhost:8090/api/user-allergy/${userId}?ingredientName=${encodeURIComponent(
          newAllergy
        )}`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ 응답 데이터:", response.data); // ✅ 서버 응답 확인

      setAllergies([...allergies, newAllergy]);
      setNewAllergy(""); // 입력 필드 초기화
      setError(null); // 오류 메시지 초기화
    } catch (error) {
      console.error(
        "❌ 알러지 추가 실패:",
        error.response?.data || error.message
      );
      setError("알러지 추가 중 오류가 발생했습니다.");
    }
  };

  // ✅ 특정 알러지 식재료 삭제
  const removeAllergy = async (ingredient) => {
    try {
      await axios.delete(`http://localhost:8090/api/user-allergy/${userId}`, {
        params: { ingredientName: ingredient },
      });

      // 🔹 삭제 후 목록 갱신
      setAllergies(allergies.filter((a) => a !== ingredient));
      setError(null); // 오류 메시지 초기화
    } catch (error) {
      console.error("❌ 알러지 삭제 실패:", error);
      setError("알러지 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="allergy-container">
      <MainHeader />
      <h2>🥜 알러지 관리</h2>

      {/* 🔹 알러지 입력 필드 */}
      <div className="input-group">
        <input
          type="text"
          value={newAllergy}
          onChange={(e) => setNewAllergy(e.target.value)}
          placeholder="알러지 식재료 입력"
        />
        <button className="add-btn" onClick={addAllergy}>
          추가
        </button>
      </div>

      {/* 🔹 오류 메시지 표시 */}
      {error && <p className="error-message">{error}</p>}

      {/* 🔹 등록된 알러지 목록 */}
      <ul className="allergy-list">
        {allergies.length === 0 ? (
          <p className="no-allergy">등록된 알러지 정보가 없습니다.</p>
        ) : (
          allergies.map((allergy, index) => (
            <li key={index} className="allergy-item">
              {allergy}
              <button
                className="delete-btn"
                onClick={() => removeAllergy(allergy)}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
      <Menu />
    </div>
  );
};

export default AllergyManagement;
