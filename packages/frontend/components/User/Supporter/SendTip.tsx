import Card from "../../Card/Card";
import {
  Heading,
  Box,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import useAccountBalance from "../../../hooks/useAccountBalance";
import { useState } from "react";
import { parseBalance } from "../../../utils";
import useAppSelector from "../../../hooks/useAppSelector";
import useBackerContract from "../../../hooks/useBackerContract";
import { ethers } from "ethers";

interface Props {
  address: string;
}

export default function SendTip({ address }: Props) {
  const toast = useToast();
  const { web3Provider, address: userAddress } = useAppSelector(
    (state) => state.web3
  );
  const { data: accountBalance } = useAccountBalance(userAddress);
  const [value, setValue] = useState<number>(0);
  const backer = useBackerContract();

  const handleSendTip = async () => {
    try {
      const signer = web3Provider!.getSigner(userAddress);

      await backer!
        .connect(signer)
        .sendTip(address, ethers.utils.parseEther(String(value)));

      toast({
        title: "Send Tip",
        description: "Tip sent successfully",
        status: "success",
        isClosable: true,
        duration: 5000,
      });

      setValue(0);
    } catch (error) {
      console.error(error);
      toast({
        title: "Send Tip",
        description: "Failed to send tip",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
    <Card
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minH="250px"
    >
      <Heading fontWeight="light" mb={5}>
        Send Tip
      </Heading>
      <Box display="flex">
        <Button
          mt={2}
          mr={2}
          onClick={() => {
            setValue(Number(parseBalance(accountBalance ?? 0, 18, 5)));
          }}
        >
          Max
        </Button>
        <NumberInput
          onChange={(newValue) => {
            setValue(Number(newValue));
          }}
          value={value}
          mt={2}
          defaultValue={0}
          precision={4}
          step={0.5}
          min={0}
          max={Number(parseBalance(accountBalance ?? 0, 18, 5))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Button
        onClick={handleSendTip}
        isDisabled={value == 0}
        colorScheme="purple"
        variant="outline"
        mt={4}
      >
        Send
      </Button>
    </Card>
  );
}
