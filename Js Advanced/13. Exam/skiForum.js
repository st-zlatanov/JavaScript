class Forum {
    constructor(){
        this._users = [];
        this._questions = [];
        this._id = 1;
    }

    register(username,password,repeatPassword, email){
        if(!username || !password || !repeatPassword || !email){
            throw new Error("Input can not be empty");
        }
        if(password !== repeatPassword){
            throw new Error("Passwords do not match");
        }
        if(this._users.includes(username) || this._users.includes(email)){
            throw new Error("This user already exists!");
        }
        this._users.push({username, password, email});
        return `${username} with ${email} was registered successfully!`;

    }

    login(username, password){
        let loggedUsers = [];
        
        const foundUser = this._users.find(u => u.username === username);
        if(!foundUser){
            throw new Error("There is no such user");
        }
         if(foundUser.password===password){
                loggedUsers.push({username: username,password: password});
                return 'Hello! You have logged in successfully';
            }
        
        
    }

    logout(username, password){
        const foundUser = this._users.find(u => u.username === username);
        if(!foundUser){
            throw new Error("There is no such user");
        }else{
            if(foundUser.password===password){
                return 'You have logged out successfully';
            }
        }
    }

    postQuestion(username, question){
        const foundUser = this._users.find(u => u.username === username);
        if(!foundUser ){
            throw new Error("You should be logged in to post questions");
        }
        if(!question){
            throw new Error("Invalid question");
        }
        let id1 = this._id;
        this._questions.push({question: question, username: username, id: id1, answer: ''});
        this._id++;
        return 'Your question has been posted successfully';
    }

    postAnswer(username, questionId, answer){
        const foundUser = this._users.find(u => u.username === username);
        if(!foundUser ){
            throw new Error("You should be logged in to post answers");
        }
        if(!answer){
            throw new Error("Invalid answer");
        }
        if(!this._questions.indexOf(questionId)){
            throw new Error ("There is no such question");
        }
        let index = this._questions.indexOf(questionId);
        this._questions.push({answer: answer});
        return "Your answer has been posted successfully";
        }

        showQuestions(){
            return `Question ${this._id} by ${username}: ${question}\n
            ----${username}: ${answer}`;
        }
        
}   

let forum = new Forum();

forum.register('Michael', '123', '123', 'michael@abv.bg');
forum.register('Stoyan', '123ab7', '123ab7', 'some@gmail@.com');
forum.login('Michael', '123');
forum.login('Stoyan', '123ab7');

forum.postQuestion('Michael', "Can I rent a snowboard from your shop?");
forum.postAnswer('Stoyan',1, "Yes, I have rented one last year.");
forum.postQuestion('Stoyan', "How long are supposed to be the ski for my daughter?");
forum.postAnswer('Michael',2, "How old is she?");
forum.postAnswer('Michael',2, "Tell us how tall she is.");

console.log(forum.showQuestions());
