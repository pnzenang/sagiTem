import { toast } from 'react-toastify';
import {
  DeceasedMembersContainer,
  DeceasedMembersSearchContainer,
} from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { createContext, useContext } from 'react';

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get('/auth/necrology', {
      params,
    });
    console.log(data);
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllDeceasedMembersContext = createContext();

const Necrology = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllDeceasedMembersContext.Provider value={{ data, searchValues }}>
      <DeceasedMembersSearchContainer />
      <DeceasedMembersContainer />
    </AllDeceasedMembersContext.Provider>
  );
};
export const usAllDeceasedMembersContext = () =>
  useContext(AllDeceasedMembersContext);
export default Necrology;
