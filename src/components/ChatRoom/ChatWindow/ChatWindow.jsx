import { SendOutlined, UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
import { Authcontext } from "../../../context/AuthProvider";
import { addDocument } from "../../../firebase/service";
import { useFirestore } from "../../../hooks/useFirestore";
import InviteMember from "./InviteMember";
import Message from "./Message";

export default function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);
  const { user } = useContext(Authcontext);
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState();
  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid: user?.uid,
      photoURL: user?.photoURL,
      roomId: selectedRoom.id,
      displayName: user?.displayName,
    });
    form.resetFields(["messages"]);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const condition = useMemo(
    () => ({ value1: "roomId", operator: "==", value2: selectedRoom?.id }),
    [selectedRoom?.id]
  );
  const messages = useFirestore("messages", condition);
  console.log("messages", messages);
  return (
    <>
      {selectedRoom?.id ? (
        <div className="chatroom h-[100vh]">
          <div className="chatroom_header h-14 flex justify-between px-4 items-center border-b border-solid border-[rbg(230,230,230)]">
            <div>
              <p className="mb-0 font-bold">{selectedRoom?.name}</p>
              <span className="text-xs">{selectedRoom?.description}</span>
            </div>
            <div className="flex item-center">
              <Button
                type="text"
                className="flex items-center"
                icon={<UserAddOutlined />}
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members?.map((user) => (
                  <Tooltip key={user.uid} title={user.displayName}>
                    <Avatar src={user.photoURL}>
                      {user.photoURL
                        ? ""
                        : user.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          </div>
          <div className="chatroom_content h-[calc(100%-56px)] flex flex-col p-3 justify-end">
            <div className="chatroom_messageList max-h-full overflow-auto">
              {messages.map((mes) => (
                <Message
                  myMessage={mes?.uid === user?.uid}
                  key={mes?.id}
                  text={mes?.text}
                  photoURL={mes?.photoURL}
                  createAt={mes?.createAt}
                  displayName={mes.displayName}
                />
              ))}
            </div>
            <Form
              form={form}
              className="flex flex-row justify-between items-center p-[2px] border-[1px] border-solid border-[rgb(230,230,230)] rounded-sm"
            >
              <Form.Item name="messages" className="w-[calc(100%-50px)] mb-0">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  bordered={false}
                  autoComplete="off"
                  placeholder="nhập tin nhắn"
                />
              </Form.Item>
              <Button
                type="text"
                onClick={handleOnSubmit}
                className="flex items-center w-[50px]"
              >
                <SendOutlined className="text-blue-500 text-[18px]" />
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
      <InviteMember />
    </>
  );
}
