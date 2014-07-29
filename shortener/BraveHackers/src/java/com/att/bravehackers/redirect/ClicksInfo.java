/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.att.bravehackers.redirect;

import java.util.ArrayList;
import java.util.List;

public class ClicksInfo {

    public int id = 0;
    public String name = "N/A";
    public String category = "N/A";
    public String longUrl = "N/A";
    public String shortUrl = "N/A";
    public int totalClicks = 0;
    public int clicksThisWeek = 0;

    public List<DomainInfo> domains = new ArrayList<DomainInfo>();

    public void addDomainInfo(String domainIn, int totalClicksIn) {
        DomainInfo info = new DomainInfo();
        info.domain = domainIn;
        info.totalClicks = totalClicksIn;
        domains.add(info);
    }
}
