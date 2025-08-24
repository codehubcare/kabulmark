// Auto-prefix Tailwind utility classes with the configured prefix (km-)
// Usage: className={km("p-2 bg-gray-50 hover:bg-gray-200")}
// Notes:
// - Leaves custom component classes (editor-*, toolbar-*, language-*) untouched
// - Handles variants like hover:, focus:, lg:, rtl:, etc.
// - Skips tokens already prefixed with km-

const SHOULD_SKIP_PREFIX = /^(editor-|toolbar-|language-|km-)/;

function prefixToken(token: string): string {
  if (!token) return token;
  if (SHOULD_SKIP_PREFIX.test(token)) return token;

  // Split by colon to separate variants from the base utility
  const parts = token.split(":");
  const base = parts.pop() as string; // token has at least one part

  if (!base || base.startsWith("km-")) {
    return token;
  }

  const prefixedBase = `km-${base}`;
  return parts.length ? `${parts.join(":")}:${prefixedBase}` : prefixedBase;
}

export function km(
  classes: string | Array<string | false | null | undefined>
): string {
  const input = Array.isArray(classes)
    ? classes.filter(Boolean).join(" ")
    : classes;
  return input.split(/\s+/).filter(Boolean).map(prefixToken).join(" ");
}

export default km;
