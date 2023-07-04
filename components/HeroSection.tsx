'use client'
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    Box,
    Link,
    IconProps,
    Input
  } from '@chakra-ui/react';
  import { useRouter } from 'next/navigation'
  import { useState } from 'react';

  
  export default function HeroSection () {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter()

    const handleEntrar = async () => {
      try {
        setLoading(true);
  
        console.log(email)
        console.log(senha)
        const response = await fetch('http://localhost:3003/usuarios/login', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: email,
            Senha: senha,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          console.log(data.statusCode )
          if (data.statusCode == 200) {
            console.log(data.message); // Usuário encontrado ou Login efetuado com sucesso
            router.push('/inicio');
          } else {
            console.log(data.message); // Senha inválida
          }
        } else if (response.status === 404) {
          console.log("Página não encontrada"); // Usuário não encontrado
        } else {
          console.error('Erro na requisição:', response.status);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const handleRegistro = () => {
      router.push('/signup');
    };
    return (
      <Container maxW={'5xl'}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign={{ base: 'left', md: 'center' }}
          align={{ base: 'center', md: 'center' }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Box flex={{ md: 2 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
            >
              Task{' '}
              <Text as={'span'} color={'#0B1C5A'}>
                Planner
              </Text>
            </Heading>
            <Text color={'#212529'} maxW={'3xl'} fontSize={{ base: 'md', md: 'lg'}} mt={8}>
              Nosso aplicativo de To-Do simplifica o gerenciamento de tarefas. Crie, visualize e marque suas tarefas concluídas em uma interface intuitiva. Mantenha-se organizado e produtivo com nosso aplicativo fácil de usar. Experimente agora e simplifique sua rotina diária.
            </Text>
          </Box>
          <Stack spacing={4} direction={'column'} align="center" flex={{ md: 1 }}>
            <Input placeholder="E-mail" size="lg" variant="filled" value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Senha" type="password" size="lg" variant="filled" value={senha}
            onChange={(e) => setSenha(e.target.value)} />
            <Button
              mt={8}
              rounded={'full'}
              px={6}
              colorScheme={'#0B1C5A'}
              bg={'#0B1C5A'}
              _hover={{ bg: '#212529' }}
              onClick={handleEntrar}
              isLoading={loading}
            >
              Entrar
            </Button>
    
            <Button
              
              rounded={'full'}
              px={6}
              variant="ghost"
              colorScheme={'#0B1C5A'}
              _hover={{ bg: '#0B1C5A' }}
              onClick={handleRegistro}
            >
              Cadastre-se
            </Button>
          </Stack>
          
        </Stack>
      </Container>
    );
  }
    