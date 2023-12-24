import {
  FormInput,
  SubmitBtn,
  FormDate,
  FormSelect,
  FormInput2,
  FormInput3,
} from '../components';
import { styled } from 'styled-components';

import {
  Form,
  useNavigation,
  redirect,
  useOutletContext,
} from 'react-router-dom';
import {
  MEMBER_STATUS,
  DELEGATE_RECOMMENDATIONS,
} from '../../../utils/constants';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/members', data);
    toast.success('Member added successfully');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddMembers = () => {
  const { user } = useOutletContext();
  return (
    <section className='h-full w-full  place-items-center mt-20 '>
      <Form
        method='POST'
        className='card w-full lg:w-full px-8 pb-20 pt-10 bg-base-100 shadow-lg flex flex-col gap-y-4 border-t-4  border-primary '
      >
        <h4 className='text-start text-3xl font-bold my-8 capitalize '>
          add member
        </h4>
        <div className='grid  lg:grid-cols-2 2xl:grid-cols-3 gap-4 '>
          <FormInput3 type='text' label='member first name' name='firstName' />
          <FormInput
            type='text'
            label='member last and middle names'
            name='lastAndMiddleNames'
          />
          <FormDate name='dateOfBirth' label='member date of birth' />
          <FormInput
            type='text'
            label='member country of birth'
            name='countryOfBirth'
          />
          <FormInput
            type='text'
            label='association name'
            name='associationName'
            value={user.associationName}
            onChange={() => null}
          />
          <FormInput2
            type='text'
            label='association code'
            name='associationCode'
            value={user.associationCode}
            onChange={() => null}
          />

          {/* <FormInput type="Date" label="date of Birth" name="dateOfBirth" /> */}

          {user.role === 'user' ? (
            <FormSelect
              label='delegate recommendation'
              name='delegateRecommendation'
              defaultValue={DELEGATE_RECOMMENDATIONS.CONFIRM}
              list={Object.values(DELEGATE_RECOMMENDATIONS)}
            />
          ) : (
            <FormSelect
              label='delegate recommendation'
              name='delegateRecommendation'
              defaultValue={DELEGATE_RECOMMENDATIONS.CONFIRM}
              list={[DELEGATE_RECOMMENDATIONS.CONFIRM]}
            />
          )}
          {user.role === 'user' ? (
            <FormSelect
              label='member status'
              name='memberStatus'
              defaultValue={MEMBER_STATUS.PENDING}
              list={[MEMBER_STATUS.PENDING]}
            />
          ) : (
            <FormSelect
              label='member status'
              name='memberStatus'
              defaultValue={MEMBER_STATUS.PENDING}
              list={Object.values(MEMBER_STATUS)}
            />
          )}
          <div className='mt-9'>
            <SubmitBtn text='submit' />
          </div>
        </div>
      </Form>
    </section>
  );
};
const Wrapper = styled.section``;
export default AddMembers;
