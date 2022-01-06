import { Form, Input, Modal } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { Authcontext } from "../../../context/AuthProvider";
import { addDocument } from "../../../firebase/service";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { user } = useContext(Authcontext);
  const [form] = Form.useForm();
  const handleOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [user?.uid] });
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
