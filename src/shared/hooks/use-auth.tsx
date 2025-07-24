import { callbackUrl } from "../constants.ts";
import { useAuthLoginMutation } from "./api";

interface UseButtonClickOptions {
  disabled?: boolean;
}

export const useAuth = (options: UseButtonClickOptions) => {
  const { loginMutation } = useAuthLoginMutation();

  const handleLoginClick = () => {
    window.addEventListener("message", handleOauthMessage);
    if (options.disabled) return;
    window.open(
      `https://musicfun.it-incubator.app/api/1.0/auth/oauth-redirect?callbackUrl=${callbackUrl}`,
      "apihub-oauth2",
      "width=500, height=600"
    );
  };

  const handleOauthMessage = (event: MessageEvent) => {
    window.removeEventListener("message", handleOauthMessage);
    if (event.origin !== document.location.origin) {
      console.log("Origin not much");
      return;
    }
    const code = event.data.code;
    if (!code) {
      console.log("Code is not exist");
    }
    loginMutation.mutate({ code });
  };

  return {
    handleLoginClick,
  };
};
