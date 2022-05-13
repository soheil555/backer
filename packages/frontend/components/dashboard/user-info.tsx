import { Box, Heading, SimpleGrid, Text, Tooltip } from "@chakra-ui/react";
import useAppSelector from "../../hooks/useAppSelector";

export default function UserInfo() {
  const { address, user } = useAppSelector((state) => state.web3);

  const isUser = !!user;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <SimpleGrid minChildWidth="450px" mb={10} p={4} spacing={10} bg="gray.50">
      {isUser && (
        <Box>
          <Heading fontWeight="light" mb={1} fontSize={20}>
            UNS Domain name
          </Heading>
          <Text
            onClick={() => {
              copyToClipboard(user.sub);
            }}
            cursor="pointer"
            display="inline"
          >
            <Tooltip hasArrow label="copy to clipboard">
              {user.sub}
            </Tooltip>
          </Text>
        </Box>
      )}

      <Box>
        <Heading fontWeight="light" mb={1} fontSize={20}>
          Wallet Address
        </Heading>
        <Text
          onClick={() => {
            copyToClipboard(address ?? "");
          }}
          display="inline"
          cursor="pointer"
        >
          <Tooltip hasArrow label="copy to clipboard">
            {address}
          </Tooltip>
        </Text>
      </Box>
    </SimpleGrid>
  );
}
