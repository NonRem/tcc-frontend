import { useEffect, useState } from "react";
import api from "../services/api";
import ProdutoEstoque from "../components/ProdutoEstoque";
import { SimpleGrid } from "@chakra-ui/react";

const Estoque = () => {
    const [produtos, setProdutos] = useState(null);
    //const [informacaoes, setInformacaoes] = useState();
    let token = '';


    useEffect(() => {
        token = window.localStorage.getItem('accessToken')
        getProdutos()
    }, [])

    async function getProdutos() {
        const response = await api.get('/estoque', {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token}`}, withCredentials: true});
        setProdutos(response.data);
    }

    console.log(produtos)

    return (
        <SimpleGrid minChildWidth={500} spacing={1}>
            {produtos && produtos.map(produto => 
                <ProdutoEstoque produto={produto} key={produto.id}/>
            )}
        </SimpleGrid>
    );
}
 
export default Estoque;