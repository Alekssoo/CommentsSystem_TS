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

    public prepareReadyBlockComment(parentBlock: Element | null, comment:any, accounts:Array<any>): HTMLDivElement {

        let readyBlockString = `
                <div class="comment_photo">
                    <img src="/sources/user.png" width="61" height="61" alt="user_photo" class="comment_photo_img">
                </div>
                <div class="comment_content">
                    <div class="comment_main_ready">
                        <div class="comment_main_head">
                            <img src="/sources/user.png" width="50" height="50" alt="user_photo" class="comment_head_item comment_photo_mob">
                            <label for="commentReadyText_${comment.id}" class="comment_head_item comment_username comment_ready_username" data-el=${comment.time}>${comment.author}</label>                 
                        </div>
                        <p class="comment_text" id="commentReadyText_${comment.id}">${comment.text}</p>
                    </div>
                    <div class="comment_bottom">
                        <button class="comment_answer_button opacity_text" type="button">
                            <div style="display:flex">
                                <svg width="21" height="20" id="svg7384" xmlns:osb="http://www.openswatchbook.org/uri/2009/osb" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" style="margin-right:10px">
                                    <g id="layer12" style="display:inline" transform="translate(-265.00039,-60.996639)">
                                        <path d="m 272.0004,62.5 -6.46875,4.5 6.46875,4.5 0,-2.5 2,0 c 1.36491,0 2.5716,0.87335 2.9375,2 0.43763,1.34754 -1.4375,4 -1.4375,4 0,0 4,-1.5 4,-4.75 0,-3.12352 -2,-5.25 -5,-5.25 l -2.5,0 z" id="path4400-3" sodipodi:nodetypes="ccccsscsscc" style="color:#bebebe;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:normal;font-family:Sans;-inkscape-font-specification:Sans;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;display:inline;overflow:visible;visibility:visible;opacity:0.5;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0;marker:none;enable-background:accumulate"></path>
                                    </g>
                                </svg>
        
                            Ответить</div>
                        </button>
                        <button class="comment_favour opacity_text" type="button" data-favour="not">
                            <svg fill="#000000" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 471.701 471.701" xml:space="preserve">
                                <g>
                                    <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                        c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                        l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                        C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                        s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                        c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                        C444.801,187.101,434.001,213.101,414.401,232.701z"/>
                                </g>
                            </svg>
                            <span class="comment_favour_text">В избранное</span>
                        </button>
                        <div class="comment_rating">
                            <button class="comment_rating_button positive comment_rating_item" data-change="minus" type="button">-</button>
                            <span class="comment_rating_value comment_rating_item">${comment.rating}</span>
                            <button class="comment_rating_button negative comment_rating_item" data-change="plus" type="button">+</button>
                        </div>
                    </div>
                    <div class="comment_answers">       
                        
                    </div>
                </div>`

            let readyBlock = document.createElement('div')
            readyBlock.innerHTML = readyBlockString
            readyBlock.classList.add("comment_block")
            readyBlock.id = comment.id
            // readyBlock.dataset.rating = comment.rating

            // оформляем имя польз-ля(label) с датой (псевдоэлемент dataset.el)
            const labelElem:HTMLLabelElement | null = readyBlock.querySelector(".comment_username");
            this.prepareLabelPart(parentBlock, labelElem, readyBlock, comment, accounts)

            return readyBlock

    }

    public showAll(inputBlockComment:HTMLElement | null, accounts:Array<any>) :void {
        this.load()
        
        for (const comment of this.elements) {
            if (document.getElementById(`${comment.id}`)) {
                // console.log('уже есть элемент с таким id = ', comment.id)
                continue
            }
            this.show(inputBlockComment, accounts, comment)

        }

    }

    public show(inputBlockComment:HTMLElement | null, accounts:Array<any>, comment:any) :void {
        let readyBlockComment = this.prepareReadyBlockComment(inputBlockComment, comment, accounts)

        if (inputBlockComment && readyBlockComment){
            inputBlockComment.insertAdjacentHTML('afterend', readyBlockComment.outerHTML);
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
                // console.log(`введенный текст = (${commentTextElem?.value})`)
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

    protected prepareLabelPart(parentBlock: Element | null, labelElem:HTMLLabelElement | null, newReadyCommentBlock:HTMLElement, comment:any, accounts:any) {
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
    

    // protected prepareBottomPart(bottom:HTMLElement, ansButton:HTMLButtonElement) {
    //     //нижняя часть создаваемого коммента
    //     bottom.classList.add("comment_bottom")
            
    //     ansButton.classList.add("comment_answer_button", "opacity_text")
    //     ansButton.type = "button"
        
    //     ansButton.innerHTML += `
    //         <div style="display:flex; align-items:flex-end">
    //         <svg width='26' height='25' id='svg7384' xmlns:osb='http://www.openswatchbook.org/uri/2009/osb' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#' xmlns='http://www.w3.org/2000/svg' viewBox="0 0 14 14" style="margin-right:10px">
    //             <g id='layer12' style='display:inline' transform='translate(-265.00039,-60.996639)'>
    //                 <path d='m 272.0004,62.5 -6.46875,4.5 6.46875,4.5 0,-2.5 2,0 c 1.36491,0 2.5716,0.87335 2.9375,2 0.43763,1.34754 -1.4375,4 -1.4375,4 0,0 4,-1.5 4,-4.75 0,-3.12352 -2,-5.25 -5,-5.25 l -2.5,0 z' id='path4400-3' sodipodi:nodetypes='ccccsscsscc' style='color:#bebebe;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:normal;font-family:Sans;-inkscape-font-specification:Sans;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;display:inline;overflow:visible;visibility:visible;opacity:0.5;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0;marker:none;enable-background:accumulate'/>
    //             </g>
    //         </svg>
            
    //         Ответить</div>`
    // }

    public changeRating(block:Element | null, button:HTMLElement | null) :void {
        // console.log("зашли в метод изменения рейтинга")
        
        this.load()
        const rating = block?.querySelector(".comment_rating_value")
        if(!block) {return}
         for (let comment of this.elements) {
            if (comment.id == block.id && rating && button?.dataset.change == "plus") {
                // console.log("зашли в обработку клика плюса")
                comment.rating++
                rating.textContent = comment.rating
                
            } else if (comment.id == block.id && rating && button?.dataset.change == "minus") {
                // console.log("зашли в обработку клика минуса")
                comment.rating--
                rating.textContent = comment.rating
            } else if(!(comment.id == block.id)) {
                // console.log("не соответствует id")
            }
            else if(!rating) {
                console.log("не найден рейтинг")
            } else {
                // console.log("не соответствует другим условиям изменения рейтинга")
            }
         }

         if (Number(rating?.textContent) > 0) {
            rating?.classList.remove("negative")
            rating?.classList.add("positive")
         } else if(Number(rating?.textContent) < 0) {
            rating?.classList.remove("positive")
            rating?.classList.add("negative")
         } else {
            rating?.classList.remove("positive")
            rating?.classList.remove("negative")
         }

         
        

        // if (rating && button?.dataset.change == "plus") {
        //     comment.rating++
        //     rating.textContent = comment.rating
        // } else if ((rating && button?.dataset.change == "minus")) {
        //     comment.rating--
        //     rating.textContent = comment.rating
        // }


        this.save()
    }

    public changeFavourList(block:Element | null, button:HTMLElement | null) :void {
        if (!button) {return}
        console.log("зашли в метод избранного")
        if (button.dataset.favour == "not") {
            button.innerHTML = `
                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    width="24px" height="24px" viewBox="0 0 544.582 544.582"
                    xml:space="preserve">
                    <g>
                        <path d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
                            C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
                            c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"/>
                    </g>
                </svg>
                <span class="comment_favour_text">В избранном</span>`
            // button.textContent = "В избранном"
            button.dataset.favour = "yes"
        } else {
            button.innerHTML = `
                <svg fill="#000000" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 471.701 471.701" xml:space="preserve" data-favour="not">
                    <g>
                        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                            c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                            l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                            C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                            s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                            c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                            C444.801,187.101,434.001,213.101,414.401,232.701z"/>
                    </g>
                </svg>
                <span class="comment_favour_text">В избранное</span>`
            // button.textContent = "В избранное"
            button.dataset.favour = "not"
        }
        

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