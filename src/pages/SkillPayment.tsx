import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { toNano } from "ton";
import useNotification from "hooks/useNotification";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: "0 auto",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const PAYMENT_CONTRACT =
  process.env.REACT_APP_PAYMENT_CONTRACT || "EQAPgryAPFuCLXfblAa8hcLjIMeaRJS-B3bxtu5enj2my7he";
const PAYMENT_AMOUNT = "0.01";

interface SkillInfo {
  id: string;
  name: string;
  description: string;
}

const getSkillFromUrl = (): SkillInfo | null => {
  const params = new URLSearchParams(window.location.search);
  const startapp = params.get("startapp");

  if (!startapp) return null;

  const skills: Record<string, SkillInfo> = {
    skill_news_001: {
      id: "skill_news_001",
      name: "Daily News Top 10",
      description:
        "Scrapes headlines from Reuters, AP, and other mainstream media. AI deduplicates, translates, and extracts core summaries. Emphasizes information noise reduction—users don't need to scroll through dozens of channels.",
    },
    skill_weather_002: {
      id: "skill_weather_002",
      name: "Smart Weather Assistant",
      description:
        "Integrates high-precision weather APIs (like OpenWeather) to forecast the next 15 days. AI automatically judges precipitation probability and gives specific umbrella recommendations. Emphasizes decision support.",
    },
    skill_tech_003: {
      id: "skill_tech_003",
      name: "Tech Trends Weekly",
      description:
        "Scans GitHub Trending, Hacker News, and blogs from top tech companies (like OpenAI, Google) to summarize the 10 hottest tech topics. Emphasizes professional depth for developers and geeks.",
    },
  };

  return skills[startapp] || null;
};

// 生成激活码：根据技能 ID 返回固定格式的激活码
const generateActivationCode = (skillId: string): string => {
  const activationCodes: Record<string, string> = {
    skill_news_001: "NEWS2026",
    skill_weather_002: "WEATHER2026",
    skill_tech_003: "TECH2026",
  };
  return activationCodes[skillId] || "UNKNOWN2026";
};

// 复制到剪贴板
const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // 降级方案
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
};

export const SkillPayment = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const { showNotification } = useNotification();

  const [skill, setSkill] = useState<SkillInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activationCode, setActivationCode] = useState<string>("");

  useEffect(() => {
    const skillInfo = getSkillFromUrl();
    setSkill(skillInfo);

    if (!skillInfo) {
      showNotification("Skill information not found", "error");
    }

    if ((window as any).Telegram?.WebApp) {
      (window as any).Telegram.WebApp.ready();
      (window as any).Telegram.WebApp.expand();
    }
  }, [showNotification]);

  const handlePayment = async () => {
    if (!userAddress) {
      showNotification("Please connect wallet first", "warning");
      return;
    }

    if (!skill) {
      showNotification("Skill information error", "error");
      return;
    }

    setLoading(true);

    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: PAYMENT_CONTRACT,
            amount: toNano(PAYMENT_AMOUNT).toString(),
            payload: "",
          },
        ],
      };

      const result = await tonConnectUI.sendTransaction(transaction);

      // 生成激活码
      const code = generateActivationCode(skill.id);
      setActivationCode(code);

      setPaymentSuccess(true);
      showNotification(`Payment successful! Skill unlocked: ${skill.name}`, "success");

      if ((window as any).Telegram?.WebApp) {
        (window as any).Telegram.WebApp.sendData(
          JSON.stringify({
            action: "payment_success",
            skillId: skill.id,
            txHash: result.boc,
            activationCode: code,
          }),
        );

        setTimeout(() => {
          (window as any).Telegram.WebApp.close();
        }, 5000);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      showNotification(`Payment failed: ${error instanceof Error ? error.message : "Unknown error"}`, "error");
    } finally {
      setLoading(false);
    }
  };

  if (!skill) {
    return (
      <PageWrapper>
        <Typography variant="h5" gutterBottom>
          Loading...
        </Typography>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Typography variant="h4" gutterBottom align="center">
        Skill Payment
      </Typography>

      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {skill.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {skill.description}
          </Typography>
          <Typography variant="body1" color="primary">
            Price: {PAYMENT_AMOUNT} TON
          </Typography>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>
            Payment Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Contract: {PAYMENT_CONTRACT.slice(0, 8)}...{PAYMENT_CONTRACT.slice(-6)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Network: Testnet
          </Typography>
        </CardContent>
      </StyledCard>

      {!userAddress ? (
        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please connect your TON wallet
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => tonConnectUI.openModal()}>
            Connect Wallet
          </Button>
        </Box>
      ) : paymentSuccess ? (
        <Box textAlign="center" mt={3}>
          <Typography variant="h6" color="success.main" gutterBottom>
            ✅ Payment Successful!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            You have successfully unlocked: {skill.name}
          </Typography>

          <Box mt={3} mb={2}>
            <Typography variant="subtitle2" gutterBottom>
              Activation Code (Backup)
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                fullWidth
                value={activationCode}
                InputProps={{
                  readOnly: true,
                  style: { fontFamily: "monospace", fontSize: "0.9rem" },
                }}
                size="small"
              />
              <IconButton
                color="primary"
                onClick={() => {
                  copyToClipboard(activationCode);
                  showNotification("Activation code copied", "success");
                }}>
                <ContentCopyIcon />
              </IconButton>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              If the Bot doesn't auto-activate, enter this code in the chat
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Returning to Bot...
          </Typography>
        </Box>
      ) : (
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handlePayment}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}>
            {loading ? "Processing..." : `Pay ${PAYMENT_AMOUNT} TON`}
          </Button>

          <Typography variant="caption" color="text.secondary" display="block" mt={2}>
            Wallet: {userAddress.slice(0, 8)}...{userAddress.slice(-6)}
          </Typography>
        </Box>
      )}
    </PageWrapper>
  );
};
