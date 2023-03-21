package com.yakootah;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.yakootah.domain.Task;
import com.yakootah.service.WeekService;

@RestController
//@RequestMapping(produces={"text/plain","application/json","text/xml"})
@RequestMapping("/api")
public class MainController
{
	@Autowired
	WeekService service;


    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Long add(@RequestBody List<Task> tasks)
	{
		return service.create(tasks).getId();
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