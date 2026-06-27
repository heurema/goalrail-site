"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const CONTENT = {
  en: {
    ariaLabel: "What Goalrail gives you",
    closeLabel: "Close screenshot",
    viewLarger: (title) => `View larger ${title} screenshot`,
    pillars: [
      {
        id: "composition",
        label: "Composition",
        title: "Composition",
        body: "Combine multiple models, harnesses, and techniques without rewriting code. Switch between Claude Code, Codex, Pi, and your own agents with one-line changes.",
        visual: {
          src: "/images/goalrail-composition.svg",
          alt: "Goalrail web UI showing a multi-agent review flow coordinated from one session.",
          width: 1280,
          height: 720,
          fit: "contain",
        },
      },
      {
        id: "control",
        label: "Control",
        title: "Control",
        body: "Stateful, data-centric policies that track agent actions and enforce guardrails like cost budgets and access controls at the meta-harness layer, not via prompts.",
        visual: {
          src: "/images/goalrail-control.svg",
          alt: "Goalrail policy panel showing budget, network, and secret-access controls.",
          width: 1280,
          height: 720,
          fit: "contain",
        },
      },
      {
        id: "collaboration",
        label: "Collaboration",
        title: "Collaboration",
        body: "Share live agent sessions via URL with full history, so teammates can review, comment, and steer together in real time.",
        visual: {
          src: "/images/goalrail-collaboration.svg",
          alt: "Goalrail shared session with comments, history, and connected desktop and mobile clients.",
          width: 1280,
          height: 720,
          fit: "contain",
        },
      },
    ],
  },
  ru: {
    ariaLabel: "Что дает Goalrail",
    closeLabel: "Закрыть скриншот",
    viewLarger: (title) => `Открыть скриншот: ${title}`,
    pillars: [
      {
        id: "composition",
        label: "Композиция",
        title: "Композиция",
        body: "Собирайте несколько моделей, harnesses и техник в одном сценарии без переписывания кода. Claude Code, Codex, Pi и собственные агенты подключаются через один слой.",
        visual: {
          src: "/images/goalrail-composition.svg",
          alt: "Goalrail web UI with a multi-agent review flow coordinated from one session.",
          width: 1280,
          height: 720,
          fit: "contain",
        },
      },
      {
        id: "control",
        label: "Контроль",
        title: "Контроль",
        body: "Политики работают с состоянием сессии: считают расходы, ограничивают доступ и эскалируют рискованные действия на уровне meta-harness, а не только промпта.",
        visual: {
          src: "/images/goalrail-control.svg",
          alt: "Goalrail policy panel with budget, network, and secret-access controls.",
          width: 1280,
          height: 720,
          fit: "contain",
        },
      },
      {
        id: "collaboration",
        label: "Совместная работа",
        title: "Совместная работа",
        body: "Делитесь живой агентской сессией по ссылке, сохраняйте полную историю и подключайте команду к review, комментариям и управлению в реальном времени.",
        visual: {
          src: "/images/goalrail-collaboration.svg",
          alt: "Goalrail shared session with comments, history, and connected desktop and mobile clients.",
          width: 1280,
          height: 720,
          fit: "contain",
        },
      },
    ],
  },
};

function localeFromPathname(pathname) {
  return pathname?.startsWith("/ru") ? "ru" : "en";
}

