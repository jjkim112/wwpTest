import { FC } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
interface MetadataProps {
  removeFunc: () => void;
  value: JsonObject;
}

type JsonObject = {
  title: string;
  subTitle: string;
  info: string;
};

const OneMetadataItem: FC<MetadataProps> = ({ removeFunc, value }) => {
  return (
    <div className="relative mx-2 my-1 border-sky-100 w-fit border-[1px] p-4 rounded-xl">
      <AiOutlineMinusCircle
        className="absolute top-[-5px] right-[-5px] bg-white hover:cursor-pointer"
        onClick={() => {
          removeFunc();
        }}
        color="red"
        size={15}
      />
      <div>타이틀:{value.title}</div>
      <div>서브타이틀:{value.subTitle}</div>
      <div>인포:{value.info}</div>
    </div>
  );
};

export default OneMetadataItem;
