import { Avatar, Form, Input, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
import { Authcontext } from "../../../context/AuthProvider";
import { addDocument } from "../../../firebase/service";
import { db } from "../../../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
function DebounceSelect({ fetchOption, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);
      fetchOption(value, props.curMembers).then((newOptions) => {
        console.log("new options", newOptions);
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOption, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0).toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}
async function fetchuserList(search, curMembers) {
  return getDocs(
    query(
      collection(db, "users"),
      where("keyword", "array-contains", search),

      limit(20)
    )
  ).then((snapshot) => {
    return snapshot.docs
      .map((doc) => {
        console.log("doc data", doc.data());
        return {
          label: doc.data().displayName,
          photoURL: doc.data().photoURL,
          value: doc.data().uid,
        };
      })
      .filter((opt) => !curMembers.includes(opt.value));
  });
}
export default function InviteMember() {
  const [value, setValue] = useState();
  const {
    selectedRoomId,
    selectedRoom,
    isInviteMemberVisible,
    setIsInviteMemberVisible,
  } = useContext(AppContext);
  const { user } = useContext(Authcontext);

  const [form] = Form.useForm();
  const handleOk = async () => {
    console.log("roomId", selectedRoomId);
    const roomRef = doc(db, "rooms", selectedRoomId);
    console.log("room ref", roomRef);
    await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
    form.resetFields();
    setIsInviteMemberVisible(false);
  };
  const handleCancel = () => {
    setIsInviteMemberVisible(false);
  };
  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOption={fetchuserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={selectedRoom?.members}
          />
        </Form>
      </Modal>
    </div>
  );
}
