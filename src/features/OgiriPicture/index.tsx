import { FC } from "react";
import { SelectedEmoji } from "./components/SelectedEmoji";
import { TypedText } from "./components/TypedText";

type Props = { emoji: string; text: string };

// NOTE:
// I assume that `emoji` is a string of an emoji and `text` is a string that can fit on two lines,
// but other strings may be interesting, so I do not prohibit them.
export const OgiriPicture: FC<Props> = ({ emoji, text }) => {
  return (
    <div tw="flex bg-white flex-col justify-center items-center">
      <SelectedEmoji emoji={emoji} />
      <TypedText text={text} />
    </div>
  );
};
