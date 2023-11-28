import {Routes, Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import Home from './pages/home';
import Mostruario from './pages/mostruario';
import Estoque from './pages/estoque';
import Ocorrencia from './pages/ocorrencia';
import Reposicao from './pages/reposicao';
import Venda from './pages/venda';
import Alertas from './pages/Alertas';
import LoginEstoque from './pages/LoginEstoque';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import LoginCaixa from './pages/LoginCaixa';
import ModificaEstoque from './pages/ModificaEstoque';
import ModificaMostruario from './pages/ModificaMostruario';
import Produto from './pages/Produto';
import Lote from './pages/Lote';
import NavbarCaixa from './components/NavbarCaixa';

const router = createBrowserRouter (
    createRoutesFromElements(
        <Route path="/" >
            <Route index exact element={<Home />} />
            <Route path="loginestoque" exact element={<LoginEstoque />} />
            <Route path="logincaixa" exact element={<LoginCaixa />} />
            <Route element={<RequireAuth />}>
                <Route element={<NavbarCaixa />}>
                    <Route path="venda" exact element={<Venda />} />
                </Route>
                <Route element={<Layout />}>
                    <Route path="produto" exact element={<Produto />} />
                    <Route path="lote" exact element={<Lote />} />
                    <Route path="estoque" exact element={<Estoque />} />
                    <Route path="modificaestoque" exact element={<ModificaEstoque />} />
                    <Route path="mostruario" exact element={<Mostruario />} />
                    <Route path="modificamostruario" exact element={<ModificaMostruario />} />
                    <Route path="ocorrencia" exact element={<Ocorrencia />} />
                    <Route path="reposicao" exact element={<Reposicao />} />
                    <Route path="alertas" exact element={<Alertas />} />    
                </Route>
                
            </Route>
        </Route>
    )
)

/* const Router = () => {
    return (
        <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/mostruario" exact component={Mostruario} />
            <Route path="/estoque" exact component={Estoque} />
            <Route path="/ocorrencia" exact component={Ocorrencia} />
            <Route path="/reposicao" exact component={Reposicao} />
            <Route path="/venda" exact component={Venda} />
            <Route path="/dashboard" exact component={Dashboard} />
        </Routes>
    )
} */

export default router