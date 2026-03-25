import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Screen, ScreenContent } from "components/Screen";

const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
  margin: "0 auto",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const SkillIcon = styled(Box)({
  fontSize: "48px",
  marginBottom: "16px",
});

const PriceTag = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: "20px",
  marginTop: "auto",
  paddingTop: theme.spacing(2),
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
    name: "📰 Daily News Top 10",
    icon: "📰",
    description:
      "Scrapes headlines from Reuters, AP, and other mainstream media. AI deduplicates, translates, and extracts core summaries. Emphasizes information noise reduction—users don't need to scroll through dozens of channels, just get the global situation with one click.",
    command: "/news",
    price: "0.01 TON",
  },
  {
    id: "skill_weather_002",
    name: "🌤️ Smart Weather Assistant",
    icon: "🌤️",
    description:
      "Integrates high-precision weather APIs (like OpenWeather) to forecast the next 15 days. AI automatically judges precipitation probability and gives specific umbrella recommendations. Emphasizes decision support—it's not cold data, but a humanized life assistant.",
    command: "/weather Beijing",
    price: "0.01 TON",
  },
  {
    id: "skill_tech_003",
    name: "🔥 Tech Trends Weekly",
    icon: "🔥",
    description:
      "Scans GitHub Trending, Hacker News, and blogs from top tech companies (like OpenAI, Google) to summarize the 10 hottest tech topics. Emphasizes professional depth, targeting developers and geeks to solve tech anxiety.",
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
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" gutterBottom fontWeight={700}>
              SkillBay - AI Skills Marketplace
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              Discover, purchase and use AI skills in Telegram
              <br />
              Powered by TON blockchain payments
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {skills.map((skill) => (
              <Grid item xs={12} md={4} key={skill.id}>
                <StyledCard>
                  <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <SkillIcon>{skill.icon}</SkillIcon>
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {skill.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {skill.description}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: "#f5f5f5",
                        p: 1.5,
                        borderRadius: 1,
                        mb: 2,
                        fontFamily: "monospace",
                      }}>
                      <Typography variant="body2" color="text.secondary">
                        Command:
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {skill.command}
                      </Typography>
                    </Box>
                    <PriceTag>Price: {skill.price}</PriceTag>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => handlePurchase(skill.id)}>
                      Purchase Now
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <Box mt={6} p={3} sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              💡 How to Use
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              <ol style={{ paddingLeft: 20 }}>
                <li>Choose an AI skill you're interested in</li>
                <li>Click "Purchase Now" and connect your TON wallet</li>
                <li>Complete the 0.01 TON payment</li>
                <li>Receive activation code (e.g., NEWS2026, WEATHER2026, TECH2026)</li>
                <li>Use the corresponding command in Telegram Bot to activate the skill</li>
              </ol>
            </Typography>
          </Box>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Network: Testnet | Contract: EQAPgryA...2my7he
            </Typography>
          </Box>
        </PageWrapper>
      </ScreenContent>
    </Screen>
  );
};
