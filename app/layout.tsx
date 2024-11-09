import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'MyCryptoAdvisor',
  description: 'A cryptocurrency aggregration system.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}