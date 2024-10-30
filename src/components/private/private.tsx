import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../service/firebase";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // const dataUser = {
        //   email: user?.email,
        //   userID: user?.uid,
        // };
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
      return () => {
        unSub();
      };
    });
  }, []);
  if (loading) return <div></div>;
  if (signed) {
    <Navigate to={"/cadastro"} />;
  }
  if (!signed) {
    return <Navigate to={"/"} />;
  }
  return children;
}
