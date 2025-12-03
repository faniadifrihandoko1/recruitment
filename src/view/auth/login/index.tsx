"use client";

import { useLogin } from "@/hooks/mutation/auth/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "./schema/login.schema";

const LoginView = () => {
  const locale = useLocale();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (values: LoginSchemaType) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await mutateAsync({
        username: values.username,
        password: values.password,
      });

      console.log("response", response.data.token);

      router.push(`/${locale}/dashboard`);

      setSuccess("Login berhasil");
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ?? "Login gagal, silakan coba lagi.";
      setError(message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error ? (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{
            mb: 2,
            backgroundColor: "#ffebee",
            color: "#c62828",
            border: "1px solid #ef5350",
            borderRadius: "8px",
            "& .MuiAlert-icon": {
              color: "#c62828",
            },
            "& .MuiAlert-closeButton": {
              color: "#c62828",
            },
          }}
        >
          {error}
        </Alert>
      ) : null}

      {success ? (
        <Alert
          severity="success"
          onClose={() => setSuccess(null)}
          sx={{
            mb: 2,
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            border: "1px solid #4caf50",
            borderRadius: "8px",
            "& .MuiAlert-icon": {
              color: "#2e7d32",
            },
            "& .MuiAlert-closeButton": {
              color: "#2e7d32",
            },
          }}
        >
          {success}
        </Alert>
      ) : null}
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Username
          </Typography>
          <TextField
            {...register("username")}
            placeholder="Masukkan username"
            required
            fullWidth
            autoComplete="username"
            error={!!errors.username}
            helperText={errors.username?.message}
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
          </Stack>
          <TextField
            {...register("password")}
            placeholder="Masukkan password"
            required
            fullWidth
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
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
          {/* <MuiLink
            component={NextLink}
            href="/"
            underline="hover"
            fontWeight={600}
          >
            Lupa password?
          </MuiLink> */}
        </Stack>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isPending}
          startIcon={
            isPending ? <CircularProgress color="inherit" size={20} /> : null
          }
        >
          {isPending ? "Memproses..." : "Masuk"}
        </Button>

        {/* <Stack direction="row" justifyContent="center" spacing={1}>
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
        </Stack> */}
      </Stack>
    </Box>
  );
};

export default LoginView;
