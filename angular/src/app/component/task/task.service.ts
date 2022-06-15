import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { SharedService } from 'src/app/service/shared.service';
import { Task } from './task.interface';

@Injectable({
	providedIn: 'root',
})
export class TaskService {
	public tasks = new BehaviorSubject<Task[]>([]);
	public tags = [
		'red',
		'green',
		'blue',
		'yellow',
		'orange',
		'grey0',
		'grey1',
		'grey2',
		'grey3',
		'grey4',
		'grey5',
		'grey6',
		'grey7',
		'grey8',
		'grey9',
		'greya',
		'greyb',
		'greyc',
		'greyd',
		'greye',
		'greyf',
	];

	constructor(
		private sharedService: SharedService,
		private httpService: HttpService
	) {}

	setTasks(tasks: Task[]) {
		this.tasks.next(tasks);
	}

	getTasks() {
		return this.tasks.asObservable();
	}

	refresh() {
		this.all().subscribe(
			(res) => {
				const undos = (res || [])
					.filter((task) => !task.done)
					.sort((a, b) => a.tag.length - b.tag.length);
				const dones = (res || [])
					.filter((task) => task.done)
					.sort((a, b) => a.tag.length - b.tag.length);

				const sortedTasks = [...undos, ...dones];
				this.setTasks(sortedTasks);
			},
			(error) => {}
		);
	}

	all(): Observable<Task[]> {
		return this.httpService.get<Task[]>(`tasks`);
	}

	store(data: Task): Observable<Task> {
		const id = this.sharedService.uid();
		return this.httpService.post<Task>(`tasks`, {
			...data,
			id,
			createdAt: +new Date(),
			done: false,
		});
	}

	show(id: string): Observable<Task> {
		return this.httpService.get<Task>(`tasks/${id}`);
	}

	update(data: Task, id: string): Observable<Task> {
		return this.httpService.put<Task>(`tasks/${id}`, {
			...data,
			updatedAt: +new Date(),
		});
	}

	remove(id: string) {
		return this.httpService.delete<any>(`tasks/${id}`);
	}
}
