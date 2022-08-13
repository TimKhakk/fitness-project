export default function Index() {
  return (
    <div className="container px-4 lg:mx-auto font-body pt-8">
      <h1 className="text-sm font-bold">Good Morning 🔥</h1>
      <h2 className="text-sm font-extrabold">Pramuditya Uzumaki</h2>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>

      </ul>
    </div>
  );
}
