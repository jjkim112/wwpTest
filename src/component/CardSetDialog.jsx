import styles from "./CardSetDialog.module.css";
import basic from "./basic.json";

function CardSetDialog({ setCardFunc, setModalOpen, origin }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };
  const clickNum = (value) => {
    if (setCardFunc != null) {
      setCardFunc(value);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className={styles.back} onClick={closeModal}></div>
      <div className={styles.container}>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        {basic.numList.map((v, i) => {
          if (v === origin) {
            return (
              <div className={styles.originItem} key={i}>
                {v}
              </div>
            );
          }
          return (
            <div
              key={i}
              className={styles.numItem}
              onClick={() => {
                clickNum(v);
              }}
            >
              {v}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CardSetDialog;
