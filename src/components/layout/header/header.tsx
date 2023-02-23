import React, { useRef } from "react";
import SearchIcon from "@components/icons/search-icon";
import { siteSettings } from "@settings/site-settings";
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "@components/ui/language-switcher";
const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});
import { useRouter } from "next/router";

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const router = useRouter();
  const { openSearch, openModal, setModalView, isAuthorized } = useUI();
  const { t } = useTranslation("common");
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    router.push({
      pathname: "/search",
    });
  }

  function handleLogoClick(event: any) {
    event.preventDefault();
    router.push({
      pathname: "/",
    });
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
    >
      <div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 px-4 md:px-8 lg:px-6 transition duration-200 ease-in-out">
        <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
          <Logo onClick={handleLogoClick} />
          <HeaderMenu
            data={site_header.menu}
            className="hidden lg:flex md:ms-6 xl:ms-10"
          />

          {/* <div className="flex-shrink-0 ms-auto lg:me-5 xl:me-8 2xl:me-10">
            <LanguageSwitcher />
          </div> */}
          <div className="hidden lg:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0">
            <div className="hidden lg:inline-block relative">
              {/* ::::label */}
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              {/* ::::input */}
              <form onSubmit={handleSubmit}>
                <input
                  type="search"
                  id="search"
                  defaultValue=""
                  name="search"
                  placeholder="search"
                  className="form-input pl-11 pr-5 w-44 block shadow-sm rounded-full border-gray-300 bg-gray-50 text-sm placeholder-gray-300 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
                />
              </form>
              {/* ::::icon */}
              <span className="absolute top-1/2 left-3 text-gray-400 transform -translate-y-1/2">
                <SearchIcon className="w-4 h-4" />
              </span>
            </div>
            {/* <button
              className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
              // onClick={openSearch}
              aria-label="search-button"
            >
              <SearchIcon />
            </button> */}
            {/* <div className="-mt-0.5 flex-shrink-0">
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                className="text-sm xl:text-base text-heading font-semibold"
                btnProps={{
                  className:
                    "text-sm xl:text-base text-heading font-semibold focus:outline-none",
                  // @ts-ignore
                  children: t("text-sign-in"),
                  onClick: handleLogin,
                }}
              >
                {t("text-account")}
              </AuthMenu>
            </div> */}
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
