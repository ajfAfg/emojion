import axios from "axios";
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

  // TODO: Move logic into another layer (e.g. use-case)
  const openTwitterWebIntentDeprecated = async () => {
    const blobToBase64 = async (blob: Blob) => {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      }).then((encoded) => (encoded as string).split(",")[1]); // NOTE: Remove 'data:image/png;base64,'
    };

    const blob = await domtoimage.toBlob(
      document.getElementById("capture") as Node
    );
    const encodedImage = await blobToBase64(blob);

    const { imageUrl } = await axios({
      method: "POST",
      url: "/api/uploadImage",
      data: { encodedImage },
    }).then(({ data }) => data);

    window.open(
      `https://twitter.com/intent/tweet?url=${imageUrl}`,
      "_blank",
      "height=570,width=520"
    );
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

        <div
          className="tooltip"
          data-tip="Scheduled to be discontinued as a result of the Twitter API fee"
        >
          <button className="btn" onClick={openTwitterWebIntentDeprecated}>
            Tweet
          </button>
        </div>

        <button className="btn btn-primary" onClick={exportImage}>
          Export
        </button>
      </div>
    </div>
  );
};
