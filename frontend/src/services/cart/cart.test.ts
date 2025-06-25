import { addToCartApi, getUserCartItemsApi, removeFromCartApi } from "./cart-api";

const userCart = [
  { _id: "1", name: "Product A", quantity: 2, price: 10.99 },
  { _id: "2", name: "Product B", quantity: 1, price: 19.99 },
];

describe("get-cart Api", () => {
  it("should return cart items of logged in user", async () => {
    const response = await getUserCartItemsApi();
    expect(response).toEqual(userCart);
  });
});

describe("add-cart Api", () => {
  it("should return product not found if id is invalid", async () => {
    const response = await addToCartApi({
      productId: "3",
      count: 1,
    });
    expect(response).toBe("Product not found");
  });
  it("should return success message when item added to cart", async () => {
    const response = await addToCartApi({
      productId: "1",
      count: 1,
    });
    expect(response).toBe("Item added to cart");
  });
});

describe("remove from cart Api", () => {
  it("should return product not found if id is invalid", async () => {
    const response = await removeFromCartApi("3");
    expect(response).toBe("Product not found");
  });
  it("should return success message when item is removed from cart", async () => {
    const response = await removeFromCartApi("1");
    expect(response).toBe("Item removed from cart");
  });
});
