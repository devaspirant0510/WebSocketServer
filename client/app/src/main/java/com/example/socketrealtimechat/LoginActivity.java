package com.example.socketrealtimechat;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.socketrealtimechat.databinding.ActivityLoginBinding;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;

import java.io.IOException;
import java.util.Objects;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * @author seungho
 * @since 2021-07-19
 * class LoginActivity.java
 * project SocketRealTimeChat
 * github devaspirant0510
 * email seungho020510@gmail.com
 * description
 **/
public class LoginActivity extends AppCompatActivity {
    private ActivityLoginBinding binding;
    private final String TAG = LoginActivity.this.getClass().getSimpleName();
    OkHttpSingleton localSingleton = OkHttpSingleton.getInstance();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        super.onCreate(savedInstanceState);
        setContentView(binding.getRoot());
        binding.btnUserLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (binding.etUserId.getText().length() == 0 ||
                        binding.etUserPwd.getText().length() == 0) {
                    Toast.makeText(LoginActivity.this, "모두 입력해주세요", Toast.LENGTH_SHORT).show();
                } else {
                    RequestBody formBody = new FormBody.Builder()
                            .add("userId", binding.etUserId.getText().toString())
                            .add("pwd", binding.etUserPwd.getText().toString())
                            .build();
                    Request request = new Request.Builder()
                            .url("http://ec2-3-36-106-46.ap-northeast-2.compute.amazonaws.com:8080/login")
                            .post(formBody).build();
                    localSingleton.getClient().newCall(request).enqueue(new Callback() {
                        @Override
                        public void onFailure(Call call, IOException e) {
                            new Handler(getMainLooper()).post(new Runnable() {
                                @Override
                                public void run() {
                                    Toast.makeText(LoginActivity.this, "문제가 있는것 같아요 개발자에게 문의하세요"
                                            , Toast.LENGTH_SHORT).show();
                                }
                            });
                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            Log.e(TAG, "onResponse: " + response.message());
                            String body = Objects.requireNonNull(response.body()).string();
                            if (response.body() != null) {
                                Log.e(TAG, body);
                                Gson gson = new Gson();
                                LoginRequest loginRequest = gson.fromJson(body, LoginRequest.class);
                                Log.e(TAG, "onResponse: " + loginRequest.isSuccess());
                                if (loginRequest.isSuccess()) {
                                    new Handler(getMainLooper()).post(new Runnable() {
                                        @Override
                                        public void run() {
                                            Toast.makeText(getApplicationContext(), "로그인 성공", Toast.LENGTH_SHORT).show();
                                            Intent intent = new Intent(LoginActivity.this, ChatRoom.class);
                                            startActivity(intent);
                                        }
                                    });

                                } else {
                                    new Handler(getMainLooper()).post(new Runnable() {
                                        @Override
                                        public void run() {
                                            Toast.makeText(getApplicationContext(), "로그인 실패", Toast.LENGTH_SHORT).show();
                                            binding.etUserId.setText(null);
                                            binding.etUserPwd.setText(null);
                                        }
                                    });

                                }


                            }

                        }
                    });

                }

            }
        });
        binding.btnUserRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this,RegisterActivity.class);
                startActivity(intent);
            }
        });


    }
}
