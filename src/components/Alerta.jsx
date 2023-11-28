import moment from 'moment';
import { AccordionButton, AccordionItem, AccordionPanel, HStack, Spacer, Text } from '@chakra-ui/react';

const Alerta = ({alerta, bg}) => {
    function formatDate(date) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss')
    }

    return (
        <AccordionItem>
            <AccordionButton bg={bg}>
            <HStack spacing={50}>
                <Text>ID: {alerta.id}</Text>
                <Text>Produto: {alerta.artigo.cod_produto} - {alerta.artigo.nome}</Text>
                <Text>Emitido em: {formatDate(alerta.data)}</Text>
                <Text>Tipo: {alerta.tipo}</Text>
            </HStack>
            </AccordionButton>
            <AccordionPanel bg={bg}>
                {alerta.mensagem}
            </AccordionPanel>
        </AccordionItem>
    );
}
 
export default Alerta;