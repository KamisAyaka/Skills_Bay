import { Box, ButtonBase, styled } from "@mui/material";

const LogoWrapper = styled(ButtonBase)(({ theme }) => ({
  display: "flex",
  color: "#5C5265",
  alignItems: "center",
  gap: 8,
  borderRadius: 10,
  textAlign: "left",
  padding: theme.spacing(0.5, 0.75),
  "& h4": {
    fontSize: 20,
    lineHeight: "20px",
    fontWeight: 700,
    color: "#5C5265",
  },
  "&:focus-visible": {
    outline: "3px solid rgba(60, 132, 246, 0.3)",
    outlineOffset: 2,
  },
  [theme.breakpoints.down("sm")]: {
    "& h4": {
      fontSize: 15,
    },
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(0.5),
  "& img": {
    width: 52,
    height: "auto",
    display: "block",
  },
  [theme.breakpoints.down("md")]: {
    "& img": {
      width: 46,
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& img": {
      width: 40,
    },
  },
}));

export { LogoWrapper, ImageWrapper };
