import { Request, Response } from 'express';
import * as types from './types';

export interface IJwtData {
  id: number;
  data: string;
}

export interface IUser {
  id: number;
  authId: string;
  nickname: string;
  campusId: number;
  lastLogin: number;
}

export interface ICampus {
  id: number;
  name: string;
}

export interface IPost {
  id: number;
  title: string;
  contact: string;
  deposit: number;
  monthly_rent: number;
  service_fee: number;
  electricity: boolean;
  water: boolean;
  gas: boolean;
  end_at: number;
  start_at: number;
  address: string;
  address_detail: string;
  address_private: boolean;
  total_floor: number;
  current_floor: number;
  building_type: types.TBUILDING;
  room_type: types.TROOM;
  window_side: types.TWINDOW_SIDE;
  walking_time: number;
  bus_time: number;
  content: string;
  is_private: boolean;
  post_status: types.TPOST_STATUS;
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

export interface IAwsUploadObject {
  uploadURL: string;
  key: string;
}
