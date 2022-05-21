import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function StatTitle({ children }: Props) {
  return <Text color="gray.500">{children}</Text>;
}
