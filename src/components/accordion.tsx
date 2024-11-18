/* eslint-disable react/jsx-sort-props */
import {
  Accordion,
  AccordionItem as NextUIAccordionItem,
} from "@nextui-org/accordion";
import { Editor } from "@monaco-editor/react";
import { Button } from "@nextui-org/button";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";

import { GithubIcon } from "@/components/icons";
import { AccordionType } from "@/types";

import "./accordion.css";

type AccordionItemProps = {
  content: AccordionType[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//@ts-ignore
function formatter(editor: any, monaco: any) {
  setTimeout(() => {
    editor.getAction("editor.action.formatDocument").run();
  }, 100);
}

export const AccordionItem = ({ content }: AccordionItemProps) => {
  return (
    <Accordion variant="splitted">
      {content.map((item, idx) => {
        return (
          <NextUIAccordionItem
            key={idx}
            aria-label={item.title}
            title={item.title}
          >
            <div className="accordion-wrapper">
              <span>{item.description}</span>
              <div className="chip-list">
                {item.technologyChips
                  ? item.technologyChips?.map((chip, chipIdx) => {
                      return (
                        <Chip
                          key={"chip-" + chipIdx}
                          className="chip"
                          color={chip.color ? chip.color : "success"}
                        >
                          {chip.text}
                        </Chip>
                      );
                    })
                  : ""}
              </div>
              {item.editorContent ? (
                <div>
                  <span>Auszug aus dem Projekt:</span>
                  <Editor
                    className="radius"
                    options={{
                      domReadOnly: true,
                      readOnly: true,
                      formatOnPaste: true,
                      formatOnType: true,
                    }}
                    height="20rem"
                    language={item.language}
                    value={item.editorContent}
                    theme="vs-dark"
                    onMount={formatter}
                  />
                </div>
              ) : (
                ""
              )}
              {item.breadcrumbPath ? (
                <Breadcrumbs isDisabled>
                  {item.breadcrumbPath.map((bc, breadcrumbIdx) => {
                    return (
                      <BreadcrumbItem key={"breadcrumb-" + breadcrumbIdx}>
                        {bc}
                      </BreadcrumbItem>
                    );
                  })}
                </Breadcrumbs>
              ) : (
                ""
              )}
              {item.ctaButton && item.ctaButton.length > 0 && (
                <div className="cta-area">
                  {item.ctaButton.map((button, buttonIdx) => {
                    switch (button.type) {
                      case "github":
                        return (
                          <Link
                            key={buttonIdx}
                            isExternal
                            href={button.href}
                            className={"button button-" + buttonIdx}
                          >
                            <Button color="primary" variant="shadow">
                              <GithubIcon />
                              GitHub
                            </Button>
                          </Link>
                        );
                      case "github_direct":
                        return (
                          <Link
                            key={buttonIdx}
                            isExternal
                            href={button.href}
                            className={"button button-" + buttonIdx}
                          >
                            <Button color="default" variant="shadow">
                              <GithubIcon />
                              Link zur Vorschaudatei
                            </Button>
                          </Link>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              )}
            </div>
          </NextUIAccordionItem>
        );
      })}
    </Accordion>
  );
};
