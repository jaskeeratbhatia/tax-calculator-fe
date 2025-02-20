
import { FormControl, FormLabel, Input, Button, InputGroup, InputLeftElement, InputRightElement, FormErrorMessage } from '@chakra-ui/react';
import { Formik, Field, Form, FieldProps, FormikErrors, FormikTouched, FormikValues } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { salaryFormValidationSchema } from './validations'
import { fetchTaxBands, selectTaxDetails } from "../../store/taxSlice";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AppDispatch } from "../../store/store";


interface SalaryFormValues {
    salary: number | null;
    year: number | null;
}

const SalaryForm = () => {
    const [maskSalary, setMaskSalary] = useState<string>('')
    const { t, i18n } = useTranslation();
    const language = i18n.language
    const disptach = useAppDispatch<AppDispatch>()
    const {loading} = useAppSelector(selectTaxDetails)
    const validationSchema = salaryFormValidationSchema(t)
    useEffect(() => {
        if (maskSalary) {
            const rawVal = maskSalary.replace(/[^\d]/g, "");
            const formattedValue = (Number(rawVal)).toLocaleString(`${language}-CA`, {
                style: "decimal",
            });
            setMaskSalary(formattedValue)
        }
    }, [language])
    return (
        <div>
            <Formik
                initialValues={{
                    salary: null,
                    year: null,
                }}
                validationSchema={validationSchema}
                validateOnChange
                onSubmit={(
                    values: SalaryFormValues
                ) => {
                    disptach(fetchTaxBands({salary: values.salary as number, year: values.year as number}))
                }}
            >
                {({ errors, touched, setFieldValue }: {
                    errors: FormikErrors<SalaryFormValues>;
                    touched: FormikTouched<SalaryFormValues>;
                    values: FormikValues;
                    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
                }) => (
                    <Form>
                        <Field name="salary">
                            {({ field }: FieldProps) => (
                                <FormControl isInvalid={!!errors.salary && touched.salary} isDisabled={loading}>
                                    <FormLabel color='whiteAlpha.900'>{t("salaryForm.salary")}</FormLabel>
                                    <InputGroup>
                                        {language === 'en' && <InputLeftElement pointerEvents="none" color="purple.400">
                                            $
                                        </InputLeftElement>}
                                        <Input
                                            color='whiteAlpha.900'
                                            {...field}
                                            placeholder={t("salaryForm.salaryPlaceholder")}
                                            value={maskSalary}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const rawValue = e.target.value.replace(/[^\d]/g, "");
                                                const formattedValue = (Number(rawValue)).toLocaleString(`${language}-CA`, {
                                                    style: "decimal",

                                                });
                                                setMaskSalary(formattedValue)
                                                setFieldValue("salary", rawValue);
                                            }}
                                        />
                                        {language === 'fr' && <InputRightElement pointerEvents="none" color="purple.400">
                                            $
                                        </InputRightElement>}
                                    </InputGroup>
                                    <FormErrorMessage>{errors.salary}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <FormControl mt={6} isInvalid={!!errors.year && touched.year} isDisabled={loading}>
                            <FormLabel color='whiteAlpha.900'>{t("salaryForm.year")}</FormLabel>
                            <Field as={Input} name="year" color='whiteAlpha.900'
                                placeholder={t("salaryForm.yearPlaceholder")}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFieldValue("year", e.target.value.replace(/[^\d]/g, ""))
                                } />
                            <FormErrorMessage>{errors.year}</FormErrorMessage>
                        </FormControl>

                        <Button type="submit" mt={8} colorScheme={'purple'} px={10} disabled={!!errors.salary || !!errors.year || loading} isLoading={loading}>{t("salaryForm.submit")}</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SalaryForm