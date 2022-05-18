import {
  Box,
  Link,
  VStack,
  Icon,
  Text,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";
import type { Route } from "../../routes";

type SidebarProps = {
  routes: Route[];
};

const createLinks = (routes: Route[]) => {
  return routes.map((route) => {
    if (route.category) {
      return (
        <Box display="flex" flexDirection="column">
          <Heading fontWeight="light" fontSize={24} mb={4}>
            {route.name}
          </Heading>
          {createLinks(route.views!)}
        </Box>
      );
    }

    return (
      <NextLink href={route.path!} passHref>
        <Link
          bg="whiteAlpha.900"
          fontSize={25}
          p={3}
          borderRadius="3xl"
          _hover={{ bg: "purple.500", color: "white" }}
          mb={4}
        >
          <Flex align="center" gap={5}>
            <Icon as={route.icon} /> <Text>{route.name}</Text>
          </Flex>
        </Link>
      </NextLink>
    );
  });
};

export default function Sidebar({ routes }: SidebarProps) {
  return (
    <Box
      bg="purple.50"
      w="320px"
      h="calc(100vh - 10rem)"
      pt={20}
      mx={3}
      borderRadius="md"
      position="fixed"
    >
      <VStack spacing={10} align="stretch" mx={2}>
        {createLinks(routes)}
      </VStack>
    </Box>
  );
}

type SidebarResponsiveProps = {
  isOpen: boolean;
  onClose: () => void;
} & SidebarProps;

export function SidebarResponsive({
  routes,
  isOpen,
  onClose,
}: SidebarResponsiveProps) {
  return (
    <Drawer size="sm" placement="left" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="purple.50">
        <DrawerCloseButton />
        <DrawerHeader>Backer</DrawerHeader>

        <DrawerBody mt={10}>
          <VStack spacing={10} align="stretch" mx={2}>
            {createLinks(routes)}
          </VStack>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
