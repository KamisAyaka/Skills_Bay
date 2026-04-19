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
  padding: theme.spacing(5, 4),
  maxWidth: 600,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 2),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  background: "#FFFFFF",
  borderRadius: 16,
  boxShadow: "0px 8px 24px rgba(60, 132, 246, 0.08)",
  border: "1px solid rgba(232, 232, 232, 0.6)",
  overflow: "hidden",
}));

const CardHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #A3C2EE 0%, #6999E9 60%, #5E90E3 100%)",
  padding: theme.spacing(3),
  color: "#FFFFFF",
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #3C84F6 0%, #2B71E4 55%, #1F5FD6 100%)",
  color: "#FFFFFF",
  fontWeight: 700,
  padding: theme.spacing(1.5, 3),
  borderRadius: 12,
  textTransform: "none",
  fontSize: "16px",
  boxShadow: "0px 8px 20px rgba(60, 132, 246, 0.24)",
  transition: "transform 220ms ease-out, box-shadow 220ms ease-out, background-color 220ms ease-out",
  "&:hover": {
    background: "linear-gradient(135deg, #2B71E4 0%, #1F5FD6 100%)",
    boxShadow: "0px 10px 24px rgba(60, 132, 246, 0.28)",
    transform: "translateY(-1px)",
  },
  "&:disabled": {
    background: "#E8E8E8",
    color: "#B2B2B2",
  },
}));

const SuccessBox = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, rgba(57, 196, 108, 0.1) 0%, rgba(57, 196, 108, 0.05) 100%)",
  padding: theme.spacing(3),
  borderRadius: 16,
  border: "1px solid rgba(57, 196, 108, 0.3)",
  textAlign: "center",
}));

const InfoBox = styled(Box)(({ theme }) => ({
  background: "rgba(163, 194, 238, 0.12)",
  padding: theme.spacing(2),
  borderRadius: 12,
  border: "1px solid rgba(163, 194, 238, 0.35)",
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
    skill_summary_004: {
      id: "skill_summary_004",
      name: "Long Document Summarizer",
      description:
        "Summarizes long articles, docs, and reports into key bullet points with action items. Useful for meeting notes, research papers, and PRD reviews.",
    },
    skill_translate_005: {
      id: "skill_translate_005",
      name: "Smart Translator Pro",
      description:
        "Provides context-aware translation across major languages and preserves tone for work messages. Ideal for bilingual communication and global collaboration.",
    },
    skill_reminder_006: {
      id: "skill_reminder_006",
      name: "Reminder & To-Do Copilot",
      description:
        "Creates reminders and lightweight task lists directly in chat, including recurring schedules. Great for daily planning and team follow-ups in Telegram.",
    },
    skill_crypto_007: {
      id: "skill_crypto_007",
      name: "Crypto Market Pulse",
      description:
        "Delivers real-time crypto prices, 24h movement, and quick trend snapshots. Helps users check market conditions fast without leaving Telegram.",
    },
  };

  return skills[startapp] || null;
};

const generateActivationCode = (skillId: string): string => {
  const activationCodes: Record<string, string> = {
    skill_news_001: "NEWS2026",
    skill_weather_002: "WEATHER2026",
    skill_tech_003: "TECH2026",
    skill_summary_004: "SUMMARY2026",
    skill_translate_005: "TRANSLATE2026",
    skill_reminder_006: "REMIND2026",
    skill_crypto_007: "CRYPTO2026",
  };
  return activationCodes[skillId] || "UNKNOWN2026";
};

const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
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
      showNotification(
        `Payment failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!skill) {
    return (
      <PageWrapper>
        <Box textAlign="center" mt={8}>
          <CircularProgress size={48} sx={{ color: "#3C84F6" }} />
          <Typography variant="h6" color="text.secondary" mt={3}>
            Loading...
          </Typography>
        </Box>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Typography variant="h4" gutterBottom align="center" fontWeight={700} sx={{ mb: 4 }}>
        Skill <Box component="span" sx={{ color: "#3C84F6" }}>Payment</Box>
      </Typography>

      <StyledCard>
        <CardHeader>
          <Typography variant="h5" fontWeight={700}>
            {skill.name}
          </Typography>
        </CardHeader>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
            {skill.description}
          </Typography>
          <InfoBox>
            <Typography variant="h6" color="primary.main" fontWeight={700}>
              {PAYMENT_AMOUNT} TON
            </Typography>
          </InfoBox>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" gutterBottom fontWeight={600} color="text.primary">
            Payment Information
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontFamily: "monospace" }}>
            Contract: {PAYMENT_CONTRACT.slice(0, 8)}...{PAYMENT_CONTRACT.slice(-6)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Network: Testnet
          </Typography>
        </CardContent>
      </StyledCard>

      {!userAddress ? (
        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please connect your TON wallet
          </Typography>
          <PrimaryButton size="large" fullWidth onClick={() => tonConnectUI.openModal()}>
            Connect Wallet
          </PrimaryButton>
        </Box>
      ) : paymentSuccess ? (
        <SuccessBox mt={3}>
          <Typography variant="h5" sx={{ color: "#39C46C", mb: 2, fontWeight: 700 }}>
            Payment Successful!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You have successfully unlocked: {skill.name}
          </Typography>

          <Box
            sx={{
              background: "#FFFFFF",
              p: 3,
              borderRadius: 2,
              border: "1px solid rgba(163, 194, 238, 0.3)",
            }}>
            <Typography variant="subtitle2" gutterBottom fontWeight={600} color="text.primary">
              Activation Code (Backup)
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <TextField
                fullWidth
                value={activationCode}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily: "monospace",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#3C84F6",
                  },
                }}
                size="small"
              />
              <IconButton
                sx={{
                  color: "#3C84F6",
                  "&:hover": { background: "rgba(60, 132, 246, 0.08)" },
                }}
                onClick={() => {
                  copyToClipboard(activationCode);
                  showNotification("Activation code copied", "success");
                }}>
                <ContentCopyIcon />
              </IconButton>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" mt={2}>
              If the Bot doesn't auto-activate, enter this code in the chat
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" mt={3}>
            Returning to Bot...
          </Typography>
        </SuccessBox>
      ) : (
        <Box mt={3}>
          <PrimaryButton
            size="large"
            fullWidth
            onClick={handlePayment}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} sx={{ color: "#FFFFFF" }} /> : null}>
            {loading ? "Processing..." : `Pay ${PAYMENT_AMOUNT} TON`}
          </PrimaryButton>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
            mt={2}
            sx={{ fontFamily: "monospace" }}>
            Wallet: {userAddress.slice(0, 8)}...{userAddress.slice(-6)}
          </Typography>
        </Box>
      )}
    </PageWrapper>
  );
};
