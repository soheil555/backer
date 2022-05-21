const network = process.env.NEXT_PUBLIC_NETWORK;

let address: string;
let period: number;

if (network === "localhost") {
  address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  period = 10;
}

if (network === "mumbai") {
  address = "0x47F2AA29937adec634A17b72A5509841e67669C3";
  period = 60;
}

export { address, period };
