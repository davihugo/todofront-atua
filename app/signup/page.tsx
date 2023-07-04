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
import { useState } from 'react';
import { useRouter } from 'next/navigation';

  
  export default function SignUpPage(): JSX.Element {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCadastrar = async () => {
      try {
        setLoading(true);

        console.log(email)
        console.log(password)

        const response = await fetch('http://localhost:3003/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Nome: username,
            Email: email,
            Senha: password,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          router.push('/inicio');
        } else {
          // Trate o erro de cadastro, exiba uma mensagem de erro ou realize outra ação adequada
          console.error('Erro ao cadastrar');
        }
      } catch (error) {
        // Trate o erro da requisição, exiba uma mensagem de erro ou realize outra ação adequada
        console.error(error);
      }finally {
        setLoading(false);
      }
    };
  

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Cadastre-se
          </Heading>
          
          <FormControl id="userName" isRequired>
            <FormLabel>Nome de Usuário</FormLabel>
            <Input
              placeholder="Digite seu nome"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              placeholder="Digite sua senha"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              onClick={handleCadastrar}>
              Cadastrar
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
  