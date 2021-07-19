package com.example.socketrealtimechat;

import okhttp3.OkHttpClient;

/**
 * @author seungho
 * @since 2021-07-19
 * class AppHelper.java
 * project SocketRealTimeChat
 * github devaspirant0510
 * email seungho020510@gmail.com
 * description
 **/
public class OkHttpSingleton {

    private static OkHttpSingleton singletonInstance;

    // No need to be static; OkHttpSingleton is unique so is this.
    private OkHttpClient client;

    // Private so that this cannot be instantiated.
    private OkHttpSingleton() {
        client = new OkHttpClient.Builder()
                .retryOnConnectionFailure(true)
                .build();
    }

    public static OkHttpSingleton getInstance() {
        if (singletonInstance == null) {
            singletonInstance = new OkHttpSingleton();
        }
        return singletonInstance;
    }

    // In case you just need the unique OkHttpClient instance.
    public OkHttpClient getClient() {
        return client;
    }

    public void closeConnections() {
        client.dispatcher().cancelAll();
    }

}
