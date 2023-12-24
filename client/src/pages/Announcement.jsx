import { toast } from 'react-toastify';
import {
  AnnouncementSearchContainer,
  MembersContainer,
  SearchContainer,
} from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { createContext, useContext } from 'react';
import AnnouncementMembersContainer from '../components/AnnouncementMembersContainer';

export const loader = async ({ request }) => {
  console.log(request.url);
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
const AnnouncementContext = createContext();

const Announcement = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AnnouncementContext.Provider value={{ data, searchValues }}>
      <h2 className='text-primary text-center md:text-xl'>
        Delegate, please: click on the button "announce dead" in the deceased
        member's card to announce the death. may his or her soul rest in peace.
      </h2>
      <AnnouncementSearchContainer />
      <AnnouncementMembersContainer />
    </AnnouncementContext.Provider>
  );
};
export const useAnnouncementContext = () => useContext(AnnouncementContext);
export default Announcement;
