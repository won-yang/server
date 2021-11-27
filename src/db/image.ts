import pool from '.';
import { IImage, IImageId } from '../interface/interface';

export const createImage = async (imgUrls: string[], postId: number): Promise<IImageId[]> => {
  const insertQuery = `INSERT INTO image (post_id, image_url) VALUES`;
  const values = imgUrls.map((imgUrl) => `(${postId}, '${imgUrl}')`);
  const valueQuery = `${values.join(',')}`;
  const optionQuery = 'RETURNING id;';
  const res = await pool.query(insertQuery + valueQuery + optionQuery);
  return res.rows;
};

export const getImagesByPostId = async (postId: number): Promise<IImage[]> => {
  const res = await pool.query(`SELECT * FROM image WHERE post_id = $1`, [postId]);
  return res.rows;
};
