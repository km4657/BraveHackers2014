/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.att.bravehackers.redirect;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.util.Calendar;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ML5174
 */
@WebServlet(name = "Redirect", urlPatterns = {"/r"})
public class Redirect extends HttpServlet {

    @EJB
    private com.att.bravehackers.redirect.session.UrlListFacade urlListFacade;
    @EJB
    private com.att.bravehackers.redirect.session.ClicksFacade clicksFacade;
    private Clicks clicks;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        UrlList urlList;
        System.out.println("\n\n\n************START*************\n\n:");
        
         if (request.getLocalName().equalsIgnoreCase("localhost")) {
         String newURL = request.getRequestURL().toString().replaceAll("localhost",InetAddress.getLocalHost().getHostName());
         response.sendRedirect(newURL+request.getQueryString());
         return;
         }
         

        String shorturl = request.getQueryString();
        if (shorturl == null) {
            shorturl = request.getRequestURI();
        }
        
        if (shorturl == null) shorturl = shorturl.substring(shorturl.lastIndexOf("/") + 1);
        
        System.out.println("SHORTURL:" + shorturl);

        try {
            urlList = (UrlList) urlListFacade.findByShorturl(shorturl);
            if (urlList.getDescription()!=null) {
                request.setAttribute("URL", urlList);
                request.getRequestDispatcher("/faces/redirect.jsp").forward(request, response);
            }
            else 
                response.sendRedirect(urlList.getLongurl());
        } catch (Exception e) {
            System.out.println("EXCEPTION in findByShorturl or sendRedirect:" + e.getMessage());
            response.sendRedirect("http://att.com");
            return;
        }

        try {
            clicks = new Clicks();
            clicks.setClickDate(Calendar.getInstance().getTime());
            clicks.setEmail("getUserFromCookie");
            clicks.setIdFkUrlList(urlList.getIdPk());
            clicks.setSourceDomain(request.getHeader("referer"));
            clicksFacade.create(clicks);
        } catch (Exception e) {
            System.out.println("EXCEPTION in Clicks:" + e.getMessage());
            response.sendRedirect("http://att.com");
            return;
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
