import { ShieldCheck, Lock, Users, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: ShieldCheck,
      title: t('services.financial_guarantee.title'),
      description: t('services.financial_guarantee.description'),
      extraInfo: t('services.financial_guarantee.extra'),
      hoverEffect: 'hover:scale-110',
      bgImage: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      icon: Lock,
      title: t('services.secured_price.title'),
      description: t('services.secured_price.description'),
      extraInfo: t('services.secured_price.extra'),
      hoverEffect: 'hover:scale-110',
      bgImage: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      icon: Users,
      title: t('services.professional_buyers.title'),
      description: t('services.professional_buyers.description'),
      extraInfo: t('services.professional_buyers.extra'),
      hoverEffect: 'hover:scale-110',
      bgImage: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      icon: TrendingUp,
      title: t('services.property_valorization.title'),
      description: t('services.property_valorization.description'),
      extraInfo: t('services.property_valorization.extra'),
      hoverEffect: 'hover:scale-110',
      bgImage: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      icon: Zap,
      title: t('services.simplified_management.title'),
      description: t('services.simplified_management.description'),
      extraInfo: t('services.simplified_management.extra'),
      hoverEffect: 'hover:scale-110',
      bgImage: 'https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg?auto=compress&cs=tinysrgb&w=1920'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-8">
            {t('services.title')}
          </h2>

          <div className="max-w-5xl mx-auto mb-8">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-slate-800 mb-4 text-center">
              {t('services.question.title')}
            </h3>
            <p className="text-xl text-slate-600 text-justify">
              {t('services.question.description')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-slate-800 mb-4 text-center">
              {t('services.how_it_works.title')}
            </h3>
            <p className="text-xl text-slate-600 text-justify">
              {t('services.how_it_works.description')}
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            {t('services.advantages')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={index}
              className={`group relative bg-hero rounded-xl p-8 hover:bg-hero-light transition-all duration-500 border-2 border-slate-200 hover:shadow-2xl overflow-hidden ${service.hoverEffect}`}
              style={{
                boxShadow: 'inset 0 0 0 0 transparent',
                transition: 'all 0.5s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 4px rgba(20, 184, 166, 1), 0 0 40px rgba(20, 184, 166, 0.8)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 0 transparent';
                e.currentTarget.style.borderColor = 'rgb(226, 232, 240)';
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-60 transition-all duration-700 rounded-xl group-hover:scale-110"
                style={{ backgroundImage: `url('${service.bgImage}')` }}
              ></div>
              <div className="absolute inset-0 rounded-xl transition-opacity duration-700" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}></div>
              <div className="relative z-10">
                <service.icon className="w-14 h-14 text-primary mb-4 transition-all duration-700" />
                <h3 className="font-serif text-2xl font-semibold text-white mb-3 group-hover:text-primary-light transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-4 text-justify">{service.description}</p>
                <div className="max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-700 overflow-hidden">
                  <div className="pt-4 mt-4 border-t border-primary/30">
                    <p className="text-slate-200 leading-relaxed italic text-sm text-justify">
                      {service.extraInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {services.slice(3).map((service, index) => (
            <div
              key={index + 3}
              className={`group relative bg-hero rounded-xl p-8 hover:bg-hero-light transition-all duration-500 border-2 border-slate-200 hover:shadow-2xl overflow-hidden ${service.hoverEffect}`}
              style={{
                boxShadow: 'inset 0 0 0 0 transparent',
                transition: 'all 0.5s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 4px rgba(20, 184, 166, 1), 0 0 40px rgba(20, 184, 166, 0.8)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 0 transparent';
                e.currentTarget.style.borderColor = 'rgb(226, 232, 240)';
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-60 transition-all duration-700 rounded-xl group-hover:scale-110"
                style={{ backgroundImage: `url('${service.bgImage}')` }}
              ></div>
              <div className="absolute inset-0 rounded-xl transition-opacity duration-700" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}></div>
              <div className="relative z-10">
                <service.icon className="w-14 h-14 text-primary mb-4 transition-all duration-700" />
                <h3 className="font-serif text-2xl font-semibold text-white mb-3 group-hover:text-primary-light transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-4 text-justify">{service.description}</p>
                <div className="max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-700 overflow-hidden">
                  <div className="pt-4 mt-4 border-t border-primary/30">
                    <p className="text-slate-200 leading-relaxed italic text-sm text-justify">
                      {service.extraInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
