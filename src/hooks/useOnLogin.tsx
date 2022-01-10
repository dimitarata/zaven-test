import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../api/axiosWrapper";

export interface ILoginResponseProps {
  success: boolean;
  errorMessage: string;
}

export interface ILoginProps {
  username: string;
  password: string;
}

export default function useOnLogin({ username, password }: ILoginProps) {
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (username && password) {
      onSubmit({
        username,
        password,
      });
    }
  }, [username, password]);

  const onSubmit = async ({ username, password }: ILoginProps) => {
    try {
      const { data } = await axios.post(`/login`, {
        username,
        password,
      });

      if (data) {
        Cookies.set("token", data.token);
        setSuccess(true);
      }
    } catch (err: any) {
      setSuccess(false);
      setErrorMessage(err.response.data);
    }
  };

  return {
    success,
    errorMessage,
  };
}
