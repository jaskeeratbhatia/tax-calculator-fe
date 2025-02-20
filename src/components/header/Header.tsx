import { Box, Center, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';


export const Header = () => {
    const { t, i18n } = useTranslation();
    const language = i18n.language

    const onLangChange = (locale: 'en' | 'fr') => {
        i18n.changeLanguage(locale)
    }

    return (
        <Box bg="black" py={4} px={4} w={'100%'} top={0} display='flex' justifyContent='space-between' alignItems='center'>
            <Center flexGrow={1} color={'whiteAlpha.800'} fontSize={{ base: 'lg', md: '2xl' }} fontWeight={700}>{t('header.title')}</Center>
            <Box>
                <Button size='xs' borderRightRadius={0} onClick={() => onLangChange('en')} colorScheme={language === 'en' ? 'purple' : 'gray'}>{t('header.language.en')}</Button>
                <Button size='xs' borderLeftRadius={0} onClick={() => onLangChange('fr')} colorScheme={language === 'fr' ? 'purple' : 'gray'}>{t('header.language.fr')}</Button>
            </Box>

        </Box>
    );
}
