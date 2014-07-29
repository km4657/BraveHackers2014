/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.att.bravehackers.redirect.service;

import com.att.bravehackers.redirect.Clicks;
import com.att.bravehackers.redirect.ClicksInfo;
import com.att.bravehackers.redirect.UrlList;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import javax.ejb.Stateless;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.sql.DataSource;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

/**
 *
 * @author ML5174
 */
@Stateless
@Path("com.att.bravehackers.redirect.clicks")
public class ClicksFacadeREST extends AbstractFacade<Clicks> {
    @PersistenceContext(unitName = "BraveHackersPU")
    private EntityManager em;

    public ClicksFacadeREST() {
        super(Clicks.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public Clicks create(Clicks entity) {
        super.create(entity);
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") BigDecimal id, Clicks entity) {
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
    public Clicks find(@PathParam("id") BigDecimal id) {
        return super.find(id);
    }
    
    @GET
    @Path("query") 
    @Produces({"application/xml", "application/json"})
    public List<Clicks> findByIDFK(@QueryParam("idFk") BigDecimal idFkUrlList) {
        TypedQuery<Clicks> q = getEntityManager().createNamedQuery("Clicks.findByIdFkUrlList", Clicks.class);
        q.setParameter("idFkUrlList", idFkUrlList);
        return q.getResultList();
    }

    @GET
    @Path("clicksInfo") 
    @Produces({"application/xml", "application/json"})
    public ClicksInfo clicksInfo(@QueryParam("urlId") String urlIdIn) {
        ClicksInfo info = new ClicksInfo();
        Connection conn = null;
        try {
            Context ctx = new InitialContext();
            DataSource ds = (DataSource) ctx.lookup("bravehackers");
            conn = ds.getConnection();
            int urlId = Integer.parseInt(urlIdIn);

            // get url info
            PreparedStatement ps = conn.prepareStatement("select id_pk,longurl,shorturl,category,url_name "
                    + "from url_list "
                    + "where id_pk=?");
            ps.setInt(1, urlId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                info.id = rs.getInt(1);
                info.longUrl = rs.getString(2);
                info.shortUrl = rs.getString(3);
                info.category = rs.getString(4);
                info.name = rs.getString(5);
            }

            // get total clicks
            ps = conn.prepareStatement("select count(*) from clicks where id_fk_url_list=?");
            ps.setInt(1, urlId);
            rs = ps.executeQuery();
            if (rs.next()) {
                info.totalClicks = rs.getInt(1);
            }

            // get clicks this week
            ps = conn.prepareStatement("select count(*) from clicks where id_fk_url_list=? and click_date>sysdate-7");
            ps.setInt(1, urlId);
            rs = ps.executeQuery();
            if (rs.next()) {
                info.clicksThisWeek = rs.getInt(1);
            }

            // get domain clicks
            ps = conn.prepareStatement("select source_domain,count(*) from clicks where id_fk_url_list=? group by source_domain");
            ps.setInt(1, urlId);
            rs = ps.executeQuery();
            while (rs.next()) {
                info.addDomainInfo(rs.getString(1), rs.getInt(2));
            }
        } catch (NamingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                }
            }
        }
        return info;
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Clicks> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Clicks> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
