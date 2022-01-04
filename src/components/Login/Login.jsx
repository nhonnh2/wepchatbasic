import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();
fbProvider.setCustomParameters({
  display: "popup",
});
export default function Login() {
  const handleFbLogin = () => {
    signInWithPopup(auth, fbProvider);
  };
  const handleGgLogin = () => {
    signInWithPopup(auth, ggProvider);
  };
  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Title className="text-center" level={3}>
            Fun chat
          </Title>
          <Button
            className="w-full mt-4 border-solid border-[1px] border-red-500"
            onClick={handleGgLogin}
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            className="w-full mt-4 border-solid border-[1px] border-blue-500"
            onClick={handleFbLogin}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </>
  );
}
