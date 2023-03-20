import { EmojiPicker } from "./EmojiPicker";
import { FC, useEffect } from "react";
import twemoji from "twemoji";
import { BaseEmoji, EmojiData } from "emoji-mart";
import { useEmojiState } from "@/hooks/useEmojiState";

export const EmojiInputArea: FC = () => {
  const [emoji, setEmoji] = useEmojiState();

  const modalId = "emoji-picker";
  const removeEmojiPicker = () => {
    // NOTE:
    // Since DaisyUI's modal display is controlled by whether or not the input element is checked,
    // we check it to hide the modal.
    const element = document.getElementById(modalId)! as HTMLInputElement;
    element.checked = false;
  };
  const onEmojiSelect = (emoji: EmojiData) => {
    const { native } = emoji as BaseEmoji; // NOTE: does not support custom emoji
    setEmoji(native);
    removeEmojiPicker();
  };

  // NOTE:
  // It would be natural to use the `Emoji` component for displaying emoji,
  // but since that component is still in its infancy, it is not used at this time.
  useEffect(() => {
    // NOTE: **Contribute Chance**
    // The URLs are different fro png and svg, but the `parse` function does not support it.
    twemoji.parse(document.body, {
      base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/",
      ext: ".svg",
      className: "w-full h-full",
      size: "/",
    });
  });

  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        removeEmojiPicker();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  const className = "w-60 h-60 mx-auto mt-12 flex justify-center items-center ";

  return (
    <>
      <label htmlFor={modalId} className="modal-button">
        {emoji ? (
          <div className={className + "text-[15rem]"}>{emoji}</div>
        ) : (
          <div className={className + "rounded-full border-dashed border-2"}>
            <span className="text-2xl text-neutral">Select emoji</span>
          </div>
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
