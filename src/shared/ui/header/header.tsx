import { Link } from "@tanstack/react-router";
import type { FC, ReactNode } from "react";

import styles from "./header.module.css";

interface HeaderProps {
  renderAccountBar: () => ReactNode;
}

export const Header: FC<HeaderProps> = ({ renderAccountBar }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={styles.link}
          activeProps={{ className: styles.active }}
        >
          Home
        </Link>
        <Link
          to="/my-playlist"
          className={styles.link}
          activeProps={{ className: styles.active }}
        >
          My playlist
        </Link>
        <Link
          to="/oauth/callback"
          className={styles.link}
          activeProps={{ className: styles.active }}
        >
          OAuth
        </Link>
      </nav>

      <div>{renderAccountBar()}</div>
    </header>
  );
};
