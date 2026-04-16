import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Screen, ScreenContent } from "components/Screen";

const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  maxWidth: 1200,
  margin: "0 auto",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  borderRadius: 16,
  boxShadow: "0px 8px 24px rgba(60, 132, 246, 0.08)",
  border: "1px solid rgba(232, 232, 232, 0.6)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0px 16px 40px rgba(60, 132, 246, 0.16)",
    borderColor: "rgba(60, 132, 246, 0.3)",
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #D4A5F5 0%, #F78DC7 100%)",
  padding: theme.spacing(3),
  borderRadius: "16px 16px 0 0",
  color: "#FFFFFF",
}));

const SkillIcon = styled(Box)({
  fontSize: "56px",
  marginBottom: "8px",
  textAlign: "center",
});

const PriceTag = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #D4A5F5 0%, #F78DC7 100%)",
  color: "#FFFFFF",
  fontWeight: 700,
  fontSize: "18px",
  padding: theme.spacing(2),
  borderRadius: 12,
  textAlign: "center",
  marginTop: "auto",
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #D4A5F5 0%, #F78DC7 100%)",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: theme.spacing(1.5, 3),
  borderRadius: 12,
  textTransform: "none",
  fontSize: "16px",
  boxShadow: "0px 4px 12px rgba(247, 141, 199, 0.25)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #F78DC7 0%, #D4A5F5 100%)",
    boxShadow: "0px 6px 20px rgba(247, 141, 199, 0.35)",
    transform: "translateY(-2px)",
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  background: "rgba(161, 222, 254, 0.08)",
  padding: theme.spacing(4),
  borderRadius: 16,
  border: "1px solid rgba(161, 222, 254, 0.3)",
}));

interface Skill {
  id: string;
  name: string;
  icon: string;
  description: string;
  command: string;
  price: string;
}

const skills: Skill[] = [
  {
    id: "skill_news_001",
    name: "Daily News Top 10",
    icon: "📰",
    description:
      "Scrapes headlines from Reuters, AP, and other mainstream media. AI deduplicates, translates, and extracts core summaries. Emphasizes information noise reduction—users don't need to scroll through dozens of channels.",
    command: "/news",
    price: "0.01 TON",
  },
  {
    id: "skill_weather_002",
    name: "Smart Weather Assistant",
    icon: "🌤️",
    description:
      "Integrates high-precision weather APIs to forecast the next 15 days. AI automatically judges precipitation probability and gives specific umbrella recommendations. Emphasizes decision support.",
    command: "/weather Beijing",
    price: "0.01 TON",
  },
  {
    id: "skill_tech_003",
    name: "Tech Trends Weekly",
    icon: "🔥",
    description:
      "Scans GitHub Trending, Hacker News, and blogs from top tech companies to summarize the 10 hottest tech topics. Emphasizes professional depth for developers and geeks.",
    command: "/tech",
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
            <Typography
              variant="h2"
              gutterBottom
              fontWeight={700}
              sx={{
                background: "linear-gradient(90deg, #D4A5F5 0%, #F78DC7 50%, #F78DC7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 2,
              }}>
              SkillBay - AI Skills Marketplace
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#FF6BB5",
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.8,
                fontWeight: 500,
              }}>
              Discover, purchase and use AI skills in Telegram
              <br />
              Powered by TON blockchain payments
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {skills.map((skill) => (
              <Grid item xs={12} md={4} key={skill.id}>
                <StyledCard>
                  <CardHeader>
                    <SkillIcon>{skill.icon}</SkillIcon>
                    <Typography variant="h5" fontWeight={700} textAlign="center">
                      {skill.name}
                    </Typography>
                  </CardHeader>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      p: 3,
                      gap: 2,
                    }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7, flexGrow: 1 }}>
                      {skill.description}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: "rgba(163, 194, 238, 0.1)",
                        p: 2,
                        borderRadius: 2,
                        border: "1px solid rgba(163, 194, 238, 0.3)",
                      }}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Command:
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{
                          fontFamily: "monospace",
                          color: "#3C84F6",
                        }}>
                        {skill.command}
                      </Typography>
                    </Box>
                    <PriceTag>
                      <Typography variant="body1" fontWeight={700}>
                        {skill.price}
                      </Typography>
                    </PriceTag>
                    <GradientButton fullWidth size="large" onClick={() => handlePurchase(skill.id)}>
                      Purchase Now
                    </GradientButton>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <InfoBox mt={8}>
            <Typography variant="h6" gutterBottom fontWeight={700} color="primary.main" mb={3}>
              💡 How to Use
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
