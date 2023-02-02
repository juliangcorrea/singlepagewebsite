/* <---- variables ----> */

let nav = document.getElementById('nav_menu')
let anchors = document.querySelectorAll('.anchors')
let arrow = document.querySelector('.arrow')
let up = document.querySelector('.arrow-up')
let down = document.querySelector('.arrow-down')
let icon = document.querySelectorAll('.icon')
const form = document.getElementById('contact-form')
let ham = document.querySelector('.burger')
let drop = document.querySelector('.ham-drop')




/* <---- Functionality ----> */

window.addEventListener('scroll', NavArrows)

form.addEventListener('submit', handleSubmit)

ham.addEventListener('click', (e) => {
    e.preventDefault
    if(drop.classList.contains('ham-show')){
        drop.classList.remove('ham-show')
    }
    else{
        drop.classList.add('ham-show')
    }
})

drop.addEventListener('click', (e) => {
    e.preventDefault
    if(drop.classList.contains('ham-show')){
        drop.classList.remove('ham-show')
    }
    else{
        drop.classList.add('ham-show')
    }
})




/* <---- functions ----> */

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
    }
    return a
  }


function NavArrows(){
    let test = nav.getBoundingClientRect()
    let x = (window.innerWidth) / 2 + window.scrollX;
    let y = (window.innerHeight) / 2 + window.scrollY;
    let minDist = 50000;
    let minDistElement = null;
    let sections = document.querySelectorAll('section')
    let list = [...sections]
    let index

    for (let i = 0; i < sections.length; i++) {
        let targetNode = sections[i];
        let centerX = targetNode.offsetLeft + targetNode.offsetWidth / 2;
        let centerY = targetNode.offsetTop + targetNode.offsetHeight / 2;
        let distance = Math.abs(x - centerX) + Math.abs(y - centerY)
        if (distance < minDist) {
            minDist = distance;
            minDistElement = targetNode
        }
    }

    for (e in sections){
        if(sections[e].id == minDistElement.id){
            let test = [sections[e]]
            index = list.indexOf(test[0])
        }
    }

    if(index == list.length - 2){
        up.href = '#{0}'.format(list[index - 1].id)
        down.href = '#start'
    }
    else if (index != 1 && index != 0 && index != list.length - 1){
        up.href = '#{0}'.format(list[index - 1].id)
        down.href = '#{0}'.format(list[index + 1].id)
    }
    else if (index == list.length - 1){
        up.href = '#{0}'.format(list[index - 1].id)
    }
    else if(index == 1){
        up.href = '#head'
        down.href = '#{0}'.format(list[index + 1].id)
    }

    if(test.bottom < -40){
        if(up.classList.contains('hide')){
            up.classList.remove('hide')
        }
        up.classList.add('show')

        if(down.classList.contains('hide')){
            down.classList.remove('hide')
        }
        down.classList.add('show')
    }
    else {
        if(up.classList.contains('show')){
            up.classList.remove('show')
            up.classList.add('hide')
        }

        if(down.classList.contains('show')){
            down.classList.remove('show')
            down.classList.add('hide')
        }
    }

    if(index == list.length - 1){
        if(down.classList.contains('show')){
            down.classList.remove('show')
        }
        down.classList.add('hide')
    }

}


async function handleSubmit(e){
    e.preventDefault()
    const data = new FormData(this)
    const response = await fetch(this.action, {
        method: this.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if(response.ok) {
            this.reset()
            alert("Thanks for contacting us, we'll be answering you soon!")
        }
        else{
            alert('There was an error sending your form')
        }
    })
}
