"use client"
import { Box, Text, HStack, VStack, Input, Card, Center } from "@chakra-ui/react";
import { DeleteIcon, AddIcon, EditIcon } from "@chakra-ui/icons";
import { FooterMenu } from "@/components/Footer";
import { useState, useEffect } from "react";
import CardLista from "@/components/CardLista";
import { ITarefa } from '@/components/CardLista';
import { useRouter } from 'next/router';

const { v4: uuidv4 } = require('uuid');
const cor = "#0B1C5A"
const corLista = "#CBE1ED"


const API_URL = "http://localhost:3003/api";

interface ILista {
    idTopico: string
    title: string
    color: string
    idLista: string
    tarefas: ITarefa[];

}

const topicosData = [
    {
        id: "4e7afed7-6d8d-4710-ba40-c878e4172800",
        title: "Tópico 1",
        color: cor
    },
    {
        id: "2dd7689c-77f2-43cf-9d4f-b42246bf6fe1",
        title: "Tópico 2",
        color: cor
    },

]

const listasData = [
    {
        idTopico: "4e7afed7-6d8d-4710-ba40-c878e4172800",
        title: "Lista 1",
        color: corLista,
        idLista: "4e7afed7-6d8d-4710-ba40-c878231233123",
        tarefas: [],
    }

]




