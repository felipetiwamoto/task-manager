import { useEffect, useState } from "react";
import { Task as ITask } from "./Task.interface";
import "./Task.scss";

const Task = (props: { task: ITask, tags: string[], getTasks: Function}) => {
	const [afterInit, setAfterinit] = useState(false);
	const [description, setDescription] = useState(props.task.description || "");
	const [tag, setTag] = useState(props.task.tag || "greyd");

	useEffect(() => {
		if (!afterInit) return setAfterinit(true);

		update({ ...props.task, tag });
	}, [tag]);

	const handleChange = (e: any) => {
		setDescription(e.target.value);
	};

	const update = async (data: ITask) => {
		await fetch(`http://localhost:3000/tasks/${props.task.id}`, {
			method: "put",
			body: JSON.stringify({ ...data, updatedAt: +new Date() }),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		props.getTasks();
	};

	const handleBlur = async (e: any) => {
		update({ ...props.task, description, tag });
	};

	const undo = async () => {
		update({ ...props.task, done: false });
	};

	const done = async () => {
		update({ ...props.task, done: true });
	};

	const remove = async () => {
		await fetch(`http://localhost:3000/tasks/${props.task.id}`, {
			method: "delete",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		props.getTasks();
	};

	return (
		<div className={`task ${props.task.done ? `done` : ``} ${tag}`}>
			<div className="task__left">
				<span className="task__tag__selected"></span>
				<ul className="task__tag">
					{props.tags &&
						props.tags.map((tag: string) => (
							<li key={tag} className={`task__tag__item ${tag}`} onClick={() => setTag(tag)}></li>
						))}
				</ul>
			</div>
			<div className="task__right">
				<input
					type="text"
					className="task__input"
					placeholder="Ex: Study..."
					value={description}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<ul className="task__action">
					<li className="task__action__item bg_green undo" onClick={undo}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M17 2H19.67C20.236 1.98999 20.7859 2.18814 21.2154 2.55682C21.6449 2.9255 21.9241 3.43906 22 4V11C21.9241 11.5609 21.6449 12.0745 21.2154 12.4432C20.7859 12.8119 20.236 13.01 19.67 13H17M10 15V19C10 19.7957 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72C5.23767 1.99455 4.76962 2.1636 4.40209 2.476C4.03457 2.7884 3.79232 3.2231 3.72 3.7L2.34 12.7C2.29649 12.9866 2.31583 13.2793 2.39666 13.5578C2.47749 13.8362 2.6179 14.0937 2.80814 14.3125C2.99839 14.5313 3.23392 14.7061 3.49843 14.8248C3.76294 14.9435 4.05009 15.0033 4.34 15H10Z"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</li>
					<li className="task__action__item bg_blue done" onClick={done}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</li>
					<li className="task__action__item bg_red remove" onClick={remove}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M3 6H5H21"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M10 11V17"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M14 11V17"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Task;
