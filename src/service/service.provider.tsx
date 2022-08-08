import React, { createContext } from "react";
import { API, USER } from "./api-enum";

let caller = {};

export const Context = createContext(caller);

const ServiceProvider: React.FC<any> = (props) => {
  let url = API.GET_REPO + USER.NAME;  

  const getProfile = async () => {
    const res = await fetch(url);
    return await res.json();
  };

  const getAllRepo = async () => {
    let repos = [];
    let res;
    for (let i = 1; i <= USER.MAX_Pages; i++) {
        res = await fetch(
            `${url}/repos?&sort=pushed&per_page=100&page=${i}`
        );
        let data = await res.json();
        repos.push(data);
    }
    return repos;
  };

  Object.assign(caller, { getProfile, getAllRepo });

  return <Context.Provider value={caller}>{props.children}</Context.Provider>;
};

export default ServiceProvider;
