import { Box, Button, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Tab, TabList, TabPanel, TabPanels, Table, Tabs, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import api from "../services/api";
import {useState, useEffect} from "react"
import moment from "moment"
import { Form, useNavigate } from "react-router-dom";

const Reposicao = () => {
    const [reposicoes, setReposicoes] = useState([])
    const [quantidade, setQuantidade] = useState()
    const [produto, setProduto] = useState()
    const token = JSON.parse(window.localStorage.getItem('accessToken'))

    useEffect(() => {
        getReposicao()
        sortReposicao()
    }, [])

    function formatDate(date) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss')
    }
    
    async function getReposicao() {
        console.log(token)
        const response = await api.get('/reposicao', {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true});
        setReposicoes(response.data)
    }

    function sortReposicao() {
        let sorted = reposicoes.sort((a, b) => {
            let da = new Date(a.data)
            let db = new Date(b.data)
            return db - da
        })
        console.log(reposicoes)
        console.log(sorted)
        setReposicoes(sorted)
    }

    async function postReposicao(e) {
        e.preventDefault()
        console.log(token)
        const response = await api.post('/reposicao/add', {quantidade: quantidade, cod_produto: produto}, {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`, 'Content-Type': 'application/json'}, withCredentials: true})
        console.log(response.data)
        if(response.status === 200) {
            window.location.reload()
        }
    }

    return ( 
        <Tabs>
            <TabList>
                <Tab>Ver reposições</Tab>
                <Tab>Fazer reposição</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Table variant={"striped"} colorScheme="orange">
                        <Thead bg="orange">
                            <Tr>
                                <Th>Código do produto</Th>
                                <Th>Data</Th>
                                <Th>Item</Th>
                                <Th>Quantidade</Th>
                                <Th>Repositor</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {reposicoes && reposicoes.map(reposicao => 
                                <Tr>
                                    <Td>{reposicao.cod_produto}</Td>
                                    <Td>{formatDate(reposicao.data)}</Td>
                                    <Td>{reposicao.item.nome}</Td>
                                    <Td>{reposicao.quantidade}</Td>
                                    <Td>{reposicao.repositor.nome_funcionario}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TabPanel>

                <TabPanel>
                    <Box maxW={"500px"} minH="300px" p="50px" border="1px solid black" borderRadius={"10px"} align="center" mx="auto" mt="3rem" bg="blackAlpha.600">
                        <Form onSubmit={postReposicao}>
                            <Heading p="10px" mb="20px">Reposição</Heading>
                            <FormLabel textColor={"black"} p="10px">Código do produto:</FormLabel>
                            <NumberInput my="1em" mb="">
                                <NumberInputField bg="white" name="cod_produto" required onChange={(e) => setProduto(e.target.value)}/>
                            </NumberInput>

                            <FormLabel textColor={"black"} p="10px">Quantidade recolocada:</FormLabel>
                            <NumberInput my="10px"mb="1em">
                                <NumberInputField bg="white" name="quantidade" required onChange={(e) => setQuantidade(e.target.value)}/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            
                            <Button mt="1em" type="submit">Finalizar</Button>
                        </Form>
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>
     );
}
 
export default Reposicao;