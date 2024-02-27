"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "@/redux/features/auth";
import { getProjects } from "@/redux/features/projects";
import { getTasks } from "@/redux/features/tasks";

// This is the first point of authentication check when the app loads
export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(getProjects())
      // dispatch(getTasks())
    });
  }, []);

  return status;
};
