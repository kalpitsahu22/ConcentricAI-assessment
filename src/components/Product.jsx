import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setSearchQuery } from "../reducers/productSlice";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";

function Search() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(setSearchQuery(query));
      if (query) {
        searchParams.set("search", query);
      } else {
        searchParams.delete("search");
      }
      setSearchParams(searchParams);
    }, 500),
    [dispatch, searchParams, setSearchParams]
  );

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setInputValue(query);
      dispatch(setSearchQuery(query));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <input
      value={inputValue}
      onChange={handleChange}
      placeholder="Search products..."
      className="search-input"
    />
  );
}

function ProductCard({ title, thumbnail, price, description }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="product-info">
        <h6>{title}</h6>
        <div className="price">${price}</div>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}

export default function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory
  );
  const searchQuery = useSelector((state) => state.product.searchQuery);
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    dispatch(getProducts({ category: selectedCategory, searchQuery }));
  }, [dispatch, selectedCategory, searchQuery]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <>
      <div className="search">
        <Search />
      </div>
      <div className="products">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              thumbnail={product.thumbnail}
              price={product.price}
              description={product.description}
            />
          ))
        ) : (
          <div className="no-products">
            No products found. Try a different search or category.
          </div>
        )}
      </div>
    </>
  );
}
