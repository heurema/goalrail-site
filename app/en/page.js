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
            An open layer over Claude Code, Codex, Pi, and the agents you write
            yourself: switch harnesses without rewriting, keep work inside
            policies and sandbox boundaries, and collaborate on the same live
            session from any device.
          </p>
          <InstallTabs />
          <CtaButtons />
        </section>

        <section className="hero-demo" aria-label="Product demo">
          <div className="wrap-wide">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-demo-img"
              src="/images/goalrail-hero.svg"
              alt="Goalrail web UI running two sub-agents in parallel on a shared session"
              width={1280}
              height={760}
              style={{ maxWidth: 860 }}
            />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2>Core workflows</h2>
            <ul className="features">
              <li>
                <strong>
                  <Link href="/en/docs/use/builtin-agents">
                    Multi-agent workflows
                  </Link>
                  :
                </strong>{" "}
                coordinate coding, review, and debate loops without locking the
                workflow to one model provider.
              </li>
              <li>
                <strong>
                  <Link href="/en/docs/policies/overview">
                    Contextual Policies
                  </Link>
                  :
                </strong>{" "}
                stateful spend caps, model routing, and risk-based escalation.
              </li>
              <li>
                <strong>
                  <Link href="/en/docs/omnibox">Secure OS Sandbox</Link>:
                </strong>{" "}
                restrict filesystem and network access. Hide credentials from
                the agent, and broker access to them. Run YOLO mode safely.
              </li>
            </ul>
          </div>
        </section>

        {/* Three pillars — wider layout than the rest of the page */}
        <section className="section section-pillars">
          <div className="wrap-wide">
            <h2>What Goalrail gives you</h2>
            <PillarsTabs />
          </div>
        </section>

        <section className="section section-no-top">
          <div className="wrap-wide">
            <hr />

            <h2>Architecture</h2>
            <p className="arch-outro">
              A runner wraps any agent in a sandboxed, uniform session. A server
              adds policies and shared history, and exposes every session over
              the terminal, the web, a native app, mobile, and a REST API.
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
              Goalrail is alpha and built in the open. Try it and give us
              feedback in Telegram.
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
