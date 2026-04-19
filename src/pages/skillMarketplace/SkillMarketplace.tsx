import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import CurrencyBitcoinRoundedIcon from "@mui/icons-material/CurrencyBitcoinRounded";
import { Screen, ScreenContent } from "components/Screen";

const PageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  padding: theme.spacing(8, 4, 10),
  maxWidth: 1080,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(5, 2, 7),
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: "50%",
    filter: "blur(6px)",
    background: "radial-gradient(circle, rgba(161, 222, 254, 0.3) 0%, rgba(161, 222, 254, 0) 70%)",
    left: -130,
    bottom: -130,
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: "50%",
    filter: "blur(6px)",
    background: "radial-gradient(circle, rgba(234, 214, 255, 0.25) 0%, rgba(234, 214, 255, 0) 72%)",
    right: -100,
    top: -90,
    pointerEvents: "none",
  },
  "> *": {
    position: "relative",
    zIndex: 1,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  borderRadius: 18,
  boxShadow: "0px 8px 28px rgba(60, 132, 246, 0.08)",
  border: "1px solid rgba(232, 232, 232, 0.85)",
  transition: "transform 220ms ease-out, box-shadow 220ms ease-out, border-color 220ms ease-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 14px 34px rgba(60, 132, 246, 0.14)",
    borderColor: "rgba(60, 132, 246, 0.3)",
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "&:hover": {
      transform: "none",
      boxShadow: "0px 8px 28px rgba(60, 132, 246, 0.08)",
    },
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #A3C2EE 0%, #6999E9 60%, #5E90E3 100%)",
  padding: theme.spacing(2.25),
  borderRadius: "18px 18px 0 0",
  color: "#FFFFFF",
  minHeight: 116,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const SkillIconBadge = styled(Box)({
  width: 46,
  height: 46,
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 8,
  color: "#FFFFFF",
  background: "rgba(255, 255, 255, 0.18)",
  backdropFilter: "blur(2px)",
});

const HeroTitle = styled(Typography)(({ theme }) => ({
  color: "#303030",
  lineHeight: 1.2,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const MetaRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
}));

const MetaPill = styled(Box)(({ theme }) => ({
  background: "rgba(163, 194, 238, 0.12)",
  padding: theme.spacing(0.75, 1.25),
  borderRadius: 999,
  border: "1px solid rgba(163, 194, 238, 0.38)",
  color: "#3C84F6",
  fontSize: 13,
  lineHeight: 1.2,
  fontWeight: 600,
  whiteSpace: "nowrap",
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #3C84F6 0%, #2B71E4 55%, #1F5FD6 100%)",
  color: "#FFFFFF",
  fontWeight: 700,
  padding: theme.spacing(1.5, 3),
  borderRadius: 12,
  textTransform: "none",
  fontSize: "16px",
  minHeight: 46,
  boxShadow: "0px 8px 20px rgba(60, 132, 246, 0.24)",
  transition: "transform 220ms ease-out, box-shadow 220ms ease-out, background-color 220ms ease-out",
  "&:hover": {
    background: "linear-gradient(135deg, #2B71E4 0%, #1F5FD6 100%)",
    boxShadow: "0px 10px 24px rgba(60, 132, 246, 0.28)",
    transform: "translateY(-1px)",
  },
  "&:focus-visible": {
    outline: "3px solid rgba(60, 132, 246, 0.3)",
    outlineOffset: 2,
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "&:hover": {
      transform: "none",
    },
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.82)",
  padding: theme.spacing(4),
  borderRadius: 16,
  border: "1px solid rgba(163, 194, 238, 0.45)",
  boxShadow: "0px 8px 24px rgba(60, 132, 246, 0.06)",
}));

interface Skill {
  id: string;
  name: string;
  icon: ReactNode;
  summary: string;
  command: string;
  price: string;
}

const skills: Skill[] = [
  {
    id: "skill_news_001",
    name: "Daily News Top 10",
    icon: <ArticleOutlinedIcon sx={{ fontSize: 26 }} />,
    summary: "Top 10 global headlines with clean AI summaries.",
    command: "/news",
    price: "0.01 TON",
  },
  {
    id: "skill_weather_002",
    name: "Smart Weather Assistant",
    icon: <WbSunnyOutlinedIcon sx={{ fontSize: 26 }} />,
    summary: "Actionable weather forecast with umbrella suggestions.",
    command: "/weather Beijing",
    price: "0.01 TON",
  },
  {
    id: "skill_tech_003",
    name: "Tech Trends Weekly",
    icon: <TrendingUpRoundedIcon sx={{ fontSize: 26 }} />,
    summary: "Weekly top tech trends from GitHub and Hacker News.",
    command: "/tech",
    price: "0.01 TON",
  },
  {
    id: "skill_summary_004",
    name: "Long Document Summarizer",
    icon: <SummarizeOutlinedIcon sx={{ fontSize: 26 }} />,
    summary: "Turn long docs into key bullets and action items.",
    command: "/summary <text or link>",
    price: "0.01 TON",
  },
  {
    id: "skill_translate_005",
    name: "Smart Translator Pro",
    icon: <TranslateRoundedIcon sx={{ fontSize: 26 }} />,
    summary: "Context-aware translation that preserves tone.",
    command: "/translate zh en <text>",
    price: "0.01 TON",
  },
  {
    id: "skill_reminder_006",
    name: "Reminder & To-Do Copilot",
    icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: 26 }} />,
    summary: "Quick reminders and recurring to-dos in Telegram.",
    command: "/remind tomorrow 9am Standup",
    price: "0.01 TON",
  },
  {
    id: "skill_crypto_007",
    name: "Crypto Market Pulse",
    icon: <CurrencyBitcoinRoundedIcon sx={{ fontSize: 26 }} />,
    summary: "Realtime crypto prices, 24h moves, and quick trend view.",
    command: "/price BTC",
    price: "0.01 TON",
  },
];

