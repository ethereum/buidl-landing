import Image from "next/image";
import type { Tool } from "@/data/tools";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.75a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l5.47-5.47H12.5a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const siteUrl = `https://${tool.subdomain}.buidl.org`;
  const repoUrl = `https://github.com/${tool.githubRepo}`;
  const maintainerUrl = `https://github.com/${tool.maintainer}`;
  const screenshotPath = `/screenshots/${tool.subdomain}.png`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* Screenshot preview */}
      <a
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
      >
        <Image
          src={screenshotPath}
          alt={`${tool.name} preview`}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </a>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {tool.name}
          </h3>
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-zinc-400 transition-colors hover:text-indigo-500"
            title={`Visit ${tool.name}`}
          >
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>

        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {tool.description}
        </p>

        <div className="mt-auto flex items-center gap-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            title="GitHub repository"
          >
            <GitHubIcon className="h-4 w-4" />
            <span>Repo</span>
          </a>
          <a
            href={maintainerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            title={`Maintainer: @${tool.maintainer}`}
          >
            <Image
              src={`https://github.com/${tool.maintainer}.png?size=40`}
              alt={`@${tool.maintainer}`}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>@{tool.maintainer}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
