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
        xhr.onload = function(e) {
            //saves api response in a variable 
            //and transforms response into a valid JSON
            const res = JSON.parse(xhr.response);
            console.log(res);
        }
    }

}