import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm" onClick={onClose}></div>

        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">{t('privacy.title')}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            <div className="space-y-6 text-slate-700">
              <p className="text-lg leading-relaxed">{t('privacy.intro')}</p>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.collection.title')}</h3>
                <p className="leading-relaxed">{t('privacy.collection.text')}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.purpose.title')}</h3>
                <p className="leading-relaxed">{t('privacy.purpose.text')}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.legal.title')}</h3>
                <p className="leading-relaxed">{t('privacy.legal.text')}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.recipients.title')}</h3>
                <p className="leading-relaxed">{t('privacy.recipients.text')}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.retention.title')}</h3>
                <p className="leading-relaxed">{t('privacy.retention.text')}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.rights.title')}</h3>
                <p className="leading-relaxed mb-3">{t('privacy.rights.text')}</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t('privacy.rights.access')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t('privacy.rights.rectification')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t('privacy.rights.erasure')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t('privacy.rights.restriction')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t('privacy.rights.portability')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t('privacy.rights.objection')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t('privacy.rights.withdraw')}</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.exercise.title')}</h3>
                <p className="leading-relaxed">{t('privacy.exercise.text')}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.security.title')}</h3>
                <p className="leading-relaxed">{t('privacy.security.text')}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.complaint.title')}</h3>
                <p className="leading-relaxed">{t('privacy.complaint.text')}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.updates.title')}</h3>
                <p className="leading-relaxed">{t('privacy.updates.text')}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('privacy.contact.title')}</h3>
                <p className="leading-relaxed mb-3">{t('privacy.contact.text')}</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t('privacy.contact.email')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t('privacy.contact.phone')}</span>
                  </li>
                </ul>
              </section>

              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500 italic">{t('privacy.last_updated')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
