import { createApiClient } from "./generated/openapi/api.v3.swagger.json.client";

const api = createApiClient((method, url, params) =>
	fetch(url, { method, body: JSON.stringify(params) }).then((res) =>
		res.json(),
	),
);

async function main() {
	const res = await api.get("/posts", {
		query: {
			pageSize: 10,
			pageToken: "1",
		},
	});

	console.log(res.posts);
	console.log(res.nextPageToken);
}

main();
