import DashboardLayout from "../../layouts/Dashboard";
import { Box } from "@chakra-ui/react";
import useAppSelector from "../../hooks/useAppSelector";
import { PlusSquareIcon } from "@chakra-ui/icons";
import AddSubscriptionButton from "../../components/CustomButtons/AddSubscriptionButton";
import SubscriptionPlansComponent from "../../components/User/Creator/SubscriptionPlans";
import { Page } from "../../types/page";
import { ReactElement } from "react";

const SubscriptionPlans: Page = () => {
  const { address } = useAppSelector((state) => state.web3);

  return (
    <Box>
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
    </Box>
  );
};

SubscriptionPlans.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SubscriptionPlans;
