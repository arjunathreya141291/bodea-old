import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
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

  if ("price" in _params) {
    console.log(data);

    data = data.filter((el: any) => {
      return el.sale_price >= 100 && el.sale_price <= 300;
    });

    console.log("afetr", data);
  }

  if ("category" in _params) {
    data = data.filter((el: any) => {
      return el.depth === "standard";
    });
  }

  return {
    data: shuffle(data),
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
