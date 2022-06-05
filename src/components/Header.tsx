import Link from "next/link";

export const Header = () => (
  <header className="navbar bg-base-300 py-4">
    <Link href="/">
      <a className="btn btn-ghost normal-case text-3xl text-primary">Emojion</a>
    </Link>
  </header>
);
