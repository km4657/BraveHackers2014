package com.att.it.mobilithon.bravehackers.shortener.rest;

import java.util.ArrayList;
import java.util.List;

public class ClicksInfo {
	int id=0;
	String name="N/A";
	String category="N/A";
	String longUrl="N/A";
	String shortUrl="N/A";
	int totalClicks=0;
	int clicksThisWeek=0;
	
	class DomainInfo {
		String domain="N/A";
		int totalClicks=0;
	}
	
	List<DomainInfo> domains = new ArrayList<DomainInfo>();

	public void addDomainInfo(String domainIn, int totalClicksIn) {
		DomainInfo info = new DomainInfo();
		info.domain = domainIn;
		info.totalClicks = totalClicksIn;
		domains.add(info);
	}
}
