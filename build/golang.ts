import {
  Stage,
  BindMount,
  CacheRunMount,
} from "https://raw.githubusercontent.com/rumpl/typebuild-node/main/index.ts";

export function golang(binary: string, baseImage = "golang:1.18.0-alpine3.15") {
  // const test = buildArg("test");
  const builder = new Stage("builder", baseImage)
    .run("apk add git")
    .workdir("/app")
    .env("CGO_ENABLED", "0")
    .run("go build -o /binary", [
      new BindMount({ target: "." }),
      new CacheRunMount({
        target: "/root/.cache/go-build",
      }),
      new CacheRunMount({
        target: "/go/pkg/mod",
      }),
    ]);

  return new Stage("final", "scratch")
    .copy({
      from: builder,
      source: "/binary",
      destination: binary,
    })
    .entrypoint([binary]);
}
