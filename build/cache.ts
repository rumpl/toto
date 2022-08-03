//syntax=rumpl/typebuild:v8

import {
  Stage,
  BindMount,
  CacheRunMount,
} from "https://raw.githubusercontent.com/rumpl/typebuild-node/main/index.ts";

class Golang {
  private base;

  constructor(base = "golang:1.18.1-alpine3.15") {
    this.base = base;
  }

  build(packages = ".", output = "/app") {
    const builder = new Stage("builder", this.base)
      .run("apk add git")
      .workdir("/app")
      .env("CGO_ENABLED", "0")
      .run(`go build -trimpath -o /binary ${packages}`, [
        new BindMount({ target: "." }),
        new CacheRunMount({
          target: "/root/.cache/go-build",
        }),
        new CacheRunMount({
          target: "/go/pkg/mod",
        }),
      ]);

    return new Stage("application", "scratch")
      .copy({
        from: builder,
        source: "/binary",
        destination: output,
      })
      .entrypoint([output]);
  }
}

const golang = new Golang();
export default golang.build();

// Metropole urbanisme: 02 35 52 48 81
