package com.yakootah;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yakootah.domain.Week;
import com.yakootah.service.WeekService;

@RestController
@RequestMapping(value = "/api", produces={"text/plain","application/json"})
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MainController
{
	@Autowired
	WeekService service;



    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseStatus(code = HttpStatus.OK)
    public String save(@RequestBody Week week)
	{
		Week result = new Week();
		if (week.getId() != null && week.getId() > 0) {

			result = service.update(week);
		} 
		else 
		{
			result = service.createNewWeek(week);
		}

		return result.getId().toString();
	}


	@RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseStatus(code = HttpStatus.OK)
	public Week get(@RequestParam(name = "week" ) String week) {
		return service.getWeek(week);
	}
}