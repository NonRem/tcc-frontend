import { Box, Button, Card, CardBody, CardHeader, FormLabel, Grid, GridItem, HStack, Heading, Input, SimpleGrid, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";
import api from "../services/api"

const Venda = () => {
    const token = JSON.parse(window.localStorage.getItem("accessToken"))
    const [carrinho, setCarrinho] = useState([])
    const [lista, setLista] = useState([])
    const [total, setTotal] = useState(0)
    const [codigo, setCodigo] = useState()
    const [produto, setProduto] = useState()

    async function getProduto() {
        const response = await api.get(`/produto/short/${codigo}`, {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true});
        setProduto(response.data)
        console.log(lista)
        if(lista.includes(produto.cod_produto)){
            handleChange(produto)
        } else {
            setLista([...lista, produto.cod_produto])
            handleAdd(produto)
        }
    }

    function handleAdd(item) {
        setCarrinho([...carrinho, {cod_produto: item.cod_produto, nome: item.nome, valor: item.valor, quantidade: 1, subtotal: item.valor}])
        setTotal(total + item.valor)
    }

    function handleDelete(i) {
        const novoCarrinho = [...carrinho]
        setTotal(total - novoCarrinho[i]['valor'])
        if(novoCarrinho[i]['quantidade'] === 1) {
            novoCarrinho.splice(i, 1)
        } else {
            novoCarrinho[i]['quantidade'] -= 1
        }
        setCarrinho(novoCarrinho)
    }

    function handleChange(item) {
        console.log(item)
        const novoCarrinho = [...carrinho]
        for (let index = 0; index < novoCarrinho.length; index++) {
            if(novoCarrinho[index]['cod_produto'] === item.cod_produto) {
                novoCarrinho[index]['quantidade']++
                novoCarrinho[index]['subtotal'] = novoCarrinho[index]['quantidade'] * novoCarrinho[index]['valor']
                setTotal(total + novoCarrinho[index]['valor'])
            }
        }
        setCarrinho(novoCarrinho)
    }

    async function handleSubmit() {
        let obj = {}
        for (let index = 0; index < carrinho.length; index++) {
            obj[carrinho[index]['cod_produto']] = {quantidade: carrinho[index]['quantidade'], valor: carrinho[index]['valor']}
        }
        const response = await api.post('/venda/add/', {produtos: obj, valor: total}, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        if(response.status === 200) {
            window.location.reload()
        }
    }

    return (
        <Grid spacing={1} templateColumns={"repeat(3, 1fr)"}>
            <GridItem colSpan={2}>
                <Card bg="gray.100" h="100vh">
                    <CardHeader>
                        <Heading>Lista de produtos:</Heading>
                    </CardHeader>
                    <CardBody>
                        <Table variant="striped" colorScheme="orange">
                            <Thead bg="orange.500">
                                <Tr>
                                    <Th color="black">Código</Th>
                                    <Th color="black">Nome</Th>
                                    <Th color="black">Val. unitário</Th>
                                    <Th color="black">Quantidade</Th>
                                    <Th color="black">Subtotal</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {carrinho && carrinho.map((item, index) => 
                                    <Tr>
                                        <Td>{item.cod_produto}</Td>
                                        <Td>{item.nome}</Td>
                                        <Td>{item.valor}</Td>
                                        <Td>{item.quantidade}</Td>
                                        <Td>{item.subtotal}</Td>
                                        <Td><Button colorScheme="red" onChange={() => handleDelete(index)}>X</Button></Td>
                                    </Tr>)}
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
            </GridItem>

            <GridItem>
                <VStack alignItems="center">
                    <Card bg="gray.300" w="100%">
                        <CardHeader>
                            <Heading>Buscar produto:</Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Form onSubmit={getProduto}>
                                    <FormLabel>Digite o código do produto:</FormLabel>
                                    <HStack>
                                        <Input type="number" required name="codigo" onChange={(e) => setCodigo(e.target.value)} bg="white" />
                                        <Button type="submit" colorScheme="blue">Buscar</Button>
                                    </HStack>
                                </Form>
                            </Box>
                        </CardBody>
                    </Card>

                    <Card bg="gray.200" w="100%">
                        <CardHeader>
                            <Heading>Total:</Heading>
                            <Text fontSize="2xl">R${total.toFixed(2)}</Text>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <Button type="submit" colorScheme="green">Finalizar Pedido</Button>
                            </Form>
                        </CardBody>
                    </Card>    
                </VStack>
            </GridItem>
        </Grid>
        );
}
 
export default Venda;