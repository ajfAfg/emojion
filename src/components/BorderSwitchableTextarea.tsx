import { useTextState } from "@/hooks/useTextState";
import { ChangeEvent } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

export const BorderSwitchableTextarea = () => {
  const [text, setText] = useTextState();

  const className =
    "max-w-full mx-32 my-8 sm:w-[35rem] textarea resize-none text-neutral text-center bg-transparent focus:textarea-accent" +
    " " +
    (text
      ? "border-none text-5xl"
      : "textarea-bordered border-dashed border-2 text-2xl");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  return (
    <ReactTextareaAutosize
      className={className}
      placeholder="Type here"
      minRows={2}
      value={text ?? ""}
      onChange={onChange}
      data-testid="non-border"
    />
  );
};
