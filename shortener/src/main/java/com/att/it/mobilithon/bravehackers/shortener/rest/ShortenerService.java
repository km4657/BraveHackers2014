package com.att.it.mobilithon.bravehackers.shortener.rest;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.apache.log4j.Logger;

import com.att.it.mobilithon.bravehackers.shortener.persist.UrlList;

@Path("/shorten")
public class ShortenerService {

	static Logger logger = Logger.getLogger(ShortenerService.class);
	private static final String PERSISTENCE_UNIT_NAME = "BraveHackersPU";
	private EntityManagerFactory factory;

	@GET
	@Produces("application/json")
	@Path("/getShortUrl")
	public UrlListJson getShortUrl(@QueryParam("longurl") String longurl,
			@QueryParam("vanityurl") String vanityurl,
			@QueryParam("email") String email,
			@QueryParam("category") String category,
			@QueryParam("expiredurl") String expiredurl,
			@QueryParam("urlname") String urlname,
			@QueryParam("expiredate") String expiredate) {
		
		factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		EntityManager objEntityManager = factory.createEntityManager();
		objEntityManager.getTransaction().begin();
		Query q;
		String shorturl;
		
		// first check to see if already there
		if (email != null && email.trim().length() > 0) {
			q = objEntityManager
					.createQuery("SELECT e FROM UrlList e WHERE e.longurl = :longurl and e.email = :email");
			q.setParameter("longurl", longurl);
			q.setParameter("email", email);
		} else {
			q = objEntityManager
					.createQuery("SELECT e FROM UrlList e WHERE e.longurl = :longurl");
			q.setParameter("longurl", longurl);
		}

		int size = q.getResultList().size();

		if (size > 1)
		{
			logger.error("PROBLEM, more than one row returned for getShortUrl");
			return new UrlListJson();
		}
		else if (size == 1) {
			// already there, get short url from DB
			UrlList returnedUrlList = (UrlList) q.getResultList().get(0);
			shorturl = returnedUrlList.getShorturl();
			logger.info("Already in DB, shorturl: " + shorturl);
		} else {
			UrlList newUrlList = new UrlList();

			newUrlList.setCategory(category);
			newUrlList.setEmail(email);
			newUrlList.setExpiredurl(expiredurl);
			newUrlList.setLongurl(longurl);
			newUrlList.setUrlname(urlname);
			newUrlList.setVanityurl(vanityurl);
			if (expiredate != null && expiredate.trim().length() > 0) {
				try {
					Date date = new SimpleDateFormat("MM-dd-yyyy")
							.parse(expiredate);
					newUrlList.setExpiredate(date);
				} catch (Exception e) {
					logger.error("Problem with expired date format: "
							+ expiredate);
				}
			}

			objEntityManager.persist(newUrlList);

			if (email != null && email.trim().length() > 0) {
				q = objEntityManager
						.createQuery("SELECT e FROM UrlList e WHERE e.longurl = :longurl and e.email = :email");
				q.setParameter("longurl", longurl);
				q.setParameter("email", email);
			} else {
				q = objEntityManager
						.createQuery("SELECT e FROM UrlList e WHERE e.longurl = :longurl");
				q.setParameter("longurl", longurl);
			}

			// above will ensure that list size = 1
			UrlList returnedUrlList = (UrlList) q.getResultList().get(0);

			if (vanityurl != null && vanityurl.trim().length() > 0) {
				shorturl = vanityurl;
			}
			else
			{
				shorturl = ShortURL.encode(returnedUrlList.getIdPk().intValueExact());
			}
			logger.info("shorturl: " + shorturl);
			newUrlList.setShorturl(shorturl);
			objEntityManager.merge(newUrlList);
		}
		objEntityManager.getTransaction().commit();
		objEntityManager.close();

		UrlListJson aUrlListJson = new UrlListJson();
		aUrlListJson.setCategory(category);
		aUrlListJson.setEmail(email);
		aUrlListJson.setExpiredate(expiredate);
		aUrlListJson.setExpiredurl(expiredurl);
		aUrlListJson.setLongurl(longurl);
		aUrlListJson.setShorturl(shorturl);
		aUrlListJson.setUrlname(urlname);
		aUrlListJson.setVanityurl(vanityurl);
		return aUrlListJson;
	}

}
