export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center bg-primary">
      <section className="w-[500px]">{children}</section>
    </main>
  );
}
