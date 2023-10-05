export function filterProducts(
  products,
  categories,
  subcategories,
  brands,
  minPrice,
  maxPrice
) {
  return products.filter((product) => {
    const productCategory = product.category.name;
    const productSubcategory = product.category.parentCategory
      ? product.category.parentCategory.name
      : "";

    const matchesBrand = !brands.length || brands.includes(product.brand);
    const matchesCategory =
      !categories.length || categories.includes(productCategory);
    const matchesSubcategory =
      !subcategories.length || subcategories.includes(productSubcategory);
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return (
      matchesBrand && matchesCategory && matchesSubcategory && matchesPrice
    );
  });
}
