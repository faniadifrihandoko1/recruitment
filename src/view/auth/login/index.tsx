"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FAKE_AUTH_COOKIE, fakeLogin } from "@/utils/auth/fakeAuth";

const REMEMBER_KEY = "recruitment:rememberedEmail";
const USER_STORAGE_KEY = "recruitment:auth-user";

const normalizeLocale = (rawLocale: string | string[] | undefined) => {
  if (!rawLocale) return "id";

  if (Array.isArray(rawLocale)) {
    return rawLocale[0] || "id";
  }

  return rawLocale;
};

const LoginView = () => {
  const router = useRouter();
  const params = useParams();
  const locale = normalizeLocale(params?.locale);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedEmail = window.localStorage.getItem(REMEMBER_KEY);
    if (storedEmail) {
      setEmail(storedEmail);
      setRemember(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (remember && email) {
      window.localStorage.setItem(REMEMBER_KEY, email);
    } else {
      window.localStorage.removeItem(REMEMBER_KEY);
    }
  }, [remember, email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { token, user } = await fakeLogin(email, password);

      if (typeof window !== "undefined") {
        const cookieParts = [
          `${FAKE_AUTH_COOKIE}=${token}`,
          "path=/",
          `max-age=${60 * 60 * 6}`,
          "sameSite=lax",
        ];

        if (window.location.protocol === "https:") {
          cookieParts.push("secure");
        }

        document.cookie = cookieParts.join("; ");
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }

      setSuccess("Login berhasil! Mengarahkan ke dashboard...");
      setPassword("");

      setTimeout(() => {
        router.push(`/${locale}/dashboard`);
      }, 900);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Gagal melakukan login. Coba lagi.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Email
          </Typography>
          <TextField
            name="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
            fullWidth
            autoComplete="email"
          />
        </Box>
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Password
            </Typography>
            <Typography variant="body2" color="primary">
              Hint: password123
            </Typography>
          </Stack>
          <TextField
            name="password"
            placeholder="Masukkan password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            fullWidth
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    onClick={() => setShowPassword(prev => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={event => setRemember(event.target.checked)}
              />
            }
            label="Ingat saya"
          />
          <MuiLink
            component={NextLink}
            href="/"
            underline="hover"
            fontWeight={600}
          >
            Lupa password?
          </MuiLink>
        </Stack>

        {error ? (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        ) : null}

        {success ? (
          <Alert severity="success" onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        ) : null}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={loading}
          startIcon={
            loading ? <CircularProgress color="inherit" size={20} /> : null
          }
        >
          {loading ? "Memproses..." : "Masuk"}
        </Button>

        <Stack direction="row" justifyContent="center" spacing={1}>
          <Typography variant="body2" color="textSecondary">
            Belum punya akun?
          </Typography>
          <MuiLink
            component={NextLink}
            href={`/${locale}/authentication/register`}
            underline="hover"
            fontWeight={600}
          >
            Daftar sekarang
          </MuiLink>
        </Stack>

        <Alert severity="info" icon={false}>
          Gunakan `admin@example.com` / `password123` atau
          `recruiter@example.com` / `recruitme` untuk demo.
        </Alert>
      </Stack>
    </Box>
  );
};

export default LoginView;
