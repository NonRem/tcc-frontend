import { Button, Divider, List, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Layout = () => {
    return (
        <List>
            <ListItem>
                <NavLink to="estoque">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} my={"20px"} bg="blackAlpha.400">
                        Estoque
                    </Button>
                </NavLink>   
            </ListItem>
        
            <ListItem>
                <NavLink to="mostruario">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} my={"20px"} bg="blackAlpha.400">
                        Mostruário
                    </Button>
                </NavLink>
            </ListItem>

            <ListItem>
                <NavLink to="ocorrencia">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} my={"20px"} bg="blackAlpha.400">
                        Ocorrência
                    </Button>
                </NavLink>
            </ListItem>

            <ListItem>
                <NavLink to="reposicao">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} my={"20px"} bg="blackAlpha.400">
                        Reposição
                    </Button>
                </NavLink>
            </ListItem>

            <ListItem>
                <NavLink to="venda">
                    <Button w={"100%"} m={0} borderRadius={"0"} py={"50px"} my={"20px"} bg="blackAlpha.400">
                        Venda
                    </Button>
                </NavLink>
                
            </ListItem>
        </List>
    );
}
 
export default Layout;