import {
  Box,
  Heading,
  Text,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import Card from "../Card/Card";

export default function UserInfo() {
  const toast = useToast();
  const { address, user } = useAppSelector((state) => state.web3);
  const { hasCopied: addressHasCopied, onCopy: addressOnCopy } = useClipboard(
    address ?? ""
  );
  const { hasCopied: userHasCopied, onCopy: userOnCopy } = useClipboard(
    user?.sub ?? ""
  );

  const isUser = !!user;

  useEffect(() => {
    if (userHasCopied || addressHasCopied) {
      toast({
        title: "Copied",
        description: "Copied to clipboard.",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
    }
  }, [userHasCopied, addressHasCopied]);

  return (
    <Card alignItems="center" flexWrap="wrap" gap={4}>
      {isUser && (
        <Box minW="400px" flex={1}>
          <Heading fontWeight="light" mb={1} fontSize={20}>
            UNS Domain name
          </Heading>
          <Text onClick={userOnCopy} cursor="pointer" display="inline">
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
        <Text onClick={addressOnCopy} display="inline" cursor="pointer">
          <Tooltip hasArrow label="copy to clipboard">
            {address ?? ""}
          </Tooltip>
        </Text>
      </Box>
    </Card>
  );
}
