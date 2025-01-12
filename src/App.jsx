/**
 * Functional Requirement - 
1. Use https://dummyjson.com/docs to find JSON contract for fetching products and product categories.
2. Display all categories and make it selectable (single-select).
3. Show products for the selected category otherwise show products from all categories when no category selected.
4. Implement Search for the products on the selected category or all.
5. Results should be shareable using url.
6. List down if there are any limitations of your app as comments in “App.js”.

Technical Requirement
1. Use only functional components.
2. Use Redux to store and retrieve product and category data.
3. No need to update the UX.
 */

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCategory, setSearchQuery } from "./reducers/productSlice";
import Category from "./components/Category";
import Product from "./components/Product";

function App() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (category) {
      dispatch(setSelectedCategory(category));
    }
    if (search) {
      dispatch(setSearchQuery(search));
    }
  }, []);

  return (
    <div className="container">
      <div className="panel left-panel">
        <Category />
      </div>
      <div className="vertical-divider" />
      <div className="panel right-panel">
        <Product />
      </div>
    </div>
  );
}

export default App;
