import { EmojiPicker } from "./EmojiPicker";
import { FC, useEffect, useState } from "react";
import twemoji from "twemoji";

export const EmojiInputArea: FC = () => {
  const [emoji, setEmoji] = useState(undefined);

  const onEmojiSelect = ({ native }: any) => {
    console.log(native);
    setEmoji(native);
  };

  useEffect(() => {
    // NOTE: **Contribute Chance**
    // The URLs are different fro png and svg, but the `parse` function does not support it.
    twemoji.parse(document.body, {
      base: "https://twemoji.maxcdn.com/v/latest/svg/",
      ext: ".svg",
      className: "w-full h-full",
      size: "/",
    });
  });

  return (
    <>
      <label htmlFor="my-modal" className="modal-button">
        {!emoji ? (
          <div className="bg-transparent w-60 h-60 mx-auto mt-12 rounded-full border-dashed border-2 flex items-center justify-center">
            <span className="text-2xl text-neutral">Select emoji</span>
          </div>
        ) : (
          <p className="w-60 h-60 mx-auto mt-12">{emoji}</p>
        )}
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal modal-bottom cursor-pointer">
        <label htmlFor="" className="modal-action relative">
          <EmojiPicker onEmojiSelect={onEmojiSelect} />
        </label>
      </label>
    </>
  );
};
