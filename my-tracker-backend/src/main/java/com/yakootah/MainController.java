package com.yakootah;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.yakootah.domain.Task;
import com.yakootah.domain.Week;
import com.yakootah.service.WeekService;

@RestController
@RequestMapping(value = "/api", produces={"text/plain","application/json"})
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MainController
{
	@Autowired
	WeekService service;


    @RequestMapping(value = "/addTasks", method = RequestMethod.POST)
    
    public Long addTasks(@RequestBody List<Task> tasks)
	{
		return service.create(tasks).getId();
	}
    @RequestMapping(value = "/addWeek", method = RequestMethod.POST)
    public Long addWeek(@RequestBody Week week)
	{
		return service.createAndLink(week).getId();
	}
	@RequestMapping(value="/update")
	public Long update(Map<String, Object> model)
	{
		return null;
		

	}
	@RequestMapping(value="/get")
	public Long get(Map<String, Object> model)
	{
		return null;
		

	}
}