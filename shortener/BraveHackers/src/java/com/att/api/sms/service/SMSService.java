/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 */

/*
 * ====================================================================
 * LICENSE: Licensed by AT&T under the 'Software Development Kit Tools
 * Agreement.' 2014.
 * TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTIONS:
 * http://developer.att.com/sdk_agreement/
 *
 * Copyright 2014 AT&T Intellectual Property. All rights reserved.
 * For more information contact developer.support@att.com
 * ====================================================================
 */

package com.att.api.sms.service;

import com.att.api.oauth.OAuthToken;
import com.att.api.rest.RESTClient;
import com.att.api.rest.RESTException;
import com.att.api.service.APIService;
import com.att.api.sms.model.SMSGetResponse;
import com.att.api.sms.model.SMSSendResponse;
import com.att.api.sms.model.SMSStatus;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;

/**
 * Used to interact with version 3 of the SMS API.
 *
 * <p>
 * This class is thread safe.
 * </p>
 *
 * @author pk9069
 * @version 1.0
 * @since 1.0
 * @see <a href="https://developer.att.com/docs/apis/rest/3/SMS">SMS Documentation</a>
 */
public class SMSService extends APIService {

    /**
     * Creates an SMSService object.
     *
     * @param fqdn fully qualified domain name to use for sending requests
     * @param token OAuth token to use for authorization
     */
    public SMSService(String fqdn, OAuthToken token) {
        super(fqdn, token);
    }

    /**
     * Sends a request to the API for sending an SMS.
     *
     * @param rawAddr addresses to send sms to
     * @param msg message to send
     * @param notifyDeliveryStatus whether to notify of delivery status
     * @return api response
     * @throws RESTException if API request was not successful
     * @throws JSONException 
     */
    public SMSSendResponse sendSMS(String rawAddr, String msg,
            boolean notifyDeliveryStatus) throws RESTException, JSONException {

        String[] addrs = APIService.formatAddresses(rawAddr);
        JSONArray jaddrs = new JSONArray();
        for (String addr : addrs) {
            jaddrs.put(addr);
        }

        // Build the request body
        JSONObject rpcObject = new JSONObject();
        JSONObject body = new JSONObject();
        body.put("message", msg);

        Object addrStr = addrs.length == 1 ? addrs[0] : jaddrs;
        body.put("address", addrStr);

        body.put("notifyDeliveryStatus", notifyDeliveryStatus);
        rpcObject.put("outboundSMSRequest", body);

        final String endpoint = getFQDN() + "/sms/v3/messaging/outbox";

        final String responseBody = new RESTClient(endpoint)
            .addHeader("Content-Type", "application/json")
            .addAuthorizationHeader(getToken())
            .addHeader("Accept", "application/json")
            .httpPost(rpcObject.toString())
            .getResponseBody();

        return SMSSendResponse.valueOf(new JSONObject(responseBody));
    }

    /**
     * Sends a request for getting delivery status information about an SMS.
     *
     * @param msgId message id used to get status
     * @return api response
     * @throws RESTException if API request was not successful
     * @throws JSONException 
     */
    public SMSStatus getSMSDeliveryStatus(String msgId) throws RESTException, JSONException {
        String endpoint = getFQDN() + "/sms/v3/messaging/outbox/" + msgId;

        final String responseBody = new RESTClient(endpoint)
            .addAuthorizationHeader(getToken())
            .addHeader("Accept", "application/json")
            .httpGet()
            .getResponseBody();

        return SMSStatus.valueOf(new JSONObject(responseBody));
    }

    /**
     * Sends a request to the API for getting any messages sent to the
     * specified shortcode.
     *
     * @param registrationID registration id (registered shortcode)
     * @return api response
     * @throws RESTException if API request was not successful
     * @throws JSONException 
     */
    public SMSGetResponse getSMS(String registrationID) throws RESTException, JSONException {

        String fqdn = getFQDN();
        String endpoint = fqdn + "/sms/v3/messaging/inbox/" + registrationID;

        final String responseBody = new RESTClient(endpoint)
            .addAuthorizationHeader(getToken())
            .addHeader("Accept", "application/json")
            .httpGet()
            .getResponseBody();

        return SMSGetResponse.valueOf(new JSONObject(responseBody));
    }
}
