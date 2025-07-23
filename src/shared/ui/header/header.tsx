import { Link } from "@tanstack/react-router";
import type { FC, ReactNode } from "react";

import styles from "./header.module.css";
import { useAuth } from "../../hooks";

interface HeaderProps {
  renderAccountBar: () => ReactNode;
}

export const Header: FC<HeaderProps> = ({ renderAccountBar }) => {
  const { handleLoginClick } = useAuth({});

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

      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleLoginClick}>
          Login with API Hub
        </button>
        <button className={`${styles.button} ${styles.primary}`}>
          Sign Up
        </button>
      </div>
      <div>{renderAccountBar()}</div>
    </header>
  );
};
