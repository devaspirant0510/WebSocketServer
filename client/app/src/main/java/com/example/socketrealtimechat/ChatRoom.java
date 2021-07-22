package com.example.socketrealtimechat;

import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.socketrealtimechat.databinding.ActivityChatBinding;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

/**
 * @author seungho
 * @since 2021-07-19
 * class ChatRoom.java
 * project SocketRealTimeChat
 * github devaspirant0510
 * email seungho020510@gmail.com
 * description
 **/
public class ChatRoom extends AppCompatActivity {
    private ActivityChatBinding binding;
    private Socket socket;
    private final String TAG = this.getClass().getSimpleName();

    @Override
    protected void onCreate(@Nullable  Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityChatBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        try {
             socket = IO.socket("http://3.36.106.46:8080");
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1);
        binding.lvChatList.setAdapter(arrayAdapter);
        binding.btnChatSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(binding.etChatContent.getText().length()==0){
                    Toast.makeText(getApplicationContext(),"입력해주세요",Toast.LENGTH_SHORT).show();
                }else{
                    socket.emit("message",binding.etChatContent.getText().toString());
                    binding.etChatContent.setText(null);

                }
            }
        });
        socket.on("userCount", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                int userCount = (int)args[0];
                Log.e(TAG, "call: "+args[0] );
                new Handler(getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        binding.tvUserCount.setText(userCount+"명 접속중");
                    }
                });



            }
        });
        socket.on("message", new Emitter.Listener() {
            @Override
            public void call(Object... args) {

                Log.e(TAG, "call: "+args[0] );
                String userName = (String)args[0];
                String comment = (String)args[1];
                new Handler(getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        arrayAdapter.add((String)args[0]+" : "+(String)args[1]);
                        arrayAdapter.notifyDataSetChanged();
                    }
                });

            }
        });
        socket.on("userJoin", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        arrayAdapter.add((String)args[0]+" "+(String)args[1]);
                        arrayAdapter.notifyDataSetChanged();
                    }
                });
            }
        });
        socket.on("userOut", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        arrayAdapter.add((String)args[0]+" "+(String)args[1]);
                        arrayAdapter.notifyDataSetChanged();
                    }
                });
            }
        });
        socket.connect();
    }
}
