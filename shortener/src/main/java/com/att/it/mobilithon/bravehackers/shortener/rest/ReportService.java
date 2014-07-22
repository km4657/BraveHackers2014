package com.att.it.mobilithon.bravehackers.shortener.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;


@Path("/report")
public class ReportService {
	@GET
	@Produces("application/json")
	@Path("/getUrlClicks")
	public GetUrlClicksResponse getUrlClicks(@QueryParam("long_url" ) String long_url, @QueryParam("short_url") String short_url,
			@QueryParam("user") String user)
	{
		return new GetUrlClicksResponse();
	}
	
}
