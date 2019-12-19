document.addEventListener("DOMContentLoaded",() => {
    let select = document.querySelector("#select")
    let form = document.querySelector("#form")
    let movieContent = document.querySelector(".movieContent")
    let movieName = document.querySelector("#movieName")
    let releaseYear = document.querySelector("#releaseYear")
    let description = document.querySelector("#description")
    let userInput = document.querySelector("#userInput")
    let ul = document.querySelector("#ul")

   


    let data = []
    let name = ""

    const addOptionsToSelect = (arr) => {
        for (let i=0; i < arr.length; i++){
            let option = document.createElement("option")
            option.innerText = arr[i].title
            option.value = i
            select.appendChild(option)
        }

    }

    const addValuesToOption = async () => {
        let res = await axios.get("https://ghibliapi.herokuapp.com/films")
        data = res.data
        addOptionsToSelect(data)
        
    }
   addValuesToOption()

   const displayInfo = (value) => {
    name = data[value].title
    movieName.innerText = data[value].title
    releaseYear.innerText= data[value].release_date
    description.innerText= data[value].description

   }
    select.addEventListener("change",(event)=> {
        ul.innerHTML=""
        
       let value = event.target.value
       displayInfo(value)
   })
    
    const comment = (userInput) =>{
        let li = document.createElement("li")
        li.innerText = `${name}: ${userInput}`
        ul.appendChild(li)
    }

    form.addEventListener("submit",(event) => {
        
        event.preventDefault()
        let input = userInput.value
        comment(input)
        form.reset()
        
    })

    
   
})