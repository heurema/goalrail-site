import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow .mdx files to be treated as pages alongside .js.
  pageExtensions: ["js", "jsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/en/docs/deploy/cloud-sandbox",
        destination: "/en/docs/deploy/cloud-sandbox-host",
        permanent: true,
      },
      {
        source: "/ru/docs/deploy/cloud-sandbox",
        destination: "/ru/docs/deploy/cloud-sandbox-host",
        permanent: true,
      },
      {
        source: "/en/docs/deploy/cloud-runner",
        destination: "/en/docs/deploy/cloud-sandbox-host",
        permanent: true,
      },
      {
        source: "/ru/docs/deploy/cloud-runner",
        destination: "/ru/docs/deploy/cloud-sandbox-host",
        permanent: true,
      },
      {
        source: "/en/docs/collaborate/overview",
        destination: "/en/docs/collaborate",
        permanent: true,
      },
      {
        source: "/ru/docs/collaborate/overview",
        destination: "/ru/docs/collaborate",
        permanent: true,
      },
      {
        source: "/download/mac",
        destination:
          "https://github.com/heurema/goalrail/releases/download/desktop-v0.1.1/Goalrail-0.1.1-arm64.dmg",
        permanent: false,
      },
      {
        source: "/download/mac/v0.1.1",
        destination:
          "https://github.com/heurema/goalrail/releases/download/desktop-v0.1.1/Goalrail-0.1.1-arm64.dmg",
        permanent: false,
      },
      {
        source: "/download/mac/v0.3.0",
        destination:
          "https://github.com/heurema/goalrail/releases/download/desktop-v0.1.1/Goalrail-0.1.1-arm64.dmg",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/install.sh",
        destination:
          "https://raw.githubusercontent.com/heurema/goalrail/main/scripts/install_oss.sh",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
