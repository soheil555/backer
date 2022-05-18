import DashboardLayout from "../../../layouts/Dashboard";
import { Box, Container, Heading } from "@chakra-ui/react";
import useAppSelector from "../../../hooks/useAppSelector";
import { PlusSquareIcon } from "@chakra-ui/icons";
import AddSubscriptionPlanButton from "../../../components/CustomButtons/AddSubscriptionPlanButton";
import SubscriptionPlansComponent from "../../../components/User/Creator/SubscriptionPlans";
import { Page } from "../../../types/page";
import { ReactElement } from "react";

const SubscriptionPlans: Page = () => {
  const { address } = useAppSelector((state) => state.web3);

  return (
    <Box>
      {!!address && (
        <Container maxW="container.lg">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Heading fontWeight="light" mb={2}>
              Your subscription plans
            </Heading>

            <SubscriptionPlansComponent creator={address} />

            <AddSubscriptionPlanButton
              colorScheme="purple"
              leftIcon={<PlusSquareIcon fontSize="3xl" />}
              mt={4}
            />
          </Box>
        </Container>
      )}
    </Box>
  );
};

SubscriptionPlans.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SubscriptionPlans;
