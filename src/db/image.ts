import pool from '.';
import { IImage } from '../interface/interface';

export const createImage = async (postId: number, imgUrls: string[]): Promise<void> => {
  const insertQuery = `INSERT INTO image (post_id, image_url) VALUES`;
  const values = imgUrls.map((imgUrl) => `('${postId}', '${imgUrl}')`);
  const valueQuery = `${values.join(',')};`;

  await pool.query(insertQuery + valueQuery);
};

export const getImagesByPostId = async (postId: number): Promise<IImage[]> => {
  const res = await pool.query(`SELECT * FROM image WHERE post_id = $1`, [postId]);
  return res.rows;
};
