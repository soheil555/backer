import type { NextPage } from "next";
import DashboardLayout from "../../components/layout/dashboard";
import { Box, useToast, Heading } from "@chakra-ui/react";
import useBackerContract from "../../hooks/useBackerContract";
import { useEffect, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import type { SubscriptionPlan } from "../../types";
import Plans from "../../components/dashboard/plans";
import { BigNumber } from "ethers";

const SubscriptionPlans: NextPage = () => {
  const toast = useToast();
  const { web3Provider, address } = useAppSelector((state) => state.web3);
  const backer = useBackerContract();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [period, setPeriod] = useState<BigNumber>();

  useEffect(() => {
    if (web3Provider && backer && address) {
      const signer = web3Provider.getSigner(address);
      backer
        .connect(signer)
        .getCreatorSubscriptionPlans(address)
        .then((plans) => {
          backer
            .period()
            .then((period) => {
              setPeriod(period);
              setPlans(plans);
            })
            .catch(console.error);
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
  }, [web3Provider, address]);

  return (
    <DashboardLayout>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Heading mb={4} fontWeight="light">
          Your subscription plans
        </Heading>
        <Box w="70%">
          <Plans plans={plans} period={period} creator={address ?? ""} />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default SubscriptionPlans;
