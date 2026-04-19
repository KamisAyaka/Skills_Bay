import React from "react";
import { Box, Link, styled } from "@mui/material";

interface IconProps {
  iconUrl: string;
  hoveredIconUrl: string;
  disabled?: boolean;
}

const Icon = styled(Box)((props: IconProps) => ({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: theme.spacing(3),
  height: theme.spacing(3),
  background: `url(${props.iconUrl})`,
  "&:hover": {
    transitionDuration: ".25s",
    background: `url(${props.disabled ? props.iconUrl : props.hoveredIconUrl})`,
    cursor: props.disabled ? "default" : "pointer",
  },
}));

interface HoverableIconProps extends IconProps {
  link: string;
  ariaLabel?: string;
}

export const HoverableIcon: React.FC<HoverableIconProps> = ({
  iconUrl,
  hoveredIconUrl,
  link,
  ariaLabel,
}) => {
  return !link.length ? (
    <Icon iconUrl={iconUrl} hoveredIconUrl={hoveredIconUrl} disabled />
  ) : (
    <Link
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      href={link}
      sx={{
        borderRadius: "999px",
        display: "inline-flex",
        "&:focus-visible": {
          outline: "3px solid rgba(60, 132, 246, 0.3)",
          outlineOffset: 2,
        },
      }}>
      <Icon iconUrl={iconUrl} hoveredIconUrl={hoveredIconUrl} />
    </Link>
  );
};
