import styles from "@/shared/styles/button.module.css";
import { useLogout } from "@/shared/hooks";

export const LogoutButton = () => {
  const { logout: handleLogoutClick } = useLogout();
  return (
    <div className={styles.buttons}>
      <button
        onClick={handleLogoutClick}
        className={`${styles.button} ${styles.primary}`}
      >
        Logout
      </button>
    </div>
  );
};
