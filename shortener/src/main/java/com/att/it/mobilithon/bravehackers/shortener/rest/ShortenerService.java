package com.att.it.mobilithon.bravehackers.shortener.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@Path("/shorten")
public class ShortenerService {

	 	
	@GET
	@Produces("application/json")
	@Path("/getUrlClicks")
	public UrlListJson getShortUrl(@QueryParam("longurl" ) String long_url, @QueryParam("vanityurl") String vanityurl,
	@QueryParam("email") String email, @QueryParam("category") String category )
	{
		UrlListJson aUrlListJson = new UrlListJson();
		//use params to insert into db then generate short url
		aUrlListJson.setCategory("test category");
		return aUrlListJson;
	}

}
