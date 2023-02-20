export interface ITraineeInfo {
    name: string;
    group: string;
    ep1: number;
    ep2: number;
    ep3: number;
    company: string;
    dob: number;
    id: number;
    height: number;
    hobby: string;
    good_at: string;
    phrase: string;
    wb_supertopic?: string;
}

export interface ITraineeInfoWithImage extends ITraineeInfo {
    image: string;
}