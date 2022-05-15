import { Box, Heading, Text, Tooltip } from "@chakra-ui/react";
import useAppSelector from "../../hooks/useAppSelector";
import Card from "../Card/Card";

export default function UserInfo() {
  const { address, user } = useAppSelector((state) => state.web3);

  const isUser = !!user;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card alignItems="center" flexWrap="wrap" gap={4}>
      {isUser && (
        <Box minW="400px" flex={1}>
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

      <Box minW="400px" flex={1}>
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
    </Card>
  );
}
