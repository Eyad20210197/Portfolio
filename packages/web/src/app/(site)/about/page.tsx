import { getSiteConfigByKey } from '@/lib/api';

const DEFAULT_ABOUT_HTML = `
  <p>
    I am a <strong>Software Engineering student</strong> at Helwan University with a passion
    for building elegant and efficient solutions to complex problems.
    My primary focus is <strong>backend and full-stack development</strong>,
    with a strong interest in <strong>system design and architecture</strong>.
  </p>

  <p>
    I believe in writing <strong>clean, maintainable, and well-tested code</strong>.
    I enjoy working with modern web technologies and I’m always eager to learn
    and adapt to new tools and paradigms.
  </p>

  <h2>My Interests</h2>

  <ul>
    <li>
      <strong>System Architecture</strong><br />
      Designing scalable and maintainable systems
    </li>
    <li>
      <strong>Design Patterns</strong><br />
      Applying proven solutions to common problems
    </li>
    <li>
      <strong>API Development</strong><br />
      Building clean, secure, and well-documented APIs
    </li>
    <li>
      <strong>Database Design</strong><br />
      Structuring data for performance and clarity
    </li>
  </ul>
`;

export default async function AboutPage() {
  const aboutContentConfig = await getSiteConfigByKey('about_content').catch(() => null);
  const aboutContent = aboutContentConfig?.value || DEFAULT_ABOUT_HTML;

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          About Me
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Who I am, what I build, and how I think about software.
        </p>
      </header>

      {/* Content */}
      <div
        className="
          prose prose-invert lg:prose-lg max-w-none
          prose-p:leading-relaxed
          prose-h2:mt-12 prose-h2:mb-6
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
        dangerouslySetInnerHTML={{ __html: aboutContent }}
      />
    </section>
  );
}
