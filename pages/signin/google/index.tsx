import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const api = require("@/apiCalls");

const Callback = () => {
  const router = useRouter();

  const authenticate = async (token: string) => {
    const data = await api.getUser(token);
    // If the token is valid set the user and token in the local storage
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };
  useEffect(() => {
    const token = router.query.token;

    if (token) {
      console.log(token);
      authenticate(token as string);
    }
  }, [router.query.token]);

  return <div>Authenticating...</div>;
};

export default Callback;
