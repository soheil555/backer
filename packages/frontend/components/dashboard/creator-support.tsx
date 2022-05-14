import { Box } from "@chakra-ui/react";

interface Props {
  address: string;
}

export default function CreatorSupport({ address }: Props) {
  if (address.length === 0) return null;

  return <Box>{address}</Box>;
}
