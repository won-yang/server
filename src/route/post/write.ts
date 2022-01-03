import express from 'express';
import { IUpdatePost } from './../../interface/interface';
import * as logic_post from '../../logic/post';
import { IPost } from '../../interface/interface';
import { getCurrentTimeYYMMDDWithTime } from '../../util/utils';
import CustomError from '../../interface/error';

const router = express.Router();

const validatePostArgument = (post: IPost) => {
  if (!post.campus_id) throw new CustomError('campus_id가 존재하지 않습니다.');
  if (!post.title) throw new CustomError('title 존재하지 않습니다.');
  if (!post.contact) throw new CustomError('contact가 존재하지 않습니다.');
  if (!post.deposit) throw new CustomError('deposit가 존재하지 않습니다.');
  if (!post.monthly_rent) throw new CustomError('monthly_rent가 존재하지 않습니다.');
  if (!post.service_fee) throw new CustomError('service_fee가 존재하지 않습니다.');
  if (!post.electricity) throw new CustomError('electricity가 존재하지 않습니다.');
  if (!post.water) throw new CustomError('water가 존재하지 않습니다.');
  if (!post.gas) throw new CustomError('gas가 존재하지 않습니다.');
  if (!post.contract_expire_date) throw new CustomError('contract_expire_date가 존재하지 않습니다.');
  if (!post.move_in_date) throw new CustomError('move_in_date가 존재하지 않습니다.');
  if (!post.address) throw new CustomError('address가 존재하지 않습니다.');
  if (!post.is_address_visible) throw new CustomError('is_address_visible가 존재하지 않습니다.');
  if (!post.address_detail) throw new CustomError('address_detail가 존재하지 않습니다.');
  if (!post.total_floor) throw new CustomError('total_floor가 존재하지 않습니다.');
  if (!post.current_floor) throw new CustomError('current_floor가 존재하지 않습니다.');
  if (!post.building_type) throw new CustomError('building_type가 존재하지 않습니다.');
  if (!post.room_type) throw new CustomError('room_type가 존재하지 않습니다.');
  if (!post.window_side) throw new CustomError('window_side가 존재하지 않습니다.');
  if (!post.walking_time) throw new CustomError('walking_time가 존재하지 않습니다.');
  if (!post.bus_time) throw new CustomError('bus_time가 존재하지 않습니다.');
  if (!post.content) throw new CustomError('content가 존재하지 않습니다.');
  if (!post.post_status) throw new CustomError('post_status가 존재하지 않습니다.');
  if (!post.created_at) throw new CustomError('created_at가 존재하지 않습니다.');
  if (!post.option) throw new CustomError('option가 존재하지 않습니다.');
  if (!post.images) throw new CustomError('images가 존재하지 않습니다.');
};

router.post('/', async (req: any, res: any, next) => {
  try {
    const createdAt = getCurrentTimeYYMMDDWithTime();
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
      created_at: createdAt,
      option: req.body.option,
      images: req.body.images,
    };

    validatePostArgument(post);
    await logic_post.writePost(post);

    res.status(200).json({ message: 'SUCCESS' });
  } catch (err) {
    next(err);
  }
});

const validateUpdatePostArgument = (post: IUpdatePost) => {
  if (!post.id) throw new CustomError('id가 존재하지 않습니다.');
  if (!post.title) throw new CustomError('title 존재하지 않습니다.');
  if (!post.contact) throw new CustomError('contact가 존재하지 않습니다.');
  if (!post.deposit) throw new CustomError('deposit가 존재하지 않습니다.');
  if (!post.monthly_rent) throw new CustomError('monthly_rent가 존재하지 않습니다.');
  if (!post.service_fee) throw new CustomError('service_fee가 존재하지 않습니다.');
  if (!post.electricity) throw new CustomError('electricity가 존재하지 않습니다.');
  if (!post.water) throw new CustomError('water가 존재하지 않습니다.');
  if (!post.gas) throw new CustomError('gas가 존재하지 않습니다.');
  if (!post.contract_expire_date) throw new CustomError('contract_expire_date가 존재하지 않습니다.');
  if (!post.move_in_date) throw new CustomError('move_in_date가 존재하지 않습니다.');
  if (!post.address) throw new CustomError('address가 존재하지 않습니다.');
  if (!post.is_address_visible) throw new CustomError('is_address_visible가 존재하지 않습니다.');
  if (!post.address_detail) throw new CustomError('address_detail가 존재하지 않습니다.');
  if (!post.total_floor) throw new CustomError('total_floor가 존재하지 않습니다.');
  if (!post.current_floor) throw new CustomError('current_floor가 존재하지 않습니다.');
  if (!post.building_type) throw new CustomError('building_type가 존재하지 않습니다.');
  if (!post.room_type) throw new CustomError('room_type가 존재하지 않습니다.');
  if (!post.window_side) throw new CustomError('window_side가 존재하지 않습니다.');
  if (!post.walking_time) throw new CustomError('walking_time가 존재하지 않습니다.');
  if (!post.bus_time) throw new CustomError('bus_time가 존재하지 않습니다.');
  if (!post.content) throw new CustomError('content가 존재하지 않습니다.');
  if (!post.post_status) throw new CustomError('post_status가 존재하지 않습니다.');
  if (!post.created_at) throw new CustomError('created_at가 존재하지 않습니다.');
  if (!post.option) throw new CustomError('option가 존재하지 않습니다.');
  if (!post.images) throw new CustomError('images가 존재하지 않습니다.');
};

router.put('/:id', async (req: any, res: any, next) => {
  try {
    const id = req.params.id as number;
    const post: IUpdatePost = {
      id,
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
      option: req.body.option,
      images: req.body.images,
    };

    validateUpdatePostArgument(post);
    await logic_post.updatePost(post);

    res.status(200).json({ message: 'SUCCESS' });
  } catch (err) {
    next(err);
  }
});

export default router;
