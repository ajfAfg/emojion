import { FC, useState } from "react";

export const CopyButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  const copy = () => {
    onClick();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1500);
  };

  return !isClicked ? (
    <div className="tooltip tooltip-secondary" data-tip="copy">
      <button className="btn btn-square mx-4" onClick={copy}>
        <span className="material-symbols-outlined">file_copy</span>
      </button>
    </div>
  ) : (
    <div
      className="tooltip tooltip-open tooltip-secondary"
      data-tip="copied!"
      data-testid="copied"
    >
      <button className="btn btn-square mx-4">
        <span className="material-symbols-outlined">file_copy</span>
      </button>
    </div>
  );
};
