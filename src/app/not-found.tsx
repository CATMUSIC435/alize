'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '@/styles/global.css';

const INITIAL_COUNTDOWN_SECONDS = 8;

/**
 * Renders the global fallback 404 page matching Alizé Residence design language.
 * @returns Root 404 page element.
 */
export default function GlobalNotFoundPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN_SECONDS);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = '404 - Không tìm thấy trang | Alizé Residence Đà Nẵng';
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;

    if (countdown <= 0) {
      router.replace('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isPaused, router]);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#0A1926] px-4 py-6 text-[#151926] select-none sm:px-8 sm:py-10">
        {/* Background Decorative Ocean & Sand Atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#E0AC87]/15 blur-[130px]" />
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0D2D40] blur-[110px]" />
          <div className="absolute -bottom-40 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-[#E0AC87]/10 blur-[150px]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Top Header */}
        <header className="relative z-10 flex w-full max-w-6xl items-center justify-between pt-2">
          <Link
            href="/"
            aria-label="Alizé Residence Home"
            className="group inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-85"
          >
            <Image
              src="/logo-alize.png"
              alt="Alizé Residence"
              width={72}
              height={144}
              priority
              className="h-auto w-9 object-contain sm:w-11 md:w-12"
            />
            <div className="flex flex-col text-left">
              <span className="font-serif text-base font-medium tracking-[0.24em] text-[#FAF8F5] sm:text-lg">
                ALIZÉ
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#C5B49C] uppercase">
                Residence Da Nang
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4 text-[11px] font-medium tracking-[0.2em] uppercase sm:gap-8 sm:text-xs">
            <Link href="/" className="text-[#FAF8F5]/70 transition-colors hover:text-[#E0AC87]">
              Trang chủ
            </Link>
            <Link href="/apartments" className="text-[#FAF8F5]/70 transition-colors hover:text-[#E0AC87]">
              Căn hộ
            </Link>
          </nav>
        </header>

        {/* Center Alizé Sand Card */}
        <div className="relative z-10 my-auto flex w-full max-w-xl flex-col items-center py-6">
          <div className="bg-sand-card border border-[#D9CEBD]/90 relative flex w-full flex-col items-center rounded-2xl p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-10 md:p-12 text-center">
            {/* Inner Chamfered Border */}
            <div
              className="pointer-events-none absolute inset-3 bg-[#C5B49C]/40 sm:inset-4"
              style={{
                clipPath:
                  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
              }}
            >
              <div
                className="absolute inset-[1px] bg-sand-card"
                style={{
                  clipPath:
                    'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)',
                }}
              />
            </div>

            <div className="relative z-10 flex w-full flex-col items-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C5B49C] bg-[#EBD0B3]/30 px-3.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-[#7D5C2C] uppercase sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7D5C2C] animate-pulse" />
                <span>KHÔNG GIAN NGHỆ THUẬT CHƯA ĐƯỢC ĐỊNH VỊ</span>
              </div>

              <h1 className="font-serif text-7xl font-semibold tracking-[0.14em] text-[#151926] sm:text-8xl md:text-9xl">
                404
              </h1>

              <div className="my-3 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-[#C8BEAE] sm:w-16" />
                <span className="text-[10px] text-[#7D5C2C]">◆</span>
                <div className="h-px w-12 bg-[#C8BEAE] sm:w-16" />
              </div>

              <h2 className="mb-3 font-serif text-2xl font-semibold tracking-wide text-[#151926] uppercase sm:text-3xl">
                TRANG KHÔNG TỒN TẠI
              </h2>

              <p className="max-w-md text-xs font-normal leading-relaxed text-[#52483B] sm:text-sm">
                Địa chỉ bạn vừa truy cập không tồn tại hoặc đã được quy hoạch lại trong hành trình Alizé Residence.
              </p>

              <div
                onClick={() => setIsPaused((prev) => !prev)}
                className="mt-6 flex cursor-pointer items-center gap-3 rounded-full border border-[#D9CEBD] bg-[#EBE4D8]/60 px-4 py-2 transition-colors hover:bg-[#EBE4D8]"
                title={isPaused ? 'Nhấn để tiếp tục đếm ngược' : 'Nhấn để tạm dừng đếm ngược'}
              >
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                    <path
                      className="text-[#C5B49C]/40"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#7D5C2C] transition-all duration-1000 ease-linear"
                      strokeDasharray={`${(countdown / INITIAL_COUNTDOWN_SECONDS) * 100}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute font-serif text-[10px] font-bold text-[#7D5C2C]">
                    {countdown}
                  </span>
                </div>
                <span className="text-[11px] font-medium tracking-wider text-[#665B4C] uppercase">
                  Tự động quay về trang chủ sau {countdown} giây
                </span>
              </div>

              <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#151926] bg-[#151926] px-7 py-3 text-xs font-semibold tracking-[0.2em] text-[#FAF8F5] uppercase transition-all duration-300 hover:bg-[#2D3346] hover:shadow-lg active:scale-[0.98]"
                >
                  <span>VỀ TRANG CHỦ NGAY</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.91663 7H11.0833M11.0833 7L7.00002 2.91666M11.0833 7L7.00002 11.0833"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <Link
                  href="/apartments"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C5B49C] bg-transparent px-6 py-3 text-xs font-semibold tracking-[0.2em] text-[#151926] uppercase transition-all duration-300 hover:border-[#151926] hover:bg-[#151926]/5 active:scale-[0.98]"
                >
                  <span>CĂN HỘ MỞ BÁN</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <footer className="relative z-10 flex flex-col items-center gap-1 text-center pb-2">
          <p className="text-[10px] tracking-[0.28em] text-[#C5B49C] uppercase sm:text-[11px]">
            Alizé Residence • Mỹ Khê Beach, Da Nang
          </p>
        </footer>
      </main>
    );
  }
