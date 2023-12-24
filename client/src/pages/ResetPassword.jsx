import { FormInput, SubmitBtn } from "../components";
import { Form, Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Logo />
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 border-t-4  border-primary"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
          <p className="text-center mt-4">
            Not a member yet?
            <Link
              to="/register"
              className="ml-2 link link-hover link-primary capitalize"
            >
              register
            </Link>
          </p>
          <p className="text-center mt-4">
            Forgot password?
            <Link
              to="/register"
              className="ml-2 link link-hover link-primary capitalize"
            >
              reset
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
};
export default ResetPassword;
