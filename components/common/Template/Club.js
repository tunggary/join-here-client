import Form from "@components/common/Form";
import { useForm } from "@hooks/useForm";
import { dictArea, dictClub } from "@utils/util";
import styles from "@styles/pages/register.module.scss";

export default function ClubTemplate({ title, submitText, defaultInfo = {}, onSubmit }) {
  const { name, introduction, category, area, image } = defaultInfo;

  const { value, onChange } = useForm({
    name: name || "",
    introduction: introduction || "",
    category: category || null,
    area: area || null,
    image: image || null,
  });

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <h1>{title}</h1>
        <Form onSubmit={() => onSubmit(value)}>
          <Form.Text name="name" title="동아리 이름" placeholder="동아리 이름 입력" value={value.name} onChange={onChange} />
          <Form.Text name="introduction" title="동아리 소개" placeholder="동아리 소개 입력" value={value.introduction} onChange={onChange} multiline />
          <Form.Radio name="category" title="동아리 분류" currentValue={value.category} onChange={onChange}>
            {Object.entries(dictClub).map(([key, value]) => {
              if (value === dictClub.all) return;
              return (
                <Form.Radio.Button key={key} value={key}>
                  {value[0]}
                </Form.Radio.Button>
              );
            })}
          </Form.Radio>
          <Form.Radio name="area" title="활동지역" currentValue={value.area} onChange={onChange}>
            {Object.entries(dictArea).map(([key, value]) => (
              <Form.Radio.Button key={key} value={key}>
                {value}
              </Form.Radio.Button>
            ))}
          </Form.Radio>
          <Form.Image name="image" title="동아리 대표사진" value={value.image} onChange={onChange} alt="동아리 대표 이미지" />
          <Form.Submit>{submitText}</Form.Submit>
        </Form>
      </div>
    </div>
  );
}
