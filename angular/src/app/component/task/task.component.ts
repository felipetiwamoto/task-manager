import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from './task.interface';
import { TaskService } from './task.service';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
	@Input() task: Task | undefined;

	public form: FormGroup = this.fb.group({
		id: [null, [Validators.required]],
		description: [null, [Validators.required]],
		tag: [null, [Validators.required]],
		done: [null, [Validators.required]],
		createdAt: [null, [Validators.required]],
		updatedAt: [null, []],
	});

	constructor(public taskService: TaskService, public fb: FormBuilder) {}

	ngOnInit(): void {
		this.form.patchValue({ id: this.task?.id });
		this.form.patchValue({ description: this.task?.description });
		this.form.patchValue({ tag: this.task?.tag });
		this.form.patchValue({ done: this.task?.done });
		this.form.patchValue({ createdAt: this.task?.createdAt });
		this.form.patchValue({ updatedAt: this.task?.updatedAt });
	}

	setFormByKey(key: string, value: any) {
		this.form.patchValue({ [key]: value });
		this.update(this.form.value);
	}

	update(task: Task) {
		if (!task.id) return;

		this.taskService.update(task, task.id!).subscribe(
			(res) => this.taskService.refresh(),
			(error) => {}
		);
	}

	undo() {
		this.update({ ...this.form.value, done: false });
	}

	done() {
		this.update({ ...this.form.value, done: true });
	}

	remove() {
		if (this.form.invalid) return;

		this.taskService.remove(this.form.value.id).subscribe(
			(res) => this.taskService.refresh(),
			(error) => {}
		);
	}

	handleSubmit() {
		this.update(this.form.value);
	}
}
