export default function _http() {
	const _headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};

	const get = async (route: string, query = "", headers = {}) => {
		return fetch(`${route}${query}`).then((res) => res.json());
	};

	const post = async (route: string, body: any, headers = {}) => {
		return fetch(route, { method: "post", body, headers: { ..._headers, ...headers } }).then((res) => res.json());
	};

	const put = async (route: string, body: any, headers = {}) => {
		return fetch(route, { method: "put", body, headers: { ..._headers, ...headers } }).then((res) => res.json());
	};

	const patch = async (route: string, body: any, headers = {}) => {
		return fetch(route, { method: "patch", body, headers: { ..._headers, ...headers } }).then((res) => res.json());
	};

	const remove = async (route: string, body: any, headers = {}) => {
		return fetch(route, { method: "delete", body }).then((res) => res.json());
	};

	return () => ({ get, post, put, patch, remove });
}
