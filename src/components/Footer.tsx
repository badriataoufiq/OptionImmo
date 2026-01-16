import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative text-white py-12">
      <div className="absolute inset-0 bg-slate-900/80"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-8 h-8 text-primary" />
              <span className="font-serif text-2xl font-bold">Option Immo</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t('footer.contact_info')}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">WEWEGO SRL</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">contact@optionimmo.be</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">+32 2 123 45 67<br />+32 489 12 34 56</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">{t('footer.hours')}</h3>
            <div className="space-y-2 text-slate-400">
              <p>{t('footer.hours.weekday')}</p>
              <p>{t('footer.hours.saturday')}</p>
              <p>{t('footer.hours.sunday')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
