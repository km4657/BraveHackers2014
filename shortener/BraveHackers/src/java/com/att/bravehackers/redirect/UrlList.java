/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.att.bravehackers.redirect;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ML5174
 */
@Entity
@Table(name = "URL_LIST")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "UrlList.findAll", query = "SELECT u FROM UrlList u"),
    @NamedQuery(name = "UrlList.findByIdPk", query = "SELECT u FROM UrlList u WHERE u.idPk = :idPk"),
    @NamedQuery(name = "UrlList.findByLongurl", query = "SELECT u FROM UrlList u WHERE u.longurl = :longurl"),
    @NamedQuery(name = "UrlList.findByShorturl", query = "SELECT u FROM UrlList u WHERE u.shorturl = :shorturl"),
    @NamedQuery(name = "UrlList.findByVanityurl", query = "SELECT u FROM UrlList u WHERE u.vanityurl = :vanityurl"),
    @NamedQuery(name = "UrlList.findByEmail", query = "SELECT u FROM UrlList u WHERE u.email = :email"),
    @NamedQuery(name = "UrlList.findByCategory", query = "SELECT u FROM UrlList u WHERE u.category = :category"),
    @NamedQuery(name = "UrlList.findByExpiredurl", query = "SELECT u FROM UrlList u WHERE u.expiredurl = :expiredurl"),
    @NamedQuery(name = "UrlList.findByExpireDate", query = "SELECT u FROM UrlList u WHERE u.expireDate = :expireDate"),
    @NamedQuery(name = "UrlList.findByUrlName", query = "SELECT u FROM UrlList u WHERE u.urlName = :urlName"),
    @NamedQuery(name = "UrlList.findByDescription", query = "SELECT u FROM UrlList u WHERE u.description = :description")})
public class UrlList implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID_PK")
    @SequenceGenerator(name = "URL_LIST_GENERATOR", sequenceName = "URL_LIST_SEQ",allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "URL_LIST_GENERATOR")
    private BigDecimal idPk;
    @Basic(optional = false)
    @Size(min = 1, max = 2083)
    @Column(name = "LONGURL")
    private String longurl;
    @Size(max = 255)
    @Column(name = "SHORTURL")
    private String shorturl;
    @Size(max = 255)
    @Column(name = "VANITYURL")
    private String vanityurl;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 255)
    @Column(name = "EMAIL")
    private String email;
    @Size(max = 255)
    @Column(name = "CATEGORY")
    private String category;
    @Size(max = 2500)
    @Column(name = "EXPIREDURL")
    private String expiredurl;
    @Column(name = "EXPIRE_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expireDate;
    @Size(max = 255)
    @Column(name = "URL_NAME")
    private String urlName;
    @Size(max = 2500)
    @Column(name = "DESCRIPTION")
    private String description;
    public UrlList() {
    }

    public UrlList(BigDecimal idPk) {
        this.idPk = idPk;
    }

    public UrlList(BigDecimal idPk, String longurl) {
        this.idPk = idPk;
        this.longurl = longurl;
    }

    public BigDecimal getIdPk() {
        return idPk;
    }

    public void setIdPk(BigDecimal idPk) {
        this.idPk = idPk;
    }

    public String getLongurl() {
        return longurl;
    }

    public void setLongurl(String longurl) {
        this.longurl = longurl;
    }

    public String getShorturl() {
        return shorturl;
    }

    public void setShorturl(String shorturl) {
        this.shorturl = shorturl;
    }

    public String getVanityurl() {
        return vanityurl;
    }

    public void setVanityurl(String vanityurl) {
        this.vanityurl = vanityurl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getExpiredurl() {
        return expiredurl;
    }

    public void setExpiredurl(String expiredurl) {
        this.expiredurl = expiredurl;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }

    public String getUrlName() {
        return urlName;
    }

    public void setUrlName(String urlName) {
        this.urlName = urlName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
        if (!(object instanceof UrlList)) {
            return false;
        }
        UrlList other = (UrlList) object;
        if ((this.idPk == null && other.idPk != null) || (this.idPk != null && !this.idPk.equals(other.idPk))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.att.bravehackers.redirect.UrlList[ idPk=" + idPk + " ]";
    }

}
