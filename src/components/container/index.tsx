import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-20 fadeIn">{children}</div>
  );
}
// component container usado par aexbiir de uma forma padrão o layout de um projeto