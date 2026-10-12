import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { ReactNode } from "react";
import { client } from "@/sanity/client";

export const revalidate = 60;

type Article = {
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  externalUrl?: string;
  mainImage?: SanityImageSource;
  body?: PortableTextBlock[];
};

type ArticlePageProps = { params: Promise<{ slug: string }> };

const imageBuilder = createImageUrlBuilder(client);
const articleQuery = `*[_type == "transmission" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  externalUrl,
  mainImage,
  body
}`;

async function getArticle(slug: string) {
  return client.fetch<Article | null>(articleQuery, { slug });
}

function isSecureExternalUrl(value?: string): value is string {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

const articleTextComponents = {
  block: {
    normal: ({ children }: { children?: ReactNode }) => <p className="my-6 text-base leading-8 text-zinc-300">{children}</p>,
    h2: ({ children }: { children?: ReactNode }) => <h2 className="mb-4 mt-12 text-2xl font-black uppercase tracking-wide text-white">{children}</h2>,
    h3: ({ children }: { children?: ReactNode }) => <h3 className="mb-3 mt-8 text-xl font-bold text-white">{children}</h3>,
    blockquote: ({ children }: { children?: ReactNode }) => <blockquote className="my-8 border-l-2 border-toxic/60 pl-5 text-lg italic leading-relaxed text-zinc-300">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => <ul className="my-6 list-disc space-y-2 pl-6 text-zinc-300">{children}</ul>,
    number: ({ children }: { children?: ReactNode }) => <ol className="my-6 list-decimal space-y-2 pl-6 text-zinc-300">{children}</ol>,
  },
  marks: {
    link: ({ children, value }: { children?: ReactNode; value?: { href?: string } }) => {
      if (!isSecureExternalUrl(value?.href)) return <>{children}</>;
      return <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-toxic underline underline-offset-4 hover:text-white">{children}</a>;
    },
  },
} satisfies Partial<PortableTextComponents>;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article | G-Wizz, The Slayer" };

  const description = article.excerpt ?? `Read ${article.title} from G-Wizz, The Slayer.`;
  const imageUrl = article.mainImage ? imageBuilder.image(article.mainImage).width(1200).url() : undefined;
  return {
    title: `${article.title} | Articles`,
    description,
    openGraph: { title: article.title, description, type: "article", ...(imageUrl ? { images: [imageUrl] } : {}) },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const date = article.publishedAt && Number.isFinite(Date.parse(article.publishedAt))
    ? new Date(article.publishedAt).toLocaleDateString("en-ZA", { day: "2-digit", month: "long", year: "numeric" })
    : null;

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-24 text-white">
      <article className="mx-auto max-w-4xl">
        <Link href="/articles" className="font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-toxic">← All articles</Link>
        <header className="mt-8 border-b border-toxic/20 pb-8">
          {date && <p className="font-mono text-xs uppercase tracking-widest text-toxic">{date}</p>}
          <h1 className="mt-3 text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl">{article.title}</h1>
          {article.excerpt && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-400">{article.excerpt}</p>}
        </header>

        {article.mainImage && (
          <div className="relative mt-8 aspect-video overflow-hidden border border-white/10 bg-zinc-950">
            <Image src={imageBuilder.image(article.mainImage).width(1600).url()} alt={article.title} fill sizes="(max-width: 768px) 100vw, 900px" unoptimized className="object-cover" priority />
          </div>
        )}

        {article.body?.length ? (
          <div className="mt-8">
            <PortableText value={article.body} components={articleTextComponents} />
          </div>
        ) : isSecureExternalUrl(article.externalUrl) ? (
          <p className="mt-8 text-zinc-300">
            Continue reading at the original publication: <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" className="text-toxic underline underline-offset-4">Open full article</a>.
          </p>
        ) : (
          <p className="mt-8 border border-white/10 bg-zinc-950 p-6 font-mono text-sm text-zinc-400">The full article is being prepared. Please check back soon.</p>
        )}
      </article>
    </main>
  );
}
