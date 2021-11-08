import express from 'express';
const router = express.Router();
import * as logic_post from '../../logic/post';
import { IPost } from '../../interface/interface';

router.post('/', async (req: any, res: any) => {
  const post: IPost = {
    campus_id: req.body.campus_id,
    title: req.body.title,
    contact: req.body.contact,
    deposit: req.body.deposit,
    monthly_rent: req.body.monthly_rent,
    service_fee: req.body.service_fee,
    electricity: req.body.electricity,
    water: req.body.water,
    gas: req.body.gas,
    contract_expire_date: req.body.contract_expire_date,
    move_in_date: req.body.move_in_date,
    address: req.body.address,
    is_address_visible: req.body.is_address_visible,
    address_detail: req.body.address_detail,
    total_floor: req.body.total_floor,
    current_floor: req.body.current_floor,
    building_type: req.body.building_type,
    room_type: req.body.room_type,
    window_side: req.body.window_side,
    walking_time: req.body.walking_time,
    bus_time: req.body.bus_time,
    content: req.body.content,
    post_status: req.body.post_status,
    created_at: req.body.created_at,
    option: req.body.option,
  };

  await logic_post.writePost(post);

  res.status(200).json({ message: 'SUCCESS' });
});

export default router;
