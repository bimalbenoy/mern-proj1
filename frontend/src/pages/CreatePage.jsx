import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const toast= useToast();
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const { createProduct } = useProductStore();

  const handleSubmit =async (e) => {
    e.preventDefault();
    const {success, message} = await createProduct(newProduct);
    if(!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    toast({
        title: "Success",
        description: "Product created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
    })
    setNewProduct({
      name: '',
      price: '',
      image: ''
    });
  };

  const formBg = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      bg={formBg}
    >
      <Heading mb={6} textAlign="center">
        Create New Product
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              placeholder="Enter price"
              type="number"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="image"
              value={newProduct.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </FormControl>

          <Button colorScheme="blue" width="full" type="submit">
            Add Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreatePage;
