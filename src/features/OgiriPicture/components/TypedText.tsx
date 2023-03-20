import { FC } from "react";
import {
  neutral,
  neutralContent,
  textarea,
  textareaBordered,
} from "../functions/daisyUI";

type Props = { text: string };

export const TypedText: FC<Props> = ({ text }) => {
  return (
    <div tw="flex max-w-full">
      {text ? (
        // NOTE:
        // Use the element `span` to represent a line break, since the following approaches are not available:
        //
        // - `textarea`
        // - `br`
        // - `div` without `display: flex`
        <div tw={`${textarea} flex flex-col mx-32 my-8 w-full`}>
          {text.split("\n").map((paragraph, i) => (
            <span
              key={i}
              tw={`w-full text-[${neutral}] text-center justify-center bg-transparent text-5xl`}
              style={{ wordBreak: "break-all" }}
            >
              {paragraph}
            </span>
          ))}
        </div>
      ) : (
        <div
          tw={`${textarea} ${textareaBordered} border-2 flex flex-col mx-32 my-8 w-[55rem]`}
          // NOTE: `border-dashed` in Tailwind was not supported, so the style attribute is used instead.
          style={{
            borderTopStyle: "dashed",
            borderRightStyle: "dashed",
            borderLeftStyle: "dashed",
            borderBottomStyle: "dashed",
          }}
        >
          {[
            "Type here",
            "　", // NOTE: For a new line
          ].map((paragraph, i) => (
            <span
              key={i}
              tw={`w-full text-center justify-center text-2xl text-[${neutralContent}]`}
            >
              {paragraph}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
