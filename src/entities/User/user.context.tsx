import { useState, createContext, ReactNode } from "react";
import { User } from "../../shared/utils/types";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUserData: (data: User) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  setUserData: () => null,
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const setUserData = (data: User) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };

  const getUserFromLocalStorage = (): User | null => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? (JSON.parse(userInfo) as User) : null;
  };


  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  const value = { user, setUser, setUserData };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
