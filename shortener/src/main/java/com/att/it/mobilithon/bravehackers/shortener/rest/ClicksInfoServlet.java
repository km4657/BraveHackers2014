package com.att.it.mobilithon.bravehackers.shortener.rest;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.google.gson.Gson;

@WebServlet("/getUrlClicksServlet")
public class ClicksInfoServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setBufferSize(8192);
        try (PrintWriter out = response.getWriter()) {
        	Gson gson = new Gson();
        	ClicksInfo info = new ClicksInfo();
    		Connection conn = null;
    		try {
    			Context ctx = new InitialContext();
    			DataSource ds = (DataSource)ctx.lookup("jdbc/bravehackers");
    			conn = ds.getConnection();
    			int urlId = Integer.parseInt(request.getParameter("urlId"));
    			
    			// get url info
    			PreparedStatement ps = conn.prepareStatement("select id_pk,longurl,shorturl,category,url_name "+
    					"from url_list "+
    					"where id_pk=?");
    			ps.setInt(1, urlId);
    			ResultSet rs = ps.executeQuery();
    			if (rs.next())
    			{
    				info.id = rs.getInt(1);
    				info.longUrl=rs.getString(2);
    				info.shortUrl=rs.getString(3);
    				info.category=rs.getString(4);
    				info.name=rs.getString(5);
    			}
    			
    			// get total clicks
    			ps = conn.prepareStatement("select count(*) from clicks where id_fk_url_list=?");
    			ps.setString(1, request.getParameter("urlId"));
    			rs = ps.executeQuery();
    			if (rs.next())
    			{
    				info.totalClicks = rs.getInt(1);
    			}
    			
    			// get clicks this week
    			ps = conn.prepareStatement("select count(*) from clicks where id_fk_url_list=? and click_date>sysdate-7");
    			ps.setString(1, request.getParameter("urlId"));
    			rs = ps.executeQuery();
    			if (rs.next())
    			{
    				info.clicksThisWeek = rs.getInt(1);
    			}
    			
    			// get domain clicks
    			ps = conn.prepareStatement("select source_domain,count(*) from clicks where id_fk_url_list=? group by source_domain");
    			ps.setString(1, request.getParameter("urlId"));
    			rs = ps.executeQuery();
    			while (rs.next())
    			{
    				info.addDomainInfo(rs.getString(1),rs.getInt(2));
    			}
    		} catch (NamingException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} catch (SQLException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} finally {
    			if (conn!=null) try {conn.close();} catch (SQLException e) {}
    		}
        	out.print(gson.toJson(info));
        }
    }
    
}
