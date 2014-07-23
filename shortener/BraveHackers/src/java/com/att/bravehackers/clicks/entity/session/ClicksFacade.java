/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.att.bravehackers.clicks.entity.session;

import com.att.bravehackers.clicks.entity.Clicks;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author ML5174
 */
@Stateless
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
    
}
