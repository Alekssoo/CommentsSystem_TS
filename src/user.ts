export default class User {
    public name: string; 
    public photo: string;
    public accounts: Array<any> = new Array();
    public favorites: Array<String>;
    public rated: Array<String>  

    constructor() { 
        this.name = "";
        this.photo = "";
        this.favorites = [];
        this.rated = []
        this.accounts = [];

    }

    public load() {
        //подгружаем ранее сохраненных пользователей
        if (localStorage.getItem("accounts")) {
            this.accounts = JSON.parse(localStorage.getItem("accounts") as string)
        }
    }

    public save():void {
        localStorage.setItem("accounts", JSON.stringify(this.accounts))
    }

    public addName(name: string):void {
        this.name = name;
    }

    public async addPhoto(url:string):Promise<string | void> {
        
        this.photo = url
        // try {
        //     const response = await fetch(url)
        //     // const data = response
        //     this.photo = response.url
        //     console.log("response.url = ", response.url);
        //     // return response.url
        // } catch(error) {
        //     console.log(error);
        // }

    }
    


    // public async create(name:string, photo:string):Promise<string | void> {
    public async create(url:string):Promise<string | void> {
        this.load()

        let that = this
        await fetch(url)
            .then((response) => response.json())
            .then(function(data) {
            let users = data.results;
            users.forEach((user:any) => {
                    that.addName(user.login.username);
                    that.addPhoto(user.picture.medium)
                               
                    that.accounts.push({
                        name:that.name,
                        photo:that.photo,
                        rated:that.rated,
                        favorites:that.favorites,
                    })
                    console.log("создали нового пользователя")
                // } else {
                //     that.addName(that.accounts[that.accounts.length-1].name);
                //     that.addPhoto(that.accounts[that.accounts.length-1].photo)
                // }
                
                //сохраняем нового пользователя
                that.save()
                // localStorage.setItem("accounts", JSON.stringify(that.accounts))
            })
            // return authors.map((author:any) => {
            //     img.src = author.picture.medium;
            //     this.addName(`${author.name.first} ${author.name.last}`);
            //     append(li, img);
            //     append(li, span);
            //     append(ul, li);
            // })
            })
            .catch(function(error) {
                console.log(error);
            });
        //создаем нового пользователя
        // console.log("Введенное имя = ", name)
        // console.log("результат проверки на имя = ", this.accounts.some(account => account.name === name));


        
        // this.addName(name)

        // if (this.accounts.some(item => item.name === name)) {
        //     for (const account of this.accounts) {
        //         if (account.name === name) {
        //             await this.addPhoto(account.photo)
        //         }    
        //     }
        // } else {
        //     await this.addPhoto(photo)
        //     .then(() => {
        //             this.accounts.push({
        //                 name:this.name,
        //                 photo:this.photo})
        //             console.log("создали нового пользователя")
        //             //сохраняем нового пользователя
        //             localStorage.setItem("accounts", JSON.stringify(this.accounts))
        //     })
        // }


        
    }

    public changeFavorites(id: string):void {
        this.load()
        // const change:boolean | String = this.favorites.find((item) => item === id) != false;
        const change = this.favorites.find((item) => item === id);
        if (!change) {
            this.favorites.push(id)
            console.log("пользователь: ", this.name)
            console.log(`добавлен ${id}, список избранного: `, this.favorites)
        } else {
            this.favorites = this.favorites.filter((elem) => elem !== id);
            console.log("пользователь: ", this.name)
            console.log(`не добавлен ${id}, список избранного: `, this.favorites)
        }
        const user = this.accounts.find((account) => account.name === this.name);
        user.favorites = this.favorites
        this.save()

        

    }

    public changeRated(id: string):void {
        this.load()
        // const change:boolean | String = this.favorites.find((item) => item === id) != false;
        const change = this.rated.find((item) => item === id);
        if (!change) {
            this.rated.push(id)
            console.log("пользователь: ", this.name)
            console.log(`добавлен ${id}, список рейтинга: `, this.rated)
        } else {
            return
        }
        const user = this.accounts.find((account) => account.name === this.name);
        user.rated = this.rated
        this.save()
    }
    
}