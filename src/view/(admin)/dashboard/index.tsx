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
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
// import { usePathname } from "next/navigation";
// import { usePathname as useI8nPathname } from "@/i18n/navigation";

const moduleCatalog = [
  {
    name: "Tes Kompetensi 1",
    description: "Tes dasar kemampuan logika & numerik.",
    type: "Tes 1",
    owner: "Assessment Center",
    duration: "45 menit",
  },
  {
    name: "Tes Kompetensi 2",
    description: "Tes teknis sesuai job family.",
    type: "Tes 2",
    owner: "Hiring Manager",
    duration: "60 menit",
  },
  {
    name: "Assessment Project",
    description: "Studi kasus berbasis proyek nyata.",
    type: "Assessment",
    owner: "Divisi Rekrutmen",
    duration: "3 hari",
  },
  {
    name: "Final Interview",
    description: "Wawancara panel user & HR.",
    type: "Interview",
    owner: "Panel Interview",
    duration: "90 menit",
  },
];

const recruitmentProjects = [
  {
    name: "Project Transformasi Digital",
    owner: "Divisi TI",
    timeline: "Jan - Apr 2025",
    status: "Berjalan",
    positions: [
      {
        title: "Frontend Lead",
        headcount: 3,
        applicants: 42,
        modules: ["Tes Kompetensi 1", "Tes Kompetensi 2", "Final Interview"],
      },
      {
        title: "Product Owner",
        headcount: 2,
        applicants: 28,
        modules: ["Tes Kompetensi 1", "Assessment Project", "Final Interview"],
      },
      {
        title: "QA Automation",
        headcount: 2,
        applicants: 33,
        modules: ["Tes Kompetensi 2", "Assessment Project"],
      },
    ],
  },
  {
    name: "Project Ekspansi Regional",
    owner: "Divisi Operasional",
    timeline: "Feb - Jun 2025",
    status: "Perencanaan",
    positions: [
      {
        title: "Area Manager",
        headcount: 4,
        applicants: 51,
        modules: ["Tes Kompetensi 1", "Final Interview"],
      },
      {
        title: "Business Analyst",
        headcount: 3,
        applicants: 37,
        modules: ["Tes Kompetensi 1", "Tes Kompetensi 2", "Assessment Project"],
      },
    ],
  },
  {
    name: "Project Modernisasi Operasional",
    owner: "Divisi Support",
    timeline: "Mar - Jul 2025",
    status: "Onboarding",
    positions: [
      {
        title: "HRIS Specialist",
        headcount: 2,
        applicants: 19,
        modules: ["Tes Kompetensi 1", "Assessment Project", "Final Interview"],
      },
      {
        title: "Training Coordinator",
        headcount: 1,
        applicants: 14,
        modules: ["Tes Kompetensi 1", "Final Interview"],
      },
    ],
  },
];

const totalProjects = recruitmentProjects.length;
const totalPositions = recruitmentProjects.reduce(
  (acc, project) => acc + project.positions.length,
  0
);
const moduleUsageCount = recruitmentProjects.reduce<Record<string, number>>(
  (acc, project) => {
    project.positions.forEach(position => {
      position.modules.forEach(module => {
        acc[module] = (acc[module] ?? 0) + 1;
      });
    });

    return acc;
  },
  {}
);
const totalModulesUsed = Object.keys(moduleUsageCount).length;

