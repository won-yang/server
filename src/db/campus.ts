import pool from '.';
import { ICampus } from '../interface/interface';

export const getCampusListByName = async (name: string): Promise<ICampus[]> => {
  try {
    const res = await pool.query(`SELECT id, name, campus_name, address FROM CAMPUS WHERE name like '${name}%'`);
    return res.rows;
  } catch (err) {
    return err;
  }
};
