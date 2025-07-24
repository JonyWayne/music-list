import { Link } from "@tanstack/react-router";

import styles from "./user.module.css";
import { useMeQuery } from "@/shared/hooks/api/use-me.query";
import { LogoutButton } from "../logout-button";

export const CurrentUser = () => {
  const query = useMeQuery();

  return (
    <div className={styles.meInfoContainer}>
      <Link to="/my-playlist" activeOptions={{ exact: true }}>
        {query.data?.login}
      </Link>

      <LogoutButton />
    </div>
  );
};
