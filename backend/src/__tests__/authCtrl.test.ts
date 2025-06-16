import request from "supertest";
import app from "../app";
import { ApiErrorMessages, ApiSuccessMessages, GlobalErrorMessages, HttpStatusCode } from "../constants";
import { signInUserService, signUpUserService } from "../services/authServices";
import { customError } from "../utils";

export const inValidUser = {
  firstname: "invalidfirstname",
  lastname: "invalidlastname",
  mobile: "1234567899",
  password: "invalid123B$",
};

export const validUser = {
  email: "invalid@example.com",
  firstname: "invalidfirstname",
  lastname: "invalidlastname",
  mobile: "1234567899",
  password: "invalid123B$",
};

jest.mock("../services/authServices.ts");

describe("signup controller", () => {
  it("should return 400 status if user validation fails (email missing)", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send(inValidUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(GlobalErrorMessages.VALIDATION_FAILED);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
        }),
      ])
    );
  });

  it("should return 400 status if user already exist", async () => {
    (signUpUserService as jest.Mock).mockRejectedValueOnce(
      new customError(ApiErrorMessages.USER_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST)
    );
    const response = await request(app).post("/api/v1/auth/signup").send(validUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.USER_ALREADY_EXISTS);
  });

  it("should create new user successfully", async () => {
    (signUpUserService as jest.Mock).mockResolvedValueOnce({});
    const response = await request(app).post("/api/v1/auth/signup").send(validUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe(ApiSuccessMessages.SIGN_UP_SUCCESS);
  });
});

describe("sign in", () => {
  it("should return 400 status if user validation fails", async () => {
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "",
      password: validUser.password,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(GlobalErrorMessages.VALIDATION_FAILED);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Please enter a valid email address.",
        }),
      ])
    );
  });

  it("should return 400 if user not found in database", async () => {
    (signInUserService as jest.Mock).mockRejectedValueOnce(
      new customError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST)
    );
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: validUser.email,
      password: validUser.password,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.USER_NOT_FOUND);
  });

  it("should return 400 if password is incorrect", async () => {
    (signInUserService as jest.Mock).mockRejectedValueOnce(
      new customError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST)
    );
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: validUser.email,
      password: validUser.password,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.USER_NOT_FOUND);
  });

  it("should sign in user", async () => {
    (signInUserService as jest.Mock).mockResolvedValueOnce({});
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: validUser.email,
      password: validUser.password,
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(ApiSuccessMessages.SIGN_IN_SUCCESS);
  });
});

describe("signout controller", () => {
  it("should signout user", async () => {
    const response = await request(app).post("/api/v1/auth/signout");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(ApiSuccessMessages.SIGN_OUT_SUCCESS);
    expect(response.header["authToken"]).toBeUndefined();
  });
});

jest.mock("../middlewares/authMiddleware.ts", () => ({
  authMiddleware: jest.fn((req, res, next) => {
    req.ctx = {
      _id: "mock-user-id",
      email: "testuser@gmail.com",
      mobile: "1234567890",
      firstname: "mockusername",
      lastname: "mockuserlastname",
      blocked: false,
      role: "user",
    };
    next();
  }),
}));

describe("verify user controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 if user is authenticated", async () => {
    authMiddleware: jest.fn((req, res, next) => {
      req.ctx = {
        _id: "mock-user-id",
        email: "testuser@gmail.com",
        mobile: "1234567890",
        firstname: "mockusername",
        lastname: "mockuserlastname",
        blocked: false,
        role: "user",
      };
      next();
    });
    const response = await request(app).get("/api/v1/auth/verify");
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
  });
});
