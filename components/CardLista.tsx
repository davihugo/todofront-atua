import { Box, Text, HStack, Checkbox, IconButton, Input } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react"

interface CardListaProps {
    listas: ILista[]
    tarefas: ITarefa[];
    handleAddTarefa: (idLista: string) => void;
    handleDeleteLista: (id: string) => void; // Adicionei a propriedade handleDeleteLista ao tipo CardListaProps
    handleDeleteTarefa: (id: string) => void
    

}
const { v4: uuidv4 } = require('uuid');

/*
interface ITarefa {
    idTask: string;
    idLista: string;
    title: string;
    concluido: boolean;
  }
*/

export interface ITarefa {
    idTask: string;
    idLista: string;
    title: string;
    concluido: boolean;
}

interface ILista {
    idTopico: string
    title: string
    color: string
    idLista: string
}

const tarefasData = [
    {
        idTask: "4e7afed7-6d8d-4710-ba40-c878e4172800",
        idLista: "4e7afed7-6d8d-4710-ba40-c878231233123",
        title: "Tarefa Lista 1",
        concluido: true
    },
    {
        idTask: "4e7afed7-6d8d-4710-ba40-c878e41asda00",
        idLista: "4e7afed7-6d8d-4710-ba40-c878231233123",
        title: "Tarefa Lista 1",
        concluido: false
    },
    {
        idTask: "4e7aasded7-6d8d-4710-ba40-c878e41asda00",
        idLista: "4e7afed7-6d8d-4710-ba40-c878231233123",
        title: "Tarefa Lista 1",
        concluido: false
    },
    {
        idTask: "4e7afed7-6d8d-4710-ba40-c878e4172800",
        idLista: "4e7afed7-6d8d-47asd10-ba40-c878231233123",
        title: "Tarefa Lista 2",
        concluido: false
    },
    {
        idTask: "4e7afed7-6d8d-4710-ba40-c878e41asda00",
        idLista: "4e7afed7-6d8d-47asd10-ba40-c878231233123",
        title: "Tarefa Lista 2",
        concluido: false
    },
    {
        idTask: "4e7aasded7-6d8d-4710-ba40-c878e41asda00",
        idLista: "4e7afed7-6d8d-47asd10-ba40-c878231233123",
        title: "Tarefa Lista 2",
        concluido: false
    },
]


export default function CardLista(props: CardListaProps) {

    const [tarefas, setTarefas] = useState(tarefasData)
    const [valorInput, setValorInput] = useState('');

    const handleChangeInput = (event: any) => {
        setValorInput(event.target.value);
    };

    const handleConcluido = (id: string) => {
        const toggleConcluido = tarefas.map((item) => {
            if (item.idTask === id) {
                return { ...item, concluido: !item.concluido };
            }
            return item;
        });

        setTarefas(toggleConcluido);
    };
    if (props.listas.length === 0) {
        return null; // Renderiza nada se não houver listas
    }

    const handleSubmit = () => {
        console.log(props);
        console.log(props.listas[0]);
        const newTarefa: ITarefa = {
            idTask: uuidv4(),
            idLista: props.listas[0].idLista,
            title: valorInput,
            concluido: false,
        };

        const newTarefas = [...tarefas, newTarefa];
        console.log(newTarefas);
        setTarefas(newTarefas);
        setValorInput("");
        console.log(newTarefas);
    };

    const handleDeleteLista = () => {
        props.handleDeleteLista(props.listas[0].idLista);
    };

    const handleDeleteTarefa = (id: string) => {
        const filteredTarefas = tarefas.filter((item) => item.idTask !== id);
        setTarefas(filteredTarefas);
    };

    return (
        <Box p="3" w="30%" h="30%" bgColor={props.listas[0].color} rounded={"md"} shadow={"md"}>
            <Text
                fontSize={"md"}
                fontWeight={"extrabold"}
                color={"#444444"}
            >

                {props.listas[0].title}
            </Text>
            {tarefas.map((item) => {
                if (item.idLista === props.listas[0].idLista) {
                    return (
                        <HStack key={item.idTask} px="2" w="full" justifyContent={"space-between"}>
                            <Text
                                fontSize={"sm"}

                                color={"#444444"}
                                textDecoration={item.concluido ? "line-through" : "none"}
                            >{item.title}</Text>
                            <Checkbox
                                borderColor={
                                    item.concluido ? "green.500" : "gray.300"
                                }
                                isChecked={item.concluido === true ? true : false}
                                onChange={() => handleConcluido(item.idTask)}
                                colorScheme="green"
                            />
                            <IconButton
                                icon={<DeleteIcon />}
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => handleDeleteTarefa(item.idTask)}
                                aria-label="Deletar Tarefa"
                            />
                        </HStack>
                    )
                }
                return null;
            })}
            <HStack px="2" w="full" justifyContent="space-between">

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={valorInput}
                        onChange={handleChangeInput}
                        placeholder="Digite algo"
                        style={{
                            color: 'black',
                            borderRadius: '4px',
                            fontSize: '12px',
                            width: '200px',
                            /* Outros estilos desejados */
                          }}
                        />
                    <AddIcon
                        color="#444444"
                        cursor="pointer"
                        onClick={handleSubmit}
                    />
                </form>
                <IconButton
                    icon={<DeleteIcon />}
                    variant="ghost"
                    colorScheme="red"
                    onClick={handleDeleteLista}
                    aria-label="Deletar Tarefa"
                />
            </HStack>
        </Box>
    )

}
