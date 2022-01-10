import { createContext } from "react";

export interface IUserContext {
  firstName: string;
  lastName: string;
}

const defaultState = {
  firstName: "",
  lastName: "",
};

export const UserContext = createContext<IUserContext>(defaultState);
