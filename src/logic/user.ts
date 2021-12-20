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
  if (user.campus_id) {
    return true;
  }
  return false;
};

export const validateNickname = async (nickname: string): Promise<boolean> => {
  const validateCharacterRegex = /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-z0-9]/; // 영어 소문자, 한글, 숫자가 아닌 다른 문자가 있는지 확인

  if (nickname.length > 8 || validateCharacterRegex.test(nickname)) {
    return false;
  }

  const res = await db_user.checkDuplicateNickname(nickname);
  return !res; // 중복된게 없다면 유효한 것
};

export const updateSignUpData = async (id: number, campusId: number, nickname: string): Promise<void> => {
  await db_user.updateSignUpData(id, campusId, nickname);
};
