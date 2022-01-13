import pool from '.';
import { ICampus } from '../interface/interface';

export const getCampusListByName = async (name: string): Promise<ICampus[]> => {
  const res = await pool.query(`SELECT id, name, campus_name, address FROM CAMPUS WHERE name like '${name}%'`);
  return res.rows;
};

export const getCampusNameById = async (campusId: number): Promise<string> => {
  const res = await pool.query(`SELECT name FROM CAMPUS WHERE id = ${campusId}`);

  return res.rows[0]?.name; // only return one
};
