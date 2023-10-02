import { AptosClient} from "aptos";
const readline = require('readline');

const NODE_URL = process.env.APTOS_NODE_URL || "https://g.w.lavanet.xyz:443/gateway/apt1/rest/c9d603700be0125fab13b621b9065d62";

async function fetchAccountResources(accountId: string) {
  const client = new AptosClient(NODE_URL, null, true);
  console.log("Ledger Info:", await client.getLedgerInfo());
  console.log("Starting Fetch Resources ==> ")

  for (let index = 0; index < 100; index++) {
    console.log("Running Iteration #"+(index+1))
    try {
      let resources = await client.getAccountResources(accountId);
      console.log("Iteration #"+(index+1)+", Account Resources:", resources)
    }
    catch (err) {
      console.log("Iteration #"+(index+1)+", Error:",err);
    }
  }
}

function main() {

  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  r1.question('Enter your Account ID:', (accountId: string) => {
    console.log("Account Id entered:", accountId);
    fetchAccountResources(accountId);
    r1.close();
  });

}

main();
