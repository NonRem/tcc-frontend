import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import AuthContext from "../context/AuthProvider";
import { SimpleGrid } from "@chakra-ui/react";
import ProdutoMostruario from "../components/ProdutoMostruario";

const Mostruario = () => {
    const [produtos, setProdutos] = useState();
    const [informacaoes, setInformacaoes] = useState();
    const {auth, setAuth} = useContext(AuthContext);
    let token = ''
    let existe = false;

    useEffect(() => {
        token = window.localStorage.getItem('accessToken');
        getProdutos()
    }, [])

    async function getProdutos() {
        const response = await api.get('/mostruario', {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token}`}, withCredentials: true});
        setProdutos(response.data);
    }

    console.log(produtos)

    return (
        <SimpleGrid minChildWidth={500} spacing={1}>
            {produtos && produtos.map(produto => 
                <ProdutoMostruario produto={produto} key={produto.id}/>
            )}
        </SimpleGrid>
    );
}
 
export default Mostruario;