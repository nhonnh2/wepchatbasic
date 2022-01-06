import { Avatar, Typography } from "antd";
import React from "react";

export default function Message({ text, displayName, createAt, photoURL }) {
  return (
    <div className="mb-3">
      <div>
        <Avatar size="small" src={photoURL} />
        <Typography.Text className="ml-[5px] font-bold">
          {displayName}
        </Typography.Text>
        <Typography.Text className="ml-3 text-xs text-[#a7a7a7]">
          {createAt}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="ml-8">{text}</Typography.Text>
      </div>
    </div>
  );
}
