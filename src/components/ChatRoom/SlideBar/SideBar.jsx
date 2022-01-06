import React from "react";
import AddRoomModal from "./AddRoomModal";
import Roomlist from "./Roomlist";
import UserInfo from "./UserInfo";
export default function SideBar() {
  return (
    <>
      <div className="bg-[#3f0e40] text-white h-[100vh]">
        <UserInfo />
        <Roomlist />
        <AddRoomModal />
      </div>
    </>
  );
}
