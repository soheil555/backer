import { useCallback, useMemo, useEffect } from "react";
import * as Web3Modal from "web3modal";
import { providerOptions } from "../../config/provider-options";
import { ethers } from "ethers";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import * as UAuthWeb3Modal from "@uauth/web3modal";
import {
  resetWeb3Provider,
  setAddress,
  setWeb3Provider,
} from "../../redux/slices/web3Slice";
import { Button, ButtonProps, forwardRef, useToast } from "@chakra-ui/react";
import { chainId } from "../../config/contract";

let web3Modal: Web3Modal.default;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal.default({
    cacheProvider: true,
    providerOptions,
  });

  UAuthWeb3Modal.registerWeb3Modal(web3Modal);
}

type Web3ButtonProps = ButtonProps & {
  connectedMessage?: string;
  disconnectedMessage?: string;
};

const Web3Button = forwardRef<Web3ButtonProps, "button">(
  ({ connectedMessage, disconnectedMessage, ...restProps }, ref) => {
    const toast = useToast();
    const { provider, web3Provider, address } = useAppSelector(
      (state) => state.web3
    );

    const dispatch = useAppDispatch();

    const uauth = useMemo(() => {
      console.log("New UAuth instance");
      const { package: uauthPackage, options: uauthOptions } =
        providerOptions["custom-uauth"];

      return UAuthWeb3Modal.getUAuth(uauthPackage, uauthOptions);
    }, []);

    const connect = useCallback(
      async function () {
        let provider;
        try {
          provider = await web3Modal.connect();
        } catch (err) {
          console.log("connection failed");
          return;
        }

        let user: any;
        if (web3Modal.cachedProvider === "custom-uauth") {
          user = await uauth.user();
        }

        const web3Provider = new ethers.providers.Web3Provider(provider);

        const signer = web3Provider.getSigner(user?.wallet_address);
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        if (chainId != network.chainId) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x13881" }],
            });
          } catch (error: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainName: "Mumbai",
                      chainId: "0x13881",
                      nativeCurrency: {
                        name: "MATIC",
                        decimals: 18,
                        symbol: "MATIC",
                      },
                      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                    },
                  ],
                });
              } catch (error) {
                console.log(error);

                toast({
                  title: "Wrong ChainId",
                  description: `Please Switch the Metamask's network to the Polygon Testnet(Mumbai) network and then try to connect.`,
                  status: "error",
                  isClosable: true,
                  duration: 10000,
                });

                return;
              }
            } else {
              console.log(error);
              return;
            }
          }
        }

        dispatch(
          setWeb3Provider({
            provider,
            web3Provider,
            address,
            chainId: network.chainId,
            user,
          })
        );
      },
      [address]
    );

    const disconnect = useCallback(async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }

      dispatch(resetWeb3Provider());
    }, []);

    useEffect(() => {
      if (web3Modal.cachedProvider) {
        connect();
      }
    }, [connect]);

    useEffect(() => {
      if (provider?.on) {
        const handleAccountsChanged = (accounts: string[]) => {
          console.log("accounts changed", accounts);

          disconnect();
          connect();

          // dispatch(
          //   setAddress({
          //     address: accounts[0],
          //   })
          // );
        };

        const handleChainChanged = (_hexChainId: string) => {
          window.location.reload();
        };

        const handleDisconnect = (error: { code: number; message: string }) => {
          console.log("disconnect", error);
          disconnect();
        };

        provider.on("accountsChanged", handleAccountsChanged);
        provider.on("chainChanged", handleChainChanged);
        provider.on("disconnect", handleDisconnect);

        // Subscription Cleanup
        return () => {
          if (provider.removeListener) {
            provider.removeListener("accountsChanged", handleAccountsChanged);
            provider.removeListener("chainChanged", handleChainChanged);
            provider.removeListener("disconnect", handleDisconnect);
          }
        };
      }
    }, [provider, disconnect]);

    return web3Provider ? (
      <Button ref={ref} onClick={disconnect} {...restProps}>
        {connectedMessage || "Disconnect"}
      </Button>
    ) : (
      <Button ref={ref} onClick={connect} {...restProps}>
        {disconnectedMessage || "Connect Wallet"}
      </Button>
    );
  }
);

export default Web3Button;
