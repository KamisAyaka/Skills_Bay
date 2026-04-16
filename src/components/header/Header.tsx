import { IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { HeaderMenu, MobileMenu } from "components/header/headerMenu/HeaderMenu";
import { AppLogo } from "components/appLogo";
import { HeaderContent, HeaderOptionalContent, HeaderWrapper } from "./styled";
import { Outlet, useLocation } from "react-router-dom";

export const Header = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const matches = useMediaQuery("(min-width:900px)");

  const location = useLocation();
  const topRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView();
  }, [location]);

  return (
    <>
      <HeaderWrapper position="static" ref={topRef}>
        <HeaderContent>
          <HeaderOptionalContent>
            {!matches && (
              <IconButton onClick={() => setMobileMenu(true)}>
                <MenuRoundedIcon style={{ width: 40, height: 40, color: "#3C84F6" }} />
              </IconButton>
            )}
            {matches && <AppLogo />}
            {matches && <HeaderMenu />}
          </HeaderOptionalContent>
          <MobileMenu showMenu={mobileMenu && !matches} closeMenu={() => setMobileMenu(false)} />
        </HeaderContent>
      </HeaderWrapper>
      <Outlet />
    </>
  );
};
