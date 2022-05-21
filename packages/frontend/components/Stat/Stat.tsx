import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Stat({ children }: Props) {
  return (
    <Box display="flex" gap={2}>
      {children}
    </Box>
  );
}
