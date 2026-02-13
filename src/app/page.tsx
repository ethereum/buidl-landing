import tools from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import EthDiamondLogo from "@/components/EthDiamondLogo";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl" />

        <EthDiamondLogo className="relative mb-8 h-20 w-auto opacity-80 dark:invert" />

        <h1 className="relative text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          buidl<span className="text-indigo-500">.org</span>
        </h1>
        <p className="relative mt-4 max-w-md text-lg text-zinc-500 dark:text-zinc-400">
          Open-source tools for Ethereum, by people from the{" "}
          <a
            href="https://ethereum.foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-700 underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-indigo-500 dark:text-zinc-300 dark:decoration-zinc-600"
          >
            Ethereum Foundation
          </a>
          .
        </p>
      </header>

      {/* Tools grid */}
      <main className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.subdomain} tool={tool} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-zinc-400">
          <span>Ethereum Foundation</span>
          <a
            href="https://github.com/ethereum"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            github.com/ethereum
          </a>
        </div>
      </footer>
    </div>
  );
}
