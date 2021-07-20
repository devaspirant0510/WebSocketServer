const registerForm = document.querySelector("#register-form");
const checkUniqueName = document.querySelector("#check-name-unique");
const inputUserId = document.querySelector("#user-id");
const inputId = document.querySelector("#id");
const inputUserPwd = document.querySelector("#pwd");
const inputUserPwdPwd = document.querySelector("#pwd-pwd");
const radioMale = document.querySelector("#male");
const radioFemale = document.querySelector("#female");
const inputAge = document.querySelector("#age");

let nameUnique = false;
// 닉네임 중복체크
checkUniqueName.addEventListener("click",async ()=>{
    if(inputUserId.value===""){
        alert("닉네임을 입력해주세요")
    }else{
        console.log(inputUserId.value)
        const result = await axios.post("/register",{
            checkUnique:true,
            nickName:inputUserId.value
        });
        if (result.data.isUnique){
            alert("사용할수 있는 이름입니다.");
            inputId.focus();
            nameUnique=true;
        }else{
            alert("이미 존재하는 이름입니다.");
            inputUserId.value = "";
            inputUserId.focus();
            nameUnique = false;
        }
    }

})

// 회원가입
registerForm.addEventListener("submit",async (evt)=>{
    evt.preventDefault();
    // 중복체크를 안했을때
    if (!nameUnique){
        alert("중복체크를 해주세요");
        return;
    }
    // 비번이 안맞을때
    if(!(inputUserPwd.value===inputUserPwdPwd.value)){
        alert("비밀번호가 다릅니다.");
        return;

    }
    // 빈칸있을때
    if(inputUserId.value==="" || inputId.value==="" || inputUserPwd.value==="" || inputUserPwdPwd.value==="" || (!radioFemale.checked &&
    !radioMale.checked) || inputAge.value===""){
        alert("모두 입력해주세요");
    }
    else{
        const result = await axios.post("/register",{
            checkUnique:undefined,
            userId:inputId.value,
            userPwd:inputUserPwd.value,
            userName:inputUserId.value,
            age:inputAge.value,
            gender:radioMale.checked
        });
        if(result.data.success){
            alert("회원가입 성공! 로그인해주세요");
            const home = await axios.get("/");
            console.log(home);
            history.pushState(null,null,"/");
            location.reload();

        }
        inputId.value = "";
        inputUserId.value="";
        inputUserPwdPwd.value="";
        inputUserPwd.value="";
        inputAge.value="";
        radioMale.checked=false;
        radioFemale.checked=false;

    }


});

