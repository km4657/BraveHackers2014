CREATE TABLE SMS (ID NUMBER(38) NOT NULL, MESSAGE VARCHAR2(255) NULL, TN VARCHAR2(255) NULL, PRIMARY KEY (ID))
CREATE TABLE URL_LIST (ID_PK NUMBER(38) NOT NULL, CATEGORY VARCHAR2(255) NULL, DESCRIPTION VARCHAR2(255) NULL, EMAIL VARCHAR2(255) NULL, EXPIRE_DATE TIMESTAMP NULL, EXPIREDURL VARCHAR2(255) NULL, LONGURL VARCHAR2(255) NULL, SHORTURL VARCHAR2(255) NULL, URL_NAME VARCHAR2(255) NULL, VANITYURL VARCHAR2(255) NULL, PRIMARY KEY (ID_PK))
CREATE TABLE CLICKS (ID_PK NUMBER(38) NOT NULL, CLICK_DATE TIMESTAMP NULL, EMAIL VARCHAR2(255) NULL, ID_FK_URL_LIST NUMBER(38) NULL, SOURCE_DOMAIN VARCHAR2(255) NULL, PRIMARY KEY (ID_PK))
CREATE SEQUENCE CLICKS_SEQ START WITH 1
CREATE SEQUENCE SMS_SEQ START WITH 1
CREATE SEQUENCE URL_LIST_SEQ START WITH 1
