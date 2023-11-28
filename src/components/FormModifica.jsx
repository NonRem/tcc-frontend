import { useEffect, useState } from "react";
import api from "../services/api";
import { Form, useNavigate } from "react-router-dom";
import { Box, Button, FormLabel, Input, Select } from "@chakra-ui/react";

const FormModifica = ({rota}) => {
    const [produtos, setProdutos] = useState()
    const [id, setId] = useState()
    const [quantidades, setQuantidades] = useState({})
    const token = JSON.parse(window.localStorage.getItem('accessToken'))
    const navigate = useNavigate()

    useEffect(() => {
        getProdutos()
    },[])

    async function getProdutos() {
        const response = await api.get('/produto/shorts/', {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true});
        setProdutos(response.data)
    }

    async function handleSubmit() {
        console.log(quantidades)
        const response = await api.patch(`${rota}/${id}`, quantidades, {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}`, 'accept': 'application/json'}, withCredentials: true});
        if (response.status === 200) {
            navigate(rota)
        }
    }

    return (
        <Box m="auto" maxW="lg" bg="gray.300" p="15px" borderRadius={10}>
            <Form onSubmit={handleSubmit}>
                <FormLabel>Selecione o produto a ser atualizado:</FormLabel>
                <Select placeholder="cod. produto - nome do produto" bg="white" onChange={(e) => setId(e.target.value)} name="produto" required>
                    {produtos && produtos.map(produto =>
                        <option value={produto.cod_produto}>{produto.cod_produto} - {produto.nome}</option>)}
                </Select>
                <FormLabel mt="1em">Quantidade máxima:</FormLabel>
                <Input bg="white" type="number" name="maxima" onChange={(e) => setQuantidades({...quantidades, quant_max: e.target.value})}/>
                <FormLabel mt="1em">Quantidade mínima:</FormLabel>
                <Input bg="white" type="number" name="minima" onChange={(e) => setQuantidades({...quantidades, quant_min: e.target.value})}/>
                <FormLabel mt="1em">Quantidade atual:</FormLabel>
                <Input bg="white" type="number" name="atual" onChange={(e) => setQuantidades({...quantidades, quant_atual: e.target.value})}/>
                <Button type="submit" mt="1em">Salvar</Button>
            </Form>
        </Box>
    );
}
 
export default FormModifica;