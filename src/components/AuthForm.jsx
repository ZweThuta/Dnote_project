import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import StyleErrorMsg from "./StyleErrorMsg";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
  const [redirect, setRedirect] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const AuthFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
          .min(3, "Username is too short!")
          .max(10, "Username is too long!")
          .required("Username is required!"),

    email: Yup.string()
      .required("Email is required!")
      .email("Please enter a correct email address!"),

    password: Yup.string()
      .min(4, "Password is too short!")
      .required("Password is required!"),
  });

  const submitHandler = async (values) => {
    const { email, username, password } = values;
    let END_POINT = `${import.meta.env.VITE_API}/register`;
    if (isLogin) {
      END_POINT = `${import.meta.env.VITE_API}/login`;
    }
    const response = await fetch(END_POINT, {
      method: "post",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const toastFire = (message) => {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };

    const responseData = await response.json();
    if (response.status === 201 || response.status === 200) {
      setRedirect(true);

    } else if (response.status === 400) {
      const pickedMessage = responseData.errorMessages[0].msg;
      toastFire(pickedMessage);

    } else if (response.status === 401) {
      toastFire(response.message);
    }
  };

  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={AuthFormSchema}
      >
        {() => (
          <Form className="w-1/2 mx-auto">
            <h1 className="text-center font-semibold text-3xl my-4 text-teal-600">
              {isLogin ? "Login" : "Register"}
            </h1>

            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="username" className="font-large block pb-2">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg p-3"
                />
                <StyleErrorMsg name="username" />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="font-large block pb-2">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg p-3"
              />
              <StyleErrorMsg name="email" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="font-large block pb-2">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg p-3"
              />
              <StyleErrorMsg name="password" />
            </div>

            <button
              type="submit"
              className="text-white bg-teal-600 py-3 font-medium w-full text-center rounded"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
