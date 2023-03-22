import { FC, useState } from "react";

type Props = {
  onClick: () => void;
};

export const CopyButton: FC<Props> = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  const copy = () => {
    onClick();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1500);
  };

  return !isClicked ? (
    <div className="tooltip tooltip-secondary" data-tip="copy">
      <button className="btn btn-square" onClick={copy}>
        <span className="material-symbols-outlined">file_copy</span>
      </button>
    </div>
  ) : (
    <div
      className="tooltip tooltip-open tooltip-secondary"
      data-tip="copied!"
      data-testid="copied"
    >
      <button className="btn btn-square">
        <span className="material-symbols-outlined">file_copy</span>
      </button>
    </div>
  );
};
