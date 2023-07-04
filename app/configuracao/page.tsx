"use client"

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function AccountSettings(): JSX.Element {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const router = useRouter()
  const handleSave = () => {
    // Lógica para salvar as alterações na conta
    // Aqui você pode enviar os dados para o servidor ou realizar qualquer outra ação necessária
  };

  const handleDelete = () => {
    // Lógica para excluir a conta
    // Aqui você pode enviar uma solicitação para o servidor para excluir a conta
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Configurações da Conta
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Seu email"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="currentPassword" isRequired>
          <FormLabel>Senha Atual</FormLabel>
          <Input
            placeholder="Sua senha atual"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="newPassword" isRequired>
          <FormLabel>Nova Senha</FormLabel>
          <Input
            placeholder="Digite a nova senha"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="confirmNewPassword" isRequired>
          <FormLabel>Confirme Nova Senha</FormLabel>
          <Input
            placeholder="Confirme a nova senha"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleSave}
          >
            Salvar
          </Button>
          <Button
            bg={'gray.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'gray.500',
            }}
            onClick={handleDelete}
          >
            Excluir Conta
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
