import { getSiteConfigByKey } from '@/lib/api';

const DEFAULT_HOW_IT_IS_BUILT_HTML = `
  <p>
    This portfolio is a <strong>full-stack web application</strong> designed to showcase
    not only the final projects, but also the <strong>engineering thought process</strong>
    behind them.
  </p>

  <h2>Architecture</h2>
  <p>
    The application follows a <strong>modular monolith</strong> approach with a clean
    separation of concerns between frontend and backend. On the backend, a
    <strong>layered architecture</strong> is used to keep the system maintainable,
    testable, and scalable.
  </p>

  <h2>Tech Choices</h2>
  <ul>
    <li>
      <strong>Frontend</strong><br />
      Next.js (App Router), TypeScript, Tailwind CSS
    </li>
    <li>
      <strong>Backend</strong><br />
      Node.js, Express, TypeScript
    </li>
    <li>
      <strong>Database</strong><br />
      PostgreSQL with Prisma ORM
    </li>
    <li>
      <strong>Authentication</strong><br />
      JWT with HttpOnly cookies
    </li>
  </ul>

  <h2>Performance</h2>
  <p>
    Performance is treated as a first-class concern. The frontend leverages
    <strong>Next.js Server Components</strong> to fetch data on the server, minimizing
    client-side JavaScript. Static generation is used wherever possible to ensure
    fast load times.
  </p>

  <h2>Deployment</h2>
  <p>
    The frontend is deployed on <strong>Vercel</strong>, while the backend is hosted on a
    separate cloud provider. This separation allows independent scaling,
    deployments, and infrastructure optimization.
  </p>
`;

const HowItIsBuiltPage = async () => {
  const howItIsBuiltConfig = await getSiteConfigByKey('how_it_is_built_content').catch(() => null);
  const howItIsBuiltContent = howItIsBuiltConfig?.value || DEFAULT_HOW_IT_IS_BUILT_HTML;

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          How This Portfolio Is Built
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A high-level overview of the architecture, technology choices, and engineering decisions.
        </p>
      </header>

      {/* Content */}
      <div
        className="
          prose prose-invert lg:prose-lg max-w-none
          prose-p:leading-relaxed
          prose-h2:mt-14 prose-h2:mb-6
          prose-ul:grid
          prose-ul:grid-cols-1 sm:prose-ul:grid-cols-2
          prose-ul:gap-4
          prose-li:list-none
          prose-li:bg-white/5
          prose-li:rounded-xl
          prose-li:p-4
          prose-li:transition
          prose-li:hover:bg-white/10
        "
        dangerouslySetInnerHTML={{ __html: howItIsBuiltContent }}
      />
    </section>
  );
};

export default HowItIsBuiltPage;