const dns = require('dns-dig');

var getNSRecord = (domain) => {
	return new Promise(async (resolve, reject) => {
		if (!domain || domain == '' || domain.indexOf('.') == -1) throw new Error('INVALID_DOMAIN');
		var domainSplit = domain.split('.');
		var nsDomain = null;
		while (domainSplit.length > 1 && nsDomain == null) {
			try { nsDomain = await dns.resolveNs(domainSplit.join('.')) } catch (err) { }
			domainSplit.shift();
		}
		resolve(nsDomain);
	})
}

var ip4 = function (domain) {
	return new Promise((resolve, reject) => {
		getNSRecord(domain).then(ns => {
			if (ns == null) return dns.resolveIp4(domain)
			if (ns && Array.isArray(ns) && ns.length > 0) return dns.resolveIp4(domain, { host: ns[0] })
			throw new Error('NO_NS_RECORD');
		}).then(result => {
			resolve(result);
		}).catch(err => {
			if (err.message == 'NO_NS_RECORD') {
				return dns.resolveIp4(domain).then(result => { resolve(result) }).catch(err => reject(err))
			}
			reject(err);
		})
	})
}

var CNAME = function (domain) {
	return new Promise((resolve, reject) => {
		getNSRecord(domain).then(ns => {
			if (ns == null) return dns.resolveCname(domain)
			if (ns && Array.isArray(ns) && ns.length > 0) return dns.resolveCname(domain, { host: ns[0] })
			throw new Error('NO_NS_RECORD');
		}).then(result => {
			resolve(result);
		}).catch(err => {
			if (err.message == 'NO_NS_RECORD') {
				return dns.resolveCname(domain).then(result => { resolve(result) }).catch(err => reject(err))
			}
			reject(err);
		})
	})
}

var mx = function (domain) {
	return new Promise((resolve, reject) => {
		getNSRecord(domain).then(ns => {
			if (ns == null) return dns.resolveMx(domain)
			if (ns && Array.isArray(ns) && ns.length > 0) return dns.resolveMx(domain, { host: ns[0] })
			throw new Error('NO_NS_RECORD');
		}).then(result => {
			resolve(result);
		}).catch(err => {
			if (err.message == 'NO_NS_RECORD') {
				return dns.resolveMx(domain).then(result => { resolve(result) }).catch(err => reject(err))
			}
			reject(err);
		})
	})
}

var txt = function (domain) {
	return new Promise((resolve, reject) => {
		getNSRecord(domain).then(ns => {
			if (ns == null) return dns.resolveTxt(domain)
			if (ns && Array.isArray(ns) && ns.length > 0) return dns.resolveTxt(domain, { host: ns[0] })
			throw new Error('NO_NS_RECORD');
		}).then(result => {
			resolve(result);
		}).catch(err => {
			if (err.message == 'NO_NS_RECORD') {
				return dns.resolveTxt(domain).then(result => { resolve(result) }).catch(err => reject(err))
			}
			reject(err);
		})
	})
}

module.exports = {
	resolveIp4: ip4,
	resolveCname: CNAME,
	resolveMx: mx,
	resolveTxt: txt
}