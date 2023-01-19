import axiosInstance from "@utils/axios";

export const blobToBase64 = (blob) => {
  let reader = new FileReader();
  let base64data;
  reader.readAsDataURL(blob);

  return new Promise((resolve) => {
    reader.onloadend = function () {
      base64data = reader.result;
      resolve(base64data);
    };
  });
export const getFormData = ({ image, ...data }) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("request", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return formData;
};

export const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {
    formal: `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
    year,
    month,
    day,
    date: new Date(date.setHours(0, 0, 0, 0)),
  };
};

export const stateDict = {
  all: "전체",
  pass: "합격",
  fail: "불합격",
  hold: "미결정",
};

export const mypageList = [
  { id: "update", title: "내 정보 수정" },
  { id: "belong", title: "소속 동아리" },
  { id: "apply", title: "지원 동아리" },
];

export const categoryList = [
  { id: "all", title: "전체" },
  { id: "stu", title: "학술" },
  { id: "art", title: "예술" },
  { id: "fri", title: "친목" },
  { id: "phy", title: "운동" },
  { id: "vac", title: "여행" },
  { id: "vol", title: "봉사" },
  { id: "bus", title: "창업" },
  { id: "etc", title: "기타" },
];

export const dictClub = {
  all: ["전체", 0],
  stu: ["학술", 1],
  art: ["예술", 2],
  fri: ["친목", 3],
  phy: ["운동", 4],
  vac: ["여행", 5],
  vol: ["봉사", 6],
  bus: ["창업", 7],
  etc: ["기타", 8],
};

export const dictArea = {
  AL: "전국",
  CL: "수도권",
  CB: "충북/충남/대전",
  JB: "전북",
  JN: "전남/광주",
  KB: "경북/대구",
  KN: "경남",
  KW: "강원",
  JJ: "제주",
  ET: "기타",
};

export const dictPosition = {
  pre: "회장",
  man: "운영진",
  nor: "회원",
};

export const dictTab = {
  personal: 0,
  club: 1,
  applied: 2,
};

export const formatting = (date) => {
  const yyyy = date.getFullYear().toString();
  const MM = pad(date.getMonth() + 1, 2);
  const dd = pad(date.getDate(), 2);
  const hh = pad(date.getHours(), 2);
  const mm = pad(date.getMinutes(), 2);

  return `${yyyy}.${MM}.${dd} ${hh}시${mm}분`;
};

function pad(number, length) {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}

export const isManagement = async (clubId, userId) => {
  const data = await axiosInstance.get(`/clubs/${clubId}/belongs`);
  const result = data.find(({ memberId, position }) => memberId === userId && position !== "nor");
  return result !== undefined;
};

export const isMember = async (clubId, userId) => {
  const data = await axiosInstance.get(`/clubs/${clubId}/belongs`);
  const result = data.find(({ memberId }) => memberId === userId);
  return result !== undefined;
};
