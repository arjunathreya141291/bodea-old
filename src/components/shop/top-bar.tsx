import { Drawer } from "@components/common/drawer/drawer";
import FilterIcon from "@components/icons/filter-icon";
import Text from "@components/ui/text";
import { useUI } from "@contexts/ui.context";
import FilterSidebar from "@components/shop/filter-sidebar";
import ListBox from "@components/ui/list-box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";
import { useCart } from "@contexts/cart/cart.context";
import { useContext } from "react";
import { SearchContext } from "@contexts/search";

export default function SearchTopBar() {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const dir = getDirection(locale);
  // const { searchProducts } = useCart();
  const { searchProducts } = useContext(SearchContext);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
  const { searchValue } = useContext(SearchContext);

  // console.log("sp", searchProducts);
  return (
    <div className="flex justify-between items-center">
      <Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
        {searchValue}
      </Text>
      {/* <button
        className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ps-2.5">{t("text-filters")}</span>
      </button> */}
      <div className="flex items-center justify-end">
        {/* <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 hidden lg:block">
          {searchProducts.length >= 4 && <span>Over </span>}
          <span style={{ color: "black", fontWeight: "bold" }}>
            {searchProducts}
          </span>{" "}
          {t("text-items")}
        </div> */}
        <ListBox
          options={[
            { name: "text-sorting-options", value: "options" },
            { name: "text-newest", value: "newest" },
            { name: "text-popularity", value: "popularity" },
            { name: "text-price-low-high", value: "low-high" },
            { name: "text-price-high-low", value: "high-low" },
          ]}
        />
      </div>
      {/* TODO: need to use just one drawer component */}
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displayFilter}
        onClose={closeFilter}
        contentWrapperStyle={contentWrapperCSS}
        {...motionProps}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
}
