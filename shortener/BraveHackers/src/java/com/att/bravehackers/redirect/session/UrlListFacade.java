/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.att.bravehackers.redirect.session;

import com.att.bravehackers.redirect.UrlList;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author ML5174
 */
@Stateless
public class UrlListFacade extends AbstractFacade<UrlList> {
    @PersistenceContext(unitName = "BraveHackersPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public UrlListFacade() {
        super(UrlList.class);
    }
    
}
