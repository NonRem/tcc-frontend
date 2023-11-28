import { Button, Divider, List, ListItem, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Layout = () => {
    return (
        <List>
            <ListItem>
                <NavLink to="produto">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} border="1px solid black" bg="orange.400">
                        <Text color="black">Procurar produto</Text>
                    </Button>
                </NavLink>   
            </ListItem>
            
            <ListItem>
                <NavLink to="lote">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} border="1px solid black" bg="orange.400">
                        <Text color="black">Lotes</Text>
                    </Button>
                </NavLink>   
            </ListItem>

            <ListItem>
                <NavLink to="estoque">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} border="1px solid black" bg="orange.400">
                        <Text color="black">Estoque</Text>
                    </Button>
                </NavLink>   
            </ListItem>
            
            <ListItem>
                <NavLink to="modificaestoque">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} border="1px solid black" bg="orange.400">
                        <Text color="black">Atualizar estoque</Text>
                    </Button>
                </NavLink>
            </ListItem>
        
            <ListItem>
                <NavLink to="mostruario">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} border="1px solid black" bg="orange.400">
                        <Text color="black">Mostruário</Text>
                    </Button>
                </NavLink>
            </ListItem>
            
            <ListItem>
                <NavLink to="modificamostruario">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} border="1px solid black" bg="orange.400">
                        <Text color="black">Atualizar Mostruário</Text>
                    </Button>
                </NavLink>
            </ListItem>

            <ListItem>
                <NavLink to="ocorrencia">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} border="1px solid black" bg="orange.400">
                        <Text color="black">Ocorrência</Text>
                    </Button>
                </NavLink>
            </ListItem>

            <ListItem>
                <NavLink to="reposicao">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} border="1px solid black" bg="orange.400">
                        <Text color="black">Reposição</Text>
                    </Button>
                </NavLink>
            </ListItem>
            
            <ListItem>
                <NavLink to="alertas">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} border="1px solid black" bg="orange.400">
                        <Text color="black">Alertas</Text>
                    </Button>
                </NavLink>
            </ListItem>
            
            
            
            
        </List>
    );
}
 
export default Layout;