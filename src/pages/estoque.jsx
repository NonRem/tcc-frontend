import { useEffect, useState } from "react";
import api from "../services/api";
import ProdutoEstoque from "../components/ProdutoEstoque";
import { SimpleGrid } from "@chakra-ui/react";

const Estoque = () => {
    const [produtos, setProdutos] = useState([]);
    //const [informacaoes, setInformacaoes] = useState();
    const token = JSON.parse(window.localStorage.getItem('accessToken'))


    useEffect(() => {
        getProdutos()
        sortProdutos()
    }, [])

    function sortProdutos() {
        let sorted = produtos.sort((a, b) => (b.quant_atual/b.quant_max) - (a.quant_atual/a.quant_max))
        setProdutos(sorted)
    }

    async function getProdutos() {
        const response = await api.get('/estoque', {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true});
        setProdutos(response.data);
    }

    console.log(produtos)

    return (
        <SimpleGrid minChildWidth={450} spacing={1}>
            {produtos && produtos.map(produto => 
                <ProdutoEstoque produto={produto} percent={((produto.quant_atual / produto.quant_max)*100 >> 0)} key={produto.id}/>
            )}
        </SimpleGrid>
    );
}
 
export default Estoque;