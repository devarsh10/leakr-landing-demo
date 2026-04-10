import { useState, useEffect, createContext, useContext, Children, isValidElement, ReactNode } from "react";

interface RouterCtx {
  path: string;
  navigate: (to: string) => void;
}

const Ctx = createContext<RouterCtx>({ path: "/", navigate: () => {} });

export function Router({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  return <Ctx.Provider value={{ path, navigate }}>{children}</Ctx.Provider>;
}

export function Link({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  const { navigate } = useContext(Ctx);
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (!to.startsWith("/")) return;
        e.preventDefault();
        const [path, hash] = to.split("#");
        navigate(path || "/");
        if (hash) {
          setTimeout(() => {
            document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      }}
    >
      {children}
    </a>
  );
}

export function Routes({ children }: { children: ReactNode }) {
  const { path: current } = useContext(Ctx);
  let matched: ReactNode = null;
  let fallback: ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const { path, element } = child.props as { path: string; element: ReactNode };
    if (path === "*") fallback = element;
    else if (current === path && !matched) matched = element;
  });

  return <>{matched ?? fallback}</>;
}

export function Route(_: { path: string; element: ReactNode }) {
  return null;
}

export function useLocation() {
  const { path } = useContext(Ctx);
  return { pathname: path };
}
