import pool from '.';
import { IUser } from '../interface/interface';

export const createUser = async (authId: string): Promise<void> => {
  await pool.query(
    `INSERT INTO USERS (auth_id, last_login) 
			VALUES ($1, current_timestamp)`,
    [authId],
  );
};

export const getUser = async (id: number): Promise<IUser> => {
  const res = await pool.query(`SELECT * FROM USERS WHERE id = $1`, [id]);
  return res.rows[0];
};

export const getUserByAuthId = async (authId: string): Promise<IUser> => {
  const res = await pool.query(`SELECT * FROM USERS WHERE auth_id = $1`, [authId]);
  return res.rows[0];
};

export const updateLastLogin = async (id: number): Promise<void> => {
  const nowTime = new Date();
  await pool.query(`UPDATE USERS SET last_login = $1 WHERE id = $2`, [nowTime, id]);
};

export const updateSignUpData = async (id: number, campusId: number, nickname: string): Promise<void> => {
  await pool.query(
    `UPDATE USERS SET campus_id = $1, nickname = $2
      WHERE id = $3`,
    [campusId, nickname, id],
  );
};

export const checkDuplicateNickname = async (nickname: string): Promise<boolean> => {
  const res = await pool.query(`SELECT EXISTS (SELECT 1 FROM USERS WHERE nickname = '${nickname}');`);
  return res.rows[0]?.exists;
};
