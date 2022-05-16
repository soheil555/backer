import {
  forwardRef,
  ButtonProps,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import useAccountBalance from "../../hooks/useAccountBalance";
import useAppSelector from "../../hooks/useAppSelector";
import useBackerContract from "../../hooks/useBackerContract";

type Props = {
  creator: string;
  subscriptionPlanId: BigNumber;
  amountPerPeriod: BigNumber;
} & ButtonProps;

const SubscribeButton = forwardRef<Props, "button">(
  ({ creator, subscriptionPlanId, amountPerPeriod, ...restProps }, ref) => {
    const toast = useToast();
    const { web3Provider, address } = useAppSelector((state) => state.web3);
    const backer = useBackerContract();
    const { data: userBalance } = useAccountBalance(address);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [numOfPeriod, setNumOfperiod] = useState(0);

    const maxNumOfPeriod = userBalance?.div(amountPerPeriod).toNumber() ?? 0;

    const handleSubscribe = async () => {
      if (web3Provider && address && backer) {
        const signer = web3Provider.getSigner(address);

        try {
          await backer
            .connect(signer)
            .subscribe(
              creator,
              subscriptionPlanId,
              BigNumber.from(numOfPeriod)
            );

          onClose();
          setNumOfperiod(0);

          toast({
            title: "Subscribe",
            description:
              "Subscribed successfully. please wait for tx confirmation",
            status: "success",
            isClosable: true,
            duration: 5000,
          });
        } catch (error) {
          console.error(error);
          toast({
            title: "Subscribe",
            description: "Failed to subscribe",
            status: "error",
            isClosable: true,
            duration: 5000,
          });
        }
      }
    };

    return (
      <Box>
        <Button onClick={onOpen} ref={ref} {...restProps}>
          Subscribe
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Subscribe to the plan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Number of periods</FormLabel>
                <NumberInput
                  onChange={(value) => setNumOfperiod(Number(value))}
                  min={0}
                  max={maxNumOfPeriod}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>
                  Please enter number of periods you want to subscribe to the
                  plan. Remember you pays all the money once but you can cancel
                  the subscription any time and give back your money.
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
                isDisabled={numOfPeriod === 0}
                onClick={handleSubscribe}
                colorScheme="purple"
                variant="solid"
              >
                Subscribe
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
);

export default SubscribeButton;
