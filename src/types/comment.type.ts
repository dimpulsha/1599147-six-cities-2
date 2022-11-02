import { UserType } from './user.type.js';

export type CommentType = {
  commentText: string;
  commentDateTime?: Date;
  rate: number;
  commentOwner?: UserType;
  offerId: string;
}
