import { useEffect } from "react";
import { Formik, Form } from "formik";
import Input from "../../../components/Input/Input";
import { FormGroup, Button } from "reactstrap";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ILoginProps } from "../../../hooks/useOnLogin";

export interface ILoginFormProps {
  handleLogin(data: any): void;
  errorMessage: string;
}

const initialValues: ILoginProps = {
  username: "",
  password: "",
};

const validate = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = ({ handleLogin, errorMessage }: ILoginFormProps) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      {({ ...values }: ILoginProps) => (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Form data-testid="form">
              <h3>Sign In</h3>
              <FormGroup>
                <div className="form-group">
                  <label>Username</label>
                  <Input
                    data-testid="username"
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    placeholder="Username"
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <div className="form-group">
                  <label>Password</label>
                  <Input
                    data-testid="password"
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    placeholder="Password"
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </FormGroup>

              <Button
                data-testid="button"
                color="primary"
                role="button"
                type="submit"
              >
                Sign In
              </Button>
              <p className="forgot-password text-right">
                Forgot{" "}
                <span className="cursor-pointer text-decoration-underline font-weight-normal text-info">
                  password?
                </span>
              </p>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
