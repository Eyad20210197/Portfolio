import Link from 'next/link';
import { getSiteConfigByKey } from '@/lib/api';
import GlitchText from '@/components/GlitchText';

export default async function Home() {
  const heroStatementConfig = await getSiteConfigByKey('hero_statement').catch(() => null);
  const heroStatement =
    heroStatementConfig?.value ||
    'Software Engineer specializing in building robust and scalable web applications.';

  return (
    <section
      className="
        flex
        min-h-[calc(100vh-120px)]
        flex-col
        items-center
        justify-center
        text-center
      "
    >
       <GlitchText
        as="h1"
        speed={1.9}
        enableShadows
        enableOnHover
        className="text-white"
      >
        Eyad Aboelftoh
      </GlitchText>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
        {heroStatement}
      </p>

      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/projects"
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          View My Work
        </Link>

        <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
          Get in Touch <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
