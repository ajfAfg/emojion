import { FC } from "react";
import { neutral } from "../functions/daisyUI";

type Props = { emoji: string };

export const SelectedEmoji: FC<Props> = ({ emoji }) => {
  const tw = "w-60 h-60 mx-auto mt-12 flex justify-center items-center ";

  return emoji ? (
    <div tw={tw + "text-[15rem]"}>{emoji}</div>
  ) : (
    <div
      tw={tw + "rounded-full border-[#E5E7EB] border-2"}
      // NOTE: `border-dashed` in Tailwind was not supported, so the style attribute is used instead.
      style={{
        borderTopStyle: "dashed",
        borderRightStyle: "dashed",
        borderLeftStyle: "dashed",
        borderBottomStyle: "dashed",
      }}
    >
      <span tw={`text-2xl text-[${neutral}]`}>Select emoji</span>
    </div>
  );
};
