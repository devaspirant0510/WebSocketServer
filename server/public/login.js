const loginForm = document.querySelector("#login-form");
const inputUserId = document.querySelector("#user-id");
const inputUserPwd = document.querySelector("#pwd");

loginForm.addEventListener("submit",async (evt)=>{
    evt.preventDefault();
    if(inputUserId.value==="" || inputUserPwd.value===""){
        alert("모두다 입력해주세요");
    }else{
        const isLogin = await axios.post("/login",{
            userId:inputUserId.value,
            pwd:inputUserPwd.value
        });
        if(isLogin.data.success){
            alert("로그인 성공")
            history.pushState(null,null,"/");
            location.reload();
        }
        else{
            alert("아이디나 비밀번호를 다시 확인해보세요")
            inputUserPwd.value = null;
            inputUserId.value = null;
        }

    }
})
