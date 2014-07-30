/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.att.bravehackers.redirect.service;

import com.att.bravehackers.redirect.ShortURL;
import com.att.bravehackers.redirect.UrlList;
import java.math.BigDecimal;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

/**
 *
 * @author ML5174
 */
@Stateless
@Path("com.att.bravehackers.redirect.urllist")
public class UrlListFacadeREST extends AbstractFacade<UrlList> {
    @PersistenceContext(unitName = "BraveHackersPU")
    private EntityManager em;

    public UrlListFacadeREST() {
        super(UrlList.class);
    }
    
   
    /*@POST
    @Path("sendsms")
    @Consumes("application/json")
    public void sendSms(JsonSms sms) {
        SmsService.sendSms(sms);
    }*/
    
    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public UrlList create(UrlList entity, @Context HttpServletRequest httpRequest) {
        String email = httpRequest.getUserPrincipal().getName();
        if (email==null) email = "kelleym@me.com";
        entity.setEmail(email);
        super.create(entity);
        
        String vanityurl = entity.getVanityurl();
        TypedQuery<UrlList> q = getEntityManager().createNamedQuery("UrlList.findByShorturl", UrlList.class);
        q.setParameter("shorturl",vanityurl);
        
        if (q.getResultList().isEmpty()&& vanityurl!=null && vanityurl.trim().length() >0)
        {
           // can use vanity url as short url
            String shorturl = vanityurl;
            entity.setShorturl(shorturl);     
        }
        else
        {
           // can not use vanity url, generate new shorturl
            String shorturl = ShortURL.encode(entity.getIdPk().intValueExact());
            entity.setShorturl(shorturl);     
        }
        super.edit(entity);
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") BigDecimal id, UrlList entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") BigDecimal id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public UrlList find(@PathParam("id") BigDecimal id) {
        
        return super.find(id);
    }
    
    @GET
    @Path("query")
    @Produces({"application/xml", "application/json"})
    public List<UrlList> find(@QueryParam("email") String email, @Context HttpServletRequest httpRequest) {
        TypedQuery<UrlList> q = getEntityManager().createNamedQuery("UrlList.findByEmail", UrlList.class);
        q.setParameter("email", email);
        return q.getResultList();
    }

    @GET
    @Produces({"application/xml", "application/json"})
    public List<UrlList> findAll(@Context HttpServletRequest httpRequest) {
        String email = httpRequest.getUserPrincipal().getName();
        if (email==null) email = "weolopez@yahoo.com";
        TypedQuery<UrlList> q = getEntityManager().createNamedQuery("UrlList.findByEmail", UrlList.class);
        q.setParameter("email", email);
        return q.getResultList();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<UrlList> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
