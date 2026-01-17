import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Upload, X } from 'lucide-react';
import { useGooglePlacesAutocomplete } from '../hooks/useGooglePlacesAutocomplete';
import { useLanguage } from '../contexts/LanguageContext';
import PrivacyPolicy from './PrivacyPolicy';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    email: '',
    phone: '',
    company: '',
    asset_type: '',
    asset_location: '',
    asset_value: '',
    message: ''
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [consentGiven, setConsentGiven] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.formatted_address) {
      setFormData(prev => ({
        ...prev,
        asset_location: place.formatted_address || ''
      }));
    }
  };

  const addressInputRef = useGooglePlacesAutocomplete({
    onPlaceSelected: handlePlaceSelected
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    console.log(formData);

    const newErrors: Record<string, boolean> = {};
    if (!formData.last_name.trim()) newErrors.last_name = true;
    if (!formData.first_name.trim()) newErrors.first_name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.company) newErrors.company = true;
    if (!formData.asset_type) newErrors.asset_type = true;
    if (!formData.asset_location.trim()) newErrors.asset_location = true;
    if (!formData.asset_value.trim()) newErrors.asset_value = true;
    if (!formData.message.trim()) newErrors.message = true;
    if (!consentGiven) newErrors.consent = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setStatus('loading');

    try {
      // 1. On prépare un objet FormData pour envoyer fichiers + texte en une fois
      const formDataToSend = new FormData();
      console.log('handleSubmit step1');

      // Ajout des champs texte
      formDataToSend.append('full_name', `${formData.first_name} ${formData.last_name}`.trim());
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('asset_type', formData.asset_type);
      formDataToSend.append('asset_location', formData.asset_location);
      formDataToSend.append('asset_value', formData.asset_value);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('deadline', formData.company); // Ton champ company sert de deadline

      // 2. Ajout des fichiers
      selectedFiles.forEach((file) => {
        formDataToSend.append('photos', file);
        console.log('handleSubmit step2');
      });

      // 3. Envoi vers ton API Hostinger (créée à l'étape 3)
      console.log('handleSubmit step3');
      console.log(formDataToSend);
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        body: formDataToSend // Le navigateur gère automatiquement le 'Content-Type'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erreur lors de l\'envoi');
        console.log('handleSubmit error step3');
      }

      // Si tout est OK
      setStatus('success');
      setFormData({
        last_name: '', first_name: '', email: '', phone: '',
        company: '', asset_type: '', asset_location: '',
        asset_value: '', message: ''
      });
      setSelectedFiles([]);
      setConsentGiven(false);
      console.log('handleSubmit stepOK');

    } catch (error) {
      setStatus('error');
      setErrorMessage(t('contact.error'));
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleButtonSelect = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-slate-50/90"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-slate-600">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="relative bg-[#0f172a]/90 rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-cover bg-center opacity-20 rounded-2xl" style={{ backgroundImage: "url('https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}></div>
          <div className="relative z-10">
          {status === 'error' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="last_name" className="block text-sm font-semibold text-slate-200 mb-2">
                  {t('form.last_name')} {t('form.required')}
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary transition-colors ${
                    errors.last_name ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.last_name && (
                  <p className="mt-1 text-xs text-red-600">{t('form.error.required')}</p>
                )}
              </div>

              <div>
                <label htmlFor="first_name" className="block text-sm font-semibold text-slate-200 mb-2">
                  {t('form.first_name')} {t('form.required')}
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary transition-colors ${
                    errors.first_name ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.first_name && (
                  <p className="mt-1 text-xs text-red-600">{t('form.error.required')}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-2">
                  {t('form.email')} {t('form.required')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary transition-colors ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{t('form.error.required')}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-200 mb-2">
                  {t('form.phone')} {t('form.required')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{t('form.error.required')}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  {t('form.asset_type')} {t('form.required')}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'maison', label: t('form.asset_type.house') },
                    { value: 'appartement', label: t('form.asset_type.apartment') },
                    { value: 'immeuble', label: t('form.asset_type.building') },
                    { value: 'commerce', label: t('form.asset_type.commercial') },
                    { value: 'terrain', label: t('form.asset_type.land') },
                    { value: 'garage', label: t('form.asset_type.garage') },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleButtonSelect('asset_type', type.value)}
                      className={`px-4 py-3 rounded-lg border-2 font-medium transition-all hover:border-primary hover:shadow-md ${
                        formData.asset_type === type.value
                          ? 'border-primary bg-primary text-white'
                          : errors.asset_type
                          ? 'border-red-500 bg-white text-slate-700'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                {errors.asset_type && (
                  <p className="mt-1 text-xs text-red-600">{t('form.error.required')}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="asset_location" className="block text-sm font-semibold text-slate-200 mb-2">
                  {t('form.asset_location')} {t('form.required')}
                </label>
                <input
                  ref={addressInputRef}
                  type="text"
                  id="asset_location"
                  name="asset_location"
                  value={formData.asset_location}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary transition-colors ${
                    errors.asset_location ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder={t('form.asset_location.placeholder')}
                />
                {errors.asset_location && (
                  <p className="mt-1 text-xs text-red-600">{t('form.error.required')}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="asset_value" className="block text-sm font-semibold text-slate-200 mb-2">
                  {t('form.asset_value')} {t('form.required')}
                </label>
                <input
                  type="text"
                  id="asset_value"
                  name="asset_value"
                  value={formData.asset_value}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary transition-colors ${
                    errors.asset_value ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.asset_value && (
                  <p className="mt-1 text-xs text-red-600">{t('form.error.required')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  {t('form.deadline')} {t('form.required')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: '8 mois', label: t('form.deadline.8months') },
                    { value: '10 mois', label: t('form.deadline.10months') },
                    { value: '12 mois', label: t('form.deadline.12months') },
                  ].map((deadline) => (
                    <button
                      key={deadline.value}
                      type="button"
                      onClick={() => handleButtonSelect('company', deadline.value)}
                      className={`px-4 py-3 rounded-lg border-2 font-medium transition-all hover:border-primary hover:shadow-md ${
                        formData.company === deadline.value
                          ? 'border-primary bg-primary text-white'
                          : errors.company
                          ? 'border-red-500 bg-white text-slate-700'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {deadline.label}
                    </button>
                  ))}
                </div>
                {errors.company && (
                  <p className="mt-1 text-xs text-red-600">{t('form.error.required')}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-200 mb-2">
                {t('form.message')} {t('form.required')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary transition-colors resize-none ${
                  errors.message ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder={t('form.message.placeholder')}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{t('form.error.required')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                {t('form.photos')}
              </label>
              <div className="space-y-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer hover:bg-slate-800 hover:border-primary transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-300 font-medium">{t('form.photos.upload')}</p>
                    <p className="text-xs text-slate-400 mt-1">{t('form.photos.format')}</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>

                {selectedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-slate-300 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                checked={consentGiven}
                onChange={(e) => {
                  setConsentGiven(e.target.checked);
                  if (errors.consent && e.target.checked) {
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.consent;
                      return newErrors;
                    });
                  }
                }}
                className={`mt-1 w-4 h-4 rounded border-2 text-primary focus:ring-2 focus:ring-primary ${
                  errors.consent ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              <label htmlFor="consent" className="text-sm text-slate-200 leading-relaxed">
                {t('form.consent')}{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="text-primary hover:text-primary-dark underline font-medium"
                >
                  {t('form.consent.privacy_policy')}
                </button>
                . {t('form.required')}
              </label>
            </div>
            {errors.consent && (
              <p className="text-xs text-red-600 ml-7">{t('form.error.consent')}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-400 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t('form.submitting')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('form.submit')}
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="p-4 bg-hero-light border border-primary-light rounded-lg flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-slate-900">{t('contact.success')}</p>
              </div>
            )}
          </form>
          </div>
        </div>
      </div>

      <PrivacyPolicy isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
    </section>
  );
}
