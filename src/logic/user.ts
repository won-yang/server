import * as db_user from '../db/user';
import { IUser } from '../interface/interface';

export const create = async (authId: string): Promise<void> => {
  await db_user.createUser(authId);
};

export const get = async (id: number): Promise<IUser> => {
  const user = await db_user.getUser(id);
  return user;
};

export const getByAuthId = async (authId: string): Promise<IUser> => {
  const user = await db_user.getUserByAuthId(authId);
  return user;
};

export const getOrCreate = async (authId: string): Promise<IUser> => {
  const user = await getByAuthId(authId);

  if (!user) {
    await create(authId);
    const resUser = await getByAuthId(authId);

    return resUser;
  }
  return user;
};

export const updateLastLogin = async (id: number): Promise<void> => {
  await db_user.updateLastLogin(id);
};

export const checkSignedUser = (user: IUser): boolean => {
  if (user.campusId) {
    return true;
  }
  return false;
};

export const updateSignUpData = async (id: number, campus_id: number, nickname: string): Promise<void> => {
  await db_user.updateSignUpData(id, campus_id, nickname);
};
