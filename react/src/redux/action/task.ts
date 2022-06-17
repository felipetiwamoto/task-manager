import { ITask } from "../../component/Task/Task.interface";

export default function taskAction() {
	return {
		set: (payload: ITask[]) => ({ type: "SET_TASK", payload })
	};
}
