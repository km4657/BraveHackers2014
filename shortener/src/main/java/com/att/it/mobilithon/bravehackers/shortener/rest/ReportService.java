package com.att.it.mobilithon.bravehackers.shortener.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/rest")
public class ReportService {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getUrlClicks")
	public GetUrlClicksResponse getUrlClicks(@QueryParam("long_url" ) String long_url, @QueryParam("short_url") String short_url,
			@QueryParam("user") String user)
	{
		return new GetUrlClicksResponse();
	}
}
