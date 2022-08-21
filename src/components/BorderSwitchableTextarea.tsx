import { useState } from "react";

export const BorderSwitchableTextarea = () => {
  const [text, setText] = useState("");
  const className = !text
    ? "textarea textarea-bordered resize-y w-full sm:w-[26rem] h-[64px] text-2xl text-neutral text-center bg-transparent border-dashed border-2 focus:textarea-accent my-8"
    : "textarea border-none resize-y w-[26rem] text-5xl text-neutral text-center bg-transparent focus:textarea-accent my-8";

  return (
    <textarea
      rows={1}
      className={className}
      placeholder="Type here"
      onChange={(e) => setText(e.target.value)}
    />
  );
};
