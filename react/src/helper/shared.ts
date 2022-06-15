export default function shared() {
	const uid = () =>
		Array(3)
			.fill(0)
			.map((_) => Math.random().toString(36).substr(2))
			.join("");

	return { uid };
}
