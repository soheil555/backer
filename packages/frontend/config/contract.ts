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
  address = "0x8BD356030E911A09FE0986267926B463C9Fb0Ab6";
  period = 60;
  chainId = 80001;
}

export { address, period, chainId };
