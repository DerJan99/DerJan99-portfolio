import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

export default function DatenschutzerklaerungPage() {
  return (
    <DefaultLayout>
      <span className={title()}>Datenschutzerklärung</span>
      <br />
      <br />
      <p>
        Bei disesm Internetangebot werden IP-Adressen, sowie ein Zeitstempel in
        den Logs des Webservers gespeichert. Diese werden zur keiner Zeit zur
        Verarbeitung verwendet und stellen nur die Funktionalität des Webservers
        sicher.
      </p>
      <br />
      <p>
        Um die Funktionalität des Theme-Switchers (Wechsel zwischen Dark- und
        Lightmode) sicherzustellen, wird im LocalStorage des Browsers ein Key
        angelegt. Dieser Key beinhaltet ausschließlich die Information über den
        aktuell gewählten Zustand und wird nur für die Funktionalität verwendet.
        Es findet keinerlei Weiterverarbeitung, oder Drittspeicherung der Daten
        statt.
      </p>
    </DefaultLayout>
  );
}
