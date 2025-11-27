"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface FormData {
  projectName: string;
  projectDescription: string;
}

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
    projectDescription: "",
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
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = t("modal.required");
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

          <TextField
            fullWidth
            label={t("modal.projectDescription")}
            placeholder={t("modal.projectDescriptionPlaceholder")}
            value={formData.projectDescription}
            onChange={e =>
              handleInputChange("projectDescription", e.target.value)
            }
            error={!!errors.projectDescription}
            helperText={errors.projectDescription}
            multiline
            rows={4}
            required
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
