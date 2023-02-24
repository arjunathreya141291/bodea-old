import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/cart/cart.context";
import { SearchContext } from "@contexts/search";

export const CategoryFilter = () => {
  // const { searchProducts, setSearchProducts } = useCart();
  const [openFilter, setOpenFilter] = useState(true);
  const { setSearchProducts } = useContext(SearchContext);
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const { data, isLoading } = useCategoriesQuery({
    limit: 10,
  });
  const selectedCategories = query?.category
    ? (query.category as string).split(",")
    : [];
  const [htmlFormState, sethtmlFormState] =
    React.useState<string[]>(selectedCategories);

  //  console.log("searchProducts", searchProducts);

  React.useEffect(() => {
    sethtmlFormState(selectedCategories);
  }, [query?.category]);

  if (isLoading) return <p>Loading...</p>;

  function handleItemClick(e: React.htmlFormEvent<HTMLInputElement>): void {
    setSearchProducts("82,000");
    const { value } = e.currentTarget;
    let currenthtmlFormState = htmlFormState.includes(value)
      ? htmlFormState.filter((i) => i !== value)
      : [...htmlFormState, value];
    const { category, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currenthtmlFormState.length
            ? { category: currenthtmlFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }
  const items = data?.categories.data;
  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {t("text-category")}
      </h3>

      <h5 className="text-heading text-sm md:text-base font-semibold mb-7">
        Depth
      </h5>
      <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
          <CheckBox
            key={item.id}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={htmlFormState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};
