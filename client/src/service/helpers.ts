export const queryParamsBuilder = (
  endpoint: string,
  params?: Record<string, unknown>,
): string => {
  if (!params) return endpoint;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v)));
    } else {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

export const getEndpointWithProtocol = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!baseUrl) return "";

  const isLocalServer =
    baseUrl.startsWith("localhost") ||
    baseUrl.startsWith("127.0.0.1") ||
    baseUrl.startsWith("0.0.0.0");

  return `${isLocalServer ? "http" : "https"}://${baseUrl}`;
};
