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

    public show(form:HTMLElement | null, inputBlockComment:HTMLElement | null, accounts:Array<any>) :void {
        if (!form) { return }
        if (!inputBlockComment) { return }

        this.load()
        // создаем новый абзац из отправленного комментария
        
        for (const comment of this.elements) {
            if (document.getElementById(`${comment.id}`)) {
                continue
            }
            let newText = document.createElement("p");
            let bottomComment = document.createElement("div");
            let ansButton:HTMLButtonElement = document.createElement("button");
            newText.textContent = comment.text
            newText.classList.add("comment_text")
            bottomComment.classList.add("comment_bottom")
            // ansLink.href = "#input_block"
            
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

            // ansButton.innerHTML += `
            // <svg width='26' height='25' id='svg7384' xmlns:osb='http://www.openswatchbook.org/uri/2009/osb' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#' xmlns='http://www.w3.org/2000/svg' viewBox="0 0 16 16">
            //     <g id='layer12' inkscape:label='actions' style='display:inline' transform='translate(-265.00039,-60.996639)'>
            //         <path d='m 272.0004,62.5 -6.46875,4.5 6.46875,4.5 0,-2.5 2,0 c 1.36491,0 2.5716,0.87335 2.9375,2 0.43763,1.34754 -1.4375,4 -1.4375,4 0,0 4,-1.5 4,-4.75 0,-3.12352 -2,-5.25 -5,-5.25 l -2.5,0 z' id='path4400-3' sodipodi:nodetypes='ccccsscsscc' style='color:#bebebe;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:normal;font-family:Sans;-inkscape-font-specification:Sans;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;display:inline;overflow:visible;visibility:visible;opacity:0.5;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0;marker:none;enable-background:accumulate'/>
            //     </g>
            // </svg>
            // Ответить`

            // ansButton.innerHTML += `
            // <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            //     width="26px" height="25px" viewBox="0 0 634.975 634.975"
            //     xml:space="preserve">
            //     <path d="M283.123,159.091V25.423c0.771-6.686-1.065-13.598-6.232-18.743c-8.975-8.907-23.524-8.907-32.5,0L18.03,254.889
            //         c-4.782,4.759-6.822,11.06-6.504,17.292c-0.317,6.232,1.722,12.533,6.504,17.292l225.137,246.849
            //         c8.408,7.184,23.819,11.264,33.746,1.359c5.145-5.145,7.388-9.473,6.618-16.158c0,0,0-122.586,0-135.98
            //         c149.578,0,284.855,107.695,311.711,249.432c18.085-41.564,28.238-87.344,28.238-135.572
            //         C623.48,311.457,471.093,159.091,283.123,159.091z"/>
            // </svg>
            // Ответить`


            // ansButton.textContent += "Ответить"
            newText.id = "commentReadyText"
            
            //клонируем и переделываем контэйнер с комментарием для показа
            let newReadyCommentBlock = document.createElement("div")
            newReadyCommentBlock.classList.add("comment_block")
            newReadyCommentBlock.insertAdjacentHTML('afterbegin', inputBlockComment.innerHTML);
            
            // определяем и удаляем: блок для ввода,отправки из введ-го коммента 
            // и уведомление о длине, заменяем на текстовый абзац

                newReadyCommentBlock.id = `${comment.id}`
                let commentElem = newReadyCommentBlock.querySelector(".comment")
                let commentLengh = newReadyCommentBlock.querySelector(".comment_length")
                let submit = newReadyCommentBlock.querySelector(".comment_submit")
                let commentPhoto:HTMLImageElement | null = newReadyCommentBlock.querySelector(".comment_photo_img")
                let commentPhotoMob:HTMLImageElement | null = newReadyCommentBlock.querySelector(".comment_photo_mob")
                let contentElem:Element | null = newReadyCommentBlock.querySelector(".comment_content")
                
                if (commentElem && contentElem && commentLengh && submit) {
                    commentElem.remove()
                    commentLengh.remove()
                    submit.remove()
                    contentElem.appendChild(newText)
                    bottomComment.appendChild(ansButton)
                    contentElem.appendChild(bottomComment)

                    // оформляем имя польз-ля(label) с датой (псевдоэлемент dataset.el)
                    const labelName:HTMLLabelElement | null = contentElem.querySelector(".comment_username");
                    
                    if (labelName) {
                        labelName.classList.add("comment_ready_username")
                        labelName.htmlFor = "commentReadyText"
                        labelName.dataset.el = comment.time
                        labelName.textContent = comment.author
                    }

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
                console.log("длина текст = 0, отключаем кнопку")
                button.setAttribute('disabled', '');
                lengthCommentElem.textContent = "Макс. 1000 символов"
                lengthCommentElem.classList.remove("alarm_text")
                button.dataset.el = ""
            } else if (lenComment && lenComment > 1000) {
                console.log("длина текста > 1000, отключаем кнопку")
                button.setAttribute('disabled', '');
                lengthCommentElem.textContent = `${lenComment}/${this.maxlength}`
                lengthCommentElem.classList.add("alarm_text")
                button.dataset.el = "Слишком длинное сообщение"

            } else { 
                console.log("длина текста в норме, включаем кнопку")
                button.removeAttribute("disabled")
                lengthCommentElem.textContent = `${lenComment}/${this.maxlength}`
                button.dataset.el = ""
                lengthCommentElem.classList.remove("alarm_text")
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