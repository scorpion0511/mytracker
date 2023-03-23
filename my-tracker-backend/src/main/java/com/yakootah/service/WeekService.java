package com.yakootah.service;

import java.util.List;

import com.yakootah.domain.Task;
import com.yakootah.domain.Week;
public interface WeekService {
 
	public Week create(Week week);

	public Week create(List<Task> tasks);

	public Week createAndLink(Week week);
}
