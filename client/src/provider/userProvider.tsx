import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

type UserType = {
  id: string;
  name: string;
};

export type UserContextType = {
  user: UserType;
  updateUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
};

export const UserProvider = (props: any) => {
  const [user, setUser] = useState<UserType>();

  // load user from localStorage when application starts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userJSON = JSON.parse(user);
        setUser(userJSON);
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // update user object on localstorage each time it is updated
  useEffect(() => {
    const userStr = JSON.stringify(user);
    localStorage.setItem("user", userStr);
  }, [user]);

  return (
    <UserContext.Provider values={{ user, updateUser: setUser }} {...props} />
  );
};
