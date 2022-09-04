import React, { useEffect } from "react";
import { AppWrapper } from "../components/common/shared.style";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { login } from "../redux/actions/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <AppWrapper>
      <div>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => {
            dispatch(login(values));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="username" />
              <Field type="password" name="password" />
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </AppWrapper>
  );
};

export default Login;
