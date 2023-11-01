import {Routes, Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import Home from './pages/home';
import Mostruario from './pages/mostruario';
import Estoque from './pages/estoque';
import Ocorrencia from './pages/ocorrencia';
import Reposicao from './pages/reposicao';
import Venda from './pages/venda';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';

const router = createBrowserRouter (
    createRoutesFromElements(
        <Route path="/" >
            <Route index exact element={<Home />} />
            <Route path="login" exact element={<Login />} />
            <Route element={<RequireAuth />}>
                <Route element={<Layout />}>
                    <Route path="estoque" exact element={<Estoque />} />
                    <Route path="mostruario" exact element={<Mostruario />} />
                    <Route path="ocorrencia" exact element={<Ocorrencia />} />
                    <Route path="reposicao" exact element={<Reposicao />} />
                    <Route path="venda" exact element={<Venda />} />
                    <Route path="dashboard" exact element={<Dashboard />} />    
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