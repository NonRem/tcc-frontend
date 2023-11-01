import { useRef, useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import { Box, Button, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";

const Login = () => {
    const {auth, setAuth} = useAuth()
    const userRef = useRef()
    const errRef = useRef()
    const navigate = useNavigate()

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState()

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/token', {username: username, password: password}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
            const accessToken = response.data.access_token;
            setAuth({username, password, accessToken});
            window.localStorage.setItem("accessToken", accessToken);
            window.localStorage.setItem("usuario", username);
            if(response.status===200) {
                navigate("/estoque")
            }
        } catch(err) {
            if (!err?.response) {
                console.log(err)
                setErrMsg("Sem resposta do servidor")
            } else if (!err.response?.status === 400) {
                setErrMsg("Campos não informados")
            } else if (!err.response?.status === 401) {
                setErrMsg("Não autorizado")
            } else {
                setErrMsg("Falha no login")
            }
        }
    }

    return ( 
            <Box maxW={"500px"} minW={"400px"} minH={"400px"} border={"2px solid black"} bg="blackAlpha.500" borderRadius="1em" align="center" mx="auto" mt="5em">
                <VStack>
                    <Form onSubmit={handleSubmit}>
                        <Heading p="1em" mx="auto">Login</Heading>
                        <FormLabel p="10px" m="0">Usuário:</FormLabel>
                        <Input bg="white" required name="username" onChange={(e) => setUsername(e.target.value)}/>
                        <FormLabel p="10px" m="0">Senha:</FormLabel>
                        <Input bg="white" required type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                        <Button colorScheme="orange" type="submit" my="20px" mx="auto">Confirmar</Button>
                    </Form>
                </VStack>
            </Box>
     );
}
 
export default Login;