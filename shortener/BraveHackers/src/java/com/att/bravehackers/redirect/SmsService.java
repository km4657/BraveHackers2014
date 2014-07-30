/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.att.bravehackers.sms.service;

import com.att.api.oauth.OAuthService;
import com.att.api.oauth.OAuthToken;
import com.att.api.rest.RESTException;
import com.att.api.sms.model.SMSSendResponse;
import com.att.api.sms.service.SMSService;

/**
 *
 * @author km4657
 */
public class SmsService {
    
    public static void sendSms(JsonSms sms){
        System.out.println("Entering sendSms!!!");
    try
    {
         setProxySettings();

        // Use the app account settings from developer.att.com for the
        // following values. Make sure SMS is enabled for the App Key and
        // App Secret.
        final String fqdn = "https://api.att.com";
        // Enter the value from the 'App Key' field
        final String clientId = "jeqzwo3fbxrndgzn7kourp62wdurukr9";
        // Enter the value from the 'App Secret' field
        final String clientSecret = "k9a8sfmtvjh4afhdsd5bxaaj4ab728gm";
        // Create service for requesting an OAuth token
        OAuthService osrvc = new OAuthService(fqdn, clientId, clientSecret);
        OAuthToken token;
        try {
            // Get OAuth token using the SMS scope
            token = osrvc.getToken("SMS");
        } catch (RESTException re) {
            re.printStackTrace();
            return;
        } 

        // Create service for interacting with the SMS API
        SMSService smsSrvc = new SMSService(fqdn, token);

        // The following lines of code showcase the possible method calls for
        // the SMSService class; to test only a particular method call, comment
        // out any other method calls.

        try {
            /* This portion showcases the Send SMS API call. */
            // Enter Phone Number; e.g. final String pn = "5555555555";
            final String pn = sms.getPn();
            final String msg = sms.getMessage();
            final boolean notifyDeliveryStatus = false;
            // Send request for sending SMS
            SMSSendResponse r = smsSrvc.sendSMS(pn, msg, notifyDeliveryStatus);
            System.out.println("message id: " + r.getMessageId());
        } catch (RESTException re) {
            re.printStackTrace();
        }
    } catch (Exception e)
    {
        e.printStackTrace();
    }

        
    }
    private static void setProxySettings() {
        // set any proxy settings
        //RESTConfig.setDefaultProxy("proxy.host", 8080);
    }

    
}
