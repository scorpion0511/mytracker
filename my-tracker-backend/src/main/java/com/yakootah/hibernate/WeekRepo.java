package com.yakootah.hibernate;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.yakootah.domain.Week;

public interface WeekRepo extends CrudRepository<Week, Long>
{
    //private final EntityManager entityManager;
    
    public List<Week> findByWeek(String name);
    
//	public Week findByName(String weekRange) {
//		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
//        CriteriaQuery<Week> query = cb.createQuery(Week.class);
//        Root<Week> root = query.from(Week.class);
//        query.select(root).where(cb.equal(root.get(Week.FILED_WEEK), weekRange));
//        query.orderBy(cb.desc(root.get(Week.FILED_ID)));
//        TypedQuery<Week> typedQuery = entityManager.createQuery(query);
//        List<Week> weeks =  typedQuery.getResultList();
//        if (weeks != null && weeks.size() > 0)
//        {
//        	return weeks.get(0);
//        }
//        return new Week();
//		
//	}

}
