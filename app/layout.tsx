import type { Metadata } from 'next';
import './globals.css';

import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY;

export const metadata: Metadata = {
    title: '공간하우징',
    description: '신뢰할 수 있는 인테리어',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script
                    type="text/javascript"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false&libraries=services`}
                    strategy="afterInteractive"
                />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
