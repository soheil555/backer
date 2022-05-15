import type { NextPage } from "next";
import DashboardLayout from "../../components/layout/dashboard";
import { Box, useToast, Heading, IconButton } from "@chakra-ui/react";
import useBackerContract from "../../hooks/useBackerContract";
import { useEffect, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import type { SubscriptionPlan } from "../../types";
import Plans from "../../components/dashboard/plans";
import { PlusSquareIcon, RepeatIcon } from "@chakra-ui/icons";
import AddSubscriptionButton from "../../components/dashboard/add-subscription-button";

const SubscriptionPlans: NextPage = () => {
  const toast = useToast();
  const { web3Provider, address } = useAppSelector((state) => state.web3);
  const backer = useBackerContract();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (web3Provider && backer && address) {
      const signer = web3Provider.getSigner(address);
      backer
        .connect(signer)
        .getCreatorSubscriptionPlans(address)
        .then((plans) => {
          setPlans(plans);
        })
        .catch(() => {
          toast({
            title: "Plans",
            description: "Faild to fetch user subscription plans",
            status: "error",
            isClosable: true,
            duration: 5000,
          });
        });
    }
  }, [web3Provider, address, backer, refresh]);

  return (
    <DashboardLayout>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb={4} display="flex" alignItems="center" gap={3}>
          <Heading fontWeight="light">Your subscription plans</Heading>

          <IconButton
            colorScheme="purple"
            variant="outline"
            aria-label="refresh plans"
            icon={<RepeatIcon />}
            _hover={{ color: "white", bg: "purple.500" }}
            onClick={() => setRefresh(!refresh)}
          />
        </Box>

        <Box w="70%">
          <Plans plans={plans} creator={address ?? ""} />
        </Box>

        <AddSubscriptionButton
          colorScheme="purple"
          leftIcon={<PlusSquareIcon fontSize="3xl" />}
          mt={4}
        />
      </Box>
    </DashboardLayout>
  );
};

export default SubscriptionPlans;
