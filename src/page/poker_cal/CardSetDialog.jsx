import dialog from "./dialog.module.css";
import basic from "../../utils/basic.json";
import CardSimple from "../../component/CardSimple";

const CardSetDialog = ({ cardSetFunc, setDialogOpen, pickCards, selCard }) => {
  const closeModal = () => {
    setDialogOpen(false);
  };
  const clickNum = (cardValue) => {
    cardSetFunc(cardValue);
    setDialogOpen(false);
  };

  // console.log(pickCards);
  return (
    <div>
      <div className={dialog.back} onClick={closeModal}></div>
      <div className={dialog.content}>
        <button className={dialog.close} onClick={closeModal}>
          X
        </button>
        <div className="flex flex-col justify-center">
          {basic.shapeList.map((shape, index) => {
            return (
              <div className="flex" key={`${index}_${shape}`}>
                {basic.numList.map((v, i) => {
                  return (
                    <div
                      key={`${index}_${i}`}
                      onClick={() => {
                        if (!pickCards.includes(`${shape}${v}`)) {
                          clickNum(`${shape}${v}`);
                        } else {
                          if (selCard == `${shape}${v}`) {
                            clickNum(`${shape}${v}`);
                          }
                        }
                      }}
                    >
                      <CardSimple
                        isPick={pickCards.includes(`${shape}${v}`)}
                        shape={shape}
                        number={v}
                        isOriginCard={selCard == `${shape}${v}`}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardSetDialog;
