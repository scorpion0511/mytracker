package com.yakootah.hibernate;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
//replaces  <tx:annotation-driven transaction-manager="transactionManager"/>
@EnableTransactionManagement
@Repository

public abstract class GenericDaoImpl<T> implements GenericDao<T> {
//	SessionFactory is an interface
	@Autowired
	SessionFactory session;
	
	private Class<T> type;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public GenericDaoImpl() {
		//need to understand
		Type t = getClass().getGenericSuperclass();
		ParameterizedType pt = (ParameterizedType) t;
		type = (Class) pt.getActualTypeArguments()[0];
	}

	@Override
	public T create(final T t) {
		getSession().persist(t);
		
		return t;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<T> loadAll() {
		List<T> list= getSession().createCriteria(type).list();
		
		return list;
		
	}
	@Override
	public void delete(final Object id) {
		getSession().delete(id);
		
	}
	@Override
	public void deleteAll() {
		String hql = "delete FROM "+ type.getSimpleName();
		org.hibernate.Query query = getSession().createQuery(hql);
		query.executeUpdate();
	}
	 @SuppressWarnings({ "unchecked", "rawtypes", "deprecation" })
	@Override
	 public T findById(long id) {
		 String hql = "FROM "+ type.getSimpleName() +" WHERE id =:id ";
			org.hibernate.Query query = getSession().createQuery(hql);
			query.setParameter("id", id);
			List list = query.list();
			if (list != null && list.size() > 0) {
				T t = (T) list.get(0);
				
				return t;
			}
			
			return null;
	 }
	@Override
	public T update(final T t) {
		getSession().saveOrUpdate(t);
		
		return t;
	}
	@SuppressWarnings("unchecked")
	@Override
	public T reAttachEntity(final T t){
		T t1 = (T) getSession().merge(t);
		
		return t1;
	}
	@Override
	public long countAll() {
		Criteria criteria = getSession().createCriteria(type);
		criteria.setProjection(Projections.rowCount());
		Long l = (Long) criteria.uniqueResult();
		
		return l;
	}
	public Session getSession(){
		return session.getCurrentSession();
	}
	public void closeSession(){
		session.close();
	}
}