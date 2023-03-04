import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};

const fetchProducts = async ({ queryKey }: any) => {
  console.log("qk", queryKey);
  const [_key, _params] = queryKey;
  var { data } = await http.get(API_ENDPOINTS.PRODUCTS);

  console.log(_key);
  console.log(_params);

  const { price } = _params;
  const { category } = _params;

  console.log(price);

  if ("price" in _params) {
    console.log(data);

    data = data.filter((el: any) => {
      if (price === "$0-$150") {
        return el.sale_price <= 150;
      }

      if (price === "$150-$350") {
        return el.sale_price >= 150 && el.sale_price <= 350;
      }

      if (price === "$350-$500") {
        return el.sale_price >= 350 && el.sale_price <= 500;
      }

      if (price === "Over $500") {
        return el.sale_price >= 500;
      }
    });

    console.log("afetr", data);
  }

  if ("category" in _params) {
    data = data.filter((el: any) => {
      if (category === "Standard (20 - 30 in.)") {
        return el.depth === "standard";
      }

      if (category === "Standard (20 - 30 in.)") {
        return el.depth === "standard";
      }

      if (category === "Narrow (less than 20 in.)") {
        return el.depth === "narrow";
      }

      if (category === "Deep (greater than 30 in.)") {
        return el.depth === "deep";
      }
    });
  }

  return {
    data: data.sort((a: any, b: any) => b.sale_price - a.sale_price),
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  console.log("options", options);
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useProductsQuery, fetchProducts };
