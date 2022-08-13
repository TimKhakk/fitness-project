import type { MetaFunction, LinksFunction } from '@remix-run/node';
import styles from './styles/app.css';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

const LATO_FONT_URL = 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: LATO_FONT_URL },
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col gap-5 container px-4 lg:mx-auto font-body pt-8 bg-light min-h-screen">
        <section className="flex items-start gap-5">
          <Link className='font-bold underline text-blue-600' to="/">Home</Link>
          <Link className='font-bold underline text-blue-600' to="workouts">Workouts</Link>
        </section>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
