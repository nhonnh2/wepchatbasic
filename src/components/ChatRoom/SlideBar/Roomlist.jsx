import { Collapse, Typography, Button } from "antd";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useFirestore } from "../../../hooks/useFirestore";
import { Authcontext } from "../../../context/AuthProvider";
import { AppContext } from "../../../context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
  }
`;
export default function Roomlist() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    useContext(AppContext);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách phòng chat" key="1">
        <div className="flex flex-col">
          {rooms?.map((room, idx) => (
            <Typography.Link
              key={room.id}
              onClick={() => {
                setSelectedRoomId(room.id);
              }}
            >
              {room.name}
            </Typography.Link>
          ))}
        </div>
        <Button
          type="text"
          className="text-white p-0 mt-2 flex items-center"
          icon={<PlusSquareOutlined />}
          onClick={handleAddRoom}
        >
          Thêm Phòng
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
