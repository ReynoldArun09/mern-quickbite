import {
  blockUnblockCustomerApi,
  deleteCustomerApi,
  enableDisableProductApi,
  getAllCustomersApi,
  getAllProductsForAdminApi,
} from "./admin-api";

describe("GetAllProductsForAdmin Api", () => {
  it("should return array of products data", async () => {
    const response = await getAllProductsForAdminApi();
    expect(response).toBeInstanceOf(Array);
  });
});

describe("GetAllCustomers Api", () => {
  it("should return array of customers data", async () => {
    const response = await getAllCustomersApi();
    expect(response).toBeInstanceOf(Array);
  });
});

describe("Delete Product Api", () => {
  it("should return error with message and success false", async () => {
    const response = await deleteCustomerApi("456");
    expect(response.message).toBe("failed to delete customer");
    expect(response.success).toBeFalsy();
  });

  it("should delete customer and return success message and true", async () => {
    const response = await deleteCustomerApi("123");
    expect(response.message).toBe("customer deleted!");
    expect(response.success).toBeTruthy();
  });
});

describe("Enable disable product", () => {
  it("should return error with message and success false if product not found", async () => {
    const response = await enableDisableProductApi("456");
    expect(response.message).toBe("Product not found.");
    expect(response.success).toBeFalsy();
  });

  it("should disable product and return success message and true", async () => {
    const response = await enableDisableProductApi("123");
    expect(response.message).toBe("Product has been disabled.");
    expect(response.success).toBeTruthy();
  });
});

describe("Block unblock user", () => {
  it("should return error with message and success false if invalid id", async () => {
    const response = await blockUnblockCustomerApi("456");
    expect(response.message).toBe("Invalid customer id");
    expect(response.success).toBeFalsy();
  });

  it("should block customer and return success message and true", async () => {
    const response = await blockUnblockCustomerApi("123");
    expect(response.message).toBe("customer blocked successfully!");
    expect(response.success).toBeTruthy();
  });
});
