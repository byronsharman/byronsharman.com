export default function parseExtension(
  path: string,
): { baseName: string; extension: string } | null {
  const match = path.match(/(.*)\.(\w+)$/);
  if (match === null) {
    console.error(`couldn't parse extension from image path ${path}`);
    return null;
  }
  return {
    baseName: match[1],
    extension: match[2],
  };
}
