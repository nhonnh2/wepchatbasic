import React, { createContext, useContext, useMemo, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { Authcontext } from "./AuthProvider";

export const AppContext = createContext();
export default function AppProvider({ children }) {
  const { user } = useContext(Authcontext);
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  /*  room{
        name:
        description:
        memders:[uid1,uid2]
      } */
  const roomsCondition = useMemo(() => {
    return {
      value1: "members",
      operator: "array-contains",
      value2: user?.uid,
    };
  }, [user?.uid]);
  const rooms = useFirestore("rooms", roomsCondition);
  return (
    <AppContext.Provider
      value={{ rooms, isAddRoomVisible, setIsAddRoomVisible }}
    >
      {children}
    </AppContext.Provider>
  );
}
