import Option from "@public/common/option.svg";
import styles from "@styles/pages/member.module.scss";
import { dictPosition } from "@utils/util";

export default function User({ memberName, memberId, position, isOption, onClickModal }) {
  return (
    <div className={styles.member}>
      <div className={styles.name}>{memberName}</div>
      <div className={styles.id}>{memberId}</div>
      <div className={styles.class}>{dictPosition[position]}</div>
      {isOption && (
        <div className={styles.option}>
          <input type="checkbox" id={memberId} />
          <label htmlFor={memberId}>
            <Option />
            <div className={styles.modal} style={{ zIndex: 1 }}>
              {Object.keys(dictPosition)
                .filter((p) => p !== position)
                .map((p, idx) => (
                  <div key={idx} className={styles.modalElement} data-element="change" data-position={p} data-memberid={memberId} onClick={onClickModal}>
                    <span>{dictPosition[p]}</span>으로 변경
                  </div>
                ))}
              <div className={`${styles.modalElement} ${styles.error}`} data-element="delete" data-memberid={memberId} onClick={onClickModal}>
                동아리 내보내기
              </div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
