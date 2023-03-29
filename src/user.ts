export default class User {
    public name: string; 
    public photo: string;
    public accounts: Array<Object> = new Array();  
    constructor() { 
        this.name = "";
        this.photo = "";
        this.accounts = []
    }

    public create(name: string):void {
        this.name = name;
        
    }

    public async addPhoto(url:string):Promise<string | void> {
            try {
                const response = await fetch(url)
                // const data = response
                this.photo = response.url
                console.log("response.url = ", response.url);
                return response.url
            } catch(error) {
                console.log(error);
            }

            
            // .then((response) => {
            //     // ответ на запрос
            //     console.log('response', response);
            //     const result = response.url
            //     console.log('result', result);    
            //     return result;
                
            // })

            // .catch((error) => { console.log(error) });
          
        }

    public writeComment():void {
        
    }

}