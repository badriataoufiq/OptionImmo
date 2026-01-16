import { ShieldCheck, Shield, Euro, Users, UserCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';

export default function Hero() {
  const { t } = useLanguage();
  const [gifSrc, setGifSrc] = useState('/output-onlinegiftools.gif');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setGifSrc(`/output-onlinegiftools.gif?t=${Date.now()}`);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    {
      icon: Euro,
      title: t('stats.guaranteed_compensation.title'),
      description: t('stats.guaranteed_compensation.description')
    },
    {
      icon: Shield,
      title: t('stats.zero_risk.title'),
      description: t('stats.zero_risk.description')
    },
    {
      icon: ShieldCheck,
      title: t('stats.preserved_price.title'),
      description: t('stats.preserved_price.description')
    },
    {
      icon: Users,
      title: t('stats.privileged_access.title'),
      description: t('stats.privileged_access.description')
    },
    {
      icon: UserCheck,
      title: t('stats.single_contact.title'),
      description: t('stats.single_contact.description')
    }
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="relative text-white">
      <div className="absolute inset-0 bg-slate-900/80"></div>

      <div className="absolute top-6 right-6 z-20">
        <LanguageSelector />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="mb-6 leading-tight flex justify-center">
            <img src={gifSrc} alt="Optionimmo" className="w-full" />
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <button
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {t('hero.cta')}
          </button>

          <div className="mt-20 relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 flex flex-col items-center text-center px-4"
                    >
                      <div className="mb-4 p-3 bg-primary/10 rounded-full">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white mb-2">
                        {stat.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed max-w-[200px] mx-auto">
                        {stat.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {stats.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
