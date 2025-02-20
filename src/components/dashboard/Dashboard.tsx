import { Box, Center } from '@chakra-ui/react';
import SalaryForm from '../salary-form/SalaryForm';
import TaxInfo from '../tax-info/TaxInfo';


function Dashboard() {
    return (
        <Box bg="blackAlpha.900" py={4} px={8} w={'100%'} flexGrow={1}>

            <Center width={'100%'} flexDir={'column'}>
                <Box width={{ base: '100%', sm: '480px' }} mt={8}>
                    <SalaryForm />
                </Box>
                <Box width={{ base: '100%', md: '600px' }} mt={8}>
                    <TaxInfo />
                </Box>
            </Center>
        </Box>
    );
}

export default Dashboard;
