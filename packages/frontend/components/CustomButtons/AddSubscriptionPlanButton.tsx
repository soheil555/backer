import {
  forwardRef,
  ButtonProps,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  useDisclosure,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { parsePeriod } from "../../utils";
import useBackerContract from "../../hooks/useBackerContract";
import useAppSelector from "../../hooks/useAppSelector";
import { ethers } from "ethers";

const AddSubscriptionPlanButton = forwardRef<ButtonProps, "button">(
  (props, ref) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState<string>("");
    const [amountPerPeriod, setAmountPerPeriod] = useState<string>("");
    const { web3Provider, address } = useAppSelector((state) => state.web3);
    const backer = useBackerContract();

    const handleAddSubscriptionPlan = async () => {
      if (backer && web3Provider && address) {
        const signer = web3Provider.getSigner(address);

        try {
          await backer
            .connect(signer)
            .newSubscriptionPlan(
              ethers.utils.parseEther(amountPerPeriod),
              name
            );

          toast({
            title: "New Subscription Plan",
            description: "added successfully. please wait for tx confirmation",
            status: "success",
            isClosable: true,
            duration: 5000,
          });

          onClose();
          setName("");
          setAmountPerPeriod("");
        } catch (error) {
          console.error(error);
          toast({
            title: "New Subscription Plan",
            description: "Failed to add a subscription plan",
            status: "error",
            isClosable: true,
            duration: 5000,
          });
        }
      }
    };

    return (
      <Box>
        <Button onClick={onOpen} ref={ref} {...props}>
          Add a Subscription Plan
        </Button>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a subscription plan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired mb={4}>
                <FormLabel>Name</FormLabel>

                <Input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  name="name"
                  type="text"
                />

                <FormHelperText>
                  Name of the plan. e.g "gold plan"
                </FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Amount per period</FormLabel>

                <NumberInput
                  value={amountPerPeriod}
                  onChange={(value) => setAmountPerPeriod(value)}
                  min={0}
                  step={0.5}
                  precision={4}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <FormHelperText>
                  Amount of Matic the supporter would pay you every{" "}
                  {parsePeriod()}.
                </FormHelperText>
              </FormControl>
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
                onClick={handleAddSubscriptionPlan}
                isDisabled={name.length === 0 || amountPerPeriod.length === 0}
                leftIcon={<PlusSquareIcon fontSize="2xl" />}
                colorScheme="purple"
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
);

export default AddSubscriptionPlanButton;
