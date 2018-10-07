class UserController {

	constructor(){
		let $ = document.querySelector.bind(document);
		this._inputUserName = $("#username");	
	}

	searching(event) {
        event.preventDefault();
		let user = new User(
			this._inputUserName.value
		);
		if(user !== undefined) {
            this.requestAPI(this._inputUserName.value);        
        }else {
			alert("Insira algum usuário!");
		}
    }

    requestAPI(user) {
        const URL = 'https://api.github.com/users/'+user;
        //instance class responsible for consumption of api
        const xhr = new XMLHttpRequest();
        //sets requisition options
        xhr.open('GET', URL, true);
        //send request to api
        xhr.send();
        //treats data asynchronously
        
        xhr.onload = function() {
            //saves api response in a variable 
            //and transforms response into a valid JSON
            if (xhr.status === 200) {
                const res = JSON.parse(xhr.response);
                console.log(res);
                let div = document.getElementById("result");
                createTd('td', res.avatar_url, div);
                createTd('td', res.bio, div);
                createTd('td', res.email, div);
                createTd('td', res.followers, div);
                createTd('td', res.following, div);

                //res.bio,res.email,res.followers,res.following
                
            }else{
                alert("Usuário Inválido!");
            }   
        }
        function createTd(tag, data, div){
            let element = document.createElement(tag);
            let value = document.createTextNode(data);
            element.appendChild(value);
            div.appendChild(element);
        }
    }
}