import { makeAutoObservable } from "mobx";
import { User } from "../../../shared/utils/types";

const setUserData = (data: User | null) => {
  localStorage.setItem("userInfo", JSON.stringify(data));
};

const getUserFromLocalStorage = (): User | null => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? (JSON.parse(userInfo) as User) : null;
};

class UserStore {
  user: User | null = getUserFromLocalStorage()

  constructor() {
    makeAutoObservable(this)
  }

  setUser = (data: User | null ) => {
    setUserData(data)
    this.user = getUserFromLocalStorage()
  }
}

export default new UserStore()