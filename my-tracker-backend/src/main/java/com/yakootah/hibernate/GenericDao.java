package com.yakootah.hibernate;

import java.util.List;


public interface GenericDao<T> {

    T create(T t);
	 public T findById(long id);

	 public void delete(Object id);
    public   T update(T t);
	public T reAttachEntity(T t);
	public List<T> loadAll();
	public long countAll();
	void deleteAll();   

}