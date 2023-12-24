import { Router } from "express";
import {
  getCurrentUser,
  getRegistrationStats,
  adminGetAllMembers,
  updateUser,
  adminUpdateMember,
  deleteMember,
} from "../controllers/userController.js";
import {
  validateUpdateUserInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getRegistrationStats,
]);
router.get("/admin/all-members-admin", [
  authorizePermissions("admin"),
  adminGetAllMembers,
]);
router.patch("/admin/admin-edit-member/:id", [
  authorizePermissions("admin"),
  validateIdParam,
  adminUpdateMember,
]);
router.delete("/admin/delete-member/:id", [
  authorizePermissions("admin"),
  deleteMember,
]);
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
