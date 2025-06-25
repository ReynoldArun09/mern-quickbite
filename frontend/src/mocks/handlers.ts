import { http, HttpResponse } from "msw";
import type { CartPayload } from "../services/types";
import type { signInSchemaType, signUpSchemaType } from "../validations/auth-schema";

async function parseJsonBody<T>(request: Request): Promise<T> {
  const data = (await request.json()) as T;
  return data;
}

const userCart = [
  { _id: "1", name: "Product A", quantity: 2, price: 10.99 },
  { _id: "2", name: "Product B", quantity: 1, price: 19.99 },
];

const allProducts = [
  { _id: "1", name: "Veg Pizza", category: "veg", price: 12.99, createdAt: "2025-06-23" },
  { _id: "2", name: "Chicken Burger", category: "nonveg", price: 10.49, createdAt: "2025-06-24" },
  { _id: "3", name: "Paneer Wrap", category: "veg", price: 8.99, createdAt: "2025-06-22" },
  { _id: "4", name: "Mutton Kebab", category: "nonveg", price: 14.99, createdAt: "2025-06-25" },
];

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

  http.get("/api/v1/admin/get-products", async () => {
    const products = [
      { _id: 1, name: "Product A", price: 10.99 },
      { _id: 2, name: "Product B", price: 19.99 },
      { _id: 3, name: "Product C", price: 29.99 },
    ];
    try {
      return HttpResponse.json({ data: products });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),
  http.get("/api/v1/admin/get-customers", async () => {
    const customers = [
      { _id: 1, fristname: "customer A", email: "customera@example.com" },
      { _id: 2, firstname: "customer B", email: "customerb@example.com" },
    ];
    try {
      return HttpResponse.json({ data: customers });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),
  http.delete("/api/v1/admin/delete/:productId", async ({ params }) => {
    try {
      const { productId } = params;
      const message = "Product not found.";
      if (productId === "456") {
        return HttpResponse.json(message);
      }
      return HttpResponse.json({
        message: "Product deleted!",
        success: true,
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),
  http.delete("/api/v1/admin/user-delete/:userId", async ({ params }) => {
    try {
      const { userId } = params;

      if (userId === "456") {
        return HttpResponse.json({
          message: "failed to delete customer",
          success: false,
        });
      }
      return HttpResponse.json({
        message: "customer deleted!",
        success: true,
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),

  http.put("/api/v1/admin/enable-disable/:productId", async ({ params }) => {
    try {
      const { productId } = params;

      if (productId === "456") {
        return HttpResponse.json({
          message: "Product not found.",
          success: false,
        });
      }
      return HttpResponse.json({
        message: "Product has been disabled.",
        success: true,
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),

  http.put("/api/v1/admin/block-unblock-user/:userId", async ({ params }) => {
    try {
      const { userId } = params;

      if (userId === "456") {
        return HttpResponse.json({
          message: "Invalid customer id",
          success: false,
        });
      }
      return HttpResponse.json({
        message: "customer blocked successfully!",
        success: true,
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),
  http.get("/api/v1/cart/get-cart", async () => {
    try {
      return HttpResponse.json({
        data: userCart,
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),
  http.post("/api/v1/cart/add-cart", async ({ request }) => {
    try {
      const result = await parseJsonBody<CartPayload>(request);

      if (result.productId !== "1") {
        return HttpResponse.json({
          data: "Product not found",
        });
      }

      return HttpResponse.json({
        data: "Item added to cart",
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),
  http.post("/api/v1/cart/remove-product/:productId", async ({ params }) => {
    try {
      const { productId } = params;

      if (productId !== "1") {
        return HttpResponse.json({
          data: "Product not found",
        });
      }

      return HttpResponse.json({
        data: "Item removed from cart",
      });
    } catch {
      return HttpResponse.json({
        message: "Internal Server error",
        success: false,
      });
    }
  }),
  http.get("/api/v1/product/all-products", async () => {
    return HttpResponse.json({
      data: allProducts,
    });
  }),
  http.get("/api/v1/product/veg-products", async () => {
    const veg = allProducts.filter((product) => product.category === "veg");
    return HttpResponse.json({
      data: veg,
    });
  }),
  http.get("/api/v1/product/nonveg-products", async () => {
    const nonveg = allProducts.filter((product) => product.category === "nonveg");
    return HttpResponse.json({
      data: nonveg,
    });
  }),

  http.get("/api/v1/product/search/:searchTerm", async ({ params }) => {
    const { searchTerm } = params;
    const matched = allProducts.filter((product) =>
      product.name.toLowerCase().includes((searchTerm as string).toLowerCase())
    );
    return HttpResponse.json({
      data: matched,
    });
  }),
];
