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
  useDisclosure,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import useAppSelector from "../../hooks/useAppSelector";
import useBackerContract from "../../hooks/useBackerContract";

type Props = {
  creator: string;
} & ButtonProps;

const UnsubscribeButton = forwardRef<Props, "button">(
  ({ creator, ...restProps }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { web3Provider, address } = useAppSelector((state) => state.web3);
    const backer = useBackerContract();
    const toast = useToast();

    const handleUnsubscribe = async () => {
      if (web3Provider && backer && address) {
        try {
          const signer = web3Provider.getSigner(address);
          await backer.connect(signer).cancelSubscribe(creator);

          toast({
            title: "Unsubscribe",
            description:
              "Unsubscribe Successfully. Please wait for tx confirmation",
            status: "success",
            isClosable: true,
            duration: 5000,
          });
          onClose();
        } catch (error) {
          console.log("error");
          console.log(error);
          console.error(error);
          toast({
            title: "Unsubscribe",
            description: "Failed to unsubscribe",
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
          Unsubscribe
        </Button>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Unsubscribe</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Remember when you unsubscribe from a plan, the current period
                pledge money won't get back to your account.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleUnsubscribe} colorScheme="red">
                Unsubscribe
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
);

export default UnsubscribeButton;
