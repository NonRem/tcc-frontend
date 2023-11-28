import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import AuthContext from "../context/AuthProvider";
import { SimpleGrid } from "@chakra-ui/react";
import ProdutoMostruario from "../components/ProdutoMostruario";

const Mostruario = () => {
    const [produtos, setProdutos] = useState([]);
    const [informacaoes, setInformacaoes] = useState();
    const {auth, setAuth} = useContext(AuthContext);
    const token = JSON.parse(window.localStorage.getItem('accessToken'))
    let existe = false;

    useEffect(() => {
        getProdutos()
        sortProdutos()
    }, [])

    function sortProdutos() {
        let sorted = produtos.sort((a, b) => ((b.quant_atual/b.quant_max) * 100) - ((a.quant_atual/a.quant_max) * 100))
        setProdutos(sorted)
    }

    async function getProdutos() {
        const response = await api.get('/mostruario', {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true});
        setProdutos(response.data);
    }

    console.log(produtos)

    return (
        <SimpleGrid minChildWidth={450} spacing={1}>
            {produtos && produtos.map(produto => 
                <ProdutoMostruario produto={produto} percent={((produto.quant_atual/produto.quant_max) * 100 >> 0)} key={produto.id}/>
            )}
        </SimpleGrid>
    );
}
 
export default Mostruario;