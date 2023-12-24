import { toast } from 'react-toastify';
import { MembersContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { createContext, useContext } from 'react';

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get('/members', {
      params,
    });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllMembersContext = createContext();

const AllMembers = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllMembersContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <MembersContainer />
    </AllMembersContext.Provider>
  );
};
export const useAllMembersContext = () => useContext(AllMembersContext);
export default AllMembers;
