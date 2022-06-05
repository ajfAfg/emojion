import { useLayoutEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import twemoji from "twemoji";
import domtoimage from "dom-to-image";
import { PickerProps } from "emoji-mart";

// NOTE:
// o: This method
// x: Dynamic import
// x: One `ref`
const Picker = (props: any): JSX.Element => {
  const pickerRef = useRef();
  const moduleRef = useRef();
  const handleDivRef = (divElem: HTMLDivElement) => {
    pickerRef.current = divElem as any;
    if (!moduleRef.current) {
      moduleRef.current = import("emoji-mart").then(
        (m) =>
          new m.Picker({
            ...props,
            ref: pickerRef,
            data: data,
            // NOTE: **Contribute Chance**
            // Twemoji cannot be displayed in the Picker.
            // set: "twitter",
          })
      ) as any;
    }
  };
  return <div ref={handleDivRef} />;
};

const Canvas = ({ id, emoji, onEmojiSelect }: any) => {
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
              <Picker onEmojiSelect={onEmojiSelect} />
            </label>
          </label>

          {text === "" ? (
            <textarea
              rows={1}
              className="textarea textarea-bordered resize-y w-[26rem] h-[64px] text-2xl text-neutral text-center bg-transparent border-dashed border-2 focus:textarea-accent my-8"
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

export const Editor = () => {
  const [emoji, setEmoji] = useState(null);

  const onEmojiSelect = ({ native }: any) => {
    console.log(native);
    setEmoji(native);
  };

  const exportImage = () => {
    domtoimage.toPng(document.getElementById("capture") as any).then((png) => {
      const link = document.createElement("a");
      link.download = "foo.png";
      link.href = png;
      link.click();
    });
  };
  const copyImage = () => {
    domtoimage
      .toBlob(document.getElementById("capture") as any)
      .then((blob) => {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      });
  };

  return (
    <div className="sm:container md:container lg:w-[768px] /* md === 768px */ mx-auto">
      <Canvas id="capture" emoji={emoji} onEmojiSelect={onEmojiSelect} />

      {/* TODO: My favorite */}
      {/* <div className="flex justify-between px-20 my-10">
        <a role="button" className="btn">
          Link
        </a>
        <button type="submit" className="btn">
          Button
        </button>
        <input type="button" value="Input" className="btn" />
        <input type="submit" value="Submit" className="btn" />
        <button className="btn btn-primary" onClick={exportImage}>
          Export
        </button>
      </div> */}

      {/* TODO: Use above instead of this */}
      <div className="flex justify-end my-10">
        <button className="btn btn-square mx-4" onClick={copyImage}>
          <span className="material-symbols-outlined">file_copy</span>
        </button>
        <button className="btn btn-primary" onClick={exportImage}>
          Export
        </button>
      </div>
    </div>
  );
};
