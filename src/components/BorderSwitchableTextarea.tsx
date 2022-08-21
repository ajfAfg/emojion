import { ChangeEvent, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

export const BorderSwitchableTextarea = () => {
  const [text, setText] = useState("");

  const className = !text
    ? "textarea textarea-bordered resize-y w-full sm:w-[26rem] h-[64px] text-2xl text-neutral text-center bg-transparent border-dashed border-2 focus:textarea-accent my-8"
    : "textarea border-none resize-y w-[26rem] text-5xl text-neutral text-center bg-transparent focus:textarea-accent my-8";

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  return (
    <ReactTextareaAutosize
      className={className}
      style={{ resize: "none" }}
      placeholder="Type here"
      onChange={onChange}
      data-testid="non-border"
    />
  );
};
