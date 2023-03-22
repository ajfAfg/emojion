import { FC, useRef } from "react";
import data from "@emoji-mart/data/sets/14/twitter.json";
import { EmojiData, Picker, PickerProps } from "emoji-mart";

// NOTE:
// Currently, the type definition file for `EmojiMart` does not match the actual type,
// so a little ingenuity is required to match the type.
// When the type definition file is updated,
// we can use `PickerProps` as the type of Props as it is.
type Props = PickerProps & { onEmojiSelect: (emoji: EmojiData) => void };

// NOTE:
// o: This method
// x: Dynamic import
// x: One `ref`
export const EmojiPicker: FC<Props> = (props) => {
  const pickerRef = useRef<HTMLDivElement | undefined>();
  const moduleRef = useRef<Promise<Picker> | undefined>();
  const handleDivRef = (divElem: HTMLDivElement) => {
    pickerRef.current = divElem;
    if (!moduleRef.current) {
      moduleRef.current = import("emoji-mart").then(
        (m) =>
          // TODO: any
          new m.Picker({
            ...props,
            ref: pickerRef,
            data: data,
            set: "twitter",
          } as any)
      );
    }
  };
  return <div ref={handleDivRef} />;
};
