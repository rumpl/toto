//syntax=rumpl/typebuild

import { golang } from "./golang.ts";
import { SBOM } from "./sbom.ts";

export default SBOM(golang("/app"));
