const chat_form = document.getElementById("chat-form");
const chat_input = document.getElementById("chat-input");
const chat_btn = document.getElementById("chat-btn");
const chat_log = document.getElementById("chat-log");

chat_form.addEventListener("submit", send_chat)

var user_name = localStorage.getItem("userName");
var user_id = localStorage.getItem("userId");
var talk_id = localStorage.getItem("talkId");
console.log("got user name : " + user_name);
console.log("got user id : " + user_id);
console.log("got talk id : " + talk_id);

//const url = "http://43.202.126.252:8080/";
const url = "http://localhost:8080/";

function send_chat(event){
    const user_message = chat_input.value;
    console.log(user_message);
    if(user_message != ""){
        console.log("send message");

        const new_chat_wrapper = document.createElement("div");
        new_chat_wrapper.classList.add("chat-wrapper");

        const new_chat_box = document.createElement("div");
        new_chat_box.classList.add("chat-box");

        const new_chat = document.createElement("div");
        new_chat.classList.add("chat-bubble");
        new_chat.innerText = user_message;

        new_chat_wrapper.appendChild(new_chat_box);
        new_chat_wrapper.appendChild(new_chat);
        chat_log.appendChild(new_chat_wrapper);

        chat_log.scrollTop = chat_log.scrollHeight;
        chat_input.value = "";
        chat_btn.disabled = true;

        //send request & get response
        const chatRequest = new XMLHttpRequest();
        chatRequest.open('POST', url + `api/chat?userId=${user_id}`);
        chatRequest.setRequestHeader("Content-Type", "application/json");

        var body = JSON.stringify({
            talkId : talk_id,
            userPrompt : user_message
        });
        chatRequest.send(body);
        chatRequest.onload = () => {
            if( chatRequest.status === 200 ) {
                console.log(chatRequest.response);
                const response = JSON.parse(chatRequest.response);
                receive_chat(null, response.result.message);
            } else {
                console.error("Error", chatRequest.status, chatRequest.statusText);
            }
        };
    }
}

function receive_chat(event, response){
    chat_btn.disabled = false;

    const new_response_wrapper = document.createElement("div");
    new_response_wrapper.classList.add("chat-wrapper");

    const new_response_box = document.createElement("div");
    new_response_box.classList.add("chat-box");

    const new_response = document.createElement("div");
    new_response.classList.add("chat-bubble");
    new_response.innerText = response;

    new_response_wrapper.appendChild(new_response);
    new_response_wrapper.appendChild(new_response_box);
    chat_log.appendChild(new_response_wrapper);

    chat_log.scrollTop = chat_log.scrollHeight;
}
//

const end_chat_btn = document.getElementById("end-chat-btn");

end_chat_btn.addEventListener("click", endChat);

function endChat(event){

    //create diary
    const diaryRequest = new XMLHttpRequest();
    diaryRequest.open('POST', url + `diary/?userId=${user_id}`);

    var body = JSON.stringify({
        talkId: talk_id,
    });
    diaryRequest.send(body);
    diaryRequest.onload = () => {
        if( diaryRequest.status === 200 ) {
            console.log(diaryRequest.response);
            const response = JSON.parse(diaryRequest.response);
        } else {
            console.error("Error", diaryRequest.status, diaryRequest.statusText);
        }
    };
}