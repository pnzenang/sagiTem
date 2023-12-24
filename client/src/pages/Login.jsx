import { FormInput, FormInput2, FormInputs, SubmitBtn } from '../components';
import { Form, redirect, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/login', data);
    toast.success('login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    console.log(error);
    return error;
  }
};

const Login = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='post'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 border-t-4  border-primary'
      >
        <Logo />
        <h4 className='text-center text-3xl font-bold mt-4 '>Login</h4>
        <FormInputs type='email' label='email' name='email' />
        <FormInputs type='password' label='password' name='password' />
        <div className='mt-4'>
          <SubmitBtn text='login' />
          <p className='text-center mt-4'>
            Not a member yet?
            <Link
              to='/register'
              className='ml-2 link link-hover link-primary capitalize'
            >
              register
            </Link>
          </p>
          <p className='text-center mt-4'>
            Forgot password?
            <Link
              to='/forgot'
              className='ml-2 link link-hover link-success capitalize'
            >
              reset
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
};
export default Login;
