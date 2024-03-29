import { Request, Response } from 'express';
import * as types from './types';

export interface IJwtData {
  id: number;
}

export interface IUser {
  id: number;
  auth_id: string;
  nickname: string;
  campus_id: number;
  last_login: number;
}

export interface ICampus {
  id: number;
  name: string;
}

export interface IPost {
  campus_id: number;
  title: string;
  contact: string;
  deposit: number;
  monthly_rent: number;
  service_fee: number;
  electricity: boolean;
  water: boolean;
  gas: boolean;
  contract_expire_date: string;
  move_in_date: string;
  address: string;
  is_address_visible: boolean;
  address_detail: string;
  total_floor: number;
  current_floor: number;
  building_type: types.TBUILDING;
  room_type: types.TROOM;
  window_side: types.TWINDOW_SIDE;
  walking_time: number;
  bus_time: number;
  content: string;
  post_status: types.TPOST_STATUS;
  created_at?: string;
  option: number[];
  images: string[];
}

export interface IUpdatePost extends Omit<IPost, 'campus_id'> {
  id: number;
}

export interface IImage {
  id: number;
  post_id: number;
  image_url: string;
}

export interface IImageId {
  id: number;
}

export interface IPostBoardForClient {
  total_post: number;
  post: IPostBoardList[];
}

export interface IPostBoardList {
  id: number;
  image_url: string;
  title: string;
  deposit: number;
  monthly_rent: number;
  address: string;
  created_at: string;
  post_status: types.TPOST_STATUS;
}

export interface IUserRequest extends CustomRequest<IUser> {}

interface CustomRequest<T> extends Request {
  body: T;
}

export interface IRequest<T> {
  headers: any;
  sessionID: string;
  body: T;
  session: any;
  params: any;
  query: any;
  ip: string;
  app: any;
}
