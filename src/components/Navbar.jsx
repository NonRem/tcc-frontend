import { Flex, Heading, Box, Text, Button, Spacer, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const user = JSON.parse(window.localStorage.getItem('usuario'))
    const token = JSON.parse(window.localStorage.getItem('accessToken'))
    /* const [notificacao, setNotificacao] = useState(false)
    const [ws, setWs] = useState()
    const ws = new WebSocket(`ws://localhost:8000/ws/${token.value}`)

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/${token.value}`)
        socket.onopen = (e) => console.log("Conectado")
        socket.onmessage = (e) => console.log(e.data)
    }, []) */

    function logout() {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("usuario");
        navigate('/')
    }

    return (
        <Flex as="nav" p="10px" alignItems="center" mb="10px" borderBottom="1px solid black">
            <Heading as="h1">Estoque/Mostruário</Heading>
            <Spacer />

            <HStack spacing="20px">

                <Text>{user.value}</Text>
                <Button colorScheme="orange" onClick={logout}>Logout</Button>
            </HStack>
        </Flex>
    );
}
 
export default Navbar;