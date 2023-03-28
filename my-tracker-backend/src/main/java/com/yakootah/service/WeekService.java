package com.yakootah.service;

import java.util.List;
import java.util.Optional;

import com.yakootah.domain.Task;
import com.yakootah.domain.Week;
public interface WeekService {
 
	public Week create(Week week);

	public Week create(List<Task> tasks);

	public Week createAndLink(Week week);


	public Optional<Week> findWeek(long id);


	public Week update(Week week);

	public Week getWeek(String weekRange);

	public Week createNewWeek(Week week);
}
