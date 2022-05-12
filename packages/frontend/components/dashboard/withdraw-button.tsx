import {
  Button,
  ButtonProps,
  forwardRef,
  useDisclosure,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import useAccountBalance from "../../hooks/useAccountBalance";
import useAppSelector from "../../hooks/useAppSelector";
import useBackerContract from "../../hooks/useBackerContract";
import { parseBalance } from "../../utils";

const WithdrawButton = forwardRef<ButtonProps, "button">((props, ref) => {
  const toast = useToast();
  const { web3Provider, address } = useAppSelector((state) => state.web3);
  const backer = useBackerContract();
  const { data: accountBalance } = useAccountBalance(address);

  const [value, setValue] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonDisabled = !(!!web3Provider || !!backer);

  const handleWithdraw = async () => {
    try {
      const signer = web3Provider!.getSigner(address);

      await backer!
        .connect(signer)
        .withdraw(ethers.utils.parseEther(String(value)));

      toast({
        title: "Withdraw",
        description: "Withdraw Transaction sent, Please wait for confirmation",
        status: "success",
        isClosable: true,
        duration: 5000,
      });

      setValue(0);
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Withdraw",
        description: "Withdraw Failed",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
    <Box>
      <Button isDisabled={buttonDisabled} {...props} onClick={onOpen} ref={ref}>
        Withdraw
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw Matic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            withdraw Matic from your account
            <NumberInput
              onChange={(newValue) => {
                setValue(Number(newValue));
              }}
              value={value}
              mt={2}
              defaultValue={0}
              precision={2}
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
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleWithdraw}
              isDisabled={value == 0}
              colorScheme="purple"
            >
              Withdraw
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
});

export default WithdrawButton;
