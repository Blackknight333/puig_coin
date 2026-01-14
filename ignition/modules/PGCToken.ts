import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TokenModule", (m) => {
  const token = m.contract("PGCToken", [142000]);

  // m.call(token, "incBy", [5n]);

  return { token };
});
