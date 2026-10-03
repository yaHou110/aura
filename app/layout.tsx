import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aura Social | شبکه اجتماعی آئورا - گروه نرم‌افزاری هیمورا',
  description: 'پلتفرم شبکه اجتماعی مدرن آئورا (Aura) با طراحی پیشرو، انیمیشن‌های نرم، حالت شبیه‌ساز گوشی و پشتیبانی کامل راست‌به‌چپ (RTL) - توسعه داده شده توسط گروه نرم‌افزاری هیمورا',
  openGraph: {
    title: 'Aura Social | شبکه اجتماعی آئورا',
    description: 'شبکه اجتماعی نوآورانه و خلاق با طراحی ویژه موبایل و وب - گروه نرم‌افزاری هیمورا (09354467269)',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura Social | شبکه اجتماعی آئورا',
    description: 'شبکه اجتماعی نوآورانه و خلاق با طراحی ویژه موبایل و وب - گروه نرم‌افزاری هیمورا (09354467269)',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-[#0b0f19] text-[#131b2e] min-h-screen selection:bg-[#e2dfff] selection:text-[#0f0069]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
