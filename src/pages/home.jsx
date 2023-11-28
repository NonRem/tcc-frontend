import api from "../services/api";
import Navbar from "../components/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";

const Home = () => {
    return (
            <Flex justify="flex-start" alignItems="center" h="100vh" w="100vw" bg="gray.100" direction="column">    
                <Heading mt="2em" mb="1em">Seja bem-vindo ao sistema de controle de mostruário</Heading>
                <Text fontSize="3xl" mb="1em">Qual função será usada:</Text>
                <Button mb="1em" minHeight="20vh" w="md" border="1px solid black" bg="blue.100" align="center">
                        <NavLink to="/loginestoque"><Text fontSize={40}>Repositor/estoquista</Text></NavLink>
                </Button>
                <Button minHeight="20vh" w="md" border="1px solid black" bg="green.100" align="center">
                    <NavLink to="/logincaixa"><Text fontSize={40}>Caixa registradora</Text></NavLink>
                </Button>
            </Flex>
    );
}

export default Home;