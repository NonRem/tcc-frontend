import { Flex, Heading, Box, Text, Button, Spacer, HStack } from "@chakra-ui/react"
import { Outlet, useNavigate } from "react-router-dom";

const NavbarCaixa = () => {
    const navigate = useNavigate()
    const user = JSON.parse(window.localStorage.getItem('usuario'))

    function logout() {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("usuario");
        navigate('/')
    }

    return (
        <>
        <Flex as="nav" p="10px" alignItems="center" mb="10px" borderBottom="1px solid black">
            <Heading as="h1">Caixa</Heading>
            <Spacer />

            <HStack spacing="20px">
                <Text>{user.value}</Text>
                <Button colorScheme="orange" onClick={logout}>Logout</Button>
            </HStack>
        </Flex>
        <Outlet />
        </>
    );
}
 
export default NavbarCaixa;