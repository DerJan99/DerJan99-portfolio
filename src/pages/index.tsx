import { Image } from "@nextui-org/image";

import { subtitle, title } from "@/components/primitives";
import { AccordionItem } from "@/components/accordion";
import DefaultLayout from "@/layouts/default";
import { PortfolioTypes } from "@/data/portfolio-data";

import "./index.css";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="profile-container">
        <div className="alignment">
          <span className={title()}>Hallo, ich bin Jan!</span>
          <span className={subtitle()}>Und das ist mein Portfolio:</span>
        </div>
        <div className="divider" />
        <Image isBlurred isZoomed src="/profile-pic.jpg" width={400} />
      </section>
      <section className="accordion-container">
        <AccordionItem content={PortfolioTypes} />
      </section>
    </DefaultLayout>
  );
}
