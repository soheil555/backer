import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  VStack,
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { Subscriber as SubscriberType } from "../../../types/subscriber";
import Status from "../../../components/Stat/Stat";
import StatTitle from "../../../components/Stat/StatTitle";
import StatText from "../../../components/Stat/StatText";
import useCurrentPeriod from "../../../hooks/useCurrentPeriod";
import { calcRemainPeriods } from "../../../utils";
import { useEffect, useState } from "react";
import useBackerContract from "../../../hooks/useBackerContract";
import Resolution, { CryptoRecords } from "@unstoppabledomains/resolution";
import Stat from "../../../components/Stat/Stat";

const resolution = new Resolution();

const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

interface Props {
  subscriber: SubscriberType;
  key: number;
}

let keys: { [key: string]: string } = { "whois.email.value": "Email address" };

export default function Subscriber({ key, subscriber }: Props) {
  const toast = useToast();
  const { data: currentPeriod } = useCurrentPeriod();
  const [domain, setDomain] = useState<string>();
  const [records, setRecords] = useState<CryptoRecords>();
  const backer = useBackerContract();

  const fetchRecords = async () => {
    if (!domain || records) return;
    try {
      setRecords(await resolution.records(domain, Object.keys(keys)));
    } catch (error) {
      console.error(error);
      toast({
        title: "Fetch Records",
        description: "Failed to fetch records",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (backer) {
      (async () => {
        try {
          setDomain(await backer.getDomain(subscriber.supporter));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [backer]);

  return (
    <AccordionItem key={key}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {subscriber.supporter}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel
        pb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={4}
      >
        <VStack minW="70%" align="stretch" spacing={2}>
          <Status>
            <StatTitle>UNS domain name: </StatTitle>
            <StatText>{domain ? domain : <Spinner />}</StatText>
          </Status>

          <Status>
            <StatTitle>Subscription plan: </StatTitle>
            <StatText>{subscriber.subscriptionPlan.name}</StatText>
          </Status>

          <Status>
            <StatTitle>Number of remaining periods:</StatTitle>
            <StatText>
              {calcRemainPeriods(
                subscriber.afterLastPeriod,
                currentPeriod
              ).toString()}
            </StatText>
          </Status>
        </VStack>

        {domain?.length ? (
          <Popover>
            <PopoverTrigger>
              <Button
                onClick={() => {
                  fetchRecords();
                }}
                colorScheme="purple"
                variant="outline"
              >
                Fetch records
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent borderColor="purple.500" minW="100px" w="100%">
                <PopoverArrow />
                <PopoverHeader>Records</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  {records ? (
                    Object.entries(keys).map((key) => {
                      return (
                        <Stat>
                          <StatTitle>{key[1]}:</StatTitle>
                          <StatText>{records[key[0]]}</StatText>
                        </Stat>
                      );
                    })
                  ) : (
                    <Spinner />
                  )}
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        ) : null}
      </AccordionPanel>
    </AccordionItem>
  );
}
