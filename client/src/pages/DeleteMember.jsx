import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import {
  Form,
  useNavigation,
  redirect,
  useOutletContext,
  useLoaderData,
  useParams,
} from "react-router-dom";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/members/${params.id}`);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-members-admin");
  }
};
export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/users/admin/delete-member/${params.id}`);
    toast.success("Member removed successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard/all-members-admin");
};
