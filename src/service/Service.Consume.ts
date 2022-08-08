import { useContext } from "react";
import { Context } from "./service.provider";

export const useServiceConsumer = () => {
  return useContext(Context);
}