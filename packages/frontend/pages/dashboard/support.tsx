import DashboardLayout from "../../layouts/Dashboard";
import { utils } from "ethers";
import {
  Input,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  FormHelperText,
  SimpleGrid,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Resolution from "@unstoppabledomains/resolution";
import { useState, ReactElement } from "react";
import { Page } from "../../types/page";
import SubscriptionPlans from "../../components/User/Creator/SubscriptionPlans";
import SendTip from "../../components/User/Supporter/SendTip";
import UnsubscribeButton from "../../components/CustomButtons/UnsubscribeButton";

const resolution = new Resolution();

const Support: Page = () => {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const resolveAddress = (input: string, currency: string) => {
    if (utils.isAddress(input)) {
      setAddress(input);
      setError("");
      return;
    }

    setIsloading(true);
    resolution
      .addr(input, currency)
      .then((address) => {
        setAddress(address);
        setError("");
      })
      .catch(() => {
        setError("UNS domain name is invalid");
        setAddress("");
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box>
          <FormControl mb={3} w="450px" isInvalid={error.length !== 0}>
            <FormLabel htmlFor="email">
              The Creator UNS Domain/Ethereum address
            </FormLabel>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="UNS Domain name/Ethereum address"
            />
            {error.length === 0 ? (
              <FormHelperText>
                Please either enter the creator UNS domain name or Ethereum
                address.
              </FormHelperText>
            ) : (
              <FormErrorMessage>{error}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            onClick={() => resolveAddress(input, "ETH")}
            isLoading={isLoading}
            colorScheme="purple"
            variant="outline"
            isDisabled={input.length === 0}
            aria-label="Search"
            leftIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Box>

      {!!address.length && (
        <SimpleGrid mt={10} minChildWidth="400px" spacing={10}>
          <SubscriptionPlans creator={address} />

          <Box height="250px">
            <SendTip address={address} />
          </Box>
        </SimpleGrid>
      )}
    </Box>
  );
};

Support.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Support;
