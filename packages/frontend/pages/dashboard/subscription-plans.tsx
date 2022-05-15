import type { NextPage } from "next";
import DashboardLayout from "../../components/layout/dashboard";
import { Box } from "@chakra-ui/react";
import useAppSelector from "../../hooks/useAppSelector";
import { PlusSquareIcon } from "@chakra-ui/icons";
import AddSubscriptionButton from "../../components/dashboard/add-subscription-button";
import SubscriptionPlansComponent from "../../components/dashboard/subscription-plans";

const SubscriptionPlans: NextPage = () => {
  const { address } = useAppSelector((state) => state.web3);

  return (
    <DashboardLayout>
      {!!address && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <SubscriptionPlansComponent creator={address} />

          <AddSubscriptionButton
            colorScheme="purple"
            leftIcon={<PlusSquareIcon fontSize="3xl" />}
            mt={4}
          />
        </Box>
      )}
    </DashboardLayout>
  );
};

export default SubscriptionPlans;
