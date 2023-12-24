import { useAdminAllMembersContext } from '../pages/AdminAllMembers';
import { AdminComplexPaginationContainer } from '../components';
import Member from './Member';

const AdminAllMembersContainer = () => {
  const { data } = useAdminAllMembersContext();
  const { adminMembers, numOfPages, currentPage, totalMembers } = data;

  if (adminMembers.length === 0)
    return (
      <>
        <h1 className='text-3xl'>No Members to display...</h1>
      </>
    );
  return (
    <>
      <h5 className='pb-2 text-2xl'>
        {totalMembers} member{adminMembers.length > 1 && 's'} found
      </h5>
      <ul className='grid grid-cols-1 gap-6 lg:grid-cols-2 '>
        {adminMembers.map((member) => {
          return <Member key={member._id} {...member} />;
        })}
      </ul>
      {numOfPages > 1 && <AdminComplexPaginationContainer />}
    </>
  );
};
export default AdminAllMembersContainer;
