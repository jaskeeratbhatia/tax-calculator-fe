import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import { selectTaxDetails } from "../../store/taxSlice";
import {  getBarChartData, getPieChartData, barOptions, pieOptions} from './utils'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement

} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';


ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Charts() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language
    const { loading, taxBands, totalTax, error, salary } = useAppSelector(selectTaxDetails)

    if (taxBands.length === 0 || totalTax === 0 || salary === 0 || error || loading) {
        return <></>
    }
    return (
        <Flex direction={{base: 'column', md: 'row'}} width={'100%'}>
            <Box w={{base: '100%', md: '50%'}} m={2}> <Bar options={barOptions(t)} data={getBarChartData(taxBands, t)} width={220} height={220}/></Box>
            <Box w={{base: '100%', md: '50%'}} m={2}> <Pie data={getPieChartData(totalTax, salary, t)} options={pieOptions(t)} width={200} height={200}/></Box>
        </Flex>
    );
}

export default Charts;
