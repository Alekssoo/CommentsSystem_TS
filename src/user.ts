export default class User {
    public name: string; 
    public photo: string;
    public accounts: Array<any> = new Array();  
    constructor() { 
        this.name = "";
        this.photo = "";
        this.accounts = []
    }

    private load() {
        //подгружаем ранее сохраненных пользователей
        if (localStorage.getItem("accounts")) {
            this.accounts = JSON.parse(localStorage.getItem("accounts") as string)
        }
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
                    photo:that.photo})
                console.log("создали нового пользователя")
                //сохраняем нового пользователя
                localStorage.setItem("accounts", JSON.stringify(that.accounts))
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

    public writeComment():void {
        
    }

}