import Member from './Member';
import PageBtnContainer from './PageBtnContainer';
import { useAnnouncementContext } from '../pages/Announcement';
import { AnnouncementComplexPagination } from '../components';
import AnnouncementMember from './AnnouncementMember';

const AnnouncementMembersContainer = () => {
  const { data } = useAnnouncementContext();
  const {
    members,
    membersForAnnouncement,
    numOfPages2,
    currentPage,
    totalMembers2,
  } = data;

  if (membersForAnnouncement.length === 0)
    return (
      <>
        <h1 className='text-3xl'>
          Hey delegate, members need to be vested and deceased to receive
          benefits, please add vested and deceased members.
        </h1>
      </>
    );
  return (
    <>
      <h5 className='pb-2 text-2xl'>
        {membersForAnnouncement.length >= 1 && `There's `}
        {totalMembers2} vested and deceased member
        {membersForAnnouncement.length > 1 && 's'} found
      </h5>
      <ul className='grid grid-cols-1 gap-6 lg:grid-cols-2 pb-4 '>
        {membersForAnnouncement.map((member) => {
          return <AnnouncementMember key={member._id} {...member} />;
        })}
      </ul>
      {numOfPages2 > 1 && <AnnouncementComplexPagination />}
      {}
    </>
  );
};
export default AnnouncementMembersContainer;
