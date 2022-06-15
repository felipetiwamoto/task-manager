import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from './component/task/task.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss', './component/task/task.component.scss'],
})
export class AppComponent implements OnInit {
	public form: FormGroup = this.fb.group({
		id: [null, [Validators.required]],
		description: [null, [Validators.required]],
		tag: ["greyd", [Validators.required]],
		done: [null, [Validators.required]],
		createdAt: [null, [Validators.required]],
		updatedAt: [null, []],
	});

	constructor(public taskService: TaskService, public fb: FormBuilder) {}

	ngOnInit(): void {
		this.taskService.refresh();
	}

	setFormByKey(key: string, value: any) {
		this.form.patchValue({ [key]: value });
	}

	handleSubmit() {
		if (!this.form.invalid) return;

		this.taskService.store(this.form.value).subscribe(
			(res) => this.taskService.refresh(),
			(error) => {}
		);
	}
}
