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
  Text,
  useToast,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import useAppSelector from "../../hooks/useAppSelector";
import useBackerContract from "../../hooks/useBackerContract";

type Props = {
  subscriptionPlanId: BigNumber;
} & ButtonProps;

const DeleteSubscriptionPlanButton = forwardRef<Props, "button">(
  ({ subscriptionPlanId, ...restProps }, ref) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const backer = useBackerContract();
    const { web3Provider, address } = useAppSelector((state) => state.web3);

    const handleDeleteSubscriptionPlan = () => {
      (async () => {
        if (backer && web3Provider && address) {
          try {
            const signer = web3Provider.getSigner(address);
            await backer
              .connect(signer)
              .deleteSubscriptionPlan(subscriptionPlanId);
            toast({
              title: "Delete Subscription Plan",
              description:
                "deleted successfully. please wait for tx confirmation",
              status: "success",
              isClosable: true,
              duration: 5000,
            });
            onClose();
          } catch (error) {
            console.error(error);
            toast({
              title: "Delete Subscription Plan",
              description: "failed to delete the subscription plan",
              status: "error",
              isClosable: true,
              duration: 5000,
            });
          }
        }
      })();
    };

    return (
      <Box>
        <Button onClick={onOpen} ref={ref} {...restProps}>
          Delete
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Unsubscribe</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Remember when you delete a plan, all the subscribers will be
                unsubscribed from the plan and remaining pledge money(includes
                current period) will be returned to their accounts.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleDeleteSubscriptionPlan} colorScheme="red">
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
);

export default DeleteSubscriptionPlanButton;
