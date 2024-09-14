
const display_popup =document.getElementById("popup")
const div_card= document.getElementById("cards")
const close_btn = document.querySelector(".close-btn")

async function fetch_data() {
    const data = await fetch("https://fakestoreapi.com/products")
    const result = await data.json() 

    
    result.map((element)=>{
        const card = document.createElement("div")
        const img = document.createElement("img")
        const ttl = document.createElement("h3")
        const category = document.createElement("p")
        const price = document.createElement("p")
        const rate = document.createElement("p")
        const desc = document.createElement("p")

        card.setAttribute("class","card")
        img.setAttribute("src",element.image)
        img.setAttribute("alt","Image not found")
        ttl.setAttribute("class","title")
        category.setAttribute("class","para category")
        price.setAttribute("class","para price")
        rate.setAttribute("class","para rate")
        desc.setAttribute("class","desc")
        ttl.innerText = element.title.split(' ').slice(0,4).join(' ')
        category.innerText = element.category
        price.innerText = `Price - ₹${element.price}`
        rate.innerText = `Rating - ${element.rating.rate}`
        // desc.innerText = element.description.split(' ').slice(0,5).join(' ')

        card.append(ttl,img,category,price,rate)
        div_card.appendChild(card)
        
        //for popup
        const descrip = document.querySelector(".descrip")
        const two = document.querySelector(".two")
        const popimage = document.querySelector(".popimage")
        card.addEventListener("click",()=>{
            display_popup.style.display="block"
            div_card.style.display="none"
            descrip.innerText = `Description - ${element.description.split(' ').slice(0,50).join(' ')}`
            popimage.setAttribute("src",element.image)
            two.innerText = convertRatingToStars(element.rating.rate)
            
            function convertRatingToStars(rating) {
                const wholeStars = Math.floor(rating); // Full stars count
                const hasHalfStar = rating % 1 >= 0.5; // Check for half star
            
                // Repeat full star symbol for whole stars
                let stars = '★'.repeat(wholeStars);
            
                // Add half star symbol if there's a half star
                if (hasHalfStar) {
                    stars += '☆';
                }
            
                return stars;
            }

            display_popup.append(popimage,descrip,two)
        })
        
        close_btn.addEventListener("click",()=>{
            display_popup.style.display="none"
            div_card.style.display="flex"

        })
       
       

    })
}
fetch_data()