const stats = [
  {
    label: "Total project",
    value: totalProjects,
    helper: "Aktif & perencanaan",
    color: "#ECE5FF",
  },
  {
    label: "Total posisi",
    value: totalPositions,
    helper: "Butuh alokasi modul",
    color: "#DDF2FF",
  },
  {
    label: "Master modul",
    value: moduleCatalog.length,
    helper: "Siap dipakai posisi",
    color: "#FFE7D7",
  },
  {
    label: "Modul terpasang",
    value: totalModulesUsed,
    helper: "Digunakan posisi aktif",
    color: "#DFF6EC",
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
                <Typography variant="h4" fontWeight={600}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.helper}
                </Typography>
              </DashboardCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <DashboardCard sx={{ pb: 4 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                gap={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Project & posisi
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pantau keterhubungan project, posisi, dan modul.
                  </Typography>
                </Box>
                <Button size="small" color="inherit">
                  Kelola project
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={3}>
                {recruitmentProjects.map(project => (
                  <Box key={project.name}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", md: "center" }}
                      gap={1}
                    >
                      <Box>
                        <Typography fontWeight={600}>{project.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {project.owner} · {project.timeline}
                        </Typography>
                      </Box>
                      <Chip
                        label={project.status}
                        color="primary"
                        variant="outlined"
                      />
                    </Stack>

                    <Stack spacing={1.5} mt={2}>
                      {project.positions.map(position => (
                        <Box
                          key={position.title}
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            p: 1.5,
                          }}
                        >
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            justifyContent="space-between"
                            gap={1}
                          >
                            <Box>
                              <Typography fontWeight={600}>
                                {position.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Target {position.headcount} orang ·{" "}
                                {position.applicants} pelamar
                              </Typography>
                            </Box>
                            <Chip
                              label={`${position.modules.length} modul`}
                              color="success"
                              size="small"
                            />
                          </Stack>
                          <Stack
                            direction="row"
                            flexWrap="wrap"
                            gap={1}
                            mt={1.5}
                          >
                            {position.modules.map(module => (
                              <Chip
                                key={module}
                                label={module}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <DashboardCard sx={{ pb: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Master modul
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Atur modul tes, assessment, dan interview sekali, lalu hubungkan
                ke posisi.
              </Typography>

              <Stack spacing={2.5}>
                {moduleCatalog.map(module => (
                  <Box
                    key={module.name}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      p: 1.5,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap={1}
                    >
                      <Typography fontWeight={600}>{module.name}</Typography>
                      <Chip label={module.type} size="small" color="info" />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      {module.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {module.owner} · {module.duration}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Digunakan di{" "}
                        <strong>{moduleUsageCount[module.name] ?? 0}</strong>{" "}
                        posisi
                      </Typography>
                      <Button size="small">Pengaturan</Button>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </DashboardCard>
          </Grid>
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 7 }}>
            <DashboardCard sx={{ pb: 4 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                gap={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Adopsi modul
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seberapa banyak modul digunakan di posisi aktif.
                  </Typography>
                </Box>
                <Button size="small" color="inherit">
                  Lihat detail
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2.5}>
                {moduleCatalog.map(module => {
                  const usage = moduleUsageCount[module.name] ?? 0;
                  const percent = totalPositions
                    ? Math.round((usage / totalPositions) * 100)
                    : 0;

                  return (
                    <Box key={`${module.name}-usage`}>
                      <Stack
                        direction="row"
                        alignItems="baseline"
                        justifyContent="space-between"
                        mb={0.5}
                      >
                        <Typography fontWeight={500}>{module.name}</Typography>
                        <Typography color="text.secondary">
                          {usage} posisi · {percent}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{
                          height: 10,
                          borderRadius: 999,
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 999,
                          },
                        }}
                      />
                    </Box>
                  );
                })}
              </Stack>
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <DashboardCard sx={{ pb: 5 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Konfigurasi terbaru
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Posisi yang baru ditambahkan modulnya minggu ini.
              </Typography>

              <Stack spacing={2.5}>
                {recruitmentProjects
                  .flatMap(project =>
                    project.positions.map(position => ({
                      project: project.name,
                      title: position.title,
                      modules: position.modules,
                    }))
                  )
                  .slice(0, 4)
                  .map(position => (
                    <Box
                      key={`${position.project}-${position.title}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack spacing={0.5}>
                        <Typography fontWeight={600}>
                          {position.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {position.project}
                        </Typography>
                      </Stack>
                      <AvatarGroup
                        max={3}
                        sx={{ "& .MuiAvatar-root": { width: 28, height: 28 } }}
                      >
                        {position.modules.map(module => (
                          <Avatar key={module}>
                            {module
                              .split(" ")
                              .map(word => word[0])
                              .join("")
                              .slice(0, 2)}
                          </Avatar>
                        ))}
                      </AvatarGroup>
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
