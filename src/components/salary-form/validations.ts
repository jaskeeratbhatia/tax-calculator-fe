import { TFunction } from "i18next";
import * as Yup from "yup";

export const salaryFormValidationSchema = (t: TFunction<"translation", undefined>) => {
    return Yup.object({
        salary: Yup.number().required(t("salaryForm.errors.salaryRequired")).min(1, t("salaryForm.errors.salaryPositive")),
        year: Yup.number().required(t("salaryForm.errors.yearRequired")).oneOf([2019, 2020, 2021, 2022], t("salaryForm.errors.yearRange"))
    });

}
