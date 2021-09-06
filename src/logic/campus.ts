import { ICampus } from '../interface/interface';
import * as campus_db from '../db/campus';

export const getCampusList = async (name: string): Promise<ICampus[]> => {
  const campus = await campus_db.getCampusListByName(name);
  return campus;
};
