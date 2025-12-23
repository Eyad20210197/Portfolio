import Link from 'next/link';
import { getSiteConfigByKey } from '@/lib/api';
import { SiGmail, SiGithub, SiLinkedin } from 'react-icons/si';

export default async function ContactPage() {
  const contactEmailConfig = await getSiteConfigByKey('contact_email').catch(() => null);
  const contactEmail = contactEmailConfig?.value || 'eyad.aboelftoh@example.com';

  const resumeUrlConfig = await getSiteConfigByKey('resume_url').catch(() => null);
  const resumeUrl = resumeUrlConfig?.value || '/resume.pdf';

  const githubUrlConfig = await getSiteConfigByKey('github_url').catch(() => null);
  const githubUrl = githubUrlConfig?.value || 'https://github.com/eyad-aboelftoh';

  const linkedinUrlConfig = await getSiteConfigByKey('linkedin_url').catch(() => null);
  const linkedinUrl = linkedinUrlConfig?.value || 'https://linkedin.com/in/eyad-aboelftoh';

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Get in Touch
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          I’m always open to new opportunities, collaborations, and interesting conversations.
        </p>
      </header>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {/* Email */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
          <div className="flex items-center gap-4 mb-3">
            <SiGmail className="text-2xl text-red-400" />
            <h3 className="text-lg font-semibold">Email</h3>
          </div>
          <a
            href={`mailto:${contactEmail}`}
            className="text-indigo-400 hover:underline break-all"
          >
            {contactEmail}
          </a>
        </div>

        {/* GitHub */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
          <div className="flex items-center gap-4 mb-3">
            <SiGithub className="text-2xl" />
            <h3 className="text-lg font-semibold">GitHub</h3>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline break-all"
          >
            {githubUrl}
          </a>
        </div>

        {/* LinkedIn */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition sm:col-span-2">
          <div className="flex items-center gap-4 mb-3">
            <SiLinkedin className="text-2xl text-blue-400" />
            <h3 className="text-lg font-semibold">LinkedIn</h3>
          </div>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline break-all"
          >
            {linkedinUrl}
          </a>
        </div>
      </div>

      {/* Resume CTA */}
      <div className="flex justify-start">
        <Link
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            rounded-xl bg-indigo-500 px-6 py-3
            text-sm font-semibold text-white
            shadow-lg shadow-indigo-500/20
            hover:bg-indigo-400
            transition
          "
        >
          Download My Resume
        </Link>
      </div>
    </section>
  );
}
