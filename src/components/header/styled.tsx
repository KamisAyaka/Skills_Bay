import { AppBar, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";

const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  height: 72,
  background: "rgba(255, 255, 255, 0.88)",
  backdropFilter: "saturate(180%) blur(16px)",
  borderBottom: "1px solid rgba(114, 138, 150, 0.2)",
  boxShadow: "none",
  borderRadius: 0,
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    paddingTop: 0,
    height: 64,
  },
  [theme.breakpoints.down("sm")]: {
    height: 58,
  },
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  width: "100%",
  margin: "0 auto",
  height: "100%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    width: "calc(100% - 40px)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "calc(100% - 20px)",
  },
}));

const HeaderOptionalContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
    height: "100%",
    gap: theme.spacing(1),
  },
}));

const HeaderExampleTextWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const HeaderExampleText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  opacity: 0.3,
  color: "black",
  display: "inline",
  padding: 0,
  margin: 0,
  marginLeft: theme.spacing(4),
}));

const HeaderExampleLink = styled(Typography)(() => ({
  color: "black",
  display: "inline",
  fontWeight: 800,
  "&:hover": {
    cursor: "pointer",
  },
}));

export {
  HeaderWrapper,
  HeaderContent,
  HeaderOptionalContent,
  HeaderExampleTextWrapper,
  HeaderExampleText,
  HeaderExampleLink,
};
