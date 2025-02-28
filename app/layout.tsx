import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import Shell from './ui/shell/shell';
import { Background } from './ui/background/background';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">  
        <body className={`${inter.className} antialiased`}>
            <Shell>
              <Background>
                {children}
              </Background>
            </Shell>
        </body> 
    </html>
  );
}
