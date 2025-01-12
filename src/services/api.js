export const fetchCategories = async () => {
  const response = await fetch("https://dummyjson.com/products/categories");
  const data = await response.json();
  return data;
};

export const fetchProducts = async (category, searchQuery) => {
  let url = "https://dummyjson.com/products";

  if (searchQuery) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
      searchQuery
    )}`;
  } else if (category) {
    url = `https://dummyjson.com/products/category/${encodeURIComponent(
      category
    )}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
