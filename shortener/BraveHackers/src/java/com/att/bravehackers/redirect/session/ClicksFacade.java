/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.att.bravehackers.redirect.session;

import com.att.bravehackers.redirect.Clicks;
import javax.ejb.Asynchronous;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author ML5174
 */
@Stateless
@Asynchronous
public class ClicksFacade extends AbstractFacade<Clicks> {
    @PersistenceContext(unitName = "BraveHackersPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public ClicksFacade() {
        super(Clicks.class);
    }
    
    @Override
    public void create(Clicks entity) {
        try {
            getEntityManager().persist(entity);
        } catch(javax.persistence.PersistenceException e) {
            System.out.println("\n\nEXCEPTION: "+e);
        }
    }
}
