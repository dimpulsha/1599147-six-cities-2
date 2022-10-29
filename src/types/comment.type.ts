import { User } from './user.type.js';

export type Comment = {
  commentText: string;
  commentDateTime?: Date;
  rate: number;
  commentOwner?: User;
  offerId: string;
}
