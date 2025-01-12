import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, setSelectedCategory } from "../reducers/productSlice";
import { useSearchParams } from "react-router-dom";

function CategoryCard({ name, isSelected, onSelect }) {
  const formatName = (str) => {
    if (typeof str !== "string") return "";

    return str
      .split("-")
      .join(" ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="category-card">
      <input
        type="radio"
        value={name}
        id={name}
        checked={isSelected}
        onChange={() => onSelect(name)}
      />
      <label htmlFor={name}>{formatName(name)}</label>
    </div>
  );
}

export default function Category() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useSelector((state) => state.product.categories);
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory
  );

  useEffect(() => {
    dispatch(getCategories());
    const category = searchParams.get("category");
    if (category) {
      dispatch(setSelectedCategory(category));
    }
  }, [dispatch, searchParams]);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <h2 className="categories-title">Categories</h2>
      {/* "All" category card */}
      <CategoryCard
        name="all"
        isSelected={selectedCategory === "" || selectedCategory === "all"}
        onSelect={() => handleCategorySelect("")}
      />
      {/* Render all categories */}
      {Array.isArray(categories) &&
        categories.map((category) => (
          <CategoryCard
            key={category.slug || category}
            name={category.name || category}
            isSelected={selectedCategory === (category.slug || category)}
            onSelect={() => handleCategorySelect(category.slug || category)}
          />
        ))}
    </div>
  );
}
