package com.att.it.mobilithon.bravehackers.shortener.rest;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/getUrlClicksServlet")
public class ReportServiceServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setBufferSize(8192);
        try (PrintWriter out = response.getWriter()) {
        	Gson gson = new Gson();
        	out.print(gson.toJson(new GetUrlClicksResponse()));
        }
    }
    
}
