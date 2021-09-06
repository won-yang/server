type TValues<T> = T[keyof T];

export const POST_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS', //진행중
  EXPIRED: 'EXPIRED', //계약완료
  CONTRACTED: 'CONTRACTED', //만료
} as const;
export type TPOST_STATUS = TValues<typeof POST_STATUS>;

export const WINDOW_SIDE = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST',
} as const;
export type TWINDOW_SIDE = TValues<typeof WINDOW_SIDE>;

export const ROOM_TYPE = {
  STUDIO_WITH_SEPERATION: 'STUDIO_WITH_SEPERATION', // 분리형 원룸
  STUDIO: 'STUDIO', //일체형 원룸
  LOFT: 'LOFT', //복층 원룸
  TWO_BEDROOM: 'TWO_BEDROOM', //투룸
  THREE_BEDROOM: 'THREE_BEDROOM', // 쓰리룸
  ETC: 'ETC', //기타
} as const;
export type TROOM = TValues<typeof ROOM_TYPE>;

export const BUILDING_TYPE = {
  APARTMENT: 'APARTMENT', // 아파트
  DETACHED_HOUSE: 'DETACHED_HOUSE', //단독주택
  ROW_HOUSE: 'ROW_HOUSE', //다세대주택
  VILLA: 'VILLA', //빌라
  OFFICETEL: 'OFFICETEL', //오피스텔
  ETC: 'ETC', //기타
} as const;
export type TBUILDING = TValues<typeof BUILDING_TYPE>;
