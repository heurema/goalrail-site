import ApiReference from "@/components/ApiReference";

export const metadata = {
  title: "API Reference",
  description:
    "Справочник REST API сервера Goalrail: сессии, агенты, hosts, runners, политики, комментарии и ресурсы сессий.",
};

export default function ReferencePage() {
  return <ApiReference />;
}
