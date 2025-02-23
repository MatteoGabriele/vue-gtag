export async function injectScript(
  resource: string,
  options: {
    preconnectOrigin?: string;
    defer?: boolean;
  },
): Promise<void> {
  if (typeof document === "undefined") {
    return;
  }
}
