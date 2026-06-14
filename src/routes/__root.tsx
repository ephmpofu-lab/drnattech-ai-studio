import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import i18n, { localeFromPathname } from "../lib/i18n";

/* ── Ensure i18n is initialized before any render ── */
void i18n;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route =
  createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "Dr.Nat.Tech — AI Solutions Architect",
        },
        {
          name: "description",
          content:
            "Enterprise AI systems that work in production. Intelligent automation built by Dr. Ephraim Mpofu.",
        },
        {
          property: "og:title",
          content: "Dr.Nat.Tech — AI Solutions Architect",
        },
        {
          property: "og:description",
          content: "Enterprise AI systems that work in production.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],

      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Great+Vibes&family=Dancing+Script:wght@600;700&family=Allura&display=swap",
        },
        /* hreflang — root-level fallback; individual routes add page-specific ones */
        {
          rel: "alternate",
          hrefLang: "en",
          href: "https://drnattech.com",
        },
        {
          rel: "alternate",
          hrefLang: "de",
          href: "https://drnattech.com/de",
        },
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: "https://drnattech.com",
        },
      ],
    }),

    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  });

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://drnattech.com/#person",
                  name: "Dr. Ephraim Mpofu",
                  jobTitle: "AI Solutions Architect",
                  description:
                    "AI Solutions Architect specialising in enterprise AI architecture, intelligent automation, AI agents, RAG systems and knowledge platforms.",
                  url: "https://drnattech.com",
                  image: "https://drnattech.com/profile.jpg",
                  worksFor: {
                    "@id": "https://drnattech.com/#organization",
                  },
                  knowsAbout: [
                    "Artificial Intelligence",
                    "AI Architecture",
                    "Enterprise AI",
                    "AI Agents",
                    "RAG Systems",
                    "Knowledge Management",
                    "Workflow Automation",
                    "n8n",
                    "Machine Learning",
                    "AI Governance",
                  ],
                },
                {
                  "@type": "Organization",
                  "@id": "https://drnattech.com/#organization",
                  name: "DRNATTECH",
                  url: "https://drnattech.com",
                  founder: {
                    "@id": "https://drnattech.com/#person",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://drnattech.com/#website",
                  url: "https://drnattech.com",
                  name: "DRNATTECH",
                  publisher: {
                    "@id": "https://drnattech.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();

  /* Sync i18n language to the current URL locale on every navigation */
  const locale = localeFromPathname(pathname);
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    /* Update <html lang> for accessibility + crawler clarity */
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
