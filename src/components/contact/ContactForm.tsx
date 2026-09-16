'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { useState } from 'react';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';
const dropdownClip =
  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

/**
 * VIP concierge consultation inquiry form.
 */
export function ContactForm() {
  const t = useTranslations('ContactPage');

  const [selectedTypology, setSelectedTypology] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredTime: '',
    message: '',
  });

  const typologies = [
    { id: 'all', label: t('typology_all') },
    { id: '2bed', label: t('typology_2bed') },
    { id: '3bed', label: t('typology_3bed') },
    { id: 'penthouse', label: t('typology_penthouse') },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate concierge form submission
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      preferredTime: '',
      message: '',
    });
    setSelectedTypology('all');
  };

  return (
    <div className="w-full drop-shadow-md filter">
      <div className="bg-[#D6D3C8] p-[1px]" style={{ clipPath: clipPathPolygon }}>
        <div
          className="flex flex-col bg-[#F4F3ED] p-6 sm:p-10 lg:p-12"
          style={{ clipPath: clipPathPolygon }}
        >
          {/* Card Header */}
          <div className="border-b border-[#151926]/10 pb-6">
            <h2
              className={`text-2xl font-medium tracking-tight text-[#151926] uppercase sm:text-3xl ${playfair.className}`}
            >
              {t('form_card_title')}
            </h2>
            <p className={`mt-2 text-xs text-[#151926]/70 sm:text-sm ${inter.className}`}>
              {t('form_card_subtitle')}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center bg-[#8B7043] text-white"
                  style={{ clipPath: dropdownClip }}
                >
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className={`mt-6 text-xl font-medium tracking-tight text-[#151926] uppercase sm:text-2xl ${playfair.className}`}
                >
                  {t('success_title')}
                </h3>
                <p className={`mt-3 max-w-md text-xs text-[#151926]/75 sm:text-sm ${inter.className}`}>
                  {t('success_desc')}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className={`mt-8 cursor-pointer px-8 py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase text-white transition-colors duration-300 ${inter.className}`}
                  style={{ clipPath: dropdownClip, backgroundColor: '#151926' }}
                >
                  {t('send_another')}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col space-y-6"
              >
                {/* Full Name */}
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="fullName"
                    className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/70 uppercase sm:text-[10px] ${inter.className}`}
                  >
                    {t('full_name_label')} <span className="text-[#8B7043]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder={t('full_name_placeholder')}
                    className={`border border-[#151926]/15 bg-white/70 px-4 py-3 text-xs text-[#151926] placeholder-[#151926]/35 transition-colors focus:border-[#8B7043] focus:bg-white focus:outline-none sm:text-sm ${inter.className}`}
                    style={{ clipPath: dropdownClip }}
                  />
                </div>

                {/* 2 Columns: Phone & Email */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="phone"
                      className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/70 uppercase sm:text-[10px] ${inter.className}`}
                    >
                      {t('phone_label')} <span className="text-[#8B7043]">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder={t('phone_placeholder')}
                      className={`border border-[#151926]/15 bg-white/70 px-4 py-3 text-xs text-[#151926] placeholder-[#151926]/35 transition-colors focus:border-[#8B7043] focus:bg-white focus:outline-none sm:text-sm ${inter.className}`}
                      style={{ clipPath: dropdownClip }}
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="email"
                      className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/70 uppercase sm:text-[10px] ${inter.className}`}
                    >
                      {t('email_label')} <span className="text-[#8B7043]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={t('email_placeholder')}
                      className={`border border-[#151926]/15 bg-white/70 px-4 py-3 text-xs text-[#151926] placeholder-[#151926]/35 transition-colors focus:border-[#8B7043] focus:bg-white focus:outline-none sm:text-sm ${inter.className}`}
                      style={{ clipPath: dropdownClip }}
                    />
                  </div>
                </div>

                {/* Residence Typology Selection */}
                <div className="flex flex-col space-y-2">
                  <label
                    className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/70 uppercase sm:text-[10px] ${inter.className}`}
                  >
                    {t('interest_label')}
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {typologies.map((item) => {
                      const isSelected = selectedTypology === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedTypology(item.id)}
                          className={`cursor-pointer border px-3 py-2.5 text-center text-[9px] font-bold tracking-[0.1em] uppercase transition-all sm:text-[10px] ${
                            isSelected
                              ? 'border-[#8B7043] bg-[#8B7043] text-white'
                              : 'border-[#151926]/15 bg-white/60 text-[#151926]/75 hover:border-[#151926]/30 hover:bg-white'
                          } ${inter.className}`}
                          style={{ clipPath: dropdownClip }}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Contact Time */}
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="preferredTime"
                    className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/70 uppercase sm:text-[10px] ${inter.className}`}
                  >
                    {t('preferred_time_label')}
                  </label>
                  <input
                    id="preferredTime"
                    type="text"
                    value={formData.preferredTime}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredTime: e.target.value })
                    }
                    placeholder={t('preferred_time_placeholder')}
                    className={`border border-[#151926]/15 bg-white/70 px-4 py-3 text-xs text-[#151926] placeholder-[#151926]/35 transition-colors focus:border-[#8B7043] focus:bg-white focus:outline-none sm:text-sm ${inter.className}`}
                    style={{ clipPath: dropdownClip }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="message"
                    className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/70 uppercase sm:text-[10px] ${inter.className}`}
                  >
                    {t('message_label')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t('message_placeholder')}
                    className={`resize-none border border-[#151926]/15 bg-white/70 px-4 py-3 text-xs text-[#151926] placeholder-[#151926]/35 transition-colors focus:border-[#8B7043] focus:bg-white focus:outline-none sm:text-sm ${inter.className}`}
                    style={{ clipPath: dropdownClip }}
                  />
                </div>

                {/* Submit button & Privacy */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative flex w-full cursor-pointer items-center justify-center overflow-hidden py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 disabled:opacity-50 sm:text-xs ${inter.className}`}
                    style={{ clipPath: dropdownClip, backgroundColor: '#151926' }}
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                      {isSubmitting ? t('submitting_button') : t('submit_button')}
                    </span>
                    <div className="absolute inset-0 z-0 bg-[#8B7043] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>

                  <p
                    className={`mt-4 text-center text-[10px] leading-relaxed text-[#151926]/50 sm:text-xs ${inter.className}`}
                  >
                    {t('privacy_note')}
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
