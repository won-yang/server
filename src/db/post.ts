import pool from '.';
import { IPostBoardList } from '../interface/interface';
import { TPOST_STATUS } from '../interface/types';

const PAGE_SIZE = 5;

export const getPostForBoard = async (type: TPOST_STATUS | null = null, page: number, campusId: number): Promise<IPostBoardList[]> => {
  const offset = PAGE_SIZE * (page - 1) + 1;

  try {
    const res =
      type === null
        ? await pool.query(
            `SELECT p.id, p.title, p.deposit, p.monthly_rent, p.address, p.post_status, to_char(p.created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at, i.image_url 
          FROM post as p LEFT JOIN image as i ON p.id = i.post_id 
          WHERE p.campus_id = ${campusId}
          ORDER BY p.id DESC
          LIMIT ${PAGE_SIZE} OFFSET ${offset}`,
          )
        : await pool.query(`
        SELECT p.id, p.title, p.deposit, p.monthly_rent, p.address, p.post_status, to_char(p.created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at, i.image_url 
        FROM post as p LEFT JOIN image as i ON p.id = i.post_id 
        WHERE p.post_status = '${type}' AND p.campus_id = ${campusId}
        ORDER BY p.id DESC
        LIMIT ${PAGE_SIZE} OFFSET ${offset}`);
    return res.rows;
  } catch (err) {
    return err;
  }
};

export const getPostInfo = async (postId: number): Promise<IPostBoardList[]> => {
  try {
    const res =
      type === null
        ? await pool.query(
            `SELECT p.id, p.title, p.deposit, p.monthly_rent, p.address, p.post_status, to_char(p.created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at, i.image_url 
          FROM post as p LEFT JOIN image as i ON p.id = i.post_id 
          WHERE p.campus_id = ${campusId}
          ORDER BY p.id DESC
          LIMIT ${PAGE_SIZE} OFFSET ${offset}`,
          )
        : await pool.query(`
        SELECT p.id, p.title, p.deposit, p.monthly_rent, p.address, p.post_status, to_char(p.created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at, i.image_url 
        FROM post as p LEFT JOIN image as i ON p.id = i.post_id 
        WHERE p.post_status = '${type}' AND p.campus_id = ${campusId}
        ORDER BY p.id DESC
        LIMIT ${PAGE_SIZE} OFFSET ${offset}`);
    return res.rows;
  } catch (err) {
    return err;
  }
};
