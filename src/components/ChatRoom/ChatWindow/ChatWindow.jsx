import { SendOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import React from "react";
import Message from "./Message";

export default function ChatWindow() {
  return (
    <>
      <div className="chatroom h-[100vh]">
        <div className="chatroom_header h-14 flex justify-between px-4 items-center border-b border-solid border-[rbg(230,230,230)]">
          <div>
            <p className="mb-0 font-bold">Room1</p>
            <span className="text-xs">Day la room</span>
          </div>
          <div className="flex item-center">
            <Button
              type="text"
              className="flex items-center"
              icon={<UserAddOutlined />}
            >
              Mời
            </Button>
            <Avatar.Group size="small" maxCount={2}>
              <Tooltip title="A">
                <Avatar>A</Avatar>
              </Tooltip>
              <Tooltip title="B">
                <Avatar>B</Avatar>
              </Tooltip>
              <Tooltip title="C">
                <Avatar>C</Avatar>
              </Tooltip>
              <Tooltip title="D">
                <Avatar>D</Avatar>
              </Tooltip>
            </Avatar.Group>
          </div>
        </div>
        <div className="chatroom_content h-[calc(100%-56px)] flex flex-col p-3 justify-end">
          <div className="chatroom_messageList max-h-full overflow-auto">
            <Message
              text="i love you"
              photoURL={null}
              createAt="311:113:323"
              displayName="nguyen huu nhon"
            />
            <Message
              text="i love you"
              photoURL={null}
              createAt="311:113:323"
              displayName="nguyen huu nhon"
            />
            <Message
              text="i love you"
              photoURL={null}
              createAt="311:113:323"
              displayName="nguyen huu nhon"
            />
            <Message
              text="i love you"
              photoURL={null}
              createAt="311:113:323"
              displayName="nguyen huu nhon"
            />
          </div>
          <Form className="flex flex-row justify-between items-center p-[2px] border-[1px] border-solid border-[rgb(230,230,230)] rounded-sm">
            <Form.Item className="w-[calc(100%-50px)] mb-0">
              <Input
                bordered={false}
                autoComplete="off"
                placeholder="nhập tin nhắn"
              />
            </Form.Item>
            <Button type="text" className="flex items-center w-[50px]">
              <SendOutlined className="text-blue-500 text-[18px]" />
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
