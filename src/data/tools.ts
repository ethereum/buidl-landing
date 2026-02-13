export interface Tool {
  name: string;
  description: string;
  subdomain: string;
  githubRepo: string;
  maintainer: string; // GitHub username
  // Screenshot will be fetched at build time from the subdomain URL
}

/**
 * Add, remove, or edit tools here.
 * A rebuild of the site will bake screenshots and metadata into the static output.
 */
const tools: Tool[] = [
  {
    name: "Butterfly",
    description: "Tracks EIP adoption and implementation status across Ethereum network upgrade forks",
    subdomain: "butterfly",
    githubRepo: "ethereum/nutterfly",
    maintainer: "raxhvl",
  },
];

export default tools;
