package com.att.it.mobilithon.bravehackers.shortener.rest;

public class GetUrlClicksResponse {
	String pk_clicks="pk_clicks";
	String pk_url="pk_url";
	String source_domain="source_domain";
	String user_clicked="user_clicked";
	
	public String getPk_clicks() {
		return pk_clicks;
	}
	public void setPk_clicks(String pk_clicks) {
		this.pk_clicks = pk_clicks;
	}
	public String getPk_url() {
		return pk_url;
	}
	public void setPk_url(String pk_url) {
		this.pk_url = pk_url;
	}
	public String getSource_domain() {
		return source_domain;
	}
	public void setSource_domain(String source_domain) {
		this.source_domain = source_domain;
	}
	public String getUser_clicked() {
		return user_clicked;
	}
	public void setUser_clicked(String user_clicked) {
		this.user_clicked = user_clicked;
	}  
}
