package com.att.it.mobilithon.bravehackers.shortener;

import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import org.junit.Before;
import org.junit.Test;

import com.att.it.mobilithon.bravehackers.shortener.persist.UrlList;



public class UrlListTest {

	private static final String PERSISTENCE_UNIT_NAME = "BraveHackersPU";
	private EntityManagerFactory factory;

	@Before
	public void setUp() throws Exception {
		factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
	}

	@Test
	public void testCreateRead() {
		EntityManager objEntityManager = factory.createEntityManager();
		// Begin a new local transaction so that we can persist a new entity

		objEntityManager.getTransaction().begin();

		double d = new java.util.Random().nextDouble();
		String longurl = "BLAHBLAHBLAH" + d;
		
		UrlList newUrlList = new UrlList();
		newUrlList.setLongurl(longurl);
		objEntityManager.persist(newUrlList);

		Query q = objEntityManager
				.createQuery("SELECT e FROM UrlList e WHERE e.longurl = :longurl");
		q.setParameter("longurl", longurl);
		UrlList returnedUrlList = (UrlList)q.getResultList().get(0);
		assertEquals(returnedUrlList.getLongurl(),longurl);

		objEntityManager.getTransaction().commit();
		objEntityManager.close();
	}

	
}
