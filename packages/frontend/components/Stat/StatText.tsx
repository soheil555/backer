import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function StatText({ children }: Props) {
  return <Text color="purple.500">{children}</Text>;
}
