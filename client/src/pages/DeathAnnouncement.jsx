import { FormInput, SubmitBtn, FormDate, FormSelect } from '../components';
import { styled } from 'styled-components';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import {
  Form,
  useNavigation,
  redirect,
  useOutletContext,
  useLoaderData,
} from 'react-router-dom';
import {
  MEMBER_STATUS,
  DELEGATE_RECOMMENDATIONS,
} from '../../../utils/constants';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/members/${params.id}`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard');
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post(`/members/deadMembers`, data);
    // await customFetch.delete(`/members/${params.id}`);
    toast.success('death announced successfully');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const DeathAnnouncement = () => {
  const { member } = useLoaderData();
  const { user } = useOutletContext();

  return (
    <section className='h-full grid  place-items-center mt-20 '>
      <Form
        method='POST'
        className='card w-96 lg:w-full px-8 pb-20 pt-10 bg-base-100 shadow-lg flex flex-col gap-y-4 border-t-4  border-primary '
      >
        <h4 className='text-start text-3xl font-bold my-8 capitalize'>
          death announcement
        </h4>
        <div className='grid  lg:grid-cols-2 2xl:grid-cols-3 gap-4 '>
          {user.role === 'user' ? (
            <FormInput
              type='text'
              label='deceased member first name'
              name='deceasedFirstName'
              value={member.firstName}
              onChange={() => null}
            />
          ) : (
            <FormInput
              type='text'
              label='deceased member first name'
              name='deceasedFirstName'
              defaultValue={member.firstName}
              onChange={() => null}
            />
          )}
          {user.role === 'user' ? (
            <FormInput
              type='text'
              label='deceased member last and middle names'
              name='deceasedLastAndMiddleNames'
              value={member.lastAndMiddleNames}
              onChange={() => null}
            />
          ) : (
            <FormInput
              type='text'
              label='deceased member last and middle names'
              name='deceasedLastAndMiddleNames'
              defaultValue={member.lastAndMiddleNames}
              onChange={() => null}
            />
          )}
          {user.role === 'user' ? (
            <FormInput
              type='text'
              label='deceased member date of birth'
              name='deceasedDateOfBirth'
              value={member.dateOfBirth}
              onChange={() => null}
            />
          ) : (
            <FormInput
              type='text'
              label='deceased member date of birth'
              name='deceasedDateOfBirth'
              defaultValue={member.dateOfBirth}
              onChange={() => null}
            />
          )}
          {user.role === 'user' ? (
            <FormInput
              type='text'
              label='deceased member country of birth'
              name='deceasedCountryOfBirth'
              value={member.countryOfBirth}
              onChange={() => null}
            />
          ) : (
            <FormInput
              type='text'
              label='deceased member country of birth'
              name='deceasedCountryOfBirth'
              defaultValue={member.countryOfBirth}
              onChange={() => null}
            />
          )}
          {user.role === 'user' ? (
            <FormInput
              type='text'
              label='association name'
              name='deceasedAssociationName'
              value={member.associationName}
              onChange={() => null}
            />
          ) : (
            <FormInput
              type='text'
              label='association name'
              name='deceasedAssociationName'
              defaultValue={member.associationName}
              onChange={() => null}
            />
          )}
          {user.role === 'user' ? (
            <FormInput
              type='text'
              label='association code'
              name='deceasedAssociationCode'
              value={member.associationCode}
              onChange={() => null}
            />
          ) : (
            <FormInput
              type='text'
              label='association code'
              name='deceasedAssociationCode'
              defaultValue={member.associationCode}
              onChange={() => null}
            />
          )}

          {user.role === 'user' ? (
            <FormInput
              label='deceased registration date'
              name='deceasedRegistrationDate'
              value={member.createdAt}
              onChange={() => null}
            />
          ) : (
            <FormInput
              label='deceased registration date'
              name='deceasedRegistrationDate'
              defaultValue={member.createdAt}
              onChange={() => null}
            />
          )}
          {/* {user.role === 'user' ? (
            <FormInput
              label='member status'
              name='deceasedMemberStatus'
              value={member.memberStatus}
              onChange={() => null}
            />
          ) : (
            <FormSelect
              label='member status'
              name='deceasedMemberStatus'
              defaultValue={member.memberStatus}
              list={Object.values(MEMBER_STATUS)}
            />
          )} */}
          <FormInput
            label='member matriculation '
            name='deceasedMemberMatriculation'
            value={member.memberMatriculation}
            onChange={() => null}
          />
          {user.role === 'user' ? (
            <FormInput type='text' label='place of death' name='placeOfDeath' />
          ) : (
            <FormInput type='text' label='place of death' name='placeOfDeath' />
          )}
          <FormDate label='date of death' name='dateOfDeath' />
          <div className='mt-2'>
            <label className='block text-sm font-medium leading-6 capitalize'>
              brief comment(500 characters maximum)
            </label>
            <div className='mt-1'>
              <textarea
                className='textarea textarea-bordered textarea-xs  w-full bg-base-200'
                name='comment'
                required
                maxLength={500}
              ></textarea>
            </div>
          </div>

          <div className='mt-8'>
            <SubmitBtn text='submit' />
          </div>
        </div>
      </Form>
    </section>
  );
};
export default DeathAnnouncement;

// const DeathAnnouncement = () => {
//   return <h1 className='text-3xl'>Death Announcement</h1>
// }

// export default DeathAnnouncement
