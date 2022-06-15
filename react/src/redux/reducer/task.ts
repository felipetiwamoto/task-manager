const INITIAL_STATE: any = [];

const task = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case "SET_TASK":
			return action.payload;
		default:
			return state;
	}
};

export default task;
