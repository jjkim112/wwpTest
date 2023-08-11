import dialog from "./dialog.module.css";
import basic from "../../utils/basic.json";
import CardSimple from "../../component/CardSimple";

type CardSetDialogProps = {
  cardSetFunc: (cardValue: string) => void;
  setDialogOpen: (isOpen: boolean) => void;
  pickCards: string[];
  selCard: string;
};

const CardSetDialog: React.FC<CardSetDialogProps> = ({
  cardSetFunc,
  setDialogOpen,
  pickCards,
  selCard,
}) => {
  const closeModal = () => {
    setDialogOpen(false);
  };

  const clickNum = (cardValue: string) => {
    cardSetFunc(cardValue);
    setDialogOpen(false);
  };

  return (
    <div>
      <div className={dialog.back} onClick={closeModal}></div>
      <div className={dialog.content}>
        <button className={dialog.close} onClick={closeModal}>
          X
        </button>
        <div className="flex flex-col justify-center">
          {/* {basic.shapeList.map((shape, index) => {
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
                          if (selCard === `${shape}${v}`) {
                            clickNum(`${shape}${v}`);
                          }
                        }
                      }}
                    >
                      <CardSimple
                        isPick={pickCards.includes(`${shape}${v}`)}
                        shape={shape}
                        number={v}
                        isOriginCard={selCard === `${shape}${v}`}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })} */}
          {basic.numList.map((num, index) => {
            return (
              <div className="flex" key={`${index}_${num}`}>
                {basic.shapeList.map((shape, i) => {
                  return (
                    <div
                      key={`${index}_${i}`}
                      onClick={() => {
                        if (!pickCards.includes(`${shape}${num}`)) {
                          clickNum(`${shape}${num}`);
                        } else {
                          if (selCard === `${shape}${num}`) {
                            clickNum(`${shape}${num}`);
                          }
                        }
                      }}
                    >
                      <CardSimple
                        isPick={pickCards.includes(`${shape}${num}`)}
                        shape={shape}
                        number={num}
                        isOriginCard={selCard === `${shape}${num}`}
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
