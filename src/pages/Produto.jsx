import { Box, Button, Heading, Input, HStack, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";
import api from "../services/api";
import ProdutoEstoque from "../components/ProdutoEstoque";
import ProdutoMostruario from "../components/ProdutoMostruario";

const Produto = () => {
    const [id, setId] = useState()
    const [estoque, setEstoque] = useState()
    const [mostruario, setMostruario] = useState()
    const token = JSON.parse(window.localStorage.getItem('accessToken'))

    async function getEstoque() {
        const response = await api.get(`/estoque/${id}`, {headers: {'accept': 'application/json', 'Authorization' : `Bearer ${token.value}`}, withCredentials: true})
        setEstoque(response.data)
    }
    
    async function getMostruario() {
        const response = await api.get(`/mostruario/${id}`, {headers: {'accept': 'application/json', 'Authorization' : `Bearer ${token.value}`}, withCredentials: true})
        setMostruario(response.data)
    }

    function handleSubmit() {
        getMostruario()
        getEstoque()
    }

    return (
        <>
            {estoque && mostruario
            ?<HStack justify="space-around" mt="5em">
                {estoque && <ProdutoEstoque produto={estoque} percent={((estoque.quant_atual / estoque.quant_max)*100 >> 0)} key={estoque.id}/>}
                {mostruario && <ProdutoMostruario produto={mostruario} percent={((mostruario.quant_atual / mostruario.quant_max)*100 >> 0)} key={mostruario.id}/>}
            </HStack>
            :<Box maxW="40vw" m="auto" bg="white" p="2em" borderRadius={10} border="1px solid black">
                <Form onSubmit={handleSubmit}>
                    <Heading mb={10}>Digite o código do produto:</Heading>
                    <HStack>
                        <Input placeholder="Cód. de barras do produto" bg="whitesmoke" type="number" onChange={(e) => setId(e.target.value)} required/>
                        <Button colorScheme="blue" type="submit">Procurar</Button>
                    </HStack>
                </Form>
            </Box>}
        </>
    );
}
 
export default Produto;