package com.example.socketrealtimechat;

import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.socketrealtimechat.databinding.ActivityRegisterBinding;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * @author seungho
 * @since 2021-07-19
 * class RegisterActivity.java
 * project SocketRealTimeChat
 * github devaspirant0510
 * email seungho020510@gmail.com
 * description
 **/
public class RegisterActivity extends AppCompatActivity {
    private ActivityRegisterBinding binding;
    private final String TAG = this.getClass().getSimpleName();
    private boolean nameIsUnique = false;
    @Override
    protected void onCreate(@Nullable  Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityRegisterBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        binding.btnCheckUnique.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(binding.etRegisterName.getText().length()!=0){

                    RequestBody requestBody = new FormBody.Builder()
                            .add("checkUnique","true")
                            .add("nickName",binding.etRegisterName.getText().toString())
                            .build();
                    Request request = new Request.Builder()
                            .post(requestBody)
                            .url("http://ec2-3-36-106-46.ap-northeast-2.compute.amazonaws.com:8080/register")
                            .build();
                    OkHttpSingleton.getInstance().getClient().newCall(request).enqueue(new Callback() {
                        @Override
                        public void onFailure(Call call, IOException e) {

                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            String body = null;
                            if (response.body() != null) {
                                body = response.body().string();
                                try {
                                    JSONObject jsonObject = new JSONObject(body);
                                    boolean isUnique = jsonObject.getBoolean("isUnique");
                                    if(isUnique){
                                        ToastMessage("사용가능합니다. ");
                                        nameIsUnique = true;
                                    }else{
                                        ToastMessage("다른 아이디를 사용해주세요");
                                        nameIsUnique = false;
                                    }
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }

                            }

                        }
                    });
                }else{
                    Toast.makeText(getApplicationContext(),"닉네임을 입력해주세요",Toast.LENGTH_SHORT).show();
                }
            }
        });
        binding.btnRegisterJoin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!nameIsUnique && binding.etRegisterName.getText().length()!=0){
                    Toast.makeText(getApplicationContext(),"닉네임 중복체크를 해주세요",Toast.LENGTH_SHORT).show();
                }
                else if(!binding.etRegisterPwdPwd.getText().toString().equals(binding.etRegisterPwd.getText().toString())){
                    Toast.makeText(getApplicationContext(),"비밀번호가 다릅니다.",Toast.LENGTH_SHORT).show();
                }
                else if(!nameIsUnique || binding.etRegisterId.getText().length() ==0
                ||binding.etRegisterPwd.getText().length()==0 || binding.etRegisterPwdPwd.getText().length()==0
                || binding.etRegisterAge.getText().length()==0){
                    Toast.makeText(getApplicationContext(),"전부 입력해주세요",Toast.LENGTH_SHORT).show();
                } else if (binding.radioGroup.getCheckedRadioButtonId()==-1) {
                    Toast.makeText(getApplicationContext(),"성별을 선택해주세요",Toast.LENGTH_SHORT).show();
                }else{
                    boolean sex = binding.radioGroup.getCheckedRadioButtonId() == binding.rBtnFemale.getId();
                    RequestBody requestBody = new FormBody.Builder()
                            .add("userId",binding.etRegisterId.getText().toString())
                            .add("userPwd",binding.etRegisterPwd.getText().toString()).build();




                }

            }
        });

    }
    private void ToastMessage(String text){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(getApplicationContext(),text,Toast.LENGTH_SHORT).show();
            }
        });
    }
}
