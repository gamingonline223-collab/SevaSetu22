import '../../styles/globals.css';
import '../../styles/theme.css';

export const metadata = {
  title: 'Seva-Setu: Your Ward, Your Voice. Fixed by AI.',
  description: 'Login - Municipal Issue Management',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#0066cc',
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Seva-Setu" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-to-br from-primary-700 to-primary-900 min-h-screen flex items-center justify-center p-md">
        {children}
      </body>
    </html>
  );
}
