import { useRef } from "react";
import data from "@emoji-mart/data";

// NOTE:
// o: This method
// x: Dynamic import
// x: One `ref`
export const EmojiPicker = (props: any): JSX.Element => {
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
