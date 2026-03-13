import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import moiraMcCarty from '../../assets/images/authors/moira_mccarty.jpg';

function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-fun">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-blue font-semibold mb-6 hover:underline"
        >
          ← {t.common.backToHome}
        </Link>

        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-dark font-heading mb-2">
            {t.about.title}
          </h1>
        </header>

        {/* Author section */}
        <section className="bg-white/80 rounded-2xl p-5 md:p-6 shadow-md mb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
            <img
              src={moiraMcCarty}
              alt={t.about.authorName}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover flex-shrink-0"
            />
            <div>
              <h2 className="text-lg md:text-xl font-bold text-text-dark font-heading mb-2 text-center sm:text-left">
                {t.about.authorTitle}
              </h2>
              <p className="text-text-light text-sm md:text-base">
                <strong>{t.about.authorName}</strong> {t.about.authorBio}
              </p>
            </div>
          </div>
          <p className="text-text-light text-sm md:text-base">
            {t.about.authorBio2}
          </p>
        </section>

        {/* Website creator section */}
        <section className="bg-white/80 rounded-2xl p-5 md:p-6 shadow-md mb-4">
          <h2 className="text-lg md:text-xl font-bold text-text-dark font-heading mb-3">
            {t.about.websiteTitle}
          </h2>
          <p className="text-text-light text-sm md:text-base">
            {t.about.websiteIntro}{' '}
            <strong>{t.about.websiteCreator}</strong>{t.about.websiteRole}{' '}
            {t.about.websiteDesc}
          </p>
        </section>

        {/* Privacy & Copyright section */}
        <section className="bg-blue-50/80 rounded-2xl p-5 md:p-6 shadow-md">
          <h2 className="text-lg md:text-xl font-bold text-text-dark font-heading mb-3">
            {t.about.privacyTitle}
          </h2>
          <div className="text-text-light text-sm md:text-base space-y-3">
            <p>
              <strong>{t.about.privacyLabel}</strong> {t.about.privacyText}
            </p>
            <p>
              <strong>{t.about.copyrightLabel}</strong> {t.about.copyrightText}
            </p>
            <p>
              {t.about.disclaimerText}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <p className="text-text-light text-xs">
            {t.about.footer}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default About;
