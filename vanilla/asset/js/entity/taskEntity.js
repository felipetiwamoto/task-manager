function _taskEntity() {
	const api = `http://localhost:3000`;
	const http = _http();

	const all = async () => {
		const tasks = await http().get(`${api}/tasks`);
		const undos = (tasks || []).filter((task) => !task.done).sort((a, b) => a.tag.length - b.tag.length);
		const dones = (tasks || []).filter((task) => task.done).sort((a, b) => a.tag.length - b.tag.length);

		const sortedTasks = [...undos, ...dones];
		return sortedTasks;
	};

	const store = async (data) => {
		const id = shared().uid();
		body = JSON.stringify({ ...data, done: false, id, createdAt: +new Date() });
		const task = await http().post(`${api}/tasks`, body);
		return task;
	};

	const show = async (id) => {
		const task = await http().get(`${api}/tasks/${id}`);
		return task;
	};

	const update = async (data, id) => {
		const currentData = await show(id);
		body = JSON.stringify({ ...currentData, ...data, updatedAt: +new Date() });
		const task = await http().put(`${api}/tasks/${id}`, body);
		return task;
	};

	const undo = async (id) => {
		const currentData = await show(id);
		body = JSON.stringify({ ...currentData, updatedAt: +new Date(), done: false });
		const task = await http().put(`${api}/tasks/${id}`, body);
		return task;
	};

	const done = async (id) => {
		const currentData = await show(id);
		body = JSON.stringify({ ...currentData, updatedAt: +new Date(), done: true });
		const task = await http().put(`${api}/tasks/${id}`, body);
		return task;
	};

	const remove = async (id) => {
		const currentData = await show(id);
		body = JSON.stringify({ ...currentData, updatedAt: +new Date(), done: false });
		const task = await http().remove(`${api}/tasks/${id}`);
		return task;
	};

	return () => ({ all, store, show, update, remove, undo, done, remove });
}
