export default class MyComment {
    public text: string | null; 
    public rating: number; 
    public maxlength: number;
    public elements: Array<any> = new Array(); 
    public time: string;
    public author: string;
    protected id: number;
    public answers: Array<any> = new Array(); 

    constructor() {
        this.rating = 0;
        this.maxlength = 1000;
        this.elements = []
        this.text = ""
        this.author = ""
        this.time = ""
        this.id = 0
        this.answers = []
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
            answers:this.answers
        })

        this.save()

        console.log(`создали коммент с id = ${this.id}`)
    }

    

    public load(): void {
        if (localStorage.getItem("comments")) {
            this.elements = JSON.parse(localStorage.getItem("comments") as string)
        }
    }

    public show(form:HTMLElement | null, inputBlockComment:HTMLElement | null, accounts:Array<any>) :void {
        if (!form) { return }
        if (!inputBlockComment) { return }

        this.load()
        
        
        for (const comment of this.elements) {
            //чтобы не дублировались опубликованные комменты:
            if (document.getElementById(`${comment.id}`)) {
                continue
            }

            // создаем новый абзац из отправленного комментария
            let newText = document.createElement("p");
            newText.textContent = comment.text
            newText.classList.add("comment_text")
            newText.id = `commentReadyText_${comment.id}`

            // и добавляем подвал для готового коммента
            let bottomComment = document.createElement("div");
            let ansButton:HTMLButtonElement = document.createElement("button");
            this.prepareBottomPart(bottomComment, ansButton)
            
            
            //клонируем и переделываем контэйнер с комментарием для показа
            let newReadyCommentBlock = document.createElement("div")
            newReadyCommentBlock.classList.add("comment_block")
            newReadyCommentBlock.insertAdjacentHTML('afterbegin', inputBlockComment.innerHTML);
            
            //удаляем: блок для ввода,отправки из введ-го коммента 
            // и уведомление о длине, заменяем на наполнение готового комментария

            newReadyCommentBlock.id = `${comment.id}`
            
            
            
            newReadyCommentBlock.querySelector(".comment")?.remove()
            newReadyCommentBlock.querySelector(".comment_length")?.remove()
            newReadyCommentBlock.querySelector(".comment_submit")?.remove()

            let contentElem:Element | null = newReadyCommentBlock.querySelector(".comment_content")
            if (contentElem) {  
                contentElem.appendChild(newText)
                bottomComment.appendChild(ansButton)
                contentElem.appendChild(bottomComment)

                // оформляем имя польз-ля(label) с датой (псевдоэлемент dataset.el)
                const labelElem:HTMLLabelElement | null = contentElem.querySelector(".comment_username");
                this.prepareLabelPart(labelElem, newReadyCommentBlock, comment, accounts)
            }
            // и добавляем получившийся итоговый блок в форму
            // form.appendChild(newReadyCommentBlock)
            inputBlockComment.insertAdjacentHTML('afterend', newReadyCommentBlock.outerHTML);
        }
    }

    protected setTime(UNIC_timestamp:number): void {
        let now = new Date(UNIC_timestamp * 1000)
        let year = now.getFullYear();
        let month = (now.getMonth() >= 10 ? now.getMonth() : `0${now.getMonth()}`)
        let date = now.getDate()
        let hour = (now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`)
        let min = (now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`)
        let time = `${date}.${month}.${year} ${hour}:${min}`
        this.time = time
    }

    public checkLength(commentTextElem: HTMLTextAreaElement | null, button: HTMLButtonElement | null, lengthCommentElem:HTMLElement | null):void {
        let lenComment = commentTextElem?.value?.length
        // проверка длины сообщения => изменение кнопки и сообщения над ней
        if (button && lengthCommentElem && lengthCommentElem.parentElement) {
            if (!lenComment) {
                // console.log("длина текст = 0, отключаем кнопку")
                button.setAttribute('disabled', '');
                lengthCommentElem.textContent = "Макс. 1000 символов"
                lengthCommentElem.classList.remove("alarm_text")
                button.dataset.el = ""
            } else if (lenComment && lenComment > 1000) {
                // console.log("длина текста > 1000, отключаем кнопку")
                button.setAttribute('disabled', '');
                lengthCommentElem.textContent = `${lenComment}/${this.maxlength}`
                lengthCommentElem.classList.add("alarm_text")
                button.dataset.el = "Слишком длинное сообщение"

            } else { 
                // console.log("длина текста в норме, включаем кнопку")
                button.removeAttribute("disabled")
                lengthCommentElem.textContent = `${lenComment}/${this.maxlength}`
                button.dataset.el = ""
                lengthCommentElem.classList.remove("alarm_text")
            }
        }
    }

    public clear(commentInputTextElem:HTMLTextAreaElement | null):void {
        if (commentInputTextElem) {
            commentInputTextElem.value = "";
        }

    }

    public save():void {
        localStorage.setItem("comments", JSON.stringify(this.elements))
    }

    protected prepareLabelPart(labelElem:HTMLLabelElement | null, newReadyCommentBlock:HTMLElement, comment:any, accounts:any) {
        if (labelElem) {
            labelElem.classList.add("comment_ready_username")
            labelElem.htmlFor = `commentReadyText_${comment.id}`
            labelElem.dataset.el = comment.time
            labelElem.textContent = comment.author
        }

        let commentPhoto:HTMLImageElement | null = newReadyCommentBlock.querySelector(".comment_photo_img")
        let commentPhotoMob:HTMLImageElement | null = newReadyCommentBlock.querySelector(".comment_photo_mob")
        // // оформляем фото польз-ля
        for (const account of accounts) {
            // console.log("зашли в цикл по массиву аккаунтов")
            if ((account.name === comment.author) && commentPhoto && commentPhotoMob) {
                // console.log("условие для присвоения ресурса с фото выполнено")
                commentPhoto.src = account.photo
                commentPhotoMob.src = account.photo
                break
            }
        }
    }
    

    protected prepareBottomPart(bottom:HTMLElement, ansButton:HTMLButtonElement) {
        //нижняя часть создаваемого коммента
        bottom.classList.add("comment_bottom")
            
        ansButton.classList.add("comment_answer_button", "opacity_text")
        ansButton.type = "button"
        
        ansButton.innerHTML += `
            <div style="display:flex; align-items:flex-end">
            <svg width='26' height='25' id='svg7384' xmlns:osb='http://www.openswatchbook.org/uri/2009/osb' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#' xmlns='http://www.w3.org/2000/svg' viewBox="0 0 14 14" style="margin-right:10px">
                <g id='layer12' style='display:inline' transform='translate(-265.00039,-60.996639)'>
                    <path d='m 272.0004,62.5 -6.46875,4.5 6.46875,4.5 0,-2.5 2,0 c 1.36491,0 2.5716,0.87335 2.9375,2 0.43763,1.34754 -1.4375,4 -1.4375,4 0,0 4,-1.5 4,-4.75 0,-3.12352 -2,-5.25 -5,-5.25 l -2.5,0 z' id='path4400-3' sodipodi:nodetypes='ccccsscsscc' style='color:#bebebe;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:normal;font-family:Sans;-inkscape-font-specification:Sans;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;display:inline;overflow:visible;visibility:visible;opacity:0.5;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0;marker:none;enable-background:accumulate'/>
                </g>
            </svg>
            
            Ответить</div>`
    }

    public prepareText():string {
        // метод для генерации текста "чужих" комментариев
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