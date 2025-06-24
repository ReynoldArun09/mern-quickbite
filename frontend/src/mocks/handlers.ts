import { http, HttpResponse } from "msw";
import type { signInSchemaType, signUpSchemaType } from "../validations/auth-schema";

async function parseJsonBody<T>(request: Request): Promise<T> {
  const data = (await request.json()) as T;
  return data;
}

export const handlers = [
  http.post("/api/v1/auth/signup", async ({ request }) => {
    try {
      const result = await parseJsonBody<signUpSchemaType>(request);

      if (!result.email || !result.password || !result.firstname || !result.lastname || !result.mobile) {
        return HttpResponse.json({
          message: "All fields are required!",
          success: false,
        });
      }
      if (result.email === "existing@example.com") {
        return HttpResponse.json({
          message: "Email already exists.",
          success: false,
        });
      }

      return HttpResponse.json({
        success: true,
        message: "Your account has been created successfully. Welcome aboard! 🎉",
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),

  http.post("/api/v1/auth/signin", async ({ request }) => {
    try {
      const result = await parseJsonBody<signInSchemaType>(request);

      if (!result.email || !result.password) {
        return HttpResponse.json({
          success: false,
          message: "All fields are required!",
        });
      }

      if (result.email !== "existing@example.com") {
        return HttpResponse.json({
          success: false,
          message: "Please enter valid email.",
        });
      }

      if (result.password !== "existingpassword") {
        return HttpResponse.json({
          success: false,
          message: "Invalid credentinals",
        });
      }

      return HttpResponse.json({
        success: true,
        message: "Welcome back!",
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),

  http.post("/api/v1/auth/signout", async () => {
    try {
      return HttpResponse.json({
        message: "Signed Out successfully",
        success: true,
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),

  http.get("/api/v1/auth/verify", async () => {
    try {
      return HttpResponse.json({
        data: {
          email: "existing@example.com",
          firstname: "mockusername",
          lastname: "mocklastname",
          mobile: "+919867231199",
          role: "user",
          blocked: false,
        },
        success: true,
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),
];
