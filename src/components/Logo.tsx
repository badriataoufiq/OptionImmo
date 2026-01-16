import { Home } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'sm' }: LogoProps) {
  const sizeClasses = {
    sm: {
      text: 'text-3xl md:text-4xl',
      icon: 'w-7 h-7 md:w-8 md:h-8'
    },
    md: {
      text: 'text-4xl md:text-5xl',
      icon: 'w-9 h-9 md:w-10 md:h-10'
    },
    lg: {
      text: 'text-5xl md:text-6xl lg:text-7xl',
      icon: 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-1">
      <span className={`${currentSize.text} font-serif font-bold`} style={{ color: '#e2e8f0' }}>
        optionimm
      </span>
      <div className="relative inline-flex items-center justify-center">
        <span className={`${currentSize.text} font-serif font-bold animate-fade-out`} style={{ color: '#e2e8f0' }}>
          o
        </span>
        <Home
          className={`absolute ${currentSize.icon} animate-fade-in`}
          style={{ color: '#e2e8f0' }}
          strokeWidth={2.5}
        />
      </div>
      <style>{`
        @keyframes fadeOut {
          0%, 50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          0%, 50% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-out {
          animation: fadeOut 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
