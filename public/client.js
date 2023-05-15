const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let messagearea=document.querySelector('.message__area')
do{
name=prompt("Enter your Name:");

}while(!name);

textarea.addEventListener('keyup',(e)=>{
        if(e.key==='Enter'){
               
                sendMessage(e.target.value)
               
        }
})
function sendMessage(message){
        let msg={
                user: name,
                message:message.trim()
        }
        //append message:
        appendMessage(msg,'outgoing')
        textarea.value=' '
        scrollToBottom();

        //send to server
        socket.emit('message',msg)
}
function appendMessage(msg,type){
        let maindiv=document.createElement('div')
        let className=type
        maindiv.classList.add(className,'message')

        let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `
        maindiv.innerHTML=markup
        messagearea.appendChild(maindiv)

}


// recieve the message which come from server:
socket.on('message',(msg)=>{
        // console.log(msg)
       appendMessage(msg,'incoming')
       scrollToBottom();
          
})

function scrollToBottom(){
        messagearea.scrollTop=messagearea.scrollHeight
}


