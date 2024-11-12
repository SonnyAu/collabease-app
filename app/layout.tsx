// app/layout.tsx

export const metadata = {
  title: "CollabEase Authentication",
  description: "Authentication page for CollabEase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