export default function Inicio() {
    //const router = useRouter();
    //const { idusuario } = router.query;

    const [topicos, setTopicos] = useState(topicosData)
    const [tarefas, setTarefas] = useState<ITarefa[]>([])
    const [editando, setEditando] = useState(false)
    const [editandoId, setEditandoId] = useState("")
    const [listas, setListas] = useState<ILista[]>([]);
    const [listaParaComponente, setListaParaComponente] = useState<ILista[]>([]);
    const [lastListId, setLastListId] = useState(0);
    const [listCount, setListCount] = useState(0);
    const [novoTituloLista, setNovoTituloLista] = useState("");
    const [idTopicoSelecionado, setIdTopicoSelecionado] = useState("");


    function handleFindListas(id: string) {
        setIdTopicoSelecionado(id);
        const newListas = listas.filter((item) => item.idTopico === id)
        setListaParaComponente(newListas)
    }


    function handleDelete(id: string) {
        const newTopicos = topicos.filter((item) => item.id !== id)
        setTopicos(newTopicos)
    }

    function handleDeleteLista(id: string) {
        const newListas = listas.filter((item) => item.idLista !== id);
        setListas(newListas);
        setListaParaComponente(newListas);
    }

    function handleDeleteTarefa(id: string) {
        const newTarefas = tarefas.filter((item) => item.idTask !== id);
        setTarefas(newTarefas);
    }



    function handleAdd(title: string) {
        const newIdTopico = uuidv4();
        const newIdLista = uuidv4();

        const newTarefas = [
            ...tarefas,
            {
                idTask: uuidv4(),
                idLista: newIdLista,
                title: "Nova Tarefa",
                concluido: false,
            },
        ];

        const newTopicos = [
            ...topicos,
            {
                id: newIdTopico,
                title: title,
                color: cor,
            },
        ];

        setTopicos(newTopicos);
        setTarefas(newTarefas);

    }

    function handleAddTarefa(idLista: string): void {
        const newTarefa: ITarefa = {
            idTask: String(Date.now()),
            idLista: idLista,
            title: "Nova Tarefa",
            concluido: false,
        };
        const listaIndex = listas.findIndex((lista) => lista.idLista === idLista);
        if (listaIndex !== -1) {
            const newListas = [...listas];
            newListas[listaIndex].tarefas.push(newTarefa);
            setListas(newListas);
        }


        const newTarefas = [...tarefas, newTarefa];
        setTarefas(newTarefas);
    }

    const handleEdit = (id: string, newTitle: string) => {
        setEditando(true);
        setEditandoId(id);
        const newTopicos = topicos.map((item) => {
            if (item.id === id) {
                return { ...item, title: newTitle };
            }
            return item;
        });
        const newTarefas = tarefas.map((item) => {
            if (item.idTask === id) {
                return { ...item, title: newTitle };
            }
            return item;
        });

        setTopicos(newTopicos);
        setTarefas(newTarefas);
    };
    function addNewList(idTopico: string, titulo: string): void {
        const newIdLista = uuidv4();

        const newTarefas = [
            ...tarefas,
            {
                idTask: uuidv4(),
                idLista: newIdLista,
                title: "Nova Tarefa",
                concluido: false,
            },
        ];

        const newLista: ILista = {
            idTopico: idTopicoSelecionado,
            title: "Nova Lista",
            color: corLista,
            idLista: uuidv4(),
            tarefas: [],
        };
        const newListas = [...listas, newLista];
        setListas(newListas);
        setListaParaComponente(newListas);

        setTarefas(newTarefas);

    };


    return (
        <Box p="3" color='white'>
            <HStack >
                <VStack h="53.25rem" w="20.62rem" bg={"#F4F4F4"} rounded={"md"} justifyContent={"space-between"}>
                    <VStack p="3" w="full" justifyContent={"space-between"} alignItems={"flex-start"}>
                        <Text fontWeight={"bold"} color={'#444444'}>
                            Menu
                        </Text>

                        <VStack mt="7" w="full" alignItems={"flex-start"}>

                            <HStack w="full" justifyContent={"space-between"}>
                                <Text fontWeight={"bold"} fontSize={"md"} color={'#444444'} >
                                    Tópicos
                                </Text>
                                <AddIcon color={"#444444"} cursor="pointer" onClick={() => handleAdd("Novo Tópico")} />
                            </HStack>

                            <VStack w="full"
                                overflowY={"auto"}
                                maxH={"40rem"}
                                overflowX={"hidden"}

                            >
                                {
                                    topicos.map((item) => (
                                        <HStack key={item.id} w="full" p="1" ml="1" rounded={"md"} justifyContent={"space-between"}>
                                            <HStack>
                                                <Box w="1rem" h="1rem" bg={
                                                    item.color
                                                } rounded={"md"} />
                                                {
                                                    editando && editandoId === item.id ? (
                                                        <Input
                                                            w="full"
                                                            variant="unstyled"
                                                            textColor={"red"}
                                                            defaultValue={item.title}
                                                            onBlur={(e) => {
                                                                handleEdit(item.id, e.target.value);
                                                                setEditando(false);
                                                            }}
                                                        />
                                                    ) : (
                                                        topicos.length > 0 ? (
                                                            <Text onClick={() => handleFindListas(item.id)} fontSize={"md"} color={'#444444'}>
                                                                {item.title}
                                                            </Text>
                                                        ) : null
                                                    )}
                                            </HStack>
                                            <HStack>
                                                <EditIcon color={"#444444"} cursor="pointer" onClick={() => { handleEdit(item.id, item.title) }} />
                                                <DeleteIcon color={"#444444"} cursor="pointer" onClick={
                                                    () => handleDelete(item.id)
                                                } />
                                            </HStack>
                                        </HStack>

                                    ))
                                }



                            </VStack>

                        </VStack>

                    </VStack>
                    <FooterMenu />
                </VStack>

                <VStack h="53.25rem" w="65.938rem" bg={"#C5CCD9"} rounded={"md"}>
                    <Box p="3">
                        <Text color={'#0B1C5A'} fontWeight={"bold"} alignSelf={"center"}>TASK PLANNER</Text>
                    </Box>
                    <HStack w="full" h="full" p="3" alignItems={"flex-start"}>
                        {listaParaComponente.map((lista, index) => (
                            <CardLista
                                key={lista.idLista}
                                listas={[lista]}
                                tarefas={tarefas}
                                handleAddTarefa={handleAddTarefa}
                                handleDeleteLista={handleDeleteLista}
                                handleDeleteTarefa={handleDeleteTarefa}
                            //listNumber={index + 1}
                            //novoTituloLista={novoTituloLista} // Passe o estado novoTituloLista como propriedade


                            />
                        ))}
                        <Box p="3" w="30%" h="30%" bgColor="#c2c2c2" rounded={"md"} shadow={"md"} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                            <AddIcon
                                color="#444444"
                                cursor="pointer"
                                boxSize={8}
                                onClick={() => addNewList(idTopicoSelecionado, novoTituloLista)}
                            />
                            <Text fontWeight={"bold"} fontSize="md" color={"#0B1C5A"} cursor="pointer" onClick={() => addNewList(idTopicoSelecionado, novoTituloLista)}>
                                Nova Lista
                            </Text>

                        </Box>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    )
}