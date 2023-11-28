import moment from 'moment';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, HStack, Heading, Text } from '@chakra-ui/react';
import Alerta from '../components/Alerta';

const Alertas = () => {
    const token = JSON.parse(window.localStorage.getItem('accessToken'))
    const [alertas, setAlertas] = useState()

    useEffect(() => {
        getAlertas()
    },[])

    async function getAlertas() {
        const response = await api.get('/alertas', {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        setAlertas(response.data)
    }

    return (
        <Box maxW="80%" m="2em">
            <Heading>Alertas</Heading>
            <Accordion border="1px solid black" mt="1em">
                {alertas && alertas.map(alerta =>
                    alerta && alerta.tipo === "Estoque" && <Alerta alerta={alerta} key={alerta.id} bg={"orange.100"}/> ||
                    alerta && alerta.tipo === "Mostruario" && <Alerta alerta={alerta} key={alerta.id} bg={"yellow.100"}/> ||
                    alerta && alerta.tipo === "Validade" && <Alerta alerta={alerta} key={alerta.id} bg={"tomato"}/>)}
            </Accordion>
        </Box>
    );
}
 
export default Alertas;