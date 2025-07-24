import { useMeQuery } from "@/shared/hooks/api/use-me.query";
import { LoginButton } from "../login-button";
import { CurrentUser } from "../current-user";

export const AccountBar = () => {
  const query = useMeQuery();

  return (
    <div>
      {!query.data && <LoginButton />}
      {query.data && <CurrentUser />}
    </div>
  );
};
