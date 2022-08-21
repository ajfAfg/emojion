import { EmojiPicker } from "./EmojiPicker";
import { FC, useEffect, useState } from "react";
import twemoji from "twemoji";
import { BaseEmoji, EmojiData } from "emoji-mart";

export const EmojiInputArea: FC = () => {
  const [emoji, setEmoji] = useState<string>("");

  const onEmojiSelect = (emoji: EmojiData) => {
    const { native } = emoji as BaseEmoji; // NOTE: does not support custom emoji
    console.log(native);
    setEmoji(native);
  };

  // NOTE:
  // It would be natural to use the `Emoji` component for displaying emoji,
  // but since that component is still in its infancy, it is not used at this time.
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

  const modalId = "emoji-picker";
  useEffect(() => {
    const removeEmojiPicker = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        // NOTE:
        // Since DaisyUI's modal display is controlled by whether or not the input element is checked,
        // we check it to hide the modal.
        const element = document.getElementById(modalId)! as HTMLInputElement;
        element.checked = false;
      }
    };
    document.addEventListener("keydown", removeEmojiPicker);
    return () => document.removeEventListener("keydown", removeEmojiPicker);
  }, []);

  return (
    <>
      <label htmlFor={modalId} className="modal-button">
        {!emoji ? (
          <div className="bg-transparent w-60 h-60 mx-auto mt-12 rounded-full border-dashed border-2 flex items-center justify-center">
            <span className="text-2xl text-neutral">Select emoji</span>
          </div>
        ) : (
          <p className="w-60 h-60 mx-auto mt-12">{emoji}</p>
        )}
      </label>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="modal modal-bottom cursor-pointer">
        <label htmlFor="" className="modal-action relative">
          <EmojiPicker onEmojiSelect={onEmojiSelect} />
        </label>
      </label>
    </>
  );
};
