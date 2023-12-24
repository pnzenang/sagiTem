import { toast } from 'react-toastify';
import { AdminAllMembersContainer, AdminSearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData, redirect } from 'react-router-dom';
import { createContext, useContext } from 'react';

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get('/users/admin/all-members-admin', {
      params,
    });

    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard');
  }
};

const AdminAllMembersContext = createContext();

const AdminAllMembers = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AdminAllMembersContext.Provider value={{ data, searchValues }}>
      <AdminSearchContainer />
      <AdminAllMembersContainer />
    </AdminAllMembersContext.Provider>
  );
};
export const useAdminAllMembersContext = () =>
  useContext(AdminAllMembersContext);
export default AdminAllMembers;
