export default function taskAction() {
	return {
		set: (payload: Array<any>) => ({ type: "SET_TASK", payload })
	};
}
