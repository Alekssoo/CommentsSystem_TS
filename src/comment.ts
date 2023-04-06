export default class MyComment {
    public text: string | null; 
    public rating: number; 
    public maxlength: number;
    public elements: Array<any> = new Array(); 
    public time: string;
    public author: string;
    private id: number;
    public isFavourite:boolean;

    constructor() {
        this.rating = 0;
        this.maxlength = 1000;
        this.elements = []
        this.text = ""
        this.author = ""
        this.time = ""
        this.id = 0
        this.isFavourite  = false
    }

    public create(text: string, author: string):void {
        // сначала подгружаем из localstorage массив с комментами
        // устанавливаем текущий id = его длине
        this.load()
        this.id = this.elements.length
        this.setTime(Math.floor(Date.now()/1000))
        this.text = text
        this.author = author

        console.log("id для нового элемента равен = ", this.id)

        this.elements.push({
            id: this.id,
            author: this.author,
            text: this.text,
            rating: this.rating,
            time: this.time,
            isFavourite:this.isFavourite
            })

        this.save()
        
        //this.id++;
        

        //this.save() //метод готов, но чуть позже начнем сохранять
        
    // document.body.insertBefore(newDiv, my_div);
    }

    public load(): void {
        if (localStorage.getItem("comments")) {
            this.elements = JSON.parse(localStorage.getItem("comments") as string)
        }
    }

    // public show(form:HTMLElement | null, readyComment:HTMLElement):void {
    //     if (!form) { return }

    //     // создаем новый абзац из отправленного комментария
        
    //     for (let i = this.id; i <= this.elements.length-1; i++){
    //         let newText = document.createElement("p");
    //         newText.textContent = this.elements[i].text
    //         newText.classList.add("comment_text")
    //         newText.id = "commentReadyText"
            
    //         //клонируем и переделываем контэйнер с комментарием для показа
    //         let newComment = readyComment.cloneNode(true)
            
            
    //         // определяем и удаляем, блок для ввода,отправки из введ-го коммента 
    //         // и уведомление о длине, заменяем на текстовый абзац
    //         for (const item of newComment.childNodes) {
    //             const parentBlock = item.parentElement
    //             let commentElem = parentBlock?.querySelector(".comment")
    //             let commentLengh = parentBlock?.querySelector(".comment_length")
    //             let submit = parentBlock?.querySelector(".comment_submit")

    //             let contentElem:HTMLElement | null | undefined = parentBlock?.querySelector(".comment_content")
    //             if (commentElem && contentElem && commentLengh && submit) {
    //                 commentElem.remove()
    //                 commentLengh.remove()
    //                 submit.remove()
    //                 contentElem.appendChild(newText)

    //                 // оформляем имя польз-ля(label) с датой (псевдоэлемент dataset.el)
    //                 const labelName:HTMLLabelElement | null = contentElem.querySelector(".comment_username");
    //                 if (labelName) {
    //                     labelName.classList.add("comment_ready_username")
    //                     labelName.htmlFor = "commentReadyText"
    //                     labelName.dataset.el = this.elements[i].time
    //                     labelName.textContent = this.elements[i].author
    //                     // labelName.dataset.el = this.time
    //                 }
    //                 break

    //                 // return
    //             }
    //         }

    //         // и добавляем итоговый блок в форму
    //         form.appendChild(newComment)
    //     }
    // }

    public show(form:HTMLElement | null, readyComment:HTMLElement | null, accounts:Array<any>) :void {
        if (!form) { return }
        if (!readyComment) { return }

        this.load()
        // создаем новый абзац из отправленного комментария
        
        for (const comment of this.elements) {
            if (document.getElementById(`${comment.id}`)) {
                continue
            }
            let newText = document.createElement("p");
            newText.textContent = comment.text
            newText.classList.add("comment_text")
            newText.id = "commentReadyText"
            
            //клонируем и переделываем контэйнер с комментарием для показа
            
            let newComment = readyComment.cloneNode(true)
            
            
            // определяем и удаляем: блок для ввода,отправки из введ-го коммента 
            // и уведомление о длине, заменяем на текстовый абзац
            for (const item of newComment.childNodes) {
                
                const parentBlock = item.parentElement
                if (!parentBlock) {return}
                parentBlock.id = `${comment.id}`
                let commentElem = parentBlock?.querySelector(".comment")
                let commentLengh = parentBlock?.querySelector(".comment_length")
                let submit = parentBlock?.querySelector(".comment_submit")
                let commentPhoto:HTMLImageElement | null = parentBlock.querySelector(".comment_photo_img")
                let commentPhotoMob:HTMLImageElement | null = parentBlock.querySelector(".comment_photo_mob")

                let contentElem:Element | null = parentBlock?.querySelector(".comment_content")
                if (commentElem && contentElem && commentLengh && submit) {
                    commentElem.remove()
                    commentLengh.remove()
                    submit.remove()
                    contentElem.appendChild(newText)

                    // оформляем имя польз-ля(label) с датой (псевдоэлемент dataset.el)
                    const labelName:HTMLLabelElement | null = contentElem.querySelector(".comment_username");
                    
                    if (labelName) {
                        labelName.classList.add("comment_ready_username")
                        labelName.htmlFor = "commentReadyText"
                        labelName.dataset.el = comment.time
                        labelName.textContent = comment.author
                    }

                    for (const account of accounts) {
                        console.log("зашли в цикл по массиву аккаунтов")
                        if ((account.name === comment.author) && commentPhoto && commentPhotoMob) {
                            // console.log("условие для присвоения ресурса с фото выполнено")
                            commentPhoto.src = account.photo
                            commentPhotoMob.src = account.photo
                            break
                        }
                    }
                    
                    break
                }
            }

            // и добавляем получившийся итоговый блок в форму
            form.appendChild(newComment)
        }
    }

    private setTime(UNIC_timestamp:number): void {
        let now = new Date(UNIC_timestamp * 1000)
        let year = now.getFullYear();
        let month = (now.getMonth() >= 10 ? now.getMonth() : `0${now.getMonth()}`)
        let date = now.getDate()
        let hour = (now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`)
        let min = (now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`)
        let time = `${date}.${month}.${year} ${hour}:${min}`
        this.time = time
    }

    public checkLength(commentTextElem: HTMLTextAreaElement | null, button: HTMLButtonElement | null, lengthComment:HTMLElement | null):void {
        let lenComment = commentTextElem?.value?.length
        // проверка длины сообщения
        if (button && lengthComment && lengthComment.parentElement) {
            if (!lenComment) {
                button.setAttribute('disabled', '');
                lengthComment.textContent = "Макс. 1000 символов"
                lengthComment.classList.remove("alarm_text")
                button.dataset.el = ""
            } else if (lenComment && lenComment > 1000) {
                button.setAttribute('disabled', '');
                lengthComment.textContent = `${lenComment}/${this.maxlength}`
                lengthComment.classList.add("alarm_text")
                button.dataset.el = "Слишком длинное сообщение"

            } else { 
                button.removeAttribute("disabled")
                lengthComment.textContent = `${lenComment}/${this.maxlength}`
                button.dataset.el = ""
                lengthComment.classList.remove("alarm_text")
            }
        }
    }

    public clear(comment:HTMLTextAreaElement | null):void {
        if (comment) {
            comment.value = "";
        }

    }

    public save():void {
        localStorage.setItem("comments", JSON.stringify(this.elements))
    }

    public prepareText():string {
        // метод для генерации текста комментариев
        const text = []
        text.push(`Называть проект Молочникова, в котором играют прекрасные Янковский и Эйдельштейн,
         'сериалом с блогерами' - это реально несправедливо`)
        text.push(`у Молочникова уже играла в спектакле Екатерина Варнава, которая тоже не актриса,
         и получилось отлично.`)
        text.push(`Вполне возможно, и Ивлеева с хорошим режиссером себя еще покажет`)
        text.push(`Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично,
         стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах 
         с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого все переиначили`)
        text.push(`'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали 
        очередной среднячковый сериал на один раз в лучшем случае`)
        text.push(`Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд
         на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал `)
        text.push(`Объективности в отзывах самый минимум.`)
        text.push(`Какую-то дичь несешь, братиш!`)
        
        let randInd:number = Math.floor(Math.random()*((text.length-1)+1))
   
        return text[randInd]    
    }
}