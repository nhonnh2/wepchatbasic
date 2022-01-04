import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
export const Authcontext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        console.log(user);
        navigate("/");
      } else {
        navigate("/login");
      }
    });
    return () => {
      unregisterAuthObserver();
    };
  }, [navigate]);

  return (
    <Authcontext.Provider value={{ user }}>{children}</Authcontext.Provider>
  );
}
