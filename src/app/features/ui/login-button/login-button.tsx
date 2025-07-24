import styles from "@/shared/styles/button.module.css";
import { useAuth } from "@/shared/hooks";

export const LoginButton = () => {
  const { handleLoginClick } = useAuth({});

  return (
    <div className={styles.buttons}>
      <button className={styles.button} onClick={handleLoginClick}>
        Login with API Hub
      </button>
      <button className={`${styles.button} ${styles.primary}`}>Sign Up</button>
    </div>
  );
};
