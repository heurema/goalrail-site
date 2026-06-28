import assert from "node:assert/strict";

const cases = [
  {
    name: "github",
    route: "../app/go/github/route.js",
    requestUrl: "https://goalrail.dev/go/github",
    location: "https://github.com/heurema/goalrail",
  },
  {
    name: "telegram",
    route: "../app/go/telegram/route.js",
    requestUrl: "https://goalrail.dev/go/telegram",
    location: "https://t.me/goalrail",
  },
];

for (const testCase of cases) {
  const module = await import(testCase.route);
  assert.equal(typeof module.GET, "function", `${testCase.name} exports GET`);

  const response = module.GET(new Request(testCase.requestUrl));

  assert.equal(response.status, 302, `${testCase.name} redirects temporarily`);
  assert.equal(
    response.headers.get("location"),
    testCase.location,
    `${testCase.name} redirects to the external destination`,
  );
}
