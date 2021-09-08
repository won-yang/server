import pool from '.';
import { IUser } from '../interface/interface';

export const createUser = async (authId: string): Promise<void> => {
  try {
    await pool.query(
      `INSERT INTO USERS (auth_id, last_login) 
			VALUES ($1, current_timestamp)`,
      [authId],
    );
  } catch (err) {
    throw new Error(err);
  }
};

export const getUser = async (id: number): Promise<IUser> => {
  try {
    const res = await pool.query(`SELECT * FROM USERS WHERE id = $1`, [id]);
    return res.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserByAuthId = async (authId: string): Promise<IUser> => {
  try {
    const res = await pool.query(`SELECT * FROM USERS WHERE auth_id = $1`, [authId]);
    return res.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

export const updateLastLogin = async (id: number): Promise<void> => {
  try {
    const nowTime = new Date();
    await pool.query(`UPDATE USERS SET last_login = $1 WHERE id = $2`, [nowTime, id]);
  } catch (err) {
    throw new Error(err);
  }
};

export const updateSignUpData = async (id: number, campus_id: number, nickname: string): Promise<void> => {
  try {
    await pool.query(
      `UPDATE USERS SET campus_id = $1, nickname = $2
      WHERE id = $3`,
      [campus_id, nickname, id],
    );
  } catch (err) {
    throw new Error(err);
  }
};
