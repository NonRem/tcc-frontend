import { Accordion, AccordionButton, AccordionItem, Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, HStack, AccordionPanel, VStack, Divider, Input, FormLabel, Heading, Button, useToast } from "@chakra-ui/react";
import api from "../services/api";
import {useState, useEffect} from "react"
import moment from "moment";
import { Form } from "react-router-dom";

const Ocorrencia = () => {
    const [ocorrencias, setOcorrencias] = useState()
    const [produto, setProduto] = useState()
    const [estados, setEstados] = useState({Encontrado:0, Estragado:0, Furtado:0, Perdido:0})
    const token = window.localStorage.getItem("accessToken")
    const toast = useToast()

    useEffect(() => {
        getOcorrencia()
    }, [])
    
    async function getOcorrencia() {
        const response = await api.get('/ocorrencia', {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token}`}, withCredentials: true});
        setOcorrencias(response.data)
    }

    function formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
    }

    async function postReposicao(e) {
        e.preventDefault()
        let relatorio = {}
        relatorio[produto] = estados
        console.log(relatorio)
        const response = await api.post('/ocorrencia/add', {relatorio: relatorio}, {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}, withCredentials: true})
        console.log(response.data)
        toast({title:'Relatório enviado.', description:'Relatório enviado com sucesso.', duration: 5000})
    }

    console.log(ocorrencias)

    return ( 
        <Tabs>
            <TabList>
                <Tab>Ver Ocorrências</Tab>
                <Tab>Fazer Ocorrência</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Accordion>
                        {ocorrencias && ocorrencias.map(ocorrencia => 
                            <AccordionItem>
                                <AccordionButton>
                                    <HStack justify={"space-between"}>
                                        <Text>Autor: {ocorrencia.autor.nome_funcionario} - {ocorrencia.autor.posicao.nome_cargo}</Text>
                                        <Text>Data: {formatDate(ocorrencia.data)}</Text>
                                    </HStack>
                                </AccordionButton>
                                <AccordionPanel>
                                    <VStack>
                                        {Object.keys(ocorrencia.relatorio).map(item =>
                                            <HStack>
                                                <Text>Cód. do produto: {item}</Text>
                                                <Text>{ocorrencia.relatorio[{item}]}</Text>
                                            </HStack>)}
                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>)}
                    </Accordion>
                </TabPanel>
                <TabPanel>
                    <Box maxW={"800px"} align="center">
                        <Form bg="gray" onSubmit={postReposicao}>
                            <Heading p="10px">Relatório</Heading>
                            <FormLabel p="10px" m="0">Código do produto:</FormLabel>
                            <Input type="number" bg="white" required name="cod_produto" onChange={(e) => setProduto(e.target.value)}/>
                            <FormLabel p="10px" m="0">Encontrado:</FormLabel>
                            <Input type="number" bg="white" required name="encontrado" onChange={(e) => setEstados({...estados, Encontrado:e.target.value})}/>
                            <FormLabel p="10px" m="0">Furtado:</FormLabel>
                            <Input type="number" bg="white" required name="furtado" onChange={(e) => setEstados({...estados, Furtado:e.target.value})}/>
                            <FormLabel p="10px" m="0">Estragado:</FormLabel>
                            <Input type="number" bg="white" required name="estragado" onChange={(e) => setEstados({...estados, Estragado:e.target.value})}/>
                            <FormLabel p="10px" m="0">Perdido:</FormLabel>
                            <Input type="number" bg="white" required name="perdido" onChange={(e) => setEstados({...estados, Perdido:e.target.value})}/>
                            <Button p="30px" my="5px" mx="auto" type="submit" bg="orange">Enviar Relatório</Button>
                            {console.log(estados)}
                        </Form>
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>
     );
}
 
export default Ocorrencia;