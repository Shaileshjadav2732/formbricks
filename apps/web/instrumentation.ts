export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NEXT_PUBLIC_OPENTELEMETRY_LISTENER_URL) {
    const { startInstrumentationForNode } = await import("./instrumentation.node");

    startInstrumentationForNode(process.env.NEXT_PUBLIC_OPENTELEMETRY_LISTENER_URL);
  }
}
