export type GeneralResponseType = {
  message: string;
  success: boolean;
};

export type siginResponse = {
  data: UserType;
} & GeneralResponseType;

export type VerifyResponseType = {
  data: UserType;
} & Omit<GeneralResponseType, "message">;

export type UserType = {
  email: string;
  _id: string;
  fristname: string;
  lastname: string;
  mobile: string;
  blocked?: boolean;
  role?: string;
};
