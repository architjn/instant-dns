const dns = require('dns-dig');

var getNSRecord = (domain) => {

}

var ip4 = function (domain) {
	return new Promise((resolve, reject) => {
		getNSRecord().then(ns => {
			if (ns && Array.isArray(ns) && ns.length > 0) return dns.resolveIp4(domain, { host: ns[0] })
			throw new Error('NO_NS_RECORD');
		}).then(result => {
			resolve(result);
		}).catch(err => {
			if (err.message == 'NO_NS_RECORD') {
				dns.resolveIp4(domain).then(result => { resolve(result) })
			}
			reject(err);
		})
	})
}

var CNAME = function (domain) {
	
}

var mx = function (domain) {
	
}

var ns = function (domain) {
	
}

var txt = function (domain) {
	
}

module.exports = {
	resolveIp4: ip4,
	resolveCname: CNAME,
	resolveMx: mx,
	resolveNs: ns,
	resolveTxt: txt
}