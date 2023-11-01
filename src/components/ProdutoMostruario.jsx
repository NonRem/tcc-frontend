import { Card, CardBody, CardFooter, CardHeader, Heading, Progress, Text, HStack, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, List, ListItem, TableContainer, Table, Thead, Th, Tr, Tbody, Td, ModalCloseButton } from "@chakra-ui/react";
import api from "../services/api";
import { useState } from "react";

const ProdutoMostruario = ({produto}) => {
    const {onOpen, isOpen, onClose} = useDisclosure()
    const [detalhes, setDetalhes] = useState()
    let token = window.localStorage.getItem("accessToken")

    async function exibirDetalhes(cod) {
        const response = await api.get(`/produto/${cod}`, {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token}`}, withCredentials: true})
        setDetalhes(response.data)
        console.log(response.data)
        onOpen();
    }

    return (
        <>
        <Card minW="450px" maxWidth={"450px"} bg="gray.300" border="1px solid black" m="5px" borderTop={"5px solid black"}>
            <CardHeader mb="0">
                <Heading as="h3" size="sm">{produto.produto.nome}</Heading>
                <Text>Cód.: {produto.produto.cod_produto}</Text>
            </CardHeader>

            <CardBody mt="0" pt="0">
                <Text mb="2px">Quantidades:</Text>    
                <HStack justify={"space-between"}>
                    <Text>Min.:{produto.quant_min}</Text>
                    <Text>Atual:{produto.quant_atual}</Text>
                    <Text>Max:{produto.quant_max}</Text>
                </HStack>
                <Progress border="1px solid black" colorScheme={"orange"} borderRadius="5px" color="blue.700" value={(produto.quant_atual / produto.quant_max)*100} />
            </CardBody>
        
            <CardFooter>
                <HStack spacing="50px" alignItems={"center"}>
                    <Button colorScheme="orange" onClick={() => exibirDetalhes(produto.produto.cod_produto)}>Detalhes</Button>
                    <Text>Itens perdidos: {produto.quant_perdida}</Text> 
                </HStack>
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
 
export default ProdutoMostruario;