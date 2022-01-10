import { IUpdatePost, IPostBoardList, IPost } from './../interface/interface';
import pool from '.';
import { TPOST_STATUS } from '../interface/types';
import { isNullOrUndefined } from '../util/utils';

const PAGE_SIZE = 10;
const DEFAULT_IMAGE_URL = 'https://wonyang-image.s3.ap-northeast-2.amazonaws.com/thumbnail.png';

export const getPostForBoard = async (
  type: TPOST_STATUS | null = null,
  page: number,
  campusId: number,
): Promise<{ total_post: number; post: IPostBoardList[] }> => {
  const offset = PAGE_SIZE * (page - 1) + 1;

  try {
    const resTotalPostNum = await pool.query(
      `SELECT COUNT(*)
      FROM post
      WHERE campus_id = ${campusId}`,
    );

    const resPost =
      type === null
        ? await pool.query(
            `SELECT id, title, deposit, monthly_rent, address, post_status, to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at, images
          FROM post
          WHERE campus_id = ${campusId}
          ORDER BY id DESC
          LIMIT ${PAGE_SIZE} OFFSET ${offset}`,
          )
        : await pool.query(`
        SELECT id, title, deposit, monthly_rent, address, post_status, to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at, images
        FROM post
        WHERE post_status = '${type}' AND campus_id = ${campusId}
        ORDER BY id DESC
        LIMIT ${PAGE_SIZE} OFFSET ${offset}`);

    const posts = resPost.rows.map((row) => {
      return {
        ...row,
        image_url: resPost.rows?.images ? JSON.parse(resPost.rows?.images[0]) : DEFAULT_IMAGE_URL,
      };
    });

    return { total_post: Number(resTotalPostNum?.rows[0].count ?? 0), post: posts };
  } catch (err) {
    return err;
  }
};

export const getPostInfo = async (postId: number): Promise<IPost> => {
  try {
    const resPost = await pool.query(
      `SELECT id, title, contact, deposit, monthly_rent,
    service_fee, electricity, water, gas,
    to_char(contract_expire_date, 'YYYY-MM-DD') as contract_expire_date,
    to_char(move_in_date, 'YYYY-MM-DD') as move_in_date,
    address, address_detail, is_address_visible, total_floor, current_floor,
    building_type, room_type, window_side, walking_time, bus_time, content, post_status,
    to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at, option, images
    FROM post
    WHERE id = $1`,
      [postId],
    );

    const res = {
      ...resPost.rows[0],
      images: JSON.parse(resPost.rows[0].images),
      option: JSON.parse(resPost.rows[0].option),
    };

    return res;
  } catch (err) {
    return err;
  }
};

export const writePost = async (post: IPost): Promise<void> => {
  const option = JSON.stringify(post.option);
  const images = isNullOrUndefined(post.images) ? '[]' : JSON.stringify(post.images);
  const postStatus = isNullOrUndefined(post.post_status) ? 'IN_PROGRESS' : post.post_status;

  try {
    await pool.query(
      `INSERT INTO POST (campus_id, title, contact, deposit, monthly_rent, service_fee, electricity,
      water, gas, contract_expire_date, move_in_date, address, address_detail,
      is_address_visible, total_floor, current_floor, building_type,
      room_type, window_side, walking_time, bus_time, content, created_at, post_status, option, images
      ) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)`,
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
        postStatus,
        option,
        images,
      ],
    );
  } catch (err) {
    console.log(err);
    //return err;
  }
};

export const updatePost = async (post: IUpdatePost): Promise<void> => {
  const option = JSON.stringify(post.option);
  const images = isNullOrUndefined(post.images) ? JSON.stringify(post.images) : '[]';

  await pool.query(
    `UPDATE POST SET
      title = $1,
      contact = $2,
      deposit = $3,
      monthly_rent = $4,
      service_fee = $5,
      electricity = $6,
      water = $7,
      gas = $8,
      contract_expire_date = $9,
      move_in_date = $10,
      address = $11,
      address_detail = $12,
      is_address_visible = $13,
      total_floor = $14,
      current_floor = $15,
      building_type = $16,
      room_type = $17,
      window_side = $18,
      walking_time = $19,
      bus_time = $20,
      content = $21,
      post_status = $22,
      option = $23,
      images = $24
    WHERE
      id = $25
    `,
    [
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
      post.post_status,
      option,
      images,
      post.id,
    ],
  );
};

export const deletePost = async (postId: number): Promise<boolean> => {
  const res = await pool.query(`DELETE FROM POST WHERE id = $1`, [postId]);
  if (res?.rowCount < 1) return false;
  return true;
};
