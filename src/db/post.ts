import pool from '.';
import { IPostBoardList, IPost } from '../interface/interface';
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

export const getPostInfo = async (postId: number): Promise<IPost> => {
  try {
    const post = await pool.query(`
    SELECT id, title, contact, deposit, monthly_rent, 
    service_fee, electricity, water, gas, 
    to_char(contract_expire_date, 'YYYY-MM-DD') as contract_expire_date,
    to_char(move_in_date, 'YYYY-MM-DD') as move_in_date,
    address, address_detail, is_address_visible, total_floor, current_floor, 
    building_type, room_type, window_side, walking_time, bus_time, content, post_status,
    to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at 
    FROM post
    WHERE id = ${postId}`);

    const option = await pool.query(`
    SELECT name
    FROM option as o JOIN postoption as po ON o.id = po.option_id 
    WHERE po.post_id = ${postId}`);

    const optionList = option.rows.map((obj) => {
      return obj.name;
    });
    const res: IPost = {
      ...post.rows[0],
      option: optionList,
    };

    return res; // only return one
  } catch (err) {
    return err;
  }
};
