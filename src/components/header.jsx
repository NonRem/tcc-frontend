import { Box, Flex, Button, Spacer, ButtonGroup, Heading } from '@chakra-ui/react'

const Header = () => {
    return (
        <Flex minWidth='max-content' alignItems='flex-end' gap='2'>
            <Box p='2'>
                <Heading size='md'>Mercado</Heading>
            </Box>
            <Spacer />
                <Button colorScheme='teal'>Log in</Button>
        </Flex>
    )
}

export default Header