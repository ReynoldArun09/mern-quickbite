import { signInApi, signOutApi, signUpApi, verifyApi } from "./auth-api";

describe("Signup Api testing", () => {
  it("should create user account and return success status and message", async () => {
    const response = await signUpApi({
      email: "mock@example.com",
      firstname: "mockusername",
      lastname: "mocklastname",
      mobile: "+919867231199",
      password: "mockpass123A$",
    });
    expect(response.success).toBeTruthy();
    expect(response.message).toBe("Your account has been created successfully. Welcome aboard! 🎉");
  });

  it("should return error message and success false, when user validation fails", async () => {
    const response = await signUpApi({
      email: "",
      firstname: "",
      lastname: "",
      mobile: "",
      password: "",
    });
    expect(response.success).toBeFalsy();
    expect(response.message).toBe("All fields are required!");
  });
  it("should return error message and success false, if user email is already exist", async () => {
    const response = await signUpApi({
      email: "existing@example.com",
      firstname: "mockusername",
      lastname: "mocklastname",
      mobile: "+919867231199",
      password: "mockpass123A$",
    });
    expect(response.success).toBeFalsy();
    expect(response.message).toBe("Email already exists.");
  });
});

describe("SignIn Api testing", () => {
  it("should signin user if all credentinals are valid", async () => {
    const response = await signInApi({
      email: "existing@example.com",
      password: "existingpassword",
      rememberMe: false,
    });
    expect(response.success).toBeTruthy();
    expect(response.message).toBe("Welcome back!");
  });

  it("should return error message and success false if email doesnt match", async () => {
    const response = await signInApi({
      email: "notexisting@example.com",
      password: "existingpassword",
      rememberMe: false,
    });
    expect(response.success).toBeFalsy();
    expect(response.message).toBe("Please enter valid email.");
  });

  it("should return error message and success false if password doesnt match", async () => {
    const response = await signInApi({
      email: "existing@example.com",
      password: "wrongpassword",
      rememberMe: false,
    });
    expect(response.success).toBeFalsy();
    expect(response.message).toBe("Invalid credentinals");
  });
});

describe("SignOut Api testing", () => {
  it("should signout current logged in user", async () => {
    const response = await signOutApi();
    expect(response.success).toBeTruthy();
    expect(response.message).toBe("Signed Out successfully");
  });
});

describe("Verify Api testing", () => {
  it("should return user data if authentication is success", async () => {
    const response = await verifyApi();
    expect(response).toEqual(
      expect.objectContaining({
        email: "existing@example.com",
        firstname: "mockusername",
        lastname: "mocklastname",
        mobile: "+919867231199",
        role: "user",
        blocked: false,
      })
    );
  });
});
