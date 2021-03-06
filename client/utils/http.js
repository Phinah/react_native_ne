import * as SecureStore from "expo-secure-store";

import axios from "axios";

const ip_address = "192.168.0.102";

export async function get(url, options) {
	let res = await axios.get(`http://${ip_address}:8080/${url}`, options);
	return res;
}

export async function post(url, data) {
	let token = await SecureStore.getItemAsync("token");

	let res = await axios.post(`http://${ip_address}:8080/${url}`, data, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	return res;
}
