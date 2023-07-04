import { HStack, VStack, Text } from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons"
import { useRouter } from "next/navigation";

export function FooterMenu(){
    const router = useRouter();
    class HandleNavigation{
        handleSair(){
          router.push('/')
        }
        handleConfiguracao(){
           router.push('/configuracao')
          
        }
      }
     const handleNavigation = new HandleNavigation()
     const handleConfiguracoesClick = () => {
        handleNavigation.handleConfiguracao();

      };
    return(
        <VStack w="full" p="3" alignItems={"flex-start"}>
            <HStack onClick={handleConfiguracoesClick} _pressed={{ opacity: 0.5 }}>
                <HamburgerIcon color={"#444444"}/>
                <Text  cursor="pointer" fontSize={"xs"} color={"#444444"}>
                    Configurações
                </Text>
            </HStack>
            <HStack >
                <ArrowForwardIcon color={"#444444"}/>
                <Text _pressed={{
                    opacity: 0.5
                }} cursor="pointer" fontSize={"xs"} color={"#444444"} onClick={()=> handleNavigation.handleSair()}> 
                    Sair
                </Text>
            </HStack>
        </VStack>
    )
}