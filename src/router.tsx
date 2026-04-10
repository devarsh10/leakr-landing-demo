import { useState, useEffect, createContext, useContext, ReactNode } from "react";

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
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Route({
  path,
  element,
}: {
  path: string;
  element: ReactNode;
}) {
  const { path: current } = useContext(Ctx);
  const match = path === "*" ? true : current === path;
  return match ? <>{element}</> : null;
}

export function useLocation() {
  const { path } = useContext(Ctx);
  return { pathname: path };
}
