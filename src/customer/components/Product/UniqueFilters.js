import { useSelector } from "react-redux";

const UniqueFilters = () => {
  const { products } = useSelector((store) => store.products);

  const uniqueBrands = new Set();
  const uniqueCategories = new Set();
  const uniqueSubCategories = new Set();

  if (Array.isArray(products) && products.length > 0) {
    products.forEach((product) => {
      uniqueBrands.add(product.brand);
      if (product.category) uniqueCategories.add(product.category.name);
      if (product.category && product.category.parentCategory)
        uniqueSubCategories.add(product.category.parentCategory.name);
    });
  }

  const brandOptions = [...uniqueBrands];
  const categoryOptions = [...uniqueCategories];
  const subcategoryOptions = [...uniqueSubCategories];

  const brandFilterOptions = brandOptions.map((brand) => ({
    value: brand,
    label: brand,
    checked: false,
  }));

  const categoryFilterOptions = categoryOptions.map((category) => ({
    value: category,
    label: category,
    checked: false,
  }));

  const subcategoryFilterOptions = subcategoryOptions.map((subcategory) => ({
    value: subcategory,
    label: subcategory,
    checked: false,
  }));

  return [
    {
      id: "brand",
      name: "Brand",
      options: brandFilterOptions,
    },
    {
      id: "category",
      name: "Category",
      options: categoryFilterOptions,
    },
    {
      id: "subcategory",
      name: "Subcategory",
      options: subcategoryFilterOptions,
    },
  ];
};

export default UniqueFilters;
