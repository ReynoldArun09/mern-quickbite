export type ResponseType = {
  message: string;
  success: boolean;
};

export type signupResponse = ResponseType;

export type siginResponse = {
  data: UserType;
} & ResponseType;

export type UserType = {
  email: string;
  _id: string;
  fristname: string;
  lastname: string;
  mobile: string;
  blocked?: boolean;
  role?: string;
};
