import { EmojiPicker } from "./EmojiPicker";
import { useLayoutEffect, useState } from "react";
import twemoji from "twemoji";

export const Canvas = ({ id, emoji, onEmojiSelect }: any) => {
  useLayoutEffect(() => {
    // NOTE: **Contribute Chance**
    // The URLs are different fro png and svg, but the `parse` function does not support it.
    twemoji.parse(document.body, {
      base: "https://twemoji.maxcdn.com/v/latest/svg/",
      ext: ".svg",
      className: "w-full h-full",
      size: "/",
    });
  });

  const [text, setText] = useState("");

  return (
    <div className="border-solid border-2 stroke-base-100">
      <div id={id} className="flex bg-white">
        <div className="m-auto">
          <label htmlFor="my-modal" className="modal-button">
            {emoji === null ? (
              <div className="bg-transparent w-60 h-60 mx-auto mt-12 rounded-full border-dashed border-2 flex items-center justify-center">
                <span className="text-2xl text-neutral">Select emoji</span>
              </div>
            ) : (
              <p className="w-60 h-60 mx-auto mt-12">{emoji}</p>
            )}
          </label>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <label
            htmlFor="my-modal"
            className="modal modal-bottom cursor-pointer"
          >
            <label htmlFor="" className="modal-action relative">
              <EmojiPicker onEmojiSelect={onEmojiSelect} />
            </label>
          </label>

          {text === "" ? (
            <textarea
              rows={1}
              className="textarea textarea-bordered resize-y w-full sm:w-[26rem] h-[64px] text-2xl text-neutral text-center bg-transparent border-dashed border-2 focus:textarea-accent my-8"
              placeholder="Type here"
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <textarea
              rows={1}
              value={text}
              className="textarea border-none resize-y w-[26rem] text-5xl text-neutral text-center bg-transparent focus:textarea-accent my-8"
              onChange={(e) => setText(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
