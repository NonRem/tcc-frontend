import { Box, Button, FormLabel, HStack, Heading, Input, Tab, TabList, TabPanel, TabPanels, Table, Tabs, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Form } from "react-router-dom";
import TabelaLotes from "../components/TabelaLotes";

const Lote = () => {
    const token = JSON.parse(window.localStorage.getItem("accessToken"))
    const [lotes, setLotes] = useState()
    const [id, setId] = useState()
    const [busca, setBusca] = useState()
    const [codLote, setCodLote] = useState()
    const [codProd, setCodProd] = useState()
    const [vencimento, setVencimento] = useState()
    const [recebimento, setRecebimento] = useState()
    const [fornecedor, setFornecedor] = useState()
    const [quantidade, setQuantidade] = useState()

    useEffect(() => {
        getLotes()
    },[])

    async function buscaLote() {
        const response = await api.get(`/lote/${id}`, {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        setBusca(response.data)
    }

    async function getLotes() {
        const response = await api.get('/lote', {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        setLotes(response.data)
    }

    async function handleSubmit() {
        console.log({vencimento: vencimento, cod_lote: codLote, recebimento: recebimento, cod_produto: codProd,  id_fornecedor: fornecedor, quantidade: quantidade })
        const response = await api.post('/lote/add/', {vencimento: vencimento, cod_lote: codLote, recebimento: recebimento, cod_produto: codProd,  id_fornecedor: fornecedor, quantidade: quantidade }, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        if (response.status === 200) {
            window.location.reload()
        }
    }

    return (
        <Tabs>
            <TabList>
                <Tab>Lotes registrados</Tab>
                <Tab>Procurar lote</Tab>
                <Tab>Registrar novo lote</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <TabelaLotes lotes={lotes} />
                </TabPanel>
                
                <TabPanel>
                    {busca
                    ? <TabelaLotes lotes={busca} />
                    :<Box maxW="40vw" m="auto" bg="white" p="2em" borderRadius={10} border="1px solid black">
                        <Form onSubmit={buscaLote}>
                            <Heading mb={10}>Digite o código do lote:</Heading>
                            <HStack>
                                <Input placeholder="Cód. do lote" bg="white" type="number" onChange={(e) => setId(e.target.value)} />
                                <Button type="submit" colorScheme="blue">Procurar</Button>
                            </HStack>
                        </Form>
                    </Box>}
                </TabPanel>
                
                <TabPanel>
                    <Box maxW="40vw" m="auto" bg="white" p="2em" borderRadius={10} border="1px solid black">
                        <Heading mb={10} align="center">Insira os dados do lote:</Heading>
                        <Form onSubmit={handleSubmit}>
                            <FormLabel>Código do lote:</FormLabel>
                            <Input type="text" required onChange={(e) => setCodLote(e.target.value)} mb="1em"/>
                            
                            <FormLabel>Código do produto:</FormLabel>
                            <Input type="number" required onChange={(e) => setCodProd(e.target.value)} mb="1em"/>
                            
                            <FormLabel>Data de vencimento:</FormLabel>
                            <Input type="date" required onChange={(e) => setVencimento(e.target.value)} mb="1em"/>
                            
                            <FormLabel>Data de recebimento:</FormLabel>
                            <Input type="date" required onChange={(e) => setRecebimento(e.target.value)} mb="1em" />
                            
                            <FormLabel>Código do fornecedor:</FormLabel>
                            <Input type="number" required onChange={(e) => setFornecedor(e.target.value)} mb="1em" />
                            
                            <FormLabel>Quantidade:</FormLabel>
                            <Input type="number" required onChange={(e) => setQuantidade(e.target.value)} mb="1em" />

                            <Button type="submit" colorScheme="blue" mt="2em" p="2em" >Registrar lote</Button>
                        </Form>
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
 
export default Lote;