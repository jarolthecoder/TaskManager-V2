
import { login, logout } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
   if (status === "authenticated") {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, []);

  return status;
};
