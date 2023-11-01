import { Flex, Heading, Box, Text, Button, Spacer, HStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()

    function logout() {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("usuario");
        navigate('/login')
    }

    return (
        <Flex as="nav" p="10px" alignItems="center" mb="10px">
            <Heading as="h1">Estoque/Mostruário</Heading>
            <Spacer />

            <HStack spacing="20px">
                <Text>{window.localStorage.getItem("usuario")}</Text>
                <Button colorScheme="orange" onClick={logout}>Logout</Button>
            </HStack>
        </Flex>
    );
}
 
export default Navbar;