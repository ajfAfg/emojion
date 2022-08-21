import domtoimage from "dom-to-image";
import { FC } from "react";
import { Canvas } from "./Canvas";
import { CopyButton } from "./CopyButton";

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

  return (
    <div className="sm:container md:container lg:w-[768px] /* md === 768px */ mx-auto">
      <Canvas id="capture" />

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
        <CopyButton onClick={copyImage} />

        <button className="btn btn-primary" onClick={exportImage}>
          Export
        </button>
      </div>
    </div>
  );
};
