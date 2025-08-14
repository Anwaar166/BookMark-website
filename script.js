let section=document.querySelector("#section");
let websiteName=document.querySelector("#name");
let websiteURL=document.querySelector("#url");
let bookMarkButton=document.querySelector(".button");
let removeBMButton=document.querySelector(".remove1BookMark");
let deleteEntireBM=document.querySelector(".deleteBookMark")
//for local storage
window.addEventListener("DOMContentLoaded",()=>{
    let saved=localStorage.getItem("bookMarks")
    if(saved){
        section.innerHTML=saved
         section.classList.add("bookmarkWidth")
    }
})



//for BooKmark
bookMarkButton.addEventListener("click",(event)=>{
event.preventDefault()
    let websiteNameValue=websiteName.value.toLowerCase().trim();
    let websiteURLValue=websiteURL.value.toLowerCase().trim();
    if(!websiteNameValue || !websiteURLValue){
    alert("plese fill the filds for BookMark")
    return
    }
    if(!websiteURLValue.startsWith("http://") && !websiteURLValue.startsWith("https://")){
        websiteURLValue="https://"+websiteURLValue
    }
      let normalizedInputURL=new URL(websiteURLValue).href.toLowerCase();
        let bookMark=document.querySelectorAll(".div")
        let dublicatefound=false;
        bookMark.forEach((bookmark)=>{
            let anchorTags=bookmark.querySelector("a")
            let linkName=anchorTags.textContent.toLowerCase()
            let url=anchorTags.href.toLowerCase()
            if(websiteNameValue==linkName || normalizedInputURL==url){
                alert("This website Exists")
                dublicatefound=true;
            }
        })
        if(dublicatefound){
            return
            
        }
    let bookmarkSaveBox=document.createElement("div");
    bookmarkSaveBox.setAttribute("class","div");
    bookmarkSaveBox.innerHTML=` <a href="${websiteURLValue}" target="_blank">${websiteNameValue}</a>`;
    section.append(bookmarkSaveBox);
   section.classList.add("bookmarkWidth")
    localStorage.setItem("bookMarks",section.innerHTML)
    setTimeout(()=>{
        websiteName.value=""
        websiteURL.value=""
    },100)
})

//delet All bookmarks
deleteEntireBM.addEventListener("click",()=>{
   if(section.querySelectorAll(".div").length==0){
    alert("Please first BookMark any Website")
   }
   else if(confirm("Do you really want to delete BookMark!")){
     let remove= localStorage.removeItem("bookMarks")
       section.classList.remove("bookmarkWidth")
       section.innerHTML=""
   }
   else{
    return
   }

})
removeBMButton.addEventListener("click",()=>{
let nameToRemove=websiteName.value.trim().toLowerCase();
let urlToRemove=websiteURL.value.trim().toLowerCase();
if(!nameToRemove && !urlToRemove){
    alert("Please enter webiste name or Url to remove") 
    return; 
}
  let removebookMark=document.querySelectorAll(".div")
        let found=false;
        removebookMark.forEach((bookmark)=>{
            let anchorTags=bookmark.querySelector("a")
            let linkName=anchorTags.textContent.toLowerCase()
            let url=anchorTags.href.toLowerCase()
            if(nameToRemove && nameToRemove==linkName || urlToRemove && urlToRemove==url){
               bookmark.remove()
                found=true;
            }
        })
        if(found){
           localStorage.setItem("bookMarks",section.innerHTML)
            
        }
        else{
            alert("Please first bookMark the Website")
        }

})