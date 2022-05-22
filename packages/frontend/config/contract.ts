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
  address = "0xa00a08D8b638B39778c0c19119275183E5b3E11C";
  period = 60;
  chainId = 80001;
}

export { address, period, chainId };
