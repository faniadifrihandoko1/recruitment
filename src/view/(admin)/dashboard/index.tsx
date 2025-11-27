"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import PageContainer from "@/component/shared/page-container";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
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

const quickStats = [
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

const jobVacancies = recruitmentProjects.flatMap(project =>
  project.positions.map(position => ({
    project: project.name,
    owner: project.owner,
    status: project.status,
    title: position.title,
    headcount: position.headcount,
    applicants: position.applicants,
    modules: position.modules,
  }))
);

const recruitmentFunnel = [
  { stage: "CV Screening", count: 128, trend: "+8%", module: "CV Screening" },
  { stage: "Online Test", count: 94, trend: "+5%", module: "Online Test" },
  { stage: "Interview", count: 41, trend: "-2%", module: "Interview" },
  { stage: "Psikotes", count: 27, trend: "+3%", module: "Psikotes" },
];

const activityLogs = [
  {
    title: "Modul Online Test diperbarui",
    detail: "Bank soal ditambah untuk posisi Frontend Lead",
    time: "2 jam lalu",
  },
  {
    title: "Kandidat lolos interview",
    detail: "3 kandidat Project Transformasi Digital masuk tahap Psikotes",
    time: "4 jam lalu",
  },
  {
    title: "Lowongan baru dibuat",
    detail: "Business Analyst (Project Ekspansi Regional)",
    time: "Kemarin",
  },
  {
    title: "Jadwal online test dipublikasikan",
    detail: "Assessment Project batch Maret",
    time: "Kemarin",
  },
];

const priorityAlerts = [
  {
    type: "Job Vacancy",
    message:
      "Headcount Area Manager tersisa 1 minggu sebelum target penutupan.",
    action: "Review pipeline",
  },
  {
    type: "Online Test",
    message: "Skor Online Test terakhir menunjukkan penurunan 10%.",
    action: "Analisis hasil",
  },
  {
    type: "Module",
    message: "Tes Kompetensi 2 belum dijadwalkan untuk 2 posisi.",
    action: "Atur jadwal",
  },
];

const upcomingSchedule = [
  {
    title: "Online Test Batch 12",
    date: "28 Mar 2025 · 09:00",
    related: "Project Transformasi Digital",
  },
  {
    title: "Panel Interview Product Owner",
    date: "29 Mar 2025 · 13:00",
    related: "Hiring Manager & HR",
  },
  {
    title: "Psikotes Area Manager",
    date: "31 Mar 2025 · 10:00",
    related: "Project Ekspansi Regional",
  },
];

const quickActions = [
  { label: "Tambah Project", helper: "Sinkron modul & jadwal" },
  { label: "Buat Job Vacancy", helper: "Publikasi kebutuhan baru" },
  { label: "Atur Online Test", helper: "Kelola batch & peserta" },
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
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
              {quickActions.map(action => (
                <Button
                  key={action.label}
                  variant={
                    action.label === "Buat Job Vacancy"
                      ? "contained"
                      : "outlined"
                  }
                  endIcon={<ArrowOutwardIcon fontSize="small" />}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </Box>
        </DashboardCard>

        <Grid container spacing={2.5} height={"auto"}>
          {quickStats.map(item => (
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
                    Active job list
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lowongan prioritas dengan kebutuhan modul CV screening,
                    online test, interview, dan psikotes.
                  </Typography>
                </Box>
                <Button size="small" color="inherit">
                  Kelola job
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2.5}>
                {jobVacancies
                  .sort((a, b) => b.applicants - a.applicants)
                  .slice(0, 5)
                  .map(job => (
                    <Box
                      key={`${job.project}-${job.title}`}
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
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        gap={1}
                      >
                        <Box>
                          <Typography fontWeight={600}>{job.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {job.project} · {job.owner}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Target {job.headcount} orang · {job.applicants}{" "}
                            pelamar
                          </Typography>
                        </Box>
                        <Chip
                          label={job.status}
                          color="primary"
                          variant="outlined"
                        />
                      </Stack>
                      <Stack direction="row" flexWrap="wrap" gap={1} mt={1.5}>
                        {job.modules.map(module => (
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
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <DashboardCard sx={{ pb: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Recruitment funnel
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Pergerakan kandidat lintas modul CV screening, online test,
                interview, dan psikotes.
              </Typography>

              <Stack spacing={2.5}>
                {recruitmentFunnel.map(stage => (
                  <Box key={stage.stage}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="baseline"
                    >
                      <Box>
                        <Typography fontWeight={600}>{stage.stage}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Modul {stage.module}
                        </Typography>
                      </Box>
                      <Typography color="success.main">
                        {stage.trend}
                      </Typography>
                    </Stack>
                    <Typography variant="h4" fontWeight={600} mt={0.5}>
                      {stage.count}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(stage.count, 100)}
                      sx={{
                        mt: 1,
                        height: 8,
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
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <DashboardCard sx={{ pb: 4 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                gap={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Project overview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hubungkan project, owner, timeline, dan progres module
                    deployment.
                  </Typography>
                </Box>
                <Button size="small" color="inherit">
                  Lihat project
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2.5}>
                {recruitmentProjects.map(project => {
                  const positions = project.positions.length;
                  const modules = project.positions.reduce(
                    (acc, position) => acc + position.modules.length,
                    0
                  );
                  const completion =
                    modules && totalModulesUsed
                      ? Math.min(
                          Math.round(
                            (modules / (positions * moduleCatalog.length)) * 100
                          ),
                          100
                        )
                      : 0;

                  return (
                    <Box key={project.name}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        gap={1}
                      >
                        <Box>
                          <Typography fontWeight={600}>
                            {project.name}
                          </Typography>
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
                      <Stack direction="row" spacing={2} mt={1}>
                        <Typography variant="body2" color="text.secondary">
                          {positions} posisi aktif
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {modules} modul terpasang
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={completion}
                        sx={{
                          mt: 1.5,
                          height: 8,
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

          <Grid size={{ xs: 12, lg: 5 }}>
            <DashboardCard sx={{ pb: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Upcoming schedule
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Agenda penting untuk online test, interview, dan psikotes minggu
                ini.
              </Typography>

              <Stack spacing={2.5}>
                {upcomingSchedule.map(event => (
                  <Box
                    key={event.title}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      p: 1.5,
                    }}
                  >
                    <Typography fontWeight={600}>{event.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.related}
                    </Typography>
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
                    Activity logs
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kegiatan terbaru modul projects, job vacancies, dan online
                    test.
                  </Typography>
                </Box>
                <Button size="small" color="inherit">
                  Lihat semua
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2}>
                {activityLogs.map(log => (
                  <Box key={log.title}>
                    <Typography fontWeight={600}>{log.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {log.detail}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {log.time}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <DashboardCard sx={{ pb: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Alerts & notifications
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Prioritas tinggi yang perlu tindakan cepat.
              </Typography>

              <Stack spacing={2.5}>
                {priorityAlerts.map(alert => (
                  <Box
                    key={alert.message}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      p: 1.5,
                    }}
                  >
                    <Typography fontWeight={600}>{alert.type}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {alert.message}
                    </Typography>
                    <Button size="small" sx={{ mt: 1 }}>
                      {alert.action}
                    </Button>
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
