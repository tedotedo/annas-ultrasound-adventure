import { Link } from 'react-router-dom';
import moiraMcCarty from '../../assets/images/authors/moira_mccarty.jpg';

function About() {
  return (
    <div className="min-h-screen bg-gradient-fun">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-blue font-semibold mb-6 hover:underline"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-dark font-heading mb-2">
            About
          </h1>
        </header>

        {/* Author section */}
        <section className="bg-white/80 rounded-2xl p-5 md:p-6 shadow-md mb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
            <img
              src={moiraMcCarty}
              alt="Dr Moira McCarty"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover flex-shrink-0"
            />
            <div>
              <h2 className="text-lg md:text-xl font-bold text-text-dark font-heading mb-2 text-center sm:text-left">
                About the Author
              </h2>
              <p className="text-text-light text-sm md:text-base">
                <strong>Dr Moira McCarty</strong> wrote "Anna's Ultrasound Adventure" to help
                children understand what happens during an ultrasound scan. Through Anna's
                story, young readers can learn about the scan room, meet the friendly staff,
                and see that there's nothing to be scared of.
              </p>
            </div>
          </div>
          <p className="text-text-light text-sm md:text-base">
            The book aims to reduce anxiety and help children feel prepared and
            confident before their hospital visit.
          </p>
        </section>

        {/* Website creator section */}
        <section className="bg-white/80 rounded-2xl p-5 md:p-6 shadow-md mb-4">
          <h2 className="text-lg md:text-xl font-bold text-text-dark font-heading mb-3">
            About This Website
          </h2>
          <p className="text-text-light text-sm md:text-base">
            This interactive companion website was created by{' '}
            <strong>Dr Odet Mark Aszkenasy</strong>, Consultant Paediatrician, to bring
            Anna's story to life and help even more children prepare for their
            ultrasound experience.
          </p>
        </section>

        {/* Privacy & Copyright section */}
        <section className="bg-blue-50/80 rounded-2xl p-5 md:p-6 shadow-md">
          <h2 className="text-lg md:text-xl font-bold text-text-dark font-heading mb-3">
            Privacy & Copyright
          </h2>
          <div className="text-text-light text-sm md:text-base space-y-3">
            <p>
              <strong>Your Privacy:</strong> This website does not track you, collect
              personal data, or use cookies. We believe in providing a safe, private
              experience for children and families.
            </p>
            <p>
              <strong>Copyright:</strong> All content, illustrations, and characters
              from "Anna's Ultrasound Adventure" are © Dr Moira McCarty. All rights
              reserved. This website and its design are © Dr Odet Mark Aszkenasy.
            </p>
            <p>
              The content on this website is for educational purposes only and is not
              intended as medical advice. Please consult your healthcare provider for
              any medical concerns.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <p className="text-text-light text-xs">
            Made with love for little patients everywhere
          </p>
        </footer>
      </div>
    </div>
  );
}

export default About;
