import { Box, Text, VStack, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface SidebarProps {
  links: { label: string; href: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const router = useRouter();

  return (
    <Box bg="gray.200" h="100vh" w="200px" p={4}>
      <VStack spacing={4} align="start">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            fontWeight={router.pathname === link.href ? "bold" : "normal"}
          >
            {link.label}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
