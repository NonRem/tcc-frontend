import { Card, CardBody, CardFooter, CardHeader, Heading, Progress, Text, HStack, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, List, ListItem, TableContainer, Table, Thead, Th, Tr, Tbody, Td, ModalCloseButton, CircularProgress, CircularProgressLabel, VStack, Spacer } from "@chakra-ui/react";
import api from "../services/api";
import { useState } from "react";

const ProdutoEstoque = ({produto, percent}) => {
    const {onOpen, isOpen, onClose} = useDisclosure()
    const [detalhes, setDetalhes] = useState()
    const token = JSON.parse(window.localStorage.getItem('accessToken'))

    async function exibirDetalhes(cod) {
        const response = await api.get(`/produto/${cod}`, {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        setDetalhes(response.data)
        console.log(response.data)
        onOpen();
    }

    return (<>
        <Card w="450px" bg="gray.300" border="1px solid black" m="5px" borderTop={"5px solid black"}>
            <CardHeader mb="0">
                <Heading as="h3" size="sm">{produto.mercadoria.nome}</Heading>
                <Text>Cód.: {produto.mercadoria.cod_produto}</Text>
            </CardHeader>

            <CardBody mt="0" py="0">
                <Text mb="2px">Quantidade em estoque:</Text>
                <HStack>    
                <VStack alignItems={"flex-start"}>
                    <Text>Min.:{produto.quant_min}</Text>
                    <Text>Atual:{produto.quant_atual}</Text>
                    <Text>Max:{produto.quant_max}</Text>
                </VStack>
                <Spacer />
                <CircularProgress size="100px" colorScheme={"orange"} color="blue.700" value={percent}>
                    <CircularProgressLabel>{percent}%</CircularProgressLabel>
                </CircularProgress>
                </HStack>
            </CardBody>
        
            <CardFooter pt="1em">
                <Button colorScheme="orange" onClick={() => exibirDetalhes(produto.mercadoria.cod_produto)}>Detalhes</Button>
            </CardFooter>
        </Card>

        {detalhes && 
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{detalhes.nome}</ModalHeader>
                <ModalBody>
                    <HStack justify={"space-around"} alignContent={"flex-start"}>
                        <List spacing={5} px={"10px"} pr="30px">
                            <ListItem>Código: {detalhes.cod_produto}</ListItem>
                            <ListItem>Valor: {detalhes.valor}</ListItem>
                            {detalhes.peso && <ListItem>Peso: {detalhes.peso}g</ListItem>}
                            {detalhes.vol && <ListItem>Volume: {detalhes.vol}ml</ListItem>}
                            <ListItem>Categoria: {detalhes.categoria.classificacao}</ListItem>
                            <ListItem mb="10px">Tipo: {detalhes.subcategoria.tipo_produto}</ListItem>
                        </List>
                            <Table alignSelf={"flex-start"}>
                                <Thead>
                                    <Tr>
                                        <Th>Código do lote</Th>
                                        <Th>Data de recebimento</Th>
                                        <Th>Data de vencimento</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {detalhes.lotes.map(lote => 
                                        <Tr>
                                            <Td>{lote.cod_lote}</Td>
                                            <Td>{lote.recebimento}</Td>
                                            <Td>{lote.vencimento}</Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                    </HStack>
                </ModalBody>
            </ModalContent>
            </Modal>}
        </>
    );
}
 
export default ProdutoEstoque;