export default function PillarsTabs() {
  const pathname = usePathname();
  const copy = CONTENT[localeFromPathname(pathname)];
  const pillars = copy.pillars;
  const [active, setActive] = useState("composition");
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });
  const [expandedVisual, setExpandedVisual] = useState(null);
  const tablistRef = useRef(null);
  const tabRefs = useRef({});
  const closeButtonRef = useRef(null);

  const updateIndicator = useCallback(() => {
    const tab = tabRefs.current[active];
    const list = tablistRef.current;
    if (!tab || !list) return;

    const listRect = list.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    setIndicator({
      left: tabRect.left - listRect.left,
      width: tabRect.width,
      ready: true,
    });
  }, [active]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    if (!expandedVisual) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setExpandedVisual(null);
    };

    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expandedVisual]);

  const selectTab = (id) => {
    if (id !== active) setActive(id);
  };

  return (
    <div className="pillars-tabs">
      <div
        className="pillar-tablist"
        role="tablist"
        aria-label={copy.ariaLabel}
        ref={tablistRef}
      >
        <span
          className={
            indicator.ready
              ? "pillar-tab-indicator is-ready"
              : "pillar-tab-indicator"
          }
          aria-hidden="true"
          style={{
            width: indicator.width,
            left: indicator.left,
          }}
        />
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            ref={(node) => {
              tabRefs.current[pillar.id] = node;
            }}
            type="button"
            role="tab"
            id={`pillar-tab-${pillar.id}`}
            aria-selected={active === pillar.id}
            aria-controls={`pillar-panel-${pillar.id}`}
            className={
              active === pillar.id ? "pillar-tab is-active" : "pillar-tab"
            }
            onClick={() => selectTab(pillar.id)}
          >
            {pillar.label}
          </button>
        ))}
      </div>

      <div className="pillar-panel-stage">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className={
              active === pillar.id ? "pillar-panel is-active" : "pillar-panel"
            }
            role="tabpanel"
            id={`pillar-panel-${pillar.id}`}
            aria-labelledby={`pillar-tab-${pillar.id}`}
            aria-hidden={active !== pillar.id}
          >
            <div className="pillar-copy">
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </div>
            <div
              className={
                pillar.visual
                  ? "pillar-visual"
                  : "pillar-visual pillar-visual-placeholder"
              }
              aria-hidden={pillar.visual ? undefined : true}
            >
              {pillar.visual ? (
                <button
                  type="button"
                  className="pillar-visual-zoom"
                  onClick={() => setExpandedVisual(pillar.visual)}
                  aria-label={copy.viewLarger(pillar.title)}
                >
                  <Image
                    className={
                      (pillar.visual.fit === "contain"
                        ? "pillar-visual-image pillar-visual-image-contain"
                        : "pillar-visual-image") +
                      (pillar.visual.darkSrc ? " theme-light-only" : "")
                    }
                    src={pillar.visual.src}
                    alt={pillar.visual.alt}
                    width={pillar.visual.width}
                    height={pillar.visual.height}
                    sizes="(max-width: 820px) 100vw, 640px"
                  />
                  {pillar.visual.darkSrc ? (
                    <Image
                      className={
                        (pillar.visual.fit === "contain"
                          ? "pillar-visual-image pillar-visual-image-contain"
                          : "pillar-visual-image") + " theme-dark-only"
                      }
                      src={pillar.visual.darkSrc}
                      alt={pillar.visual.alt}
                      width={pillar.visual.width}
                      height={pillar.visual.height}
                      sizes="(max-width: 820px) 100vw, 640px"
                    />
                  ) : null}
                </button>
              ) : (
                "Image placeholder"
              )}
            </div>
          </div>
        ))}
      </div>

      {expandedVisual ? (
        <div
          className="pillar-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={expandedVisual.alt}
          onClick={() => setExpandedVisual(null)}
        >
          <div className="pillar-lightbox-backdrop" aria-hidden="true" />
          <button
            ref={closeButtonRef}
            type="button"
            className="pillar-lightbox-close"
            aria-label={copy.closeLabel}
            onClick={() => setExpandedVisual(null)}
          >
            ×
          </button>
          <div
            className="pillar-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              className={
                expandedVisual.darkSrc
                  ? "pillar-lightbox-image theme-light-only"
                  : "pillar-lightbox-image"
              }
              src={expandedVisual.src}
              alt={expandedVisual.alt}
              fill
              sizes="92vw"
              priority
            />
            {expandedVisual.darkSrc ? (
              <Image
                className="pillar-lightbox-image theme-dark-only"
                src={expandedVisual.darkSrc}
                alt={expandedVisual.alt}
                fill
                sizes="92vw"
                priority
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
