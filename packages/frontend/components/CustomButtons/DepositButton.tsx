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
import useAppSelector from "../../hooks/useAppSelector";
import useBackerContract from "../../hooks/useBackerContract";

const DepositButton = forwardRef<ButtonProps, "button">((props, ref) => {
  const toast = useToast();
  const { web3Provider, address } = useAppSelector((state) => state.web3);
  const backer = useBackerContract();

  const [value, setValue] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonDisabled = !(!!web3Provider || !!backer);

  const handleDeposit = async () => {
    try {
      const signer = web3Provider!.getSigner(address);

      await backer!
        .connect(signer)
        .deposit({ value: ethers.utils.parseEther(value) });

      toast({
        title: "Deposit",
        description: "Depost Transaction sent, Please wait for confirmation",
        status: "success",
        isClosable: true,
        duration: 5000,
      });

      setValue("");
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Deposit",
        description: "Depost Failed",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
    <Box>
      <Button isDisabled={buttonDisabled} {...props} onClick={onOpen} ref={ref}>
        Deposit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit Matic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            deposit Matic to start supporting your favorite creator
            <NumberInput
              onChange={(newValue) => {
                setValue(newValue);
              }}
              value={value}
              mt={2}
              defaultValue={0}
              precision={2}
              step={0.5}
              min={0}
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
              onClick={handleDeposit}
              isDisabled={value.length === 0}
              colorScheme="purple"
            >
              Deposit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
});

export default DepositButton;
