const taskEntity = _taskEntity();
const tags = [
	"red",
	"green",
	"blue",
	"yellow",
	"orange",
	// "black",
	// "white",
	"grey0",
	"grey1",
	"grey2",
	"grey3",
	"grey4",
	"grey5",
	"grey6",
	"grey7",
	"grey8",
	"grey9",
	"greya",
	"greyb",
	"greyc",
	"greyd",
	"greye",
	"greyf",
];

const handleTaskNewFormSubmit = async (e) => {
	e.preventDefault();

	const data = {
		description: document.querySelector("#new_task_description_input").value || "",
		tag: document.querySelector("#new_task_tag_input").value || "greyd",
	};

	await taskEntity().store(data);
	document.querySelector("#new_task_description_input").value = "";
	document.querySelector("#new_task_description_input").focus = true;
	renderTasks();
};

const renderTasks = async () => {
	const tasks = await taskEntity().all();
	let html = ``;

	for (let item of tasks) {
		html += `
		<div class="task ${item.done ? `done` : ``} ${item.tag}" data-taskID="${item.id}">
			<div class="task__left">
				<span class="task__tag__selected">
					<input type="hidden" id="edit_task_tag_id_input_${item.id}" value="${item.tag}">
				</span>
				<ul class="task__tag">
					${tags.map((_tag) => `<li class="task__tag__item ${_tag}" data-tag="${_tag}"></li>`).join("")}
				</ul>
			</div>
			<div class="task__right">
				<input 
					type="text" 
					class="task__input" 
					placeholder="Ex: Study..." 
					id="edit_task_description_input_${item.id}" 
					value="${item.description}" 
				/>
				<ul class="task__action">
					<li class="task__action__item bg_green undo">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M17 2H19.67C20.236 1.98999 20.7859 2.18814 21.2154 2.55682C21.6449 2.9255 21.9241 3.43906 22 4V11C21.9241 11.5609 21.6449 12.0745 21.2154 12.4432C20.7859 12.8119 20.236 13.01 19.67 13H17M10 15V19C10 19.7957 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72C5.23767 1.99455 4.76962 2.1636 4.40209 2.476C4.03457 2.7884 3.79232 3.2231 3.72 3.7L2.34 12.7C2.29649 12.9866 2.31583 13.2793 2.39666 13.5578C2.47749 13.8362 2.6179 14.0937 2.80814 14.3125C2.99839 14.5313 3.23392 14.7061 3.49843 14.8248C3.76294 14.9435 4.05009 15.0033 4.34 15H10Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>					
					</li>
					<li class="task__action__item bg_blue done">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>					
					</li>
					<li class="task__action__item bg_red remove">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3 6H5H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M10 11V17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M14 11V17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>					
					</li>
				</ul>
			</div>
		</div>
		`;
	}

	const contentTasks = document.querySelector(".content__task");
	contentTasks.innerHTML = html;
	editTaskDescriptionInputsEvents();
	editTaskTagInputsEvents();
	actionsEvents();
};

const renderTaskNewFormTags = () => {
	let html = ``;
	for (let item of tags) html += `<li class="task__tag__item ${item}" data-tag="${item}"></li>`;

	const newTaskTagsContent = document.querySelector(".content__new .task .task__tag");
	newTaskTagsContent.innerHTML = html;
	newTaskTagInputEvent();
};

const newTaskTagInputEvent = () => {
	const newTaskTagsEvents = document.querySelectorAll(`.content__new .task__tag__item`);
	if (newTaskTagsEvents)
		for (let item of newTaskTagsEvents)
			item.addEventListener("click", (e) => {
				const tag = e.target.getAttribute("data-tag");
				document.querySelector("#new_task_tag_input").value = tag || "greyd";
				document.querySelector(".content__new .task").classList.value = `task ${tag}`;
			});
};

const editTaskDescriptionInputsEvents = () => {
	const editTaskDescriptionInputs = document.querySelectorAll(`[id*="edit_task_description_input_"]`);
	if (editTaskDescriptionInputs)
		for (let item of editTaskDescriptionInputs)
			item.addEventListener("blur", (e) => {
				const id = e.target.closest(`[data-taskID]`).getAttribute(`data-taskID`);
				const description = e.target.value;

				taskEntity().update({ description }, id);
			});
};

const editTaskTagInputsEvents = () => {
	const editTaskTagInputs = document.querySelectorAll(`.content__task .task__tag`);
	if (editTaskTagInputs)
		for (let item of editTaskTagInputs)
			item.addEventListener("click", async (e) => {
				const id = e.target.closest(`[data-taskID]`).getAttribute(`data-taskID`);
				const tag = e.target.getAttribute("data-tag");

				await taskEntity().update({ tag }, id);
				renderTasks();
			});
};

const actionsEvents = () => {
	const actions = ["undo", "done", "remove"];

	actions.forEach((action) => {
		const elements = document.querySelectorAll(`.task__action__item.${action}`);
		elements &&
			elements.forEach((el) => {
				el.addEventListener("click", async (e) => {
					const id = e.target.closest(`[data-taskID]`).getAttribute(`data-taskID`);
					await taskEntity()[action](id);
					renderTasks();
				});
			});
	});
};

(async () => {
	renderTaskNewFormTags();
	renderTasks();

	const newTaskForm = document.querySelector(".content__new .task");

	if (newTaskForm) newTaskForm.addEventListener("submit", handleTaskNewFormSubmit);
})();
