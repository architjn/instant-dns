import * as dns from "dns-dig";

export type MXResponse = {
  exchange: string;
  priority: number;
};

var getNSRecord = async (domain): Promise<string[]> => {
  if (!domain || domain == "" || domain.indexOf(".") == -1) throw new Error("INVALID_DOMAIN");
  var domainSplit = domain.split(".");
  var nsDomain: string[] = null;
  while (domainSplit.length > 1 && nsDomain == null) {
    try {
      nsDomain = await dns.resolveNs(domainSplit.join("."));
    } catch (err) {}
    domainSplit.shift();
  }
  return nsDomain;
};

export const resolveIp4 = async (domain): Promise<string[]> => {
  const ns = await getNSRecord(domain);
  if (ns && Array.isArray(ns) && ns.length > 0) return dns.resolveIp4(domain, { host: ns[0] });
  return dns.resolveIp4(domain);
};

export const resolveCname = async (domain): Promise<string[]> => {
  const ns = await getNSRecord(domain);
  if (ns && Array.isArray(ns) && ns.length > 0) return dns.resolveCname(domain, { host: ns[0] });
  return dns.resolveCname(domain);
};

export const resolveMx = async (domain): Promise<MXResponse[]> => {
  const ns = await getNSRecord(domain);
  if (ns && Array.isArray(ns) && ns.length > 0) return dns.resolveMx(domain, { host: ns[0] });
  return dns.resolveMx(domain);
};

export const resolveTxt = async (domain): Promise<string[]> => {
  const ns = await getNSRecord(domain);
  if (ns && Array.isArray(ns) && ns.length > 0) return dns.resolveTxt(domain, { host: ns[0] });
  return dns.resolveTxt(domain);
};
