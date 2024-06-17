"use client"
// UserContext.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import getuser from "../api/getuser";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);
const initialState = {
  user: null,
};
const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
    
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
   
    
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        try {
        
          const data = await getuser(token); 
        
          if(data){
            dispatch({ type: "SET_USER", payload: data });
          }
        } catch (error) {
          console.log(error)
        }
      }
    };
   
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};