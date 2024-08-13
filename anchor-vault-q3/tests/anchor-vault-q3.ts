import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorVaultQ3 } from "../target/types/anchor_vault_q3";

describe("anchor-vault-q3", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorVaultQ3 as Program<AnchorVaultQ3>;

  it("Is initialized! and then closed", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
    const tx_close = await program.methods.close().rpc();
    console.log("Your transaction signature and is now closed", tx_close);
  });
});
