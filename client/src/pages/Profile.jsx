import { FormInput, SubmitBtn, FormInputs } from '../components';
import { useOutletContext, useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import FormPhone from '../components/FormPhone';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  if (file && file.size > 500000) {
    toast.error('Image size too large');
    return null;
  }
  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('proflie updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  return (
    <section className='h-full grid  place-items-center mt-6 '>
      <Form
        method='POST'
        className='card w-full  px-8 pb-20 pt-10 bg-base-100 shadow-lg flex flex-col gap-y-4 border-t-4  border-primary '
        encType='multipart/form-data'
      >
        <h4 className='text-start text-3xl font-bold my-8 capitalize '>
          delegate profile
        </h4>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 py-6  '>
          {/* <div className='form-control '>
            <label className='label ' htmlFor='avatar'>
              Select an image file (max 0.5 MB)
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className={`bg-base-200 text-lg  capitalize input input-bordered pt-2 `}
              accept='image/*'
            />
          </div> */}
          <FormInput
            type='text'
            label='association name'
            name='associationName'
            value={user.associationName}
            onChange={() => null}
          />
          <FormInput
            type='text'
            label='association code'
            name='associationCode'
            value={user.associationCode}
            onChange={() => null}
          />
          <FormInput
            type='text'
            label='firstName'
            name='firstName'
            defaultValue={user.firstName}
            onChange={() => null}
          />
          <FormInput
            type='text'
            label='last and middle names'
            name='lastAndMiddleNames'
            defaultValue={user.lastAndMiddleNames}
            onChange={() => null}
          />

          <FormInputs
            type='email'
            label='email'
            name='email'
            defaultValue={user.email}
            onChange={() => null}
          />

          <FormInput
            type='tel'
            label='phone number'
            name='phoneNumber'
            defaultValue={user.phoneNumber}
            onChange={() => null}
          />

          <FormInput
            type='text'
            label='street address'
            name='streetAddress'
            defaultValue={user.streetAddress}
            onChange={() => null}
          />

          <FormInput
            type='text'
            label='city'
            name='city'
            defaultValue={user.city}
            onChange={() => null}
          />
          <FormInput
            type='text'
            label='state'
            name='state'
            defaultValue={user.state}
            onChange={() => null}
          />
          <FormInput
            type='text'
            label='zip code'
            name='zipCode'
            defaultValue={user.zipCode}
            onChange={() => null}
          />

          <div className='mt-9'>
            <SubmitBtn text='submit' />
          </div>
        </div>
      </Form>
    </section>
  );
};
export default Profile;
