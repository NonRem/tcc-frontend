import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const TabelaLotes = ({lotes}) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Cód. do produto</Th>
                    <Th>Cód. do lote</Th>
                    <Th>Recebimento</Th>
                    <Th>Vencimento</Th>
                    <Th>Quantidade</Th>
                </Tr>
            </Thead>
            <Tbody>
                {lotes && lotes.map(lote =>
                    <Tr>
                        <Td>{lote.id}</Td>
                        <Td>{lote.mercadoria.cod_produto}</Td>
                        <Td>{lote.cod_lote}</Td>
                        <Td>{lote.recebimento}</Td>
                        <Td>{lote.vencimento}</Td>
                        <Td>{lote.quantidade}</Td>
                    </Tr>)}
            </Tbody>
        </Table>
    );
}
 
export default TabelaLotes;