import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InstallTabs from "@/components/InstallTabs";
import CtaButtons from "@/components/CtaButtons";
import PillarsTabs from "@/components/PillarsTabs";
import { TelegramIcon } from "@/components/icons";
import { TELEGRAM_URL } from "@/components/links";

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        {/* Hero */}
        <section className="hero wrap">
          <h1 className="hero-title">Goalrail</h1>
          <p className="lede">
            Открытый слой над Claude Code, Codex, Pi и вашими собственными
            агентами: меняйте harness без переписывания сценариев, держите
            работу под политиками и sandbox-ограничениями и ведите одну живую
            сессию с любого устройства.
          </p>
          <InstallTabs />
          <CtaButtons />
        </section>

        <section className="hero-demo" aria-label="Демо продукта">
          <div className="wrap-wide">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-demo-img"
              src="/images/goalrail-hero.svg"
              alt="Goalrail web UI with parallel agents working inside one shared session"
              width={1280}
              height={760}
              style={{ maxWidth: 860 }}
            />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2>Ключевые сценарии</h2>
            <ul className="features">
              <li>
                <strong>
                  <Link href="/ru/docs/use/builtin-agents">
                    Многоагентные workflows
                  </Link>
                  :
                </strong>{" "}
                координируйте coding, review и debate без жесткой привязки к
                одному провайдеру моделей.
              </li>
              <li>
                <strong>
                  <Link href="/ru/docs/policies/overview">
                    Контекстные политики
                  </Link>
                  :
                </strong>{" "}
                лимиты расходов, маршрутизация моделей и эскалация рискованных
                действий на уровне состояния, а не только промпта.
              </li>
              <li>
                <strong>
                  <Link href="/ru/docs/omnibox">Secure OS Sandbox</Link>:
                </strong>{" "}
                ограничивайте доступ к файлам, сети и переменным окружения,
                прячьте секреты от агента и выдавайте доступ через
                контролируемый слой.
              </li>
            </ul>
          </div>
        </section>

        {/* Three pillars — wider layout than the rest of the page */}
        <section className="section section-pillars">
          <div className="wrap-wide">
            <h2>Что дает Goalrail</h2>
            <PillarsTabs />
          </div>
        </section>

        <section className="section section-no-top">
          <div className="wrap-wide">
            <hr />

            <h2>Архитектура</h2>
            <p className="arch-outro">
              Runner оборачивает любого агента в единый sandboxed-сеанс. Server
              добавляет политики и общую историю, а затем открывает сессию через
              терминал, веб, native app, mobile и REST API.
            </p>
            <figure className="section-graphic">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/architecture.svg"
                alt="Goalrail architecture: CLI agents and custom agents run through a runner (on your machine, Modal, or Daytona), then a server that adds policies and history, reachable from a terminal, the web, native and mobile apps, and a REST API."
                width={1541}
                height={700}
              />
            </figure>
          </div>
        </section>

        <div className="wrap">
          <hr />

          {/* Build with us */}
          <section className="section center">
            <p
              className="muted"
              style={{ maxWidth: "38rem", margin: "0 auto 1.8rem" }}
            >
              Goalrail сейчас в alpha и развивается открыто. Попробуйте и
              отправьте обратную связь в Telegram.
            </p>
            <div className="hero-cta">
              <a
                href={TELEGRAM_URL}
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                <TelegramIcon /> @goalrail
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
