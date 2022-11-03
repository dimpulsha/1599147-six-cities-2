import { User } from './user.type.js';

export type CommentType = {
  commentText: string;
  commentDateTime?: Date;
  rate: number;
  commentOwner?: User;
  offerId: string;
}
