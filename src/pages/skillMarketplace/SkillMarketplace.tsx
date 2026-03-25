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
    name: "📰 全球每日新闻 Top 10",
    icon: "📰",
    description:
      "每日抓取路透社、美联社等主流媒体的头条，利用 AI 进行去重、翻译并提炼核心摘要。强调信息降噪，用户不需要在几十个频道里刷消息，只需一键获得全球局势。",
    command: "/news",
    price: "0.01 TON",
  },
  {
    id: "skill_weather_002",
    name: "🌤️ 智能天气管家",
    icon: "🌤️",
    description:
      "接入高精度气象 API（如 OpenWeather），预测未来 15 天。AI 会自动判断降水概率，并给出具体的带伞建议。强调决策辅助，它不是冷冰冰的数据，而是人性化的生活助理。",
    command: "/weather 北京",
    price: "0.01 TON",
  },
  {
    id: "skill_tech_003",
    name: "🔥 极客技术热点",
    icon: "🔥",
    description:
      "扫描 GitHub Trending、Hacker News 以及顶级科技大厂（如 OpenAI, Google）的博客，总结出当前最火的 10 个技术点。强调专业深度，面向开发者和极客，解决技术焦虑。",
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
              SkillBay - AI 技能市场
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              在 Telegram 内发现、购买并立即使用 AI 技能
              <br />
              基于 TON 区块链的去中心化支付
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
                        使用命令:
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {skill.command}
                      </Typography>
                    </Box>
                    <PriceTag>价格: {skill.price}</PriceTag>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => handlePurchase(skill.id)}>
                      立即购买
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <Box mt={6} p={3} sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              💡 如何使用
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              <ol style={{ paddingLeft: 20 }}>
                <li>选择您感兴趣的 AI 技能</li>
                <li>点击"立即购买"并连接 TON 钱包</li>
                <li>完成 0.01 TON 的支付</li>
                <li>获得激活码（如 NEWS2026、WEATHER2026、TECH2026）</li>
                <li>在 Telegram Bot 中使用对应命令即可调用技能</li>
              </ol>
            </Typography>
          </Box>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              支付网络: Testnet | 合约地址: EQAPgryA...2my7he
            </Typography>
          </Box>
        </PageWrapper>
      </ScreenContent>
    </Screen>
  );
};
