import { FC } from "react";
import { BorderSwitchableTextarea } from "./BorderSwitchableTextarea";
import { EmojiInputArea } from "./EmojiInputArea";

type Props = {
  id: string;
};

export const Canvas: FC<Props> = ({ id }) => {
  return (
    <div className="border-solid border-2 stroke-base-100">
      <div
        id={id}
        className="flex bg-white flex-col justify-center items-center"
      >
        <EmojiInputArea />
        <BorderSwitchableTextarea />
      </div>
    </div>
  );
};
