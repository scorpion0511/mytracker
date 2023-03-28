package com.yakootah.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity(name = "weeks")

public class Week implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "week_seq")
    @SequenceGenerator(allocationSize = 1, name = "week_seq", sequenceName = "WEEK_SEQUENCE")
	private Long id;
	
	public final static String FILED_WEEK = "week"; 
	public final static String FILED_ID = "id"; 
	
	@Column(unique = true)
	private String week;
	
    @OneToMany(mappedBy = "week", fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @Where(clause = "deleted = false")
    @JsonManagedReference
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
