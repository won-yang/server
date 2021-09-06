import { ICampus } from '../interface/interface';
import * as db_campus from '../db/campus';

export const getCampusList = async (name: string): Promise<ICampus[]> => {
  const campus = await db_campus.getCampusListByName(name);
  return campus;
};

export const getCampusName = async (campusId: number): Promise<string> => {
  const campusName: string = await db_campus.getCampusNameById(campusId);

  return campusName;
};
