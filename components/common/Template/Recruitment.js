import { memo } from "react";
import styles from "./Recruitment.module.scss";
import { useForm } from "@hooks/useForm";
import Form from "@components/common/Form";
import Plus from "@public/clublist/plus.svg";
import Minus from "@public/clublist/minus.svg";

function Basic({ value, onChange }) {
  return (
    <>
      <h2>기본 정보</h2>
      <Form.Text name="title" title="제목" placeholder="제목 입력" value={value.title} onChange={onChange} />
      <Form.Period name="period" title="기간" onChange={onChange} />
      <Form.Text name="description" title="상세 설명" placeholder="상세 설명 입력" value={value.description} onChange={onChange} multiline />
      <Form.Image name="poster" title="모집 공고 포스터" value={value.poster} onChange={onChange} alt="모집 공고 포스터" />
    </>
  );
}

function Resume({ value, onChange, setValue }) {
  const onClickPlus = () => {
    const key = new Date().toString();
    setValue((prev) => ({
      ...prev,
      [`resume_${key}`]: "",
    }));
  };

  const onClickMinus = (e) => {
    const key = e.currentTarget.getAttribute("value");
    setValue((prev) => {
      const newData = { ...prev };
      delete newData[key];
      return newData;
    });
  };

  return (
    <>
      <h2>지원서 양식</h2>
      {Object.entries(value).map(([key, value]) => {
        return (
          <div key={key} className={styles.container}>
            <Form.Text name={key} placeholder="질문 입력" value={value} onChange={onChange} />
            <Minus className={styles.minus} value={key} onClick={onClickMinus} />
          </div>
        );
      })}
      <Plus className={styles.plus} onClick={onClickPlus} />
    </>
  );
}

const MBasic = memo(Basic);
const MResume = memo(Resume);

function RecruitmentTemplate({ onSubmit }) {
  const { value: basic, onChange: onChangeBasic } = useForm({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    poster: null,
  });

  const {
    value: resume,
    onChange: onChangeResume,
    setValue: setResume,
  } = useForm({
    resume_1: "이름",
    resume_2: "연락처",
    resume_3: "",
  });

  const onSubmitRecruitment = () => {
    const question = Object.values(resume).filter((value) => value !== "");
    onSubmit({ ...basic, question });
  };

  return (
    <Form onSubmit={onSubmitRecruitment}>
      <MBasic value={basic} onChange={onChangeBasic} />
      <MResume value={resume} onChange={onChangeResume} setValue={setResume} />
      <Form.Submit>등록하기</Form.Submit>
    </Form>
  );
}

export default RecruitmentTemplate;
