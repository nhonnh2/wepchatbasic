import React, { createContext, useContext, useMemo, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { Authcontext } from "./AuthProvider";

export const AppContext = createContext();
export default function AppProvider({ children }) {
  const { user } = useContext(Authcontext);
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);

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

  const selectedRoom = useMemo(
    () => rooms?.find((room) => room.id === selectedRoomId),
    [rooms, selectedRoomId]
  );

  const usersCondition = useMemo(() => {
    return {
      value1: "uid",
      operator: "in",
      value2: selectedRoom?.members,
    };
  }, [selectedRoom?.members]);
  const members = useFirestore("users", usersCondition);
  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
