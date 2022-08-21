import { FC } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export const Footer: FC = () => {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content bottom-0">
      <div className="items-center grid-flow-col">
        <p>Copyright © 2022 - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://twitter.com/ajfAfg">
          <FaTwitter size={28} />
        </a>

        <a href="https://github.com/ajfAfg/emojion">
          <FaGithub size={28} />
        </a>
      </div>
    </footer>
  );
};
