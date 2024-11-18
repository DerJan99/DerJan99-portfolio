import { Link } from "@nextui-org/link";

import DefaultLayout from "@/layouts/default";
import { subtitle, title } from "@/components/primitives";

import "./impressum.css";

export default function ImpressumPage() {
  return (
    <DefaultLayout>
      <span className={title()}>Impresum</span>
      <span className={subtitle()}>Anbieter gemäß §5 DDG</span>
      <div className="contact-container">
        <span>Jan von Sondern</span>
        <Link href="mailto:j.n.vonsondern@gmail.com">
          <span>j.n.vonsondern[at]gmail.com</span>
        </Link>
      </div>
      <p>
        Es handelt sich bei der Webpräsenz um ein rein privates Internetangebot
        und ist damit von Teilen der Kennzeichnungspflicht befreit. Die
        Postanschrift und Telefonnummer wird auf Anfrage bei berechtigtem
        Interesse bereitgestellt.
      </p>
    </DefaultLayout>
  );
}
