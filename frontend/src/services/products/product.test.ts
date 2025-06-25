import { getAllProductsApi, getNonVegProductsApi, getVegProductsApi, searchProductsApi } from "./products-api";

const allProducts = [
  { _id: "1", name: "Veg Pizza", category: "veg", price: 12.99, createdAt: "2025-06-23" },
  { _id: "2", name: "Chicken Burger", category: "nonveg", price: 10.49, createdAt: "2025-06-24" },
  { _id: "3", name: "Paneer Wrap", category: "veg", price: 8.99, createdAt: "2025-06-22" },
  { _id: "4", name: "Mutton Kebab", category: "nonveg", price: 14.99, createdAt: "2025-06-25" },
];

const searchedProduct = [
  {
    _id: "1",
    name: "Veg Pizza",
    category: "veg",
    price: 12.99,
    createdAt: "2025-06-23",
  },
];

describe("get-all-products Api", () => {
  it("should return array of products list", async () => {
    const response = await getAllProductsApi();
    expect(response).toEqual(allProducts);
  });
});

describe("get-all-veg-products Api", () => {
  it("should return array of veg products list", async () => {
    const response = await getVegProductsApi();
    const veg = allProducts.filter((product) => product.category === "veg");
    expect(response).toEqual(veg);
  });
});

describe("get-all-nonVeg-products Api", () => {
  it("should return array of non products list", async () => {
    const response = await getNonVegProductsApi();
    const nonveg = allProducts.filter((product) => product.category === "nonveg");
    expect(response).toEqual(nonveg);
  });
});

describe("search product Api", () => {
  it("should return array of searched data", async () => {
    const response = await searchProductsApi("Veg");
    expect(response).toStrictEqual(searchedProduct);
  });
});
