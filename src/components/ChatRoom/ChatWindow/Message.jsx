import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import React from "react";

function formateDate(seconds) {
  let formateDate = "";
  if (seconds) {
    formateDate = formatRelative(new Date(seconds * 1000), new Date());
    formateDate = formateDate.charAt(0).toUpperCase() + formateDate.slice(1);
  }
  return formateDate;
}
export default function Message({
  text,
  displayName,
  createAt,
  photoURL,
  myMessage,
}) {
  return (
    <div className="mb-4">
      {myMessage ? (
        <div className="text-right mr-4">
          <Typography.Text className="mr-3 text-xs text-[#a7a7a7]">
            {formateDate(createAt?.seconds)}
          </Typography.Text>
          <Typography.Text className="mr-[5px] font-bold">
            {displayName}
          </Typography.Text>
          <Avatar size="small" src={photoURL}>
            {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
          </Avatar>

          <div>
            <Typography.Text className="ml-8">{text}</Typography.Text>
          </div>
        </div>
      ) : (
        <div>
          <Avatar size="small" src={photoURL}>
            {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography.Text className="ml-[5px] font-bold">
            {displayName}
          </Typography.Text>
          <Typography.Text className="ml-3 text-xs text-[#a7a7a7]">
            {formateDate(createAt?.seconds)}
          </Typography.Text>
          <div>
            <Typography.Text className="ml-8">{text}</Typography.Text>
          </div>
        </div>
      )}
    </div>
  );
}
