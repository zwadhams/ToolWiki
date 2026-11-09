/** Keep the complete MCP response bounded, including its compatibility text copy. */
export function boundedToolResult(value) {
  const result = { content: [{ type: 'text', text: JSON.stringify(value) }], structuredContent: value };
  if (Buffer.byteLength(JSON.stringify(result)) > 120000) throw new Error('MCP response exceeds 120000 bytes. Narrow the request or reduce limit/maxChars.');
  return result;
}
