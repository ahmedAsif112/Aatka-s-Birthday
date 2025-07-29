'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-2Q24P2P0G9'; // your ID

export default function Analytics() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: pathname,
            });
        }
    }, [pathname]);

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
          `,
                }}
            />
        </>
    );
}
