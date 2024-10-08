import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, WbaPrereq } from "./programs/wba_prereq";
// import {IDL, WbaPrereq} from "./test_2"
import wallet from "./wba-wallet.json";



// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

console.log(keypair.publicKey);

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");
// To register ourselves as having completed pre-requisites, we need to submit our github account name as a utf8 buffer:

// Github account
const github = Buffer.from("nishantbakhru", "utf8");

// Now we're going to use our connection and wallet to create an Anchor provider:

// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed"});

// Finally, we can use the Anchor provider, our IDL object and our IDL type to create our anchor program, allowing us to interact with the WBA prerequisite program.

// Create our program
const program  = new Program(IDL, provider);

// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);


// Execute our enrollment transaction
(async () => {
    try {
        const txhash = await program.methods
        .complete(github)
        .accounts({
            signer: keypair.publicKey,
        })
        .signers([
            keypair
        ]).rpc();
        console.log(`Success! Check out your TX here: 
        https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
  })();
  
//   7Jc6V97Hw6YouAqqtk2g16XwfKqkgFHeiKwZwQL4DKiJ publickey

// 2hzJCc9h5RsSa4apRaG1Ps38gQiJTsi3aEcS7G94rKGmpWQUXQEFzUUiwbpD9eWz7VpbMg9frzDisBBGNXvCfW21 successful transaction id

// WBAQSygkwMox2VuWKU133NxFrpDZUBdvSBeaBEue2Jq program address