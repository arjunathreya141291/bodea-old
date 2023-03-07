import PropTypes from "prop-types";
import React, { createContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchProducts, setSearchProducts] = useState("100,000");
  const [searchValue, setSearchValue] = useState("");

  const context = {
    searchProducts,
    setSearchProducts,
    searchValue,
    setSearchValue,
  };

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node,
};

export { SearchContext, SearchProvider };
