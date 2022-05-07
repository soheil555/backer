import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./navbar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Box>
      <Navbar />
      <Box as="main">{children}</Box>
    </Box>
  );
}
