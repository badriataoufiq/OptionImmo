import { useState } from 'react';
import { Palette, X, RotateCcw } from 'lucide-react';
import { useColors } from '../contexts/ColorContext';

export default function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const { colors, updateColors, resetColors } = useColors();

  const handleColorChange = (colorType: 'primaryColor' | 'backgroundColor' | 'accentColor', value: string) => {
    updateColors({ [colorType]: value });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white hover:bg-slate-50 text-slate-800 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-200"
        title="Personnaliser les couleurs"
      >
        <Palette className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Palette className="w-6 h-6" />
                Personnaliser les couleurs
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Couleur principale
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={colors.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-slate-300"
                  />
                  <input
                    type="text"
                    value={colors.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
                    placeholder="#14b8a6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Couleur de fond
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={colors.backgroundColor}
                    onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-slate-300"
                  />
                  <input
                    type="text"
                    value={colors.backgroundColor}
                    onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
                    placeholder="#0f172a"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Couleur d'accent
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={colors.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-slate-300"
                  />
                  <input
                    type="text"
                    value={colors.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
                    placeholder="#06b6d4"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={async () => {
                    await resetColors();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600">
                Les couleurs sont automatiquement sauvegardées et persisteront lors de vos prochaines visites.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
