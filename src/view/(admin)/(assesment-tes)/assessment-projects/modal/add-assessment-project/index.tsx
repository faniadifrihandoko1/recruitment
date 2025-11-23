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
  projectName: string;
  projectType: string;
  createdBy: string;
  description: string;
  instructions: string;
}

const projectTypes = [
  "Technical Test",
  "Behavioral Test",
  "Leadership Test",
  "Skills Test",
  "Cultural Test",
  "Aptitude Test",
  "Personality Test",
];

interface AddAssessmentProjectModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

export default function AddAssessmentProjectModal({
  openModal,
  handleCloseModal,
}: AddAssessmentProjectModalProps) {
  const t = useTranslations("page.assessmentProjects");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    projectType: "",
    createdBy: "",
    description: "",
    instructions: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = t("modal.required");
    }
    if (!formData.projectType) {
      newErrors.projectType = t("modal.required");
    }
    if (!formData.createdBy.trim()) {
      newErrors.createdBy = t("modal.required");
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
            label={t("modal.projectName")}
            placeholder={t("modal.projectNamePlaceholder")}
            value={formData.projectName}
            onChange={e => handleInputChange("projectName", e.target.value)}
            error={!!errors.projectName}
            helperText={errors.projectName}
            required
          />

          <FormControl fullWidth error={!!errors.projectType} required>
            <InputLabel>{t("modal.projectType")}</InputLabel>
            <Select
              value={formData.projectType}
              onChange={e => handleInputChange("projectType", e.target.value)}
              label={t("modal.projectType")}
            >
              {projectTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.projectType && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                {errors.projectType}
              </Typography>
            )}
          </FormControl>

          <TextField
            fullWidth
            label={t("modal.createdBy")}
            placeholder={t("modal.createdByPlaceholder")}
            value={formData.createdBy}
            onChange={e => handleInputChange("createdBy", e.target.value)}
            error={!!errors.createdBy}
            helperText={errors.createdBy}
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
            label={t("modal.instructions")}
            placeholder={t("modal.instructionsPlaceholder")}
            value={formData.instructions}
            onChange={e => handleInputChange("instructions", e.target.value)}
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
