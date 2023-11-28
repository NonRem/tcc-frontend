import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <Grid templateColumns={"repeat(6, 1fr)"} bg={"gray.100"}>
            <GridItem as="aside" colSpan={{base:6, lg:2, xl:1}} bg={"blackAlpha.600"} minH={{lg: '100vh'}} py={"40px"} borderRight={"px solid black"}>
                <Sidebar />
            </GridItem>
            <GridItem as="main" colSpan={{base:6, lg:4, xl:5}}>
                <Navbar />
                <Outlet />
            </GridItem>
        </Grid>
    );
}
 
export default Layout;