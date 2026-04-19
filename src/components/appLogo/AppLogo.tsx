import { Chip, Typography } from "@mui/material";
import { APP_DISPLAY_NAME, ROUTES } from "consts";
import logo from "assets/icons/logo.png";
import { LogoWrapper, ImageWrapper } from "./styled";
import { useNetwork } from "lib/hooks/useNetwork";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";

export const AppLogo = () => {
  const navigate = useNavigatePreserveQuery();
  const { network } = useNetwork();
  return (
    <LogoWrapper aria-label="Open SkillBay deployer page" onClick={() => navigate(ROUTES.deployer)}>
      <ImageWrapper>
        <img src={logo} alt="Logo" />
      </ImageWrapper>
      <Typography variant="h4">{APP_DISPLAY_NAME}</Typography>
      {network === "testnet" && <Chip sx={{ ml: 1 }} label="Testnet" />}
    </LogoWrapper>
  );
};
