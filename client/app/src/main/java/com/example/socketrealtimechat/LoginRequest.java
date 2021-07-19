package com.example.socketrealtimechat;

/**
 * @author seungho
 * @since 2021-07-19
 * class LoginRequest.java
 * project SocketRealTimeChat
 * github devaspirant0510
 * email seungho020510@gmail.com
 * description
 **/
public class LoginRequest {
    private boolean success;

    public LoginRequest(boolean success) {
        this.success = success;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
