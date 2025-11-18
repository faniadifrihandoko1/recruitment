"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import PageContainer from "@/component/shared/PageContainer";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  ChipProps,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
// import { usePathname } from "next/navigation";
// import { usePathname as useI8nPathname } from "@/i18n/navigation";

const stats = [
  {
    label: "Total pelamar",
    value: "1.248",
    change: "+18%",
    color: "#ECE5FF",
  },
  {
    label: "Lowongan aktif",
    value: "32",
    change: "+4",
    color: "#DDF2FF",
  },
  {
    label: "Tahap interview",
    value: "67",
    change: "+9",
    color: "#FFE7D7",
  },
  {
    label: "Diterima bulan ini",
    value: "14",
    change: "+2",
    color: "#DFF6EC",
  },
];

const pipeline = [
  { stage: "Screening CV", count: 324, percent: 72 },
  { stage: "HR Interview", count: 124, percent: 48 },
  { stage: "User Interview", count: 67, percent: 28 },
  { stage: "Offer", count: 21, percent: 12 },
];

const openings: Array<{
  role: string;
  applicants: number;
  status: string;
  color: ChipProps["color"];
}> = [
  {
    role: "Frontend Engineer",
    applicants: 82,
    status: "Urgent",
    color: "error",
  },
  {
    role: "Product Manager",
    applicants: 45,
    status: "Open",
    color: "warning",
  },
  {
    role: "QA Specialist",
    applicants: 38,
    status: "Interview",
    color: "info",
  },
  {
    role: "Data Analyst",
    applicants: 24,
    status: "Screening",
    color: "default",
  },
];

const latestApplicants = [
  {
    name: "Safira Amanda",
    role: "UX Researcher",
    score: "92/100",
    status: "Interview",
    avatar: "SA",
  },
  {
    name: "Farhan Pratama",
    role: "Backend Engineer",
    score: "88/100",
    status: "Screening",
    avatar: "FP",
  },
  {
    name: "Mila Rosita",
    role: "HR Generalist",
    score: "85/100",
    status: "Offer",
    avatar: "MR",
  },
];

export default function DashboardAdminView() {
  const t = useTranslations("page.dashboard");

  return (
    <PageContainer title={t("title")}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <DashboardCard>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ maxWidth: "520px" }}>
              <Typography variant="h4" fontWeight={600} color="#2A3547" mb={1}>
                {t("description")}
              </Typography>
              <Typography color="text.secondary">
                Pantau performa rekrutmen, progres kandidat, dan lowongan aktif
                secara real-time di satu tempat.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5}>
              <Button variant="outlined" color="inherit">
                Ekspor data
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowOutwardIcon fontSize="small" />}
              >
                Buat lowongan
              </Button>
            </Stack>
          </Box>
        </DashboardCard>

        <Grid container spacing={2.5} height={"auto"}>
          {stats.map(item => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.label}>
              <DashboardCard
                sx={{
                  backgroundColor: item.color,
                  borderColor: "transparent",
                }}
              >
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {item.label}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h4" fontWeight={600}>
                    {item.value}
                  </Typography>
                  <Chip
                    label={item.change}
                    color="success"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>
              </DashboardCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 8 }} sx={{ height: "100%" }}>
            <DashboardCard>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" fontWeight={600} mb={0.5}>
                    Funnel rekrutmen
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Update terakhir 5 menit lalu
                  </Typography>
                </Box>
                <Button size="small" color="inherit">
                  Lihat detail
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={3}>
                {pipeline.map(item => (
                  <Box key={item.stage}>
                    <Stack
                      direction="row"
                      alignItems="baseline"
                      justifyContent="space-between"
                      mb={0.5}
                    >
                      <Typography fontWeight={500}>{item.stage}</Typography>
                      <Typography color="text.secondary">
                        {item.count} kandidat
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={item.percent}
                      sx={{
                        height: 10,
                        borderRadius: 999,
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 999,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }} sx={{ height: "100%" }}>
            <DashboardCard sx={{ pb: 6.5 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Aktivitas hari ini
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                6 interview terjadwal · 2 offer menunggu approval
              </Typography>

              <Stack spacing={2.5}>
                <Box>
                  <Typography fontWeight={600}>Panel interview</Typography>
                  <AvatarGroup max={4} sx={{ mt: 1 }}>
                    <Avatar>SJ</Avatar>
                    <Avatar>AP</Avatar>
                    <Avatar>MR</Avatar>
                    <Avatar>LS</Avatar>
                    <Avatar>HZ</Avatar>
                  </AvatarGroup>
                </Box>

                <Box>
                  <Typography fontWeight={600}>Agenda terdekat</Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    10:30 · Final interview Product Manager
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    13:00 · Offer call Frontend Engineer
                  </Typography>
                </Box>

                <Button variant="contained" fullWidth>
                  Lihat kalender
                </Button>
              </Stack>
            </DashboardCard>
          </Grid>
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 7 }}>
            <DashboardCard>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight={600}>
                  Lowongan aktif
                </Typography>
                <Button size="small" color="inherit">
                  Kelola lowongan
                </Button>
              </Stack>

              <Stack spacing={2}>
                {openings.map(role => (
                  <Box
                    key={role.role}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography fontWeight={600}>{role.role}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {role.applicants} pelamar aktif
                      </Typography>
                    </Box>
                    <Chip
                      label={role.status}
                      color={role.color}
                      variant="outlined"
                    />
                  </Box>
                ))}
              </Stack>
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <DashboardCard sx={{ pb: 5 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Pelamar terbaru
              </Typography>
              <Stack spacing={3}>
                {latestApplicants.map(candidate => (
                  <Box
                    key={candidate.name}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: "#EEF2FF", color: "#5563DD" }}>
                        {candidate.avatar}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600}>
                          {candidate.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {candidate.role}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack alignItems="flex-end">
                      <Chip label={candidate.status} size="small" />
                      <Typography variant="caption" mt={0.5}>
                        {candidate.score}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
