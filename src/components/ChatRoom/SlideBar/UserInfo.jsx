import { Avatar, Button, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { Authcontext } from "../../../context/AuthProvider";
import { auth, db } from "../../../firebase/config";
import { signOut } from "firebase/auth";
export default function UserInfo() {
  const { user } = useContext(Authcontext);
  console.log("user", user);
  const photoURL = user?.photoURL,
    displayName = user?.displayName;
  return (
    <>
      <div className="flex justify-between py-3 px-4 border-b border-solid border-[rgba(82,38,83)] ">
        <div>
          <Avatar src={photoURL}>
            {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography.Text className="text-white ml-1">
            {displayName}
          </Typography.Text>
        </div>
        <Button
          ghost
          onClick={() => {
            signOut(auth);
          }}
        >
          Đăng xuất
        </Button>
      </div>
    </>
  );
}
