"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

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

interface AddJobRequestModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

export default function AddJobRequestModal({
  openModal,
  handleCloseModal,
}: AddJobRequestModalProps) {
  const t = useTranslations("page.jobRequest");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    department: "",
    requestedBy: "",
    deadline: "",
    description: "",
    requirements: "",
  });

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
      console.log("Form submitted:", formData);
      handleCloseModal();
    }
  };

  return (
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
              onChange={e => handleInputChange("department", e.target.value)}
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
            onChange={e => handleInputChange("requirements", e.target.value)}
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
  );
}