export const SkillMarketplace = () => {
  const navigate = useNavigate();

  const handlePurchase = (skillId: string) => {
    navigate(`/skill-payment?startapp=${skillId}`);
  };

  return (
    <Screen>
      <ScreenContent removeBackground>
        <PageWrapper>
          <Box textAlign="center" mb={8}>
            <HeroTitle variant="h2" fontWeight={700}>
              SkillBay <Box component="span" sx={{ color: "#3C84F6" }}>AI Skills Marketplace</Box>
            </HeroTitle>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.8,
                fontWeight: 500,
                color: "#5C5265",
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}>
              Discover, purchase and use AI skills in Telegram
              <br />
              Powered by TON blockchain payments
            </Typography>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 1.2,
              }}>
              <Chip
                icon={<VerifiedUserOutlinedIcon sx={{ color: "#3C84F6 !important" }} />}
                label="Secure TON payment"
                sx={{
                  bgcolor: "#F5F9FF",
                  color: "#3C84F6",
                  border: "1px solid rgba(60, 132, 246, 0.2)",
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<TipsAndUpdatesOutlinedIcon sx={{ color: "#39C46C !important" }} />}
                label="Telegram ready commands"
                sx={{
                  bgcolor: "#F4FCF7",
                  color: "#2A8A4D",
                  border: "1px solid rgba(57, 196, 108, 0.25)",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>

          <Grid container spacing={3}>
            {skills.map((skill) => (
              <Grid item xs={12} sm={6} lg={4} key={skill.id}>
                <StyledCard>
                  <CardHeader>
                    <SkillIconBadge>{skill.icon}</SkillIconBadge>
                    <Typography variant="h6" fontWeight={700} textAlign="center">
                      {skill.name}
                    </Typography>
                  </CardHeader>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      p: 2.5,
                      gap: 1.5,
                    }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.65,
                        minHeight: 46,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                      {skill.summary}
                    </Typography>
                    <MetaRow>
                      <MetaPill sx={{ fontFamily: "monospace", fontSize: 12 }}>
                        {skill.command}
                      </MetaPill>
                      <MetaPill sx={{ color: "#1F5FD6", fontWeight: 700 }}>
                        {skill.price}
                      </MetaPill>
                    </MetaRow>
                    <PrimaryButton fullWidth size="medium" onClick={() => handlePurchase(skill.id)}>
                      View Details
                    </PrimaryButton>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <InfoBox mt={8}>
            <Typography variant="h6" gutterBottom fontWeight={700} color="primary.main" mb={3}>
              How to Use
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              component="div"
              sx={{ lineHeight: 1.8 }}>
              <ol style={{ paddingLeft: 24, margin: 0 }}>
                <li style={{ marginBottom: 12 }}>Choose an AI skill you're interested in</li>
                <li style={{ marginBottom: 12 }}>
                  Click "Purchase Now" and connect your TON wallet
                </li>
                <li style={{ marginBottom: 12 }}>Complete the 0.01 TON payment</li>
                <li style={{ marginBottom: 12 }}>
                  Receive activation code (e.g., NEWS2026, WEATHER2026, TECH2026)
                </li>
                <li>Use the corresponding command in Telegram Bot to activate the skill</li>
              </ol>
            </Typography>
          </InfoBox>

          <Box mt={6} textAlign="center">
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.7 }}>
              Network: Testnet | Contract: EQAPgryA...2my7he
            </Typography>
          </Box>
        </PageWrapper>
      </ScreenContent>
    </Screen>
  );
};
