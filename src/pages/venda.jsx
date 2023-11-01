import { Box, Card, CardBody, CardHeader, Heading, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";
import api from "../services/api"

const Venda = () => {
    const [produtos, setProdutos] = useState([])
    const [total, setTotal] = useState()
    const [codigo, setCodigo] = useState()

    async function getProduto() {
        const response = await api.get(`/produto/short/${codigo}`, {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token}`}, withCredentials: true});
        let codProduto = response.data.cod_produto
        
        if(codProduto in produtos) {
            setProdutos(...produtos, codProduto:)
        } else {
            response.data
            let produtoShort = {nome: response.data.nome, cod_produto: response.data.cod_produto, valor: response.data.valor, quantidade: 1}
                setProdutos(...produtos,)
        }
        
    }

    return (
        <SimpleGrid minChildWidth={300} spacing={1}>
            <Card>
                <CardHeader>
                    <Heading>Lista de produtos:</Heading>
                </CardHeader>
            </Card>

            <Box>
                <Card>
                    <CardHeader>
                        <Heading>Buscar produto:</Heading>
                    </CardHeader>
                    <CardBody>
                        <Box>
                            <Form>
                                
                            </Form>
                        </Box>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <Heading>Total</Heading>
                    </CardHeader>
                </Card>    
            </Box>
            
        </SimpleGrid>
        );
}
 
export default Venda;