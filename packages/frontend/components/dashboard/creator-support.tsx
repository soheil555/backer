import { Box, SimpleGrid } from "@chakra-ui/react";
import SendTip from "./send-tip";

interface Props {
  address: string;
}

export default function CreatorSupport({ address }: Props) {
  if (address.length === 0) return null;

  return (
    <SimpleGrid mt={10} minChildWidth="400px" spacing={10}>
      <Box height="600px" bg="red"></Box>

      <SendTip address={address} />
    </SimpleGrid>
  );
}
