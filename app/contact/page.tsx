import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Contact Us</span>
          </h1>
        </div>

        {/* Contact Information */}
        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl">
                <Mail className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  We are looking for highly motivated students and collaborators.
                  If you are interested, please email your CV to{' '}
                  <a
                    href="mailto:tongzhang@tongzhang-ml.org?cc=ruip4@illinois.edu"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                  >
                    tongzhang@tongzhang-ml.org
                  </a>{' '}
                  (cc: ruip4@illinois.edu) ;-)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
