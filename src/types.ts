export interface ITraineeInfo {
  name: string;
  group: string;
  ep1: number;
  ep2: number;
  ep3: number;
  ep5: number;
  ep6: number;
  ep8: number;
  ep9: number;
  company: string;
  dob: number;
  id: number;
  height: number;
  hobby: string;
  good_at: string;
  phrase: string;
  wb_supertopic?: string;
  star_rank1?: number;
  star_rank2?: number;
  eliminated_ep?: number;
}

export interface ITraineeInfoWithImage extends ITraineeInfo {
  image: string;
}
