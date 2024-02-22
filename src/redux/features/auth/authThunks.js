import {
  loginWithEmailAndPassword,
  logoutFromFirebase,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "@/firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";


export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const createUserWithEmailAndPassword = ({ displayName, email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerWithEmailAndPassword({ email, password, displayName });

    if (!ok) return dispatch(logout({ errorMessage }));

    const userData = {
      uid,
      displayName,
      email,
      photoURL,
    };

    dispatch(login(userData));
  };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage, displayName } =
      await loginWithEmailAndPassword({ email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    const userData = {
      uid,
      displayName,
      email,
      photoURL,
    };

    dispatch(login(userData));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFromFirebase();

    dispatch(logout());
  };
};
