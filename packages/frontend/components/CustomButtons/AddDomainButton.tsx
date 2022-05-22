import {
  Button,
  ButtonProps,
  forwardRef,
  useToast,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useBackerContract from "../../hooks/useBackerContract";
import { InfoOutlineIcon } from "@chakra-ui/icons";

type Props = {
  domain: string;
} & ButtonProps;

const AddDomainButton = forwardRef<Props, "button">(
  ({ domain, ...restProps }, ref) => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [alreadySet, setAlreadySet] = useState(false);
    const { address, web3Provider } = useAppSelector((state) => state.web3);
    const backer = useBackerContract();

    useEffect(() => {
      if (backer && address && web3Provider) {
        (async () => {
          const fetchedDomain = await backer.getDomain(address);
          if (fetchedDomain === domain) {
            setAlreadySet(true);
          }

          setIsLoading(false);
        })();
      }
    }, [backer, address, web3Provider]);

    const handleSetDomain = async () => {
      if (!backer) return;

      try {
        await backer.setDomain(domain);
        toast({
          title: "Set domain",
          description:
            "Set domain successfully, please wait for tx confirmation",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
        setAlreadySet(true);
      } catch (error) {
        console.error(error);
        toast({
          title: "Set domain",
          description: "Failed to set domain",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      }
    };

    return (
      <Box display="flex" alignItems="center" gap={2}>
        <Tooltip
          hasArrow
          label="setting a domain name allows a creator to see available domain records. for example, a creator could see a supporter's public email address associated with the domain if there is any, and sends exclusive contents to her/his email address."
        >
          <InfoOutlineIcon />
        </Tooltip>
        <Button
          onClick={handleSetDomain}
          isDisabled={alreadySet}
          isLoading={isLoading}
          ref={ref}
          {...restProps}
        >
          {alreadySet ? "already set" : "add domain"}
        </Button>
      </Box>
    );
  }
);

export default AddDomainButton;
