const network = process.env.NEXT_PUBLIC_NETWORK;

let address: string;
let period: number;
let chainId: number;

if (network === "localhost") {
  address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  period = 10;
  chainId = 31337;
}

if (network === "mumbai") {
  address = "0x52Afba892CF8699a19A2Fa12d0dd14cd0F58f88a";
  period = 60;
  chainId = 80001;
}

export { address, period, chainId };
