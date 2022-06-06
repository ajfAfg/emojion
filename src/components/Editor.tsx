import { useState } from "react";
import domtoimage from "dom-to-image";
import { Canvas } from "./Canvas";

export const Editor = () => {
  const [emoji, setEmoji] = useState(null);

  const onEmojiSelect = ({ native }: any) => {
    console.log(native);
    setEmoji(native);
  };

  const exportImage = () => {
    domtoimage.toPng(document.getElementById("capture") as any).then((png) => {
      const link = document.createElement("a");
      link.download = "emojion.png";
      link.href = png;
      link.click();
    });
  };

  const [canDisplayCopied, setCanDisplayCopied] = useState(false);
  const copyImage = () => {
    domtoimage
      .toBlob(document.getElementById("capture") as any)
      .then((blob) => {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCanDisplayCopied(true);
        setTimeout(() => {
          setCanDisplayCopied(false);
        }, 1000);
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
        {canDisplayCopied ? (
          <div
            className="tooltip tooltip-open tooltip-secondary"
            data-tip="copied!"
          >
            <button className="btn btn-square mx-4" onClick={copyImage}>
              <span className="material-symbols-outlined">file_copy</span>
            </button>
          </div>
        ) : (
          <button className="btn btn-square mx-4" onClick={copyImage}>
            <span className="material-symbols-outlined">file_copy</span>
          </button>
        )}

        <button className="btn btn-primary" onClick={exportImage}>
          Export
        </button>
      </div>
    </div>
  );
};
