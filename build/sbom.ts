import { Stage } from "@rumpl/typebuild";

export function SBOM(stage: Stage): Stage {
  return new Stage("scratch", "scratch").copy({
    from: new Stage("syft", "anchore/syft:latest")
      .chdir("/src")
      .run(
        "/syft -o json=/out/sbom_syft.json -o spdx-json=/out/sbom_spdx.json -o cyclonedx-json=/out/sbom_cyclonedx.json -o text=/out/sbom.txt .",
        [{ target: "/src", stage: stage }]
      ),
    destination: "/",
    source: "/out",
  });
}
