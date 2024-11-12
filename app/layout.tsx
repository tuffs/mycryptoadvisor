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
        <div className="mx:3 md:mx-12">
          {children}
        </div>
      </body>
    </html>
  );
}