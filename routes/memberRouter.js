import { Router } from 'express';
const router = Router();

import {
  getAllMembers,
  getMember,
  createMember,
  updateMember,
  showStats,
  createDeceasedMember,
  deleteMember,
} from '../controllers/memberController.js';
import {
  validateMemberInput,
  validateIdParam,
  validateDeadMemberInput,
} from '../middleware/validationMiddleware.js';

router.route('/').get(getAllMembers).post(validateMemberInput, createMember);

router.route('/stats').get(showStats);

router
  .route('/deadMembers')
  .post(validateDeadMemberInput, createDeceasedMember);

router
  .route('/:id')
  .get(validateIdParam, getMember)
  .patch(validateMemberInput, validateIdParam, updateMember);
// .delete(validateIdParam, deleteMember);

export default router;
