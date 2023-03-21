package com.yakootah.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

@Entity(name = "weeks")
public class Week {
	@Id
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "week_seq")
    @SequenceGenerator(name = "week_seq", sequenceName = "WEEK_SEQUENCE")
	private Long id;
	
	private String week;
	
    @OneToMany(mappedBy = "week", fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
	private List<Task> tasks = new ArrayList<Task>();

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public String getWeek() {
		return week;
	}

	public void setWeek(String week) {
		this.week = week;
	}

	public Long getId() {
		return id;
	}
}
