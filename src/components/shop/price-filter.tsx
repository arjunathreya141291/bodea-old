import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useTranslation } from "next-i18next";
import { SearchContext } from "@contexts/search";
const priceFilterItems = [
  {
    id: "1",
    name: "Under $150",
    slug: "$0-$150",
  },
  {
    id: "2",
    name: "$150 to $350",
    slug: "$150-$350",
  },
  {
    id: "3",
    name: "$350 to $500",
    slug: "$350-$500",
  },
  {
    id: "4",
    name: "Over $500",
    slug: "Over $500",
  },
];
export const PriceFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const selectedPrices = query?.price ? (query.price as string).split(",") : [];
  const [formState, setFormState] = React.useState<string[]>(selectedPrices);

  const { setSearchProducts } = useContext(SearchContext);

  React.useEffect(() => {
    setFormState(selectedPrices);
    console.log("selectedPrices", selectedPrices);
  }, [query?.price]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    setSearchProducts("64,000");
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    // setFormState(currentFormState);
    const { price, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { price: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }
  const items = priceFilterItems;

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {t("text-price")}
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
          <CheckBox
            key={item.id}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={formState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};
