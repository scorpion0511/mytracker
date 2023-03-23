package com.yakootah.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;


@Entity(name = "tasks")
public class Task 
{
	@Id
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_seq")
    @SequenceGenerator(allocationSize = 1, name = "task_seq", sequenceName = "TASK_SEQUENCE")
	private Long id;
	@Column(length = 100 , nullable = false)
	private String name;
	@Column(nullable = false)
	private int hour;
	@Column(nullable = false)
	private int min;
	@Column(name= "description",length = 100)
	private String comment;
	@Column(name= "key", nullable = false)
	private Long myKey;
	
	@ManyToOne
	@JoinColumn(name = "week_id", nullable = false)
	private Week week;

	public Week getWeek() {
		return week;
	}

	public void setWeek(Week week) {
		this.week = week;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getHour() {
		return hour;
	}

	public void setHour(int hour) {
		this.hour = hour;
	}

	public int getMin() {
		return min;
	}

	public void setMin(int min) {
		this.min = min;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Long getMyKey() {
		return myKey;
	}

	public void setMyKey(Long key) {
		this.myKey = key;
	}

}
