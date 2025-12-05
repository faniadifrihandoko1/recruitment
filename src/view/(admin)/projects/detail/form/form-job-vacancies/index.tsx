"use client";

import { CustomStaticAutoComplete } from "@/component/shared/input/custom-static-auto-complete";
import CustomTextAreaAutoSize from "@/component/shared/input/custom-text-area-autosize";
import { CustomTextField } from "@/component/shared/input/custom-textfield";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { JobVacancyFormSchema } from "../../schema/job-vacancies.schema";
import {
  employeeTypes,
  jobRequirementTypes,
  jobStatuses,
} from "../../utils/data";

interface FormJobVacanciesProps {
  form: UseFormReturn<JobVacancyFormSchema>;
}

export const FormJobVacancies = ({ form }: FormJobVacanciesProps) => {
  const { control, watch } = form;
  const tForm = useTranslations("page.project.detail.jobVacancies.form");
  const showSalary = watch("showSalary");

  // Field arrays for dynamic lists
  const {
    fields: jobDescriptionFields,
    append: appendJobDescription,
    remove: removeJobDescription,
  } = useFieldArray({
    control,
    name: "job_description",
  });

  const {
    fields: jobRequirementFields,
    append: appendJobRequirement,
    remove: removeJobRequirement,
  } = useFieldArray({
    control,
    name: "job_requirement",
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Basic Information Section */}
      <Box>
        <Typography
          variant="h6"
          sx={{ fontSize: 16, fontWeight: 600, mb: 2, color: "text.primary" }}
        >
          Basic Information
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <CustomTextField<JobVacancyFormSchema>
              control={control}
              name="name"
              label={tForm("positionTitle")}
              required
            />
          </Grid>
          <Grid size={6}>
            <CustomStaticAutoComplete<JobVacancyFormSchema>
              control={control}
              name="type"
              label={tForm("employeeType")}
              required
              getOptionLabel={(option: any) => option.label}
              getOptionKey={(option: any) => option.id}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={employeeTypes}
            />
          </Grid>

          <Grid size={6}>
            <CustomTextAreaAutoSize<JobVacancyFormSchema>
              control={control}
              name="location"
              label={tForm("location")}
            />
          </Grid>
          <Grid size={6}>
            <CustomStaticAutoComplete<JobVacancyFormSchema>
              control={control}
              name="status"
              label={"Status"}
              required
              getOptionLabel={(option: any) => option.label}
              getOptionKey={(option: any) => option.id}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={jobStatuses}
            />
          </Grid>
          <Grid size={12}>
            <CustomTextAreaAutoSize<JobVacancyFormSchema>
              control={control}
              name="description"
              label="Description"
            />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* Job Descriptions Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: 16, fontWeight: 600, color: "text.primary" }}
          >
            {tForm("jobDescriptions")}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => appendJobDescription({ title: "" })}
            sx={{ textTransform: "none" }}
          >
            {tForm("add")}
          </Button>
        </Box>
        <Stack spacing={2}>
          {jobDescriptionFields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <CustomTextAreaAutoSize<JobVacancyFormSchema>
                  control={control}
                  name={`job_description.${index}.title`}
                  label={`${tForm("jobDescriptions")} ${index + 1}`}
                  required
                />
              </Box>
              <IconButton
                color="error"
                onClick={() => removeJobDescription(index)}
                sx={{ mt: 3 }}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          {jobDescriptionFields.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic", textAlign: "center", py: 2 }}
            >
              No job descriptions added yet. Click "Add" to add one.
            </Typography>
          )}
        </Stack>
      </Box>

      <Divider />

      {/* Job Requirements Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: 16, fontWeight: 600, color: "text.primary" }}
          >
            {tForm("jobRequirements")}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => appendJobRequirement({ title: "", type: null })}
            sx={{ textTransform: "none" }}
          >
            {tForm("add")}
          </Button>
        </Box>
        <Stack spacing={2}>
          {jobRequirementFields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ flex: 1, display: "flex", gap: 1 }}>
                <Box sx={{ flex: 2 }}>
                  <CustomTextAreaAutoSize<JobVacancyFormSchema>
                    control={control}
                    name={`job_requirement.${index}.title`}
                    label={`${tForm("jobRequirements")} ${index + 1}`}
                    required
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <CustomStaticAutoComplete<JobVacancyFormSchema>
                    control={control}
                    name={`job_requirement.${index}.type`}
                    label={tForm("requirementType")}
                    required
                    options={jobRequirementTypes}
                    getOptionLabel={(option: any) => option.label}
                    getOptionKey={(option: any) => option.id}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                </Box>
              </Box>
              <IconButton
                color="error"
                onClick={() => removeJobRequirement(index)}
                sx={{ mt: 3 }}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          {jobRequirementFields.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic", textAlign: "center", py: 2 }}
            >
              No job requirements added yet. Click "Add" to add one.
            </Typography>
          )}
        </Stack>
      </Box>

      <Divider />

      {/* Position Details Section */}
      <Box>
        <Typography
          variant="h6"
          sx={{ fontSize: 16, fontWeight: 600, mb: 2, color: "text.primary" }}
        >
          Position Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={4}>
            <CustomTextField<JobVacancyFormSchema>
              control={control}
              name="openings"
              label={tForm("openings")}
              type="number"
              required
            />
          </Grid>
          <Grid size={4}>
            <CustomTextField<JobVacancyFormSchema>
              control={control}
              name="open_date"
              label={tForm("openDate")}
              type="date"
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={4}>
            <CustomTextField<JobVacancyFormSchema>
              control={control}
              name="close_date"
              label={tForm("closeDate")}
              type="date"
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* Salary Section */}
      <Box>
        <Typography
          variant="h6"
          sx={{ fontSize: 16, fontWeight: 600, mb: 2, color: "text.primary" }}
        >
          Salary Information
        </Typography>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={showSalary}
                onChange={e => {
                  form.setValue("showSalary", e.target.checked);
                  if (!e.target.checked) {
                    form.setValue("min_salary", 0);
                    form.setValue("max_salary", undefined);
                  }
                }}
              />
            }
            label={tForm("showSalary")}
          />
        </Box>
        {showSalary && (
          <Grid container spacing={2}>
            <Grid size={6}>
              <CustomTextField<JobVacancyFormSchema>
                control={control}
                name="min_salary"
                label={tForm("minSalary")}
                type="number"
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField<JobVacancyFormSchema>
                control={control}
                name="max_salary"
                label={tForm("maxSalary")}
                type="number"
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};
