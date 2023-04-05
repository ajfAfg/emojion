import domtoimage from "dom-to-image";
import { FC } from "react";
import { Canvas } from "./components/Canvas";
import { CopyButton } from "./components/CopyButton";

export const Editor: FC = () => {
  const exportImage = () => {
    domtoimage.toPng(document.getElementById("capture") as any).then((png) => {
      const link = document.createElement("a");
      link.download = "emojion.png";
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

  const openTwitterWebIntent = async () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank",
      "height=570,width=520"
    );
  };

  return (
    <div className="sm:container md:container lg:w-[768px] /* md === 768px */ mx-auto">
      <Canvas id="capture" />

      <div className="flex justify-end space-x-4 my-10">
        <CopyButton onClick={copyImage} />

        <button className="btn btn-tweet" onClick={openTwitterWebIntent}>
          Tweet
        </button>

        <button className="btn btn-primary" onClick={exportImage}>
          Export
        </button>
      </div>
    </div>
  );
};
