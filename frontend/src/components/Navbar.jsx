import React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box bg={bgColor} px={6} py={3} boxShadow="md">
      <Flex
        maxW="1140px"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={4} alignItems="center">
          <Link to="/create">
            <Button bg="blue.500" color="white" _hover={{ bg: 'blue.600' }}>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>

          <IconButton
            aria-label="Toggle theme"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            variant="ghost"
          />

          <Link to="/login">
            <Button colorScheme="teal" size="sm">
              Login
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
