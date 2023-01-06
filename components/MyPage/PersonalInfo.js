import PersonalInfoTemplate from "@components/common/Template/PersonalInfo";
import TemplateWrapper from "@components/common/Template/TemplateWrapper";
import axiosInstance from "@utils/axios";
import { useEffect } from "react";
import { useState } from "react";

export default function PersonalInfo({ userId }) {
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const data = await axiosInstance.get(`/members/${userId}`);
      setUserData({ ...data, birthday: data.birthday.replaceAll("-", "") });
    } catch {
      alert("잠시후 다시 시도해주세요.");
    }
  };

  const updateUserData = async (newUserData) => {
    try {
      await axiosInstance.patch("/members", newUserData);
      await getUserData();
    } catch {
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const validationCheck = (value) => {
    if (value.name === "") {
      alert("이름을 입력해주세요.");
      return false;
    }
    if (value.birthday.length !== 8) {
      alert("생년월일 8자리를 입력해주세요.");
      return false;
    }
    if (value.phone.length < 10 || value.phone.length > 11) {
      alert("핸드폰 번호를 입력해주세요");
      return false;
    }
    return true;
  };

  const onSubmit = async (value) => {
    if (!validationCheck(value)) return;
    const newUserData = {
      id: userData.id,
      name: value.name,
      password: userData.password,
      birthday: `${value.birthday.slice(0, 4)}-${value.birthday.slice(4, 6)}-${value.birthday.slice(6, 8)}`,
      phone: value.phone,
    };
    updateUserData(newUserData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!userData) return;
  return (
    <TemplateWrapper>
      <PersonalInfoTemplate defaultValue={userData} onSubmit={onSubmit} />
    </TemplateWrapper>
  );
}
