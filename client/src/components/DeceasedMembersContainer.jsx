import { usAllDeceasedMembersContext } from '../pages/Necrology';
import { ComplexPaginationContainer } from '../components';

import Member from './Member';
import PageBtnContainer from './PageBtnContainer';
import DeceasedMember from './DeceasedMember';

const DeceasedMembersContainer = () => {
  const { data } = usAllDeceasedMembersContext();
  const {
    necrology,
    membersForAnnouncement,
    numOfPages,
    currentPage,
    totalMembers,
  } = data;

  if (necrology.length === 0)
    return (
      <>
        <h1 className='text-3xl'>
          Welcome delegate, There is no Members to display... please add
          members.
        </h1>
      </>
    );
  return (
    <>
      <h5 className='pb-2 text-2xl'>
        {totalMembers} member{necrology.length > 1 && 's'} found
      </h5>
      <ul className='grid grid-cols-1 gap-6  pb-4 '>
        {necrology.map((member) => {
          return <DeceasedMember key={member._id} {...member} />;
        })}
      </ul>
      {numOfPages > 1 && <ComplexPaginationContainer />}
      {}
    </>
  );
};
export default DeceasedMembersContainer;
