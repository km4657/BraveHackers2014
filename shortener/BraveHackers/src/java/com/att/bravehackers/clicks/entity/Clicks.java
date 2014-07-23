/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.att.bravehackers.clicks.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ML5174
 */
@Entity
@Table(name = "CLICKS")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Clicks.findAll", query = "SELECT c FROM Clicks c"),
    @NamedQuery(name = "Clicks.findByIdPk", query = "SELECT c FROM Clicks c WHERE c.idPk = :idPk"),
    @NamedQuery(name = "Clicks.findByIdFkUrlList", query = "SELECT c FROM Clicks c WHERE c.idFkUrlList = :idFkUrlList"),
    @NamedQuery(name = "Clicks.findBySourceDomain", query = "SELECT c FROM Clicks c WHERE c.sourceDomain = :sourceDomain"),
    @NamedQuery(name = "Clicks.findByEmail", query = "SELECT c FROM Clicks c WHERE c.email = :email")})
public class Clicks implements Serializable {
    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID_PK")
    private BigDecimal idPk;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID_FK_URL_LIST")
    private BigInteger idFkUrlList;
    @Size(max = 255)
    @Column(name = "SOURCE_DOMAIN")
    private String sourceDomain;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 2500)
    @Column(name = "EMAIL")
    private String email;

    public Clicks() {
    }

    public Clicks(BigDecimal idPk) {
        this.idPk = idPk;
    }

    public Clicks(BigDecimal idPk, BigInteger idFkUrlList) {
        this.idPk = idPk;
        this.idFkUrlList = idFkUrlList;
    }

    public BigDecimal getIdPk() {
        return idPk;
    }

    public void setIdPk(BigDecimal idPk) {
        this.idPk = idPk;
    }

    public BigInteger getIdFkUrlList() {
        return idFkUrlList;
    }

    public void setIdFkUrlList(BigInteger idFkUrlList) {
        this.idFkUrlList = idFkUrlList;
    }

    public String getSourceDomain() {
        return sourceDomain;
    }

    public void setSourceDomain(String sourceDomain) {
        this.sourceDomain = sourceDomain;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idPk != null ? idPk.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Clicks)) {
            return false;
        }
        Clicks other = (Clicks) object;
        if ((this.idPk == null && other.idPk != null) || (this.idPk != null && !this.idPk.equals(other.idPk))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.att.bravehackers.clicks.entity.Clicks[ idPk=" + idPk + " ]";
    }
    
}
