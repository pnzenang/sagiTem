// import { useLoaderData, Link } from 'react-router-dom';
// import { customFetch } from '../utils';
// import { necrology } from '../../../controllers/authController';

export const loader = async ({ params }) => {
  // const response = await customFetch(`/auth/necrology/${params.id}`);
  return null;
};

const SingleNecrology = () => {
  // const { necrology } = useLoaderData();
  return <div>SingleNecrology</div>;
};
export default SingleNecrology;
