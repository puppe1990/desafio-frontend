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
            this.requestDetailsAPI(this._inputUserName.value);    
            this.requestReposApi(this._inputUserName.value);    
        }else {
			alert("Insira algum usuário!");
		}
    }

    requestDetailsAPI(user) {
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
                // console.log(res);
                let div = document.getElementById("result");
                createTd('td', res.avatar_url, div);
                createTd('td', res.bio, div);
                createTd('td', res.email, div);
                createTd('td', res.followers, div);
                createTd('td', res.following, div);
                
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

    requestReposApi(user) {
        const URL = 'https://api.github.com/users/'+user+'/repos';

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
                let repos = JSON.parse(xhr.response);
                console.log(repos);
                let div = document.getElementById("repos");
                repos = sortByKey(repos, 'stargazers_count');
                repos.map(repo => {
                    createTd('td', repo.name, div);
                    createTd('td', repo.stargazers_count, div);
                    createTd('td', 'https://api.github.com/repos/'+repo.full_name, div, true);
                });
            }else{
                alert("Usuário Inválido!");
            }   
        }

        function createTd(tag, data, div, bool){
            let element = document.createElement(tag);
            let value = document.createTextNode(data);
            element.appendChild(value);
            div.appendChild(element);
            if (bool == true) 
                div.appendChild(document.createElement("tr"));
        }

        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; 
                var y = b[key];
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
    }


}