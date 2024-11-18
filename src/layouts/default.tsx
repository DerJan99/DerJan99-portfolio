import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";

import "./default.css";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerSpacer: JSX.Element = <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>;

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full footer-container py-3">
        <div className="footer-content">
          <span className="text-default-600">Built with&nbsp;</span>
          <Link
            isExternal
            className="text-current"
            href="https://nextui.org/"
            title="nextui.org homepage"
          >
            <p className="text-primary">NextUI</p>
          </Link>
          <span className="text-default-600">&nbsp;and&nbsp;</span>
          <Link
            isExternal
            className="text-current"
            href="https://react.dev/"
            title="react.dev homepage"
          >
            <p className="text-primary">React</p>
          </Link>
          {footerSpacer}
          <span className="text-default-600">© 2024 Jan von Sondern</span>
        </div>
        <div>
          <Link href="/impressum">
            <p className="text-primary">Impressum</p>
          </Link>
          {footerSpacer}
          <Link href="/datenschutzerklaerung">
            <p className="text-primary">Datenschutzerklärung</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
