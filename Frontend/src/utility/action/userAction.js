import { LOGIN_VERIFY_USER, getRandomBaseUrl } from "../api";

export const login = (user) => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + LOGIN_VERIFY_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: user.email,
          password: user.password,
        }),
      });
      const data = await res.json();
      localStorage.clear();
      if (data.status === "fail") {
        dispatch({ type: "DEFAULT" });
        throw new Error(data.message);
      } else {
        dispatch({
          type: "LOGIN",
          token: data.token,
          username: user.email,
          password: user.password,
          verified: true,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };
};

export const logout = () => {
  return { type: "LOGOUT" };
};
