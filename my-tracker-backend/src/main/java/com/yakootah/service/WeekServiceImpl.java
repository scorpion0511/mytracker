package com.yakootah.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yakootah.domain.Task;
import com.yakootah.domain.Week;
import com.yakootah.hibernate.WeekRepoImpl;
@Service
public class WeekServiceImpl implements WeekService {

	@Autowired
	private WeekRepoImpl repo;
	
	@Override
	public Week create(Week week) {
		return repo.save(week);

	}

	@Override
	public Week create(List<Task> tasks) {
		Week week = new Week();
		week.setTasks(tasks);
		for (Task task: tasks)
		{
			task.setWeek(week);
		}
		return create(week);
	}

}
