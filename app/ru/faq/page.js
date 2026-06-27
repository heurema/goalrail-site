import { pageMeta } from "@/lib/og";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = pageMeta(
  "FAQ",
  "Ответы на частые вопросы о Goalrail: что это такое, как работает и с чего начать.",
  {
    eyebrow: "Помощь",
    path: "/ru/faq",
  },
);

export default function Page() {
  return (
    <>
      <Nav />

      <main>
        <div className="wrap">
          <section className="section">
            <h1>FAQ</h1>

            <h3>Что такое Goalrail?</h3>
            <p className="muted">
              Это открытый слой для запуска AI-агентов через единый интерфейс.
              Goalrail оборачивает Claude Code, Codex, Pi и ваши YAML-агенты,
              добавляя сервер, UI, историю сессий, sandbox и политики.
            </p>

            <h3>Какие модели можно использовать?</h3>
            <p className="muted">
              Подключайте свои API keys, подписки Claude или ChatGPT, а также
              OpenAI- или Anthropic-compatible gateways: OpenRouter, LiteLLM,
              Ollama, Azure, vLLM и похожие прокси.
            </p>

            <h3>Как запустить своего агента?</h3>
            <p className="muted">
              Опишите prompt и harness в коротком YAML-файле, затем выполните{" "}
              <code>goalrail run</code>. Подробности есть в{" "}
              <Link href="/ru/docs/use/custom-agents">
                руководстве по своим агентам
              </Link>
              .
            </p>

            <h3>Безопасно ли запускать агента на моей машине?</h3>
            <p className="muted">
              Команды можно выполнять в OS sandbox: bubblewrap на Linux и
              Seatbelt на macOS. Политики могут остановить действие, запросить
              подтверждение или ограничить расходы и доступы.
            </p>

            <h3>Нужен ли отдельный cloud-провайдер?</h3>
            <p className="muted">
              Нет. Goalrail запускается локально и работает с вашими моделями и
              ключами. Общий сервер, Postgres и cloud sandbox hosts нужны только
              для командной работы или удаленного запуска.
            </p>

            <h3>Можно ли использовать в production?</h3>
            <p className="muted">
              Пока нет. Goalrail находится в alpha, поэтому ожидайте rough edges
              и отправляйте обратную связь в Telegram.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
