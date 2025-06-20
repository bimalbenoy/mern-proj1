import React, { useState } from 'react';
import {
  Box,
  Image,
  Stack,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/Product';

const ProductCard = ({ product }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleDelete = async (id) => {
    const response = await deleteProduct(id);
    toast({
      title: response.success ? "Deleted" : "Error",
      description: response.message,
      status: response.success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdate = async () => {
    const response = await updateProduct(product._id, editedProduct);
    toast({
      title: response.success ? "Updated" : "Error",
      description: response.message,
      status: response.success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (response.success) onClose();
  };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg={bgColor}
        color={textColor}
        shadow="md"
        transition="all 0.3s ease"
        _hover={{
          transform: 'scale(1.03)',
          shadow: 'lg',
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          borderRadius="md"
          w="full"
          h="200px"
          objectFit="cover"
        />
        <Stack mt={4} spacing={2}>
          <Heading size="md">{product.name}</Heading>
          <Text fontWeight="bold">${product.price}</Text>
        </Stack>
        <HStack mt={4} justifyContent="space-between">
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      {/* 🔧 Modal for editing */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                  
                  
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={editedProduct.image}
                  onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })}
                  
                 
                  
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
