import { useAllMembersContext } from '../pages/AllMembers';
import { ComplexPaginationContainer } from '../components';

import Member from './Member';
import PageBtnContainer from './PageBtnContainer';

const MembersContainer = () => {
  const { data } = useAllMembersContext();
  const {
    members,
    membersForAnnouncement,
    numOfPages,
    currentPage,
    totalMembers,
  } = data;

  if (members.length === 0)
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
        {totalMembers} member{members.length > 1 && 's'} found
      </h5>
      <ul className='grid grid-cols-1 gap-6 lg:grid-cols-2 pb-4 '>
        {members.map((member) => {
          return <Member key={member._id} {...member} />;
        })}
      </ul>
      {numOfPages > 1 && <ComplexPaginationContainer />}
      {}
    </>
  );
};
export default MembersContainer;
