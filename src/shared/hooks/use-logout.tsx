import { useLogoutMutation } from "./api/useLogoutMutation";

export const useLogout = () => {
  const { mutate } = useLogoutMutation();

  const logout = () => {
    mutate();
  };

  return { logout };
};
