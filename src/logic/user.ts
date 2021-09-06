import * as user_db from '../db/user';
import { IUser } from '../interface/interface';

export const create = async (authId: string): Promise<void> => {
  await user_db.createUser(authId);
};

export const get = async (id: number): Promise<IUser> => {
  const user = await user_db.getUser(id);
  return user;
};

export const getByAuthId = async (authId: string): Promise<IUser> => {
  const user = await user_db.getUserByAuthId(authId);
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

export const updateLastLogin = async (id: number): Promise<boolean> => {
  await user_db.updateLastLogin(id);
  return true;
};

export const checkSignedUser = (user: IUser): boolean => {
  if (user.campusId) {
    return true;
  }
  return false;
};
