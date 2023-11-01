import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, List, ListItem, TableContainer, Table, Thead, Th, Tr, Tbody, Td, useDisclosure, HStack } from "@chakra-ui/react";


const DetalhesProduto = (lote) => {

    return (
        <>
            
                                            <Td>{lote.cod_lote}</Td>
                                            <Td>{lote.recebimento}</Td>
                                            <Td>{lote.vencimento}</Td>
                                    
        </>
    );
}
 
export default DetalhesProduto;