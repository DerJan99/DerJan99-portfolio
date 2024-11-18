import { AccordionType } from "@/types";

// interface AccordionType {
//   title: string;
//   expanded?: boolean;
//   editorContent?: string;
//   ctaButton?: ButtonType[];
//   description?: string;
//   language: "typescript" | "javascript" | "html" | "css" | "json";
//   breadcrumbPath?: string[];
//   technologyChips?: ChipType[];
// }

// interface ButtonType {
//   type: "github" | "github_direct";
//   href: string;
// }

// interface ChipType {
//   text: string;
//   color?:
//     | "primary"
//     | "default"
//     | "secondary"
//     | "success"
//     | "warning"
//     | "danger"
//     | undefined;
// }

export const PortfolioTypes: AccordionType[] = [
  {
    title: "Athena",
    expanded: true,
    ctaButton: [{ type: "github", href: "https://github.com/DerJan99/athena" }],
    language: "typescript",
    description: `Das Schulprojekt Athena entstand in der Berufsschule als gemeinsames Vorhaben von mir und zwei Mitschülern. Ziel war es, eine moderne Plattform zur Anzeige und Verwaltung von Ergebnistabellen für verschiedene Sportarten zu entwickeln. Dabei lag der Fokus auf einer benutzerfreundlichen und skalierbaren Lösung, die aktuelle Webtechnologien integriert.
Die technische Grundlage des Projekts bildet eine MariaDB-Datenbank, die in der 3. Normalform entworfen wurde, um eine optimale Datenstruktur zu gewährleisten. Für das Backend kam Next.js zum Einsatz, das eine performante API zur Bereitstellung der Daten bietet. Das Frontend wurde mit Angular realisiert, um eine dynamische und interaktive Benutzeroberfläche zu schaffen. Dank TypeScript konnten Frontend und Backend auf gemeinsame Datentypen zugreifen. Dieser Type-Sharing-Ansatz wurde durch die Organisation des gesamten Projekts in einem Monorepo zusätzlich unterstützt, was die Entwicklung konsistent und effizient machte.
In späteren Konzepten wurde die Einbindung von Keycloak geplant, um eine sichere Authentifizierung für Schiedsrichter zu ermöglichen. Diese sollten autorisiert werden, Ergebnisse direkt in das System einzutragen.
Das Projekt Athena war nicht nur eine wertvolle praktische Erfahrung in der Softwareentwicklung, sondern auch ein erfolgreiches Teamprojekt, das moderne Technologien mit einem realen Anwendungsfall verband.`,
    technologyChips: [
      { text: "MariaDB" },
      { text: "Next.js" },
      { text: "Angular" },
      { text: "TypeScript" },
      { text: "SCSS" },
      { text: "Monorepo-Architektur (NX)" },
      { text: "Type-Sharing" },
      { text: "REST-API" },
      { text: "Geplant: JWT", color: "warning" },
      { text: "Geplant: Docker", color: "warning" },
      { text: "Geplant: KeyCloak", color: "warning" },
    ],
  },
  {
    title: "Bahn-App",
    ctaButton: [
      { type: "github", href: "https://github.com/DerJan99/bahn-app" },
      {
        type: "github_direct",
        href: "https://github.com/DerJan99/bahn-app/blob/main/src/app/components/shared/search/search.component.ts",
      },
    ],
    breadcrumbPath: [
      "bahn-app",
      "src",
      "app",
      "components",
      "shared",
      "search",
      "search.component.ts",
    ],
    language: "typescript",
    description: `Das Projekt Bahn-App ist eine eigene Interpretation des DB Navigators, entwickelt im Pair-Programming mit einem Klassenkameraden. Die App dient zur Darstellung von Bahnhöfen und bietet einen digitalen Fahrplan, der in Relation zu den Bahnhöfen angezeigt wird. Die Entwicklung stellte eine besondere Herausforderung dar, da die Bahn-APIs viele Inkonsistenzen aufwiesen: Es gab teils XML-, teils JSON-Daten ohne einheitliche Typisierung und unterschiedliche IDs zur Identifikation von Bahnhöfen. Um diese Schwierigkeiten zu überwinden, wurde eine Third-Party-Middleware eingesetzt, um die Daten zu harmonisieren und effizient nutzbar zu machen.`,
    editorContent: `import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {distinctUntilChanged, map, Observable, startWith} from "rxjs";

import {EventService, HttpService} from "@bahn-app/services";
import {ComStations, Stations} from "@bahn-app/interfaces";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private responses: ComStations;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  formControl = new FormControl();

  constructor(private httpService: HttpService, private eventService: EventService) {
    this.fetchStation();
  }

  public ngOnInit() {
  }

  private filterOptions(value: string) {
    const filterValue = value.toLowerCase();
    if (this.options !== undefined && filterValue.length > 0) {
      this.getStations(filterValue);
      return this.options.filter(option => option.toLowerCase().startsWith(filterValue))
    }
    return [];
  }

  private fetchStation() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(""),
      distinctUntilChanged(),
      map(value => this.filterOptions(value || ""))
    ) as Observable<string[]>;
  }

  private getStations(searchString: string) {
    try {
      this.httpService.getStations(searchString).subscribe((res: ComStations) => {
        this.responses = res;
        Object.entries(res).forEach(([_key, value]) => {
          this.options = [...new Set(this.options), value!.name]
        });
      })
    } catch (e) {
      console.error(e);
    }
  }

  public eventSelected(item: MatAutocompleteSelectedEvent) {
    let stationId: string = "";
    Object.entries(this.responses).forEach(([key, value]) => {
      if (value!.name === item.option.value) {
        stationId = key;
      }
    })

    try {
      this.httpService.getStation(stationId).subscribe((data: Stations) => {
        this.eventService.stationEventBrokerSub.next(data);
      });
    } catch (e) {
      console.error(e);
    }
  }
}`,
    technologyChips: [
      { text: "Angular" },
      { text: "SCSS" },
      { text: "HTTP-Client" },
      { text: "REST-API" },
      { text: "TypeScript" },
      { text: "RxJS" },
      { text: "JSON" },
      { text: "Git" },
    ],
  },
  {
    title: "Config-Tool",
    description: `Das Config Tool wurde als Abschlussprojekt meiner Ausbildung entwickelt und hatte zum Ziel, eine benutzerfreundliche Oberfläche für die Konfiguration von Daten bereitzustellen, die ursprünglich nur in JSON-Dateien gespeichert waren. Das Problem bestand darin, dass viele Benutzer, insbesondere aus dem Kundenservice oder mit wenig technischem Hintergrund, Schwierigkeiten hatten, die Syntax von JSON zu verstehen. Daher wurde dieses Tool entwickelt, um die Konfiguration für diese Benutzer visuell zugänglich und einfach zu gestalten.In einer Arbeitszeit von 80 Stunden wurde ein Teil des Projekts umgesetzt, wobei der Fokus auf der Visualisierung und der Benutzerfreundlichkeit lag. Mithilfe der Monorepo-Architektur und des NX-Frameworks konnte das Projekt sowohl für das Web als auch als Electron-Anwendung erstellt werden, die als portables Programm (ohne Installation) auf Windows läuft. Das Electron-Projekt ermöglichte den Zugriff auf die Windows-API, was zusätzliche Funktionalitäten für die Desktop-Version brachte. Auch die Möglichkeit, das Tool für Linux und macOS bereitzustellen, wurde berücksichtigt, obwohl diese Systeme nicht im Rahmen des Projekts unterstützt wurden.Die Anwendung stellt eine benutzerfreundliche Schnittstelle bereit, in der Benutzer JSON-Daten auf einfache Weise bearbeiten und visualisieren können, ohne sich mit der zugrunde liegenden Syntax auseinandersetzen zu müssen. Zusätzlich wurde das Tool so konzipiert, dass es leicht erweiterbar ist, falls in Zukunft weitere Plattformen oder Funktionalitäten hinzugefügt werden sollen.`,
    language: "typescript",
    technologyChips: [
      { text: "Angular" },
      { text: "Electron" },
      { text: "TypeScript" },
      { text: "SCSS" },
      { text: "Monorepo-Architektur (NX)" },
      { text: "JSON" },
      { text: "Portable Installation" },
      { text: "Cross-Plattform" },
      { text: "CI/CD Azure DevOps" },
      { text: "Storybook" },
    ],
    breadcrumbPath: [
      "config-tool",
      "libs",
      "ui",
      "views",
      "src",
      "lib",
      "api-config",
      "api-config.component.ts",
    ],
    ctaButton: [
      { type: "github", href: "https://github.com/DerJan99/config-tool" },
      {
        type: "github_direct",
        href: "https://github.com/DerJan99/config-tool/blob/main/libs/ui/views/src/lib/api-config/api-config.component.ts",
      },
    ],
    editorContent: `import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ConfigSaveService,
  SessionStorageService,
} from '@config-tool/shared/services';

interface IApiConfig {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'config-tool-api-config',
  templateUrl: './api-config.component.html',
  styleUrls: ['./api-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiConfigComponent implements AfterViewInit {
  public passwordInputType = true;
  public apiConfigSelectOptions: IApiConfig[] = [
    { value: 'ANTRAGO_BACKEND', viewValue: 'Antrago' },
    { value: 'WEB_API', viewValue: 'Web-API' },
    { value: 'NONE', viewValue: 'Kein Backend' },
  ];
  public formGroup: FormGroup = new FormGroup({
    oauth2: new FormControl({ value: false, disabled: true }),
    url: new FormControl(''),
    type: new FormControl(''),
    mandantId: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    token: new FormControl({ disabled: true }),
    enrollmentTimeout: new FormControl(''),
    rightsGroup: new FormControl(''),
  });

  constructor(
    private sessionStorage: SessionStorageService,
    private saveService: ConfigSaveService
  ) {
    const serializedConfig = this.sessionStorage.getItem('antrago-config');
    if (serializedConfig) {
      this.formGroup.patchValue(JSON.parse(serializedConfig).api);
    }
  }

  ngAfterViewInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  public togglePasswordInputType(): void {
    this.passwordInputType = !this.passwordInputType;
  }

  public save(): void {
    this.saveService.save(this.formGroup.getRawValue(), 'api');
  }
}`,
  },
  {
    title: "Project-Altis Launcher",
    language: "typescript",
    description: `Der Project-Altis Launcher ist ein Projekt in der Konzeptionsphase, das darauf abzielt, eine zentrale Plattform für einen Gameserver in Arma 3 zu schaffen. Der Launcher soll Arma 3 über Steam starten, optional Mods installieren und einen Changelog von GitHub auslesen. Ziel ist es, eine Schnittstelle zwischen dem Spiel, den Spielern und dem Entwicklerteam zu bieten. Das Projekt wird mit React, Electron und NX umgesetzt, wobei ein zukünftiges Backend es ermöglichen soll, RCON-Befehle auszuführen, Serverdaten auszulesen, usw..`,
    technologyChips: [
      { text: "React" },
      { text: "NextUI" },
      { text: "Vite" },
      { text: "Monorepo-Architektur (NX)" },
      { text: "Electron" },
      { text: "Express (Zukünftig)", color: "warning" },
      { text: "RCON-Schnittstelle zu SQF", color: "warning" },
    ],
  },
  {
    title: "VinJan.cloud",
    language: "typescript",
    technologyChips: [
      { text: "Proxmox (Hypervisor)" },
      { text: "MariaDB" },
      { text: "Plesk (Web- und Mailserver)" },
      { text: "VM" },
      { text: "Pterodactyl (Gameserver Managementsystem)" },
      { text: "Docker" },
      { text: "Ticketsystem" },
      { text: "Backup-Server" },
      { text: "Networking" },
      { text: "WireGuard (VPN)" },
      { text: "Proxymanagement" },
      { text: "OPNsense" },
      { text: "Nextcloud" },
    ],
    description: `VinJan.cloud ist eine vielseitige, selbstgehostete Cloud-Infrastruktur, die auf Proxmox basiert und verschiedene virtuelle Maschinen (VMs) für unterschiedliche Aufgaben bereitstellt. Zu den Schlüsselfunktionen gehören ein MariaDB-Datenbankserver, ein Plesk-Server für Web- und Mailhosting sowie die Möglichkeit, Gameserver mit Pterodactyl und Docker zu hosten. Die Plattform stellt eine Ticketverwaltung über Discord zur Verfügung, um Wartungen und Support zu koordinieren. Ein VPN-Server schützt kritische Teile des Systems, und alle VMs werden regelmäßig über einen Backup-Server gesichert. Sicherheitsmaßnahmen wie eine OPNsense-Firewall und ein Proxy-Server tragen zur Absicherung des Netzwerks bei. Diese Lösung bietet eine robuste und sichere Infrastruktur für verschiedene Anwendungen und Services.`,
  },
  {
    title: "Auszug aus wiederverwenbarer Komponente 'TreeList-Component'",
    description:
      "Diese Komponente wird in einem größeren Projekt verwendet, um eine Tree-Ansicht zu generieren. Die Herausforderung bei dieser Komponente war, dass der Tree in einem 'Rich-Tooltip' dargestellt wird. Ein Tooltip mit klickbaren Elementen. Dementsprechend konnte man nicht von einer festen Breite und Höhe ausgehen, da der Tooltip sich abhängig vom angehängten Element gerendert hat. Es gab also ein Host-Element (an diesem wurde eine Angular-Directive attached) und die Tooltip-Komponente, die das Fenster und die Logik drum herum geschaffen hat. In diesem Fenster konnten dann diverse Inhalte dargestellt werden. Unter anderem diese Tree-List.",
    technologyChips: [{ text: "Angular" }, { text: "TypeScript" }],
    language: "typescript",
    editorContent: `@Component({
  standalone: true,
  imports: [CommonModule, CdkTreeModule, IconComponent],
  selector: 'X-listcontainer-tree',
  templateUrl: './listcontainer-tree.component.html',
  styleUrls: ['./listcontainer-tree.component.scss'],
})
export class ListcontainerTreeComponent implements OnChanges, OnDestroy {
  /**
   * The data source for the tree component.
   * @required
   * @type TreeNode[]
   */
  @Input({ required: true }) dataSource: TreeNode[];

  /**
   * Expand all the nodes recursively.
   * @type boolean
   * @default false
   */
  @Input({ transform: booleanAttribute }) expandAll: boolean = false;

  /**
   * Emits the whole dataSource with the changed values.
   *
   * If you need only the changed item, use itemUpdate instead.
   * @type EventEmitter<TreeNode[]>
   * @see dataSource
   * @see itemUpdate
   */
  @Output()
  dataSourceChange: EventEmitter<TreeNode[]> = new EventEmitter<TreeNode[]>();

  /**
   * Emits the single item with the changed values.
   *
   * If you need the whole dataSource, use dataSourceChange instead, or combine dataSource with ngModel.
   * @type EventEmitter<TreeNode>
   * @see dataSourceChange
   */
  @Output() itemUpdate: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  protected treeControl: NestedTreeControl<TreeNode>;
  protected _dataSource: ArrayDataSource<TreeNode>;
  protected hasChild = (_: number, node: TreeNode) => {
    return !!node.children && node.children.length > 0;
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && changes['dataSource'].currentValue) {
      this.initDataSource();
    }
  }

  protected onCheckedChange(node: TreeNode, checked: Event): void {
    node.checked = (checked.target as HTMLInputElement).checked;
    this.itemUpdate.emit(node);
    this.dataSourceChange.emit(this.dataSource);
  }

  protected normalizeDisplayName(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '-');
  }

  protected isFirstLevel(element: HTMLElement): boolean {
    if (!element.ariaLevel) return false;
    return Number(element.ariaLevel) > 1;
  }

  private initDataSource(): void {
    this.treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
    this.treeControl.dataNodes = this.dataSource;
    this._dataSource = new ArrayDataSource<TreeNode>(
      this.prepareDataSource(this.dataSource),
    );
    if (this.expandAll) this.treeControl.expandAll();
  }

  private prepareDataSource(dataSource: TreeNode[]): TreeNode[] {
    return dataSource.map((node: TreeNode) => {
      if (node.children) {
        if (node.expanded) {
          this.treeControl.expand(node);
        } else if (!Object.hasOwn(node, 'expanded')) {
          node.expanded = false;
        }
        node.children = this.prepareDataSource(node.children);
      } else if (!Object.hasOwn(node, 'checked')) {
        node.checked = false;
      }
      return node;
    });
  }

  ngOnDestroy() {
    this._dataSource.disconnect();
  }
}`,
  },
  {
    title: "Auszug aus Logik-Komponente 'RichTooltip-Directive'",
    description:
      "Wie schon in der TreeList-Component beschrieben, ist dies ebenfalls ein Teil der Rich-Tooltip-Komponente. Diese Direktive wurde an ein beliebiges HTMLElement gehangen und wurde mit im Lifecycle initialisiert. Das HostElement blieb davon unberührt, allderings ist diese Komponente die Hauptlogik hinter einem unabhängig gestyltem, positionierten und größentechnischen Tooltip.",
    technologyChips: [{ text: "Angular" }, { text: "TypeScript" }],
    language: "typescript",
    editorContent: `@Directive({
  standalone: true,
  selector: '[XRichTooltipTriggerFor]',
})
export class RichTooltipTriggerForDirective implements OnInit, OnDestroy {
  @HostListener('click')
  onClick() {
    if (!this.noAutoOpening) {
      this.openTooltip();
    }
  }

  /**
   * The panel to be attached to this trigger. Awaits a reference from X-rich-tooltip
   * @type RichTooltipPanel
   * @example <button [XRichTooltipTriggerFor]="richTooltipPanel"></button><X-rich-tooltip #richTooltipPanel></X-rich-tooltip>
   */
  @Input('XRichTooltipTriggerFor') richTooltipPanel: RichTooltipPanel;

  /**
   * If set to true, the tooltip will not open automatically on click.
   * Only makes sense to use if the tooltip is opened programmatically.
   *
   * @type boolean
   * @default false
   */
  @Input({ alias: 'XRichTooltipNoAutoOpening', transform: booleanAttribute })
  noAutoOpening: boolean = false;

  /**
   * If set to true, the tooltip will have an unlimited height.
   * Only makes sense when you have a static content that doesn't change its height.
   *
   * @type boolean
   * @default false
   */
  @Input({ alias: 'XRichTooltipUnlimitedHeight', transform: booleanAttribute })
  unlimitedHeight: boolean = false;

  /**
   * Sets the width of the tooltip.
   * If not set, the width of the HostElement is used.
   * If a number is passed, it will be interpreted as **px**.
   * Any valid CSS value can be passed.
   *
   * @link https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths
   * @type string
   */
  @Input('XRichTooltipWidth') width: string | number;

  /**
   * Sets the position of the tooltip.
   * Consists of an array of ConnectedPosition objects.
   * The first position in the array is the default position, the rest are fallback positions.
   * The default position is 'bottom-left' and the fallback is 'bottom-right'.
   *
   * For help, the OVERLAY_POSITION_STRATEGIES object can be used.
   *
   * @default [OVERLAY_POSITION_STRATEGIES['bottom-left'], OVERLAY_POSITION_STRATEGIES['bottom-right']]
   * @example [OVERLAY_POSITION_STRATEGIES['bottom-left'], OVERLAY_POSITION_STRATEGIES['bottom-right']]
   * @see OVERLAY_POSITION_STRATEGIES
   * @see https://material.angular.io/cdk/overlay/api#ConnectedPosition
   * @type ConnectedPosition[]
   */
  @Input('XRichTooltipPositioning') position: ConnectedPosition[] = [
    OVERLAY_POSITION_STRATEGIES['bottom-left'],
    OVERLAY_POSITION_STRATEGIES['bottom-right'],
  ];

  /**
   * Emits the current overlay state.
   * True when the overlay is open, false when it's closed.
   * @type EventEmitter<boolean>
   */
  @Output()
  dropdownExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  private overlayRef: OverlayRef;
  private isOpened: boolean = false;

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    const element = this.findAttribute(
      this.elementRef.nativeElement,
      'data-XRichTooltip-attachment-point',
    );
    const elementPos = element.getBoundingClientRect();
    const hostWidth: string = elementPos.right - elementPos.left + 'px';

    this.richTooltipPanel.unlimitedHeight = this.unlimitedHeight;
    this.richTooltipPanel.minWidth = !this.width;

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: '',
      width: this.width ? this.width : hostWidth,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(element)
        .withPositions(this.position)
        .withFlexibleDimensions(false)
        .withPush(false)
        .setOrigin(element),
    });

    this.overlayRef.backdropClick().subscribe(() => {
      if (!this.isOpened) return;
      this.closeTooltip();
    });
  }

  public toggleTooltip() {
    this.isOpened ? this.closeTooltip() : this.openTooltip();
  }

  public openTooltip() {
    const templatePortal = new TemplatePortal(
      this.richTooltipPanel.templateRef,
      this.viewContainerRef,
    );
    if (!this.isOpened) this.overlayRef.attach(templatePortal);
    this.isOpened = true;
    this.dropdownExpanded.emit(true);
  }

  public closeTooltip() {
    this.isOpened = false;
    this.overlayRef.detach();
    this.richTooltipPanel.closed.emit();
    this.dropdownExpanded.emit(false);
  }

  private findAttribute(
    element: HTMLElement,
    attributeName: string,
  ): HTMLElement {
    const children: HTMLCollection = element.children;

    for (let i = 0; i < children.length; i++) {
      if (children[i].hasAttribute(attributeName)) {
        return children[i] as HTMLElement;
      }
    }

    return element;
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
`,
  },
  {
    title: "Portfolio-Page",
    description:
      "Diese Website habe ich an 1.5 Tagen gebaut, um mein Skillset zu repräsentieren. Dabei habe ich React und NextUI verwendet. NextUI greift stückweise auf Tailwind zurück. Dieses Projekt habe ich vollständig alleine umgesetzt. AI wurde in diesem Kontext nur verwendet, um Font-Faces zu generieren und Fehler zu verstehen. Auf Responiveness wurde geachtet, wobei dieses Seite aus zeitgründen keinerlei Tests und Anpassungen für Mobilgeräte bekommen hat.",
    technologyChips: [
      { text: "React" },
      { text: "TypeScript" },
      { text: "NextUI" },
      { text: "Tailwind" },
      { text: "CSS" },
    ],
    language: "typescript",
    ctaButton: [
      {
        type: "github",
        href: "https://github.com/DerJan99/DerJan99-portfolio",
      },
    ],
  },
];
