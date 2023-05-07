package com.yakootah.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yakootah.domain.Task;
import com.yakootah.domain.Week;
import com.yakootah.hibernate.WeekRepo;
@Service
@Transactional
public class WeekServiceImpl implements WeekService {

	@Autowired
	private WeekRepo repo;
	
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
	@Override
	public Week createAndLink(Week week) {
		for (Task task: week.getTasks())
		{
			task.setWeek(week);
		}
		return create(week);
	}

	@Override
	public Optional<Week> findWeek(long id) {
		return repo.findById(id);
	}

	@Override
	public Week createNewWeek(Week week) {
		Week newWeek = new Week();
		if (week.getWeek() != null && week.getWeek().trim().length() > 0)
		{
			newWeek.setWeek(week.getWeek());	
		}
		
		if (week.getTasks().size() > 0)
		{
			newWeek.setTasks(week.getTasks());
			for (Task task: newWeek.getTasks())
			{
				task.setWeek(newWeek);
			}
		}
		
		return create(newWeek);
	}

	@Override
	public Week update(Week week) {
		
		Optional<Week> optional = findWeek(week.getId());
		
		if(optional.isPresent())
		{
            optional.get().setWeek(week.getWeek());
            updateList(optional.get().getTasks(),week);
            return repo.save(optional.get());
		}
		return optional.orElse(new Week());
	}
    private void updateList(List<Task> dbRecords, Week week)
    {
    	for (Task taskDB : dbRecords)
    	{
			boolean foundIt = false;
    		for (Task task : week.getTasks())
    		{
    			if (taskDB.getMyKey().equals(task.getMyKey()))
    			{
    				taskDB.setComment(task.getComment());
    				taskDB.setHour(task.getHour());
    				taskDB.setMin(task.getMin());
    				taskDB.setName(task.getName());
    				taskDB.setIncluded(task.isIncluded());
    				foundIt = true;
    				task.setState(true);
    				break;
    			}
    		}
    		if (!foundIt)
			{
				taskDB.setDeleted(true);
			}
    	}
    	for (Task task : week.getTasks())
    	{
    		if (!task.isState())
    		{
    			task.setWeek(week);
    			dbRecords.add(task);
    		}
    	}
    	
    }
	@Override
	public Week getWeek(String weekRange) 
	{
	    List<Week> weeks= repo.findByWeek(weekRange);
	    if (weeks !=null && weeks.size() >0)
	    {
	    	return weeks.get(0);
	    }
	    return new Week();
	}
    
   

}
