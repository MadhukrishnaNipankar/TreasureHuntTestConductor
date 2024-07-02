import React, { useState, useEffect, useRef } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../utility/action/adminActions";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserVerified = useRef(false);

  useEffect(() => {}, [username, password]);

  useEffect(() => {
    isUserVerified.current = admin.verified;
  }, [admin]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    try {
      setLoad(true);
      console.log(username, password);
      Promise.resolve(dispatch(login(username, password))).then(() => {
        setLoad(false);
        if (isUserVerified.current === true) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt=""
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 mr-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              {/* <!--Sign in section--> */}
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-2xl">Admin Login</p>
              </div>

              {/* <!-- Separator between social media sign in and email/password sign in --> */}
              <div className="my-4  flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  login
                </p>
              </div>

              {/* <!-- Email input --> */}
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
                value={username}
                onChange={handleUsernameChange}
              ></TEInput>

              {/* Password input */}
              <TEInput
                type="password"
                label="Password"
                className="mb-6 mr-12"
                size="lg"
                value={password}
                onChange={handlePasswordChange}
              ></TEInput>

              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  {!load ? (
                    <button
                      onClick={onSubmit}
                      type="button"
                      className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Login
                    </button>
                  ) : (
                    <CircularProgress />
                  )}
                </TERipple>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
