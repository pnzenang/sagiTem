import { FormInput, SubmitBtn } from "../components";
import { Form, Link } from "react-router-dom";
import Logo from "../components/Logo";

const ForgotPassword = () => {
  return (
    <section className="h-screen grid place-items-center ">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 border-t-4  border-primary"
      >
        <Logo />
        <h4 className="text-center text-3xl font-bold mt-4">Forgot Password</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />

        <div className="mt-4">
          <SubmitBtn text="submit" />
          <p className="text-center mt-4">
            Not a member yet?
            <Link
              to="/register"
              className="ml-2 link link-hover link-primary capitalize"
            >
              register
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
};
export default ForgotPassword;
