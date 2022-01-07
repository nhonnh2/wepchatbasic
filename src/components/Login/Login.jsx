import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

import { auth, db } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/service";
const { Title } = Typography;
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();
fbProvider.setCustomParameters({
  display: "popup",
});
export default function Login() {
  const handleLogin = async (provider) => {
    const data = await signInWithPopup(auth, provider);
    const additionalUserInfo = getAdditionalUserInfo(data);
    console.log(additionalUserInfo);
    const { displayName, email, photoURL, uid } = data.user;
    console.log(additionalUserInfo);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName,
        email,
        photoURL,
        uid,
        providerId: additionalUserInfo.providerId,
        keyword: generateKeywords(displayName),
      });
    }
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
            onClick={() => {
              handleLogin(ggProvider);
            }}
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            className="w-full mt-4 border-solid border-[1px] border-blue-500"
            onClick={() => {
              handleLogin(fbProvider);
            }}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </>
  );
}
