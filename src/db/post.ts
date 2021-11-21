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
    to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at, option 
    FROM post
    WHERE id = ${postId}`);

    return post.rows[0]; // only return one
  } catch (err) {
    return err;
  }
};

export const writePost = async (post: IPost): Promise<number> => {
  const option = JSON.stringify(post.option);
  try {
    const resPost = await pool.query(
      `INSERT INTO POST (campus_id, title, contact, deposit, monthly_rent, service_fee, electricity, 
      water, gas, contract_expire_date, move_in_date, address, address_detail,
      is_address_visible, total_floor, current_floor, building_type, 
      room_type, window_side, walking_time, bus_time, content, created_at, post_status, option
      ) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
      RETURNING id`,
      [
        post.campus_id,
        post.title,
        post.contact,
        post.deposit,
        post.monthly_rent,
        post.service_fee,
        post.electricity,
        post.water,
        post.gas,
        post.contract_expire_date,
        post.move_in_date,
        post.address,
        post.address_detail,
        post.is_address_visible,
        post.total_floor,
        post.current_floor,
        post.building_type,
        post.room_type,
        post.window_side,
        post.walking_time,
        post.bus_time,
        post.content,
        post.created_at,
        post.post_status,
        option,
      ],
    );
    const postId = resPost.rows[0].id;

    return postId;
  } catch (err) {
    console.log(err);
    return err;
  }
};
