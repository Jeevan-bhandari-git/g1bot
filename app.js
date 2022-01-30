class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector('.chatbox__button'),
      chatBox: document.querySelector('.chatbox__support'),
      sendButton: document.querySelector('.send__button'),
      userButton: document.querySelector('.chatbox__messages'),
      eusrButton: document.querySelector('.chatbox__messages'),
      ansrButton: document.querySelector('.chatbox__messages')
    }
    this.state = false;
    this.messages = [];
  }

  display() {
    const { openButton, chatBox, sendButton, userButton, eusrButton, ansrButton } = this.args;
    window.value = 0;
    window.nuser = 0;
    window.euser = 0;
    window.margq = 0;
    window.margr = 0;
    window.crntqtn = ' ';

    window.evalue = 0;
    openButton.addEventListener('click', () => this.toggleState(chatBox))
    sendButton.addEventListener('click', () => this.onSendButton(chatBox))
    userButton.addEventListener('click', () => this.newUser(chatBox))
    eusrButton.addEventListener('click', () => this.existUser(chatBox))
    ansrButton.addEventListener('click', () => this.getansr(chatBox))

    const node = chatBox.querySelector('input[name="cquery"]');
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox)
      }
    })
  }

  newUser(chatbox) {
    if (window.nuser === 0) {
      if (chatbox == 'Y') {
        document.getElementsByClassName('chatbox__footer')[0].style.visibility = 'hidden';
        this.messages.splice(-2)
        let margmt1 = '<div class="row d-flex"  style="color:#ffffff; margin-top:0; text-transform: capitalize;">' +"&nbsp;"+ "Yes, please!" +"&nbsp;"
        margmt1 += '</div>'
        let msgt1 = { name: "User", message: margmt1 };
        this.messages.push(msgt1);

        let margm10 = '<div class="row d-flex" style="box-sizing:border-box; padding:11px; width:275px; ">'
        margm10 += '<form method="POST" onSubmit="#">'
        margm10 += '<p> Your name: <br><input class="form-control" type="text" name="custname_" id="custname_" placeholder="" value="" /></p>'
        margm10 += '<p> E-mail: <br><input class="form-control" type="email" name="cemail_" id="cemail_" placeholder="Your email ID.." value=""/></p>'
        margm10 += '<a style="font-size:12px; color:#f00f00; margin-top:0">  Please fill out all required fields.</a>'
        margm10 += '<a><br><button class="btn btn-primary btn-sm" type="button" onclick="saveLog_Data()"> Start Chat </button></a></div>'
        margm10 += '</form>'
        margm10 += '</div>'
        let msg10 = { name: "MargBot", message: margm10 };
        this.messages.push(msg10);
        this.updateChatText(chatbox);
        document.getElementById("custname_").focus()
    
        window.nuser = window.nuser + 1
      }
    } else {
      window.margq = window.margq + 1
    }
    if (window.margq === 1) {
      /*let margm2 = '<div class="row d-flex" style="margin-top:-3px">'
      margm2 += '<a> For more information, visit at : </a></div><div>'
      margm2 += '<a href="https://www.margcompusoft.com" target="_blank">www.margerp.com</a>'
      margm2 += '</div>'
      let msg2 = { name: "MargBot", message: margm2 };
      this.messages.push(msg2);
      this.updateChatText(chatbox); */
    }
  }



  getapi(llink) {  
  fetch('http://127.0.0.1:5000/myapqn', {
        method: 'POST',
        body: JSON.stringify({ message: llink }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(r => r.json())
        .then(r => {
          let lqtns = '';
          if (r.qtns) {
            lqtns = r.qtns
            let textm = ''
            var objjson = JSON.parse(lqtns);
            let margmT = '<div class="row d-flex" style="color:#000000">'
                  margmT += '<a> Do you mean : </a>'
                  margmT += '</div>'
            let tmpqid = ''
            let tmpqtn = ''
            for (let i = 0; i < objjson.data.length; i++) {
              tmpqid = (objjson.data[i].QuestionId);
              tmpqtn = i + 1 + '. ' + (objjson.data[i].Question);
              tmpqid = tmpqid +"~"+objjson.data[i].Question;
              tmpqid = tmpqid.replace(/"/g,"'");
              margmT += '<div class="py-1">'
              margmT += '<a href="#" ' + 'id="' + tmpqid+ '"' + ' onClick="chatbox.getansr(this.id); return false;">' + tmpqtn + '</a>'
              margmT += '</div>'
            }            
            let margm10 = '<div class="row d-flex"  style="color:#ffffff; margin-top:0">' +"&nbsp;"+ llink +"&nbsp;"
            margm10 += '</div>'
            let msg10 = { name: "User", message: margm10 };
            this.messages.push(msg10);
            let msgTq = { name: "MargBot", message: margmT };
            this.messages.push(msgTq);
            this.updateChatText(chatbox)
            textField.value = ''
          }
        }).catch((error) => {
        console.error('Error:', error);
        this.updateChatText(chatbox)
      });
      }


  getdemo(lcode) {
  let ltitle = ""
  if(lcode==1) { ltitle =" Software Demo "; } else {  ltitle =" Software Pricing "; }
  let margm10 = '<div class="row d-flex"  style="color:#ffffff; margin-top:0">'+"&nbsp;"+ ltitle +"&nbsp;"
    margm10 += '</div>'
    let msg10 = { name: "User", message: margm10 };
    this.messages.push(msg10);
    let margmT = '<div class="row d-flex">'
    if(lcode==1) {
      margmT += '<a class="cbot-btn2" href="https://www.margcompusoft.com/landingPages/billing_software.html?utm_source=Direct&utm_medium=homepage&utm_campaign=Free_Demo" target="_blank">Book Demo for Marg Erp</a>'
      margmT += '</div>'
      margmT += '<div class="row d-flex">'
      margmT += '<a class="cbot-btn2" href="https://margcompusoft.com/books/landing-page.html" target="_blank">Book Demo for Marg Book</a>'
  }
  else {
    margmT += '<a class="cbot-btn2" href="https://margcompusoft.com/marg-price-list.html" target="_blank">Price for Marg Erp Software</a>'
      margmT += '</div>'
      margmT += '<div class="row d-flex">'
      margmT += '<a class="cbot-btn2" href="https://margcompusoft.com/books/pricing.html" target="_blank">Price for Marg Book Software</a>'
  }
    margmT += '</div>'
    let msgT = { name: "MargBot", message: margmT };
    this.messages.push(msgT);
    this.updateChatText(chatbox)
  }


  // 0512 to be replaced
  getansr(c_id) {
    if (c_id){
      var fields = c_id.split("~");
      var cid = fields[0];
      var cqtn = fields[1];
      if (cid > 0) {
        const anscode = cid;
        fetch('http://127.0.0.1:5000/myapan', {
          method: 'POST',
          body: JSON.stringify({ message: anscode }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(r => r.json())
          .then(r => {
            let lansr = r.ansr
            //saveDynamicDataToFile(lanst)
            if (lansr) {
              let cansr = ""
              cansr = cqtn
              let margmT = '<div class="row" style="color:#ffffff; margin-left:0px">'+ cansr
              margmT += '</div>'              
              let msgT = { name: "User", message: margmT };
              this.messages.push(msgT);
              let margmTa = '<div class="row" style="color:#000000; margin-left:1px">' + lansr
              margmTa += '</div>'
              let msgTa = { name: "MargBot", message: margmTa };
              this.messages.push(msgTa);
              this.updateChatText(chatbox)
            }
          })
      }
      else {
        /*zendKey(cqtn)
        document.getElementById("to_focus")
        document.addEventListener("keydown", function(event) {
          document.getElementById("ze-snippet").click();
          event.click()
          //if (event.ctrlKey && event.key === "z") {
          //  alert("undo")
          //}
        });
        */      
        livechat_(cqtn)
      }

    }
    
  }
  // till here

  toggleState(chatbox) {
    this.state = !this.state;

    if (this.state | !this.state) {
      chatbox.classList.add('chatbox--active')
      document.getElementById("myquery").disabled=true;
      document.getElementsByClassName('chatbox__footer')[0].style.visibility = 'hidden';
      //document.getElementsByClassName('chatbox__footer')[0].style.visibility = 'visible';

      //alert(this.state);
      if (window.value === 0) {
        window.value = window.value + 1;
        fetch('http://127.0.0.1:5000/wishme', {
          method: 'POST',
          body: JSON.stringify({ message: "" }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(r => r.json())
          .then(r => {



            let msgKB = '<div class="" style="box-sizing:border-box; padding: 05px; margin-top:0px; font-size:16px; bgcolor:#ccd; color:#916">'
            msgKB += '<a id="" class="">KnowledgeBase - easy to know-how . </a></div>'
            msgKB += '<div class="" style="color:#000000; margin-top:0px;">'
            msgKB += '<form class=""><input type="text" placeholder="Search" value="" tabindex="-1">'
            msgKB += '<button class="btn btn-outline-primary btn-sm align-items-center" type="button" tabindex="-1" disabled="">'
            msgKB += '<svg color="inherit" viewBox="0 0 32 32"></svg></button>'
            msgKB += '</form></div>'
            let msgKBS = { name: "MargBot", message: msgKB };
            this.messages.push(msgKBS);
            this.updateChatText(chatbox);

             
            let margm2 = '<div class="" style="color:#000000; margin-top:0px;">'
            margm2 += '<a> 👋 Hey! ' + r.greets + " <br> Welcome to Bizinwiz - the #1 business messenger for connecting you to your customers. Looking to learn more about Bizinwiz? 👀 . </br></a></div>"
            let msg2 = { name: "MargBot", message: margm2 };
            this.messages.push(msg2);
            this.updateChatText(chatbox);

            //Loadings
            let msgload = '<div class="row d-flex" style="color:#df0df0; margin-top:-3px;">'
            msgload += '<img src="bot/images/loadings.gif" width="15px" height="27px"></img></div>'
            let msgl = { name: "MargBot", message: msgload };
            this.messages.push(msgl);
            this.updateChatText(chatbox);
            //
            //alert(document.getElementById("location").value());
            

            setTimeout(() => {
            this.messages.splice(-1)
            let margmT = '<div class="row d-flex w-55" style="color:#000000; margin-top:0px;">'
            margmT += '<button class="btn btn-outline-primary btn-sm align-items-center" onclick="myNewUser()">Yes, please! . </button>'            
            margmT += '</div>'
            let msgT = { name: "MargBot", message: margmT };
            this.messages.push(msgT);
            let margmT2 = '<div class="row d-flex" style="color:#000000; margin-top:0px">'
            margmT2 += '<button class="btn btn-outline-primary btn-sm align-items-center" onclick="justbrowse()">Just browsing! . </button>'
            margmT2 += '</div>'          

            let msgT2 = { name: "MargBot", message: margmT2};
            this.messages.push(msgT2);
            this.updateChatText(chatbox)            
            }, 1000);
          }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
          });

      }
    } else {      
       chatbox.classList.remove('chatbox--active')
    }
  }

  onSendButton(chatbox) {
    var textField = chatbox.querySelector("input[name='cquery']");

    if(document.getElementById("custname_")){
    	if(document.getElementById("custname_").value==""){
    	this.messages.splice(-1)
			let marglive1 = ""
			marglive1 += '<div class="row d-flex">'
			marglive1 += '<p class="row d-flex">'+"&nbsp;"+' User : <input type="text" name="custname_" disabled="true" id="custname_" style="width:221px" value="" /></p>'
			marglive1 += '<p class="row d-flex">'+"&nbsp;"+' Email: <input type="email" name="cemail_" disabled="true" id="cemail_" style="width:221px" value="" /></p>'
			marglive1 += '<p class="row d-flex"><button type="button" onclick="" disabled="true" style="width:77px">Submit</button></p>'
			marglive1 += '</div>'
			let msgTt = { name: "MargBot", message: marglive1 };
			this.messages.push(msgTt);
    	}    	
    }

    //chatbox.querySelector('input');
    let text1 = textField.value
    if (text1 === "") {
      return;
    }
    let msg1 = { name: "User", message: text1 }
    this.messages.push(msg1);

    //var val = text1
    var val = text1.toLowerCase()
    if (window.euser === 1 && (/^\d{4}$/.test(val) | /^\d{5}$/.test(val) | /^\d{6}$/.test(val) | /^\d{7}$/.test(val) | /^\d{10}$/.test(val) | val.substring(0, 2) > 0)) {
      //(/^\d{4}$/.test(val) | /^\d{5}$/.test(val) | /^\d{6}$/.test(val) | /^\d{7}$/.test(val) | /^\d{10}$/.test(val)) | val.length > 0 {
      fetch('http://127.0.0.1:5000/myapin', {
        method: 'POST',
        body: JSON.stringify({ message: text1 }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(r => r.json())
        .then(r => {
          let margmT = '<div class="row d-flex" style="color:#000000"><a>'+"Hi!"+'</a>'
          margmT += '<a style="color:#00004e; font-weight: bold;">'+"&nbsp;"+ r.intro + '</a>'
          margmT += '</div><div class="row d-flex">'
          margmT += '<a >Let me know how may I assist you? Please type the keyword for your query e.g. <u> </a>'
          margmT += '<a href="" style="text-decoration:none" id="Update software" onClick="chatbox.getapi(this.id); return false;"> <b>Update Software</b>; </a>'
          margmT += '<a href="" style="text-decoration:none" id="Create company" onClick="chatbox.getapi(this.id); return false;"> <b>Create company</b>; </a>'
          margmT += '<a href="" style="text-decoration:none" id="Registration" onClick="chatbox.getapi(this.id); return false;"> <b>Registration</b>; </a>'          
          margmT += '<a href="" style="text-decoration:none" id="Licence verification" onClick="chatbox.getapi(this.id); return false;"> <b>Licence verification</b> etc.</a>'
          margmT += '</div>'
          let msgT = { name: "MargBot", message: margmT };
          this.messages.push(msgT);
          this.updateChatText(chatbox)
          textField.value = ''
        }).catch((error) => {
          console.error('Error:', error);
          this.updateChatText(chatbox)
          textField.value = ''
        });
      return false
    }

    //**********************
    if (!(val.includes(" hi ") | val.includes("hello") | val.includes("bye") | val.includes("are you")
      | val.includes("talk ") | val.includes("talk") | val.includes("chat with human ") | val.includes("chat with exe") | val.includes("chat to ")
      | val.includes("speak ") | val.includes("speak") | val.includes("your name") | val.includes("my name") | val.length < 3)) {
      fetch('http://127.0.0.1:5000/myapqn', {
        method: 'POST',
        body: JSON.stringify({ message: text1 }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(r => r.json())
        .then(r => {
          let lqtns = '';
          if (r.qtns) {
            lqtns = r.qtns
            let textm = ''
            var objjson = JSON.parse(lqtns);
            let margmT = '<div class="row d-flex" style="color:#000000">'
            margmT    += '<a> Maybe these answers will help you: </a>'
            margmT    += '</div>'
            let tmpqid = ''
            let tmpqtn = ''
            for (let i = 0; i < objjson.data.length; i++) {
              tmpqid  = (objjson.data[i].QuestionId);
              tmpqtn  = i + 1 + '. ' + (objjson.data[i].Question);
              tmpqid  = tmpqid +"~"+objjson.data[i].Question;
              tmpqid  = tmpqid.replace(/"/g,"'");
              margmT += '<div class="py-1">'
              margmT += '<a href="#" ' + 'id="' + tmpqid+ '"' + ' onClick="chatbox.getansr(this.id); return false;">' + tmpqtn + '</a>'
              margmT += '</div>'
            }

            margmT += '<div class="row d-flex" style="box-sizing:border-box; padding: 15px;">'
            margmT += '<a href="#" onClick="more_data(); return false;" style="color:#00004e; font-weight: bold;">' + ' More others...' + '</a>'
            //margmT += '<p class="row d-flex"><button type="button" onclick="more_data()" style="width:208; bgcolor:#ccd; color:#916"> View More </button></p>'
            margmT += '</div>'

            let msgTq = { name: "MargBot", message: margmT };
            this.messages.push(msgTq);
            this.updateChatText(chatbox)
            textField.value = ''
          }
          //else {
          else {
              //For mysql - https://ipinfo.io
              let newrec = myjsid+";"+'userInput'+";"+'emailInput'+"; 10"+text1
              text1 = newrec.split(';');
              alert(text1);
              fetch('http://127.0.0.1:5000/newqtns', {
                method: 'POST',
                body: JSON.stringify(text1),
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
              })
                .then(r => r.json())
                .then(r => {
                  //textField.value = ''
                }).catch((error) => {
                  //console.error('Error:', error);
                });
                //For mysql end

              let margmT = '<div class="row d-flex mb-2" style="color:#000000; margin-top:0">'
              margmT += '<a> Perhaps I didn’t understand your question correctly. Select the topic or write your question below.</a>'
              margmT += '</div><div class="w-100 d-flex">'
              margmT += '<a class="btn btn-secondary btn-sm  mx-1 text-white mb-2" href="https://www.margcompusoft.com/landingPages/billing_software.html?utm_source=Direct&utm_medium=homepage&utm_campaign=Free_Demo" target="_blank" style="color:#0000FF">Book Demo</a>'
              margmT += '<a class="btn btn-secondary btn-sm  mx-1 text-white mb-2" href="https://www.youtube.com/watch?v=VvXe7S7Z5sg" target="_blank" style="color:#0000FF">Watch our Videos</a>'
              margmT += '</div><div class="w-100 d-flex">'
              margmT += '<a class="btn btn-secondary btn-sm  mx-1 text-white mb-2" href="https://margcompusoft.com/marg-price-list.html" target="_blank" style="color:#0000FF">Pricing 💰</a>'
              margmT += '<a class="btn btn-secondary btn-sm  mx-1 text-white mb-2" href="https://www.facebook.com/groups/margcompusoft" target="_blank" style="color:#0000FF">Join our community</a>'
              margmT += '</div><div class="row d-flex">'
              margmT += '<a> For more information, visit at : </a></div><div>'
              margmT += '<a href="https://www.margerp.com" target="_blank">www.margerp.com</a>'
              margmT += '</div>'

              //0712 - zendesk
              //<!-- Start of margerphelp Zendesk Widget script --><script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=26a82c44-075f-4ce0-a84e-0e1f1c10acf3"> </script><!-- End of margerphelp Zendesk Widget script -->
              // src="https://static.zdassets.com/ekr/snippet.js?key=3955e715-307b-45b0-88a1-359b09d505aa"> pooja
              /*var keyval = "3955e715-307b-45b0-88a1-359b09d505aa"//"c1c8d3ed-53a0-4a9e-924c-04c8be780a31" //"5EDSTTArTupESgIZBp7kjgS9WGwd1wBK"
              var tmpKey = "key~"+keyval
              margmT += '<div class="row d-flex"></div><div class="row d-flex">'
              margmT += '<button class="btn btn-primary btn-sm" '+ 'id="' + tmpKey+ '"' + ' onClick="chatbox.getansr(this.id); return false;">Contact with our executive here.</button>'
              margmT += '</div>'*/
              //
              let msgT = { name: "MargBot", message: margmT };
              this.messages.push(msgT);
              this.updateChatText(chatbox)
              textField.value = ''
              


              return false
            }          

        }).catch((error) => {
          console.error('Error:', error);
          this.updateChatText(chatbox)
          textField.value = ''
        });

    } else {

      //***************
      fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: JSON.stringify({ message: text1 }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(r => r.json())
        .then(r => {
          let msg2 = { name: "MargBot", message: " 🤖 " + r.answer };
          let msgNon = msg2['message']
          let margnans = ""
          if (msgNon.includes("noans")) {
            margnans += '<div class="row d-flex">'
            margnans += '<a> Perhaps I didn’t understand your question correctly. Please write a more elaborate question below.</a>'
            margnans += '</div><div class="row d-flex"><a> For more information, visit at : </a></div><div>'
            margnans += '<a href="https://www.margerp.com" target="_blank">www.margerp.com</a>'
            margnans += '</div>'
            msg2 = { name: "MargBot", message: margnans }
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
          } else {
            //08.12.2021 from
            if (msg2['message'].includes("*live*chat*")) {
              /*var keyval = "3955e715-307b-45b0-88a1-359b09d505aa" //"5EDSTTArTupESgIZBp7kjgS9WGwd1wBK"
              var tmpKey = "key~"+keyval
              let margnans = ""
              margnans += '<div class="row d-flex">'
              margnans += '<a> Please hold for a moment while I am transferring you to our executive.</a>'
              margnans += '</div><div class="row d-flex"><a> </a></div>'
              margnans += '<div class="row d-flex"></div><div class="row d-flex">'
              tmpKey = "key~James"
              margnans += '<button class="btn btn-success btn-sm" '+ 'id="' + tmpKey+ '"' + ' onClick="chatbox.getansr(this.id); return false;" style="border-radius: 5px; width:90px"> Starts chat </button>'
              margnans += '</div>'         
              msg2 = { name: "MargBot", message: margnans }
              */
              let emailInput=""
              let userInput=""
              let marglive = ""
              marglive += '<form method="POST" onSubmit="#">'
              marglive += '<div class="row d-flex" style="box-sizing:border-box; padding: 15px;">'
              marglive += '<p class="row d-flex"> User : <input type="text" name="custname_" id="custname_" placeholder="Your Name" value="" /></p>'
              marglive += '<p class="row d-flex"> Email: <input type="email" name="cemail_" id="cemail_" placeholder="Your email ID.."  value="" /></br>'
              marglive += '<p class="row d-flex"><button type="button" onclick="saveLog_Data()" style="width:77px; bgcolor:#ccd; color:#916">Submit</button></p>'
              marglive += '</div>'
              marglive += '</form>'
              msg2 = { name: "MargBot", message: marglive }
              this.messages.push(msg2);
              this.updateChatText(chatbox)
              textField.value = ''
              document.getElementById("custname_").focus()              
            }
            //Till here
            else {
            	this.messages.push(msg2);
	            this.updateChatText(chatbox)
	            textField.value = ''
	            return false
	        }	        
          }

        }).catch((error) => {
          console.error('Error:', error);
          this.updateChatText(chatbox)
          textField.value = ''
        });
      //***
    }
  }

  updateChatText(chatbox) {
    var lcsetf = document.querySelector('.chatbox__messages').scrollHeight;
    const dt = new Date();
    var hours = dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours();
    var am_pm = dt.getHours() >= 12 ? "PM" : "AM";
    var month = new Array();
    month[0] = "Jan.";
    month[1] = "Feb.";
    month[2] = "Mar.";
    month[3] = "Apr.";
    month[4] = "May";
    month[5] = "Jun.";
    month[6] = "Jul.";
    month[7] = "Aug.";
    month[8] = "Sep.";
    month[9] = "Oct.";
    month[10] = "Nov.";
    month[11] = "Dec.";
    //var dtd = (("0"+dt.getDate()).slice(-2)) +" "+ (month[dt.getMonth()]) +","+ (dt.getFullYear()) +", "+ (("0"+hours).slice(-2)) +":"+ (("0"+dt.getMinutes()).slice(-2))
    var dtd = (("0" + hours).slice(-2)) + ":" + (("0" + dt.getMinutes()).slice(-2))
    var html = '';
    //this.messages.slice().reverse().forEach(function (item, index) {
    //alert(item.message.replace(/(?:\\[]|[\\]+)+/g, ""))
    //})
    this.messages.slice().reverse().forEach(function (item, index) {
      if (item.name === "MargBot") {
        if (!(item.message.includes(" . "))) {
          html += '<div style="font-size:10px; color:#666666">' + dtd + ' ' + am_pm + '</div>'
        }        
        html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
      } else {
        html += '<div style="display: inline-block;font-size:10px;color:#666666;text-align: right; width: 100%">' + dtd + ' ' + am_pm + '</div>'
        html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
      }
    });
    const chatmessage = document.querySelector('.chatbox__messages');
    chatmessage.innerHTML = html;
    //chatmessage.scrollBy(0, chatmessage.scrollHeight);
    chatmessage.scrollBy(0, lcsetf);
    document.getElementById("myquery").focus()    
  }
}

 function minimize(){
  document.getElementById("minimize").classList.remove("chatbox--active"); 
 }

const chatbox = new Chatbox();
chatbox.display();

function myNewUser() {
  chatbox.newUser('Y');
}

function justbrowse() {
  let msgend = '<div class="" style="color:#000000; margin-top:0px;">'
  msgend += '<a> No problem. </a><p></p>'
  msgend += "<a> Just open up a new chat if you need us. We're always here to help 👋 </a></div>"
  msgend += '<div></div>'
  let msge = { name: "MargBot", message: msgend };
  chatbox.messages.push(msge);
  chatbox.updateChatText(chatbox);
  //document.getElementById("myquery").disabled=true;
  document.getElementById("myquery").placeholder=" Your conversation has ended"
  document.getElementsByClassName('chatbox__footer')[0].style.visibility = 'visible';
}


function employees(emp) {
  //alert(emp);
  var emplno = emp;
}


function saveLog_Data() {  
  var userInput  = document.getElementById("custname_").value;
  var emailInput = document.getElementById("cemail_").value;
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (!(userInput) | userInput.length<4 ) {
    document.getElementById("custname_").focus()
    document.getElementById("custname_").style.color = '#d00'
    return false 
  }
  else {
    if (!(emailInput) | reg.test(emailInput) == false) {
      document.getElementById("cemail_").focus()
      document.getElementById("cemail_").style.color = '#d00'
      return false
    }
  }
  chatbox.messages.splice(-1)
  let msgmail = ""
	msgmail += '<div class="row d-flex" style="box-sizing:border-box; padding:3px;">'
	msgmail += '<a style="text-transform: capitalize;">😀 Hello '+userInput+'! </a>'
  //msgmail += '<br> <a> Thank you for your confidence and belief in our vision. </a>'
  // Please use only the buttons to navigate through the conversation . </a>'
  msgmail += '</div> <hr/>'
  
  //margnans += '<a><iframe src="https://fast.wistia.net/embed/iframe/693xiz1jdb?videoFoam=true" title="Navigation and Dashboard (Overview) - Freshdesk Mint Video" frameborder="0" class="wistia_embed" name="wistia_embed" allowfullscreen="" width="100%" height="100%" sandbox="allow-scripts allow-forms allow-same-origin allow-presentation"></iframe></a>'
  //We can ensure you that your trust is a seal with us through our services.
  //What brings you here today?
  //Great, what can I help you with?
  //Product features  Pricing  Contact Sales   Main menu

	msgmail += '<div class="row d-flex align-items-center" >'
  msgmail += "<a> &nbsp; You'll be notified here by the email <br> &nbsp; &nbsp;"+emailInput+".</a>"
  msgmail += '</div>'
	msgm = { name: "MargBot", message: msgmail }
	chatbox.messages.push(msgm);
  chatbox.updateChatText(chatbox);

  //Loadings 👈 Go to menu
  let msgload = '<div class="row d-flex" style="color:#df0df0; margin-top:-3px;">'
  msgload += '<img src="bot/images/loadings.gif" width="15px" height="27px"></img></div>'
  let msgl = { name: "MargBot", message: msgload };
  chatbox.messages.push(msgl);
  chatbox.updateChatText(chatbox);
  //
  setTimeout(() => {
  chatbox.messages.splice(-1)
  let msgemp = ""
  msgemp += '<div class="row d-flex " >'
  msgemp += "<a>Quick question for you: How many employees work at your company? </a>"
  msgemp += '</div> <hr/>'
  msgemp += '<div class="row d-flex align-items-center" >'
  msgemp += '<ul class="container-fluid ">'
  msgemp += '<li class="row d-flex justify-content-center align-items-center"><a class="btn btn-outline-primary btn-sm align-items-center" href="#" ' + 'id="0-10"' + ' onClick="employees(this.id)">under 10 employees</a></li>'
  msgemp += '<li class="row d-flex justify-content-center align-items-center"><a class="btn btn-outline-primary btn-sm align-items-center" href="#" ' + 'id="10-50"' + ' onClick="employees(this.id); return false;">10 - 50 employees</a></li>'
  msgemp += '<li class="row d-flex justify-content-center align-items-center"><a class="btn btn-outline-primary btn-sm align-items-center" href="#" ' + 'id="51-100"' + ' onClick="employees(this.id); return false;">51 - 100 employees</a></li>'
  msgemp += '<li class="row d-flex justify-content-center align-items-center"><a class="btn btn-outline-primary btn-sm align-items-center" href="#" ' + 'id="100+"' + ' onClick="employees(this.id); return false;">100+ employees</a></li></ul>'
  msgemp += '</div>'

  let msg2T = { name: "MargBot", message: msgemp };
  chatbox.messages.push(msg2T);
  chatbox.updateChatText(chatbox);

  //For mysql - https://ipinfo.io
  let newrec = myjsid+";"+userInput+";"+emailInput+";"+""
  //alert(newrec);
  text1 = newrec.split(';');
  fetch('http://127.0.0.1:5000/newqtns', {
    method: 'POST',
    body: JSON.stringify(text1),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(r => r.json())
    .then(r => {
      //textField.value = ''
    }).catch((error) => {
      //console.error('Error:', error);
    });
    //For mysql end

  document.getElementsByClassName('chatbox__footer')[0].style.visibility = 'visible';  
  //document.getElementById("myquery").focus()
  document.getElementById("myquery").placeholder=" Choose an option"
  }, 1000);

  /*
  msgemp += '<div class="row d-flex align-items-center" >'
  msgemp += '<ul class="container-fluid ">'
  msgemp += '<li class="row d-flex justify-content-center align-items-center"><a class="btn btn-outline-primary btn-sm align-items-center" href="https://margcompusoft.com/books/landing-page.html" rel="nofollow noopener" target="_blank" tabindex="0">E-commerce</a></li>'
  msgemp += '<li class="row d-flex justify-content-center align-items-center"><a class="btn btn-outline-primary btn-sm" href="https://margcompusoft.com/books/landing-page.html" rel="nofollow noopener" target="_blank" tabindex="0">CMS/Website-builder</a></li>'
  msgemp += '<li class="row d-flex justify-content-center align-items-center"><a class="btn btn-outline-primary btn-sm" href="https://margcompusoft.com/books/landing-page.html" rel="nofollow noopener" target="_blank" tabindex="0">Book Demo for Marg Book</a></li>'
  msgemp += '<li class="row d-flex justify-content-center align-items-center"><a class="btn btn-outline-primary btn-sm" href="https://margcompusoft.com/books/landing-page.html" rel="nofollow noopener" target="_blank" tabindex="0">Main menu</a></li></ul>'
  msgemp += '</div>'
  */

  //chatbox.updateChatText(chatbox);
  //document.getElementsByClassName('chatbox__footer')[0].style.visibility = 'visible';
  //document.getElementById("myquery").focus()
  return false
}


function more_data() {
  let margnans = '<div class="row d-flex">'
  margnans += '<a style="color:#00004e; font-weight: bold;"> Please write question more elaborately.</a>'
  margnans += '</div><div class="row d-flex"><a> For more information, visit at : </a></div><div>'
  margnans += '<a href="https://www.margerp.com" target="_blank">www.margerp.com</a>'
  margnans += '</div>'
  let msg2 = { name: "MargBot", message: margnans }
  chatbox.messages.push(msg2);
  chatbox.updateChatText(chatbox)
  textField.value = ''
  return false
}


function loadDoc(str) {
  if (str.length == 0) {
    document.getElementById("txtHint").innerHTML = "";
    return;
  } else {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("txtHint").innerHTML = this.responseText;
        //var new_window = window.open(null, '','_blank');
        //new_window.document.write(xmlhttp.responseText);
      }
    };
    xmlhttp.open("GET", "livechats\index.php?logid=" + str, true);
    //xmlhttp.open("POST","index.php?logid=" + str, true);
    //xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send();
  }
}


function employees(emp)
  {
    let newrec = ""+";"+""+";"+""+";"+emp
    //alert(newrec);
    text1 = newrec.split(';');
    fetch('http://127.0.0.1:5000/newqtns', {
      method: 'POST',
      body: JSON.stringify(text1),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(r => r.json())
      .then(r => {
        //textField.value = ''
      }).catch((error) => {
        //console.error('Error:', error);
      });
      //For mysql end
      chatbox.messages.splice(-1)

      let msgemp = ""
      msgemp += '<div class="row d-flex " style="color:#000000; margin-top:0" >'
      msgemp += "<a>Quick question for you: How many employees work at your company? . </a>"
      msgemp += '</div>'
      let msg2T = { name: "MargBot", message: msgemp };
      chatbox.messages.push(msg2T);

      let margm1 = '<div class="row d-flex"  style="color:#ffffff; margin-top:0">' +"&nbsp;"+ emp +"&nbsp;"
      margm1 += '</div>'
      let msg1 = { name: "User", message: margm1 };
      chatbox.messages.push(msg1);

      let msgswt = ""
      msgswt += '<div class="row d-flex " >'
      msgswt += "<a>Sweet! . </a>"
      msgswt += '</div>'
      let msgst = { name: "MargBot", message: msgswt };
      chatbox.messages.push(msgst);

      //Loadings 👈 Go to menu
      let msgload = '<div class="row d-flex" style="color:#df0df0; margin-top:-3px;">'
      msgload += '<img src="bot/images/loadings.gif" width="15px" height="27px"></img></div>'
      let msgl = { name: "MargBot", message: msgload };
      chatbox.messages.push(msgl);
      chatbox.updateChatText(chatbox);
      //
      chatbox.messages.splice(-1)

      
      setTimeout(() => {
      let margm100 = '<div class="row d-flex" style="color:#000000; margin-top:0">'
      margm100 += '<a> Select the topic or write your question below. </a>'
      margm100 += '</div> <hr/ style="color:#000000; margin-top:0">'
      margm100 += '<div class="row d-flex" style="box-sizing:border-box; padding:0px; text-align:center;">'
      margm100 += '<div style="box-sizing:border-box; padding:11px; text-align:center;"><p class="btn btn-outline-primary btn-sm align-items-center" href="#" ' + 'id="0-10"' + ' onClick="employees(this.id)">Sales questions</p>'
      margm100 += '&ensp;<p class="btn btn-outline-primary btn-sm" href="#" ' + 'id="10-50"' + ' onClick="employees(this.id); return false;">Support questions</p>'
      margm100 += '&ensp;<p class="btn btn-outline-primary btn-sm align-items-center" href="#" ' + 'id="51-100"' + ' onClick="employees(this.id); return false;">Talk to agent</p>'
      margm100 += '&ensp;<p class="btn btn-outline-primary btn-sm align-items-center" href="#" ' + 'id="100+"' + ' onClick="employees(this.id); return false;">Free trial</p>'
      margm100 += '</div></div>'

      let msg100 = { name: "MargBot", message: margm100 };
      chatbox.messages.push(msg100);
      chatbox.updateChatText(chatbox);      
      }, 1000);

      document.getElementsByClassName('chatbox__footer')[0].style.visibility = 'visible';        
      document.getElementById("myquery").placeholder=" Write a message..."
      document.getElementById("myquery").disabled=false;
      document.getElementById("myquery").focus()
  }




/*Regular space: &nbsp;
Two spaces gap: &ensp;
Four spaces gap: &emsp;

*/