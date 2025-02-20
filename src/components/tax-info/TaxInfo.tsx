import { Box, Center, Spinner, Alert, AlertTitle, AlertIcon, AlertDescription, Text, HStack, VStack, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import { selectTaxDetails } from "../../store/taxSlice";
import Charts from '../charts/Charts';
import { parseAmount } from './utils'


function TaxInfo() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language
    const { loading, taxBands, totalTax, error, salary } = useAppSelector(selectTaxDetails)
    if (loading) {

        return <Box data-testid='spinner-loader'>
            <Spinner
                id='spinner-loader'
                size='xl'
                colorScheme='purple'
                thickness='5px'
                speed='0.7s'
                emptyColor='gray.200'
                color='purple.400'
                mt={12} />
        </Box>
    }

    if (error) {
        return <Alert status='error' mt={12} borderRadius={12}>
            <AlertIcon />
            <AlertTitle>{t("error.message")}</AlertTitle>
            <AlertDescription>{t("error.tryAgain")}</AlertDescription>
        </Alert>
    }
    if (taxBands.length === 0 || totalTax === 0 || salary === 0) {
        return null
    }
    return (
        <Center color={'whiteAlpha.800'} fontSize={{ base: 'md', md: 'lg' }} fontWeight={700} borderColor={'purple.400'} borderWidth={1} borderRadius={12} py={6} mt={12}>
            <VStack>
                <Text fontSize='2xl'>
                    {t("taxInfo.title")}
                </Text>
                <Text fontSize='md' my={2}>{t("taxInfo.taxPerBand")}</Text>
                {taxBands.filter(band => band.taxAmount).map((band, idx) => {
                    const bandRate = (band.rate * 100).toFixed(1)
                    const taxAmount = parseAmount(lang, band.taxAmount)
                    return <HStack key={idx} width={'100%'}>
                        <Text fontSize='sm' fontWeight={400} width={'50%'}>{t("taxInfo.bandRate", { bandRate })}</Text>
                        <Text fontSize='sm' fontWeight={400} width={'50%'}>{taxAmount}</Text>
                    </HStack>
                })}
                <HStack mt={4}>
                    <Text fontSize='md'>{t("taxInfo.totalTaxPaid")}</Text>
                    <Text fontSize='md'>{parseAmount(lang, totalTax)}</Text>
                </HStack>
                <HStack>
                    <Text fontSize='md'>{t("taxInfo.effectiveRate")} </Text>
                    <Text fontSize='md'>{((totalTax / salary) * 100).toFixed(2)}%</Text>
                </HStack>
                <Stack>
                    <Charts />
                </Stack>
            </VStack>
        </Center>
    );
}

export default TaxInfo;
