"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import PageContainer from "@/component/shared/PageContainer";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Chip,
  ChipProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface JobRequest {
  id: number;
  jobTitle: string;
  department: string;
  requestedBy: string;
  requestDate: string;
  deadline: string;
  applicants: number;
  status: "draft" | "pending" | "approved" | "rejected" | "open" | "closed";
}

const jobRequests: JobRequest[] = [
  {
    id: 1,
    jobTitle: "Frontend Engineer",
    department: "Engineering",
    requestedBy: "John Doe",
    requestDate: "2024-01-15",
    deadline: "2024-02-15",
    applicants: 24,
    status: "open",
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    department: "Product",
    requestedBy: "Jane Smith",
    requestDate: "2024-01-20",
    deadline: "2024-02-20",
    applicants: 18,
    status: "approved",
  },
  {
    id: 3,
    jobTitle: "UX Designer",
    department: "Design",
    requestedBy: "Mike Johnson",
    requestDate: "2024-01-18",
    deadline: "2024-02-18",
    applicants: 32,
    status: "pending",
  },
  {
    id: 4,
    jobTitle: "Backend Engineer",
    department: "Engineering",
    requestedBy: "Sarah Williams",
    requestDate: "2024-01-22",
    deadline: "2024-02-22",
    applicants: 15,
    status: "draft",
  },
  {
    id: 5,
    jobTitle: "HR Generalist",
    department: "Human Resources",
    requestedBy: "David Brown",
    requestDate: "2024-01-10",
    deadline: "2024-02-10",
    applicants: 28,
    status: "closed",
  },
  {
    id: 6,
    jobTitle: "QA Specialist",
    department: "Quality Assurance",
    requestedBy: "Emily Davis",
    requestDate: "2024-01-25",
    deadline: "2024-02-25",
    applicants: 12,
    status: "rejected",
  },
];

const getStatusColor = (status: JobRequest["status"]): ChipProps["color"] => {
  switch (status) {
    case "approved":
    case "open":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
    case "closed":
      return "error";
    case "draft":
    default:
      return "default";
  }
};

interface FormData {
  jobTitle: string;
  department: string;
  requestedBy: string;
  deadline: string;
  description: string;
  requirements: string;
}

const departments = [
  "Engineering",
  "Product",
  "Design",
  "Human Resources",
  "Quality Assurance",
  "Marketing",
  "Sales",
  "Finance",
];

export default function JobRequestView() {
  const t = useTranslations("page.jobRequest");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    department: "",
    requestedBy: "",
    deadline: "",
    description: "",
    requirements: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      jobTitle: "",
      department: "",
      requestedBy: "",
      deadline: "",
      description: "",
      requirements: "",
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = t("modal.required");
    }
    if (!formData.department) {
      newErrors.department = t("modal.required");
    }
    if (!formData.requestedBy.trim()) {
      newErrors.requestedBy = t("modal.required");
    }
    if (!formData.deadline) {
      newErrors.deadline = t("modal.required");
    }
    if (!formData.description.trim()) {
      newErrors.description = t("modal.required");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Handle form submission
      console.log("Form submitted:", formData);
      handleCloseModal();
      // You can add API call here to save the job request
    }
  };

  const filteredRequests = jobRequests.filter(
    request =>
      request.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <PageContainer title={t("title")}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Header Section */}
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
                Kelola semua permintaan lowongan kerja, pantau status, dan
                kelola pelamar dalam satu tempat.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5}>
              <Button variant="outlined" color="inherit">
                {t("export")}
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowOutwardIcon fontSize="small" />}
                sx={{ color: "white", fontWeight: 600 }}
                onClick={handleOpenModal}
              >
                {t("create")}
              </Button>
            </Stack>
          </Box>
        </DashboardCard>

        {/* Search and Filter Section */}
        <DashboardCard>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent={{ xs: "stretch", sm: "flex-end" }}
          >
            <TextField
              fullWidth
              placeholder={t("search")}
              value={searchQuery}
              size="small"
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: { sm: "400px" } }}
            />
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              sx={{ whiteSpace: "nowrap", color: "white" }}
            >
              {t("filter")}
            </Button>
          </Stack>
        </DashboardCard>

        {/* Table Section */}
        <DashboardCard>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={600}>{t("table.no")}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.jobTitle")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.department")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.requestedBy")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.requestDate")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.deadline")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={600}>
                      {t("table.applicants")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={600}>
                      {t("table.status")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={600}>
                      {t("table.actions")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        Tidak ada data ditemukan
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request, index) => (
                    <TableRow key={request.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Typography fontWeight={500}>
                          {request.jobTitle}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {request.department}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {request.requestedBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {formatDate(request.requestDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {formatDate(request.deadline)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight={500}>
                          {request.applicants}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={t(`status.${request.status}`)}
                          color={getStatusColor(request.status)}
                          size="small"
                          variant={
                            request.status === "draft" ? "outlined" : "filled"
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={handleMenuOpen}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
            Lihat Detail
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Hapus
          </MenuItem>
        </Menu>

        {/* Create Job Request Modal */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h5" fontWeight={600} color="#2A3547">
              {t("modal.title")}
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label={t("modal.jobTitle")}
                placeholder={t("modal.jobTitlePlaceholder")}
                value={formData.jobTitle}
                onChange={e => handleInputChange("jobTitle", e.target.value)}
                error={!!errors.jobTitle}
                helperText={errors.jobTitle}
                required
              />

              <FormControl fullWidth error={!!errors.department} required>
                <InputLabel>{t("modal.department")}</InputLabel>
                <Select
                  value={formData.department}
                  onChange={e =>
                    handleInputChange("department", e.target.value)
                  }
                  label={t("modal.department")}
                >
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
                {errors.department && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.department}
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                label={t("modal.requestedBy")}
                placeholder={t("modal.requestedByPlaceholder")}
                value={formData.requestedBy}
                onChange={e => handleInputChange("requestedBy", e.target.value)}
                error={!!errors.requestedBy}
                helperText={errors.requestedBy}
                required
              />

              <TextField
                fullWidth
                label={t("modal.deadline")}
                type="date"
                value={formData.deadline}
                onChange={e => handleInputChange("deadline", e.target.value)}
                error={!!errors.deadline}
                helperText={errors.deadline}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />

              <TextField
                fullWidth
                label={t("modal.description")}
                placeholder={t("modal.descriptionPlaceholder")}
                value={formData.description}
                onChange={e => handleInputChange("description", e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                required
              />

              <TextField
                fullWidth
                label={t("modal.requirements")}
                placeholder={t("modal.requirementsPlaceholder")}
                value={formData.requirements}
                onChange={e =>
                  handleInputChange("requirements", e.target.value)
                }
                multiline
                rows={4}
              />
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseModal} color="inherit">
              {t("modal.cancel")}
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ color: "white", fontWeight: 600 }}
            >
              {t("modal.submit")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
}
