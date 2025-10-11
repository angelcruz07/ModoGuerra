import { createUpdateComment } from "./createUpdateComment.action";
import { deleteComment } from "./deleteComment.action";
import { getCommentsByPostId } from "./getCommentsByPostId.action";
import { getComments } from "./getComments.action";

export const comment = {
  createUpdateComment,
  deleteComment,
  getCommentsByPostId,
  getComments,
};

