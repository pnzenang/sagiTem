import {
  FormInput,
  SubmitBtn,
  FormInput2,
  FormInputs,
  FormInput3,
} from '../components';
import { Form, redirect, Link } from 'react-router-dom';
import FormPhone from '../components/FormPhone';
import Logo from '../components/Logo';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    console.log(error);
    return error;
  }
};

const Register = () => {
  return (
    <section className='h-full grid  place-items-center mt-6'>
      <Form
        method='POST'
        className='card w-96 lg:w-2/5 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 border-t-4 '
      >
        <Logo />
        <h4 className='text-center text-3xl font-bold mt-4'>Register</h4>
        <div className='grid lg:grid-cols-2 gap-4 '>
          <FormInput3
            type='text'
            label='Delegate first name'
            name='firstName'
          />
          <FormInput
            type='text'
            label='last and middle names'
            name='lastAndMiddleNames'
          />
        </div>
        <div className='grid lg:grid-cols-2 gap-4 '>
          <FormInputs type='email' label='email' name='email' />
          <FormPhone type='text' label='phone number' name='phoneNumber' />
        </div>

        <FormInput
          type='text'
          label="association's name"
          name='associationName'
        />
        <FormInput2
          type='text'
          label="4-letter association's code"
          name='associationCode'
        />
        <FormInput type='text' label='street address' name='streetAddress' />
        <div className='grid lg:grid-cols-3 gap-4 '>
          <FormInput type='text' label='city' name='city' />
          <FormInput type='text' label='state' name='state' />
          <FormInput type='text' label='zip code' name='zipCode' />
        </div>

        <div className=' grid lg:grid-cols-2 gap-4'>
          <FormInput type='password' label='password' name='password' />
          <div className='mt-9'>
            <SubmitBtn text='register' />
          </div>
        </div>
        <p className='text-center '>
          Already a member?
          <Link
            to='/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
