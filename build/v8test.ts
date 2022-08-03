//syntax=rumpl/typebuild:v8

import { Stage } from "https://raw.githubusercontent.com/rumpl/typebuild-node/main/index.ts";

const t = new Stage("test", "alpine");
const res = solve(t);

try {
  const motd = res.readFile("/edtc/motd");
} catch (e) {}

const final = new Stage("final", "alpine");

export default final;
