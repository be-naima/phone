const loadPhone = (phone,limit) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
    .then(res => res.json())
    .then(data => display(data.data,limit))
}

const display = (data,limit) => {
    const container = document.getElementById('container');
    container.textContent='';
    //no phone 
    const notFound = document.getElementById('not-found') 
    const arrayLength = data.length;
    if(limit && arrayLength>10){
        data = data.slice(0,3);
        document.getElementById('show-all').classList.remove('d-none');
    }
    
    if(data.length === 0){
        notFound.classList.remove('d-none')
    }
    else
    {
        notFound.classList.add('d-none');
    }
   
    console.log(data);
    data.forEach(i=> {
    //display phone
    const phonDiv = document.createElement('div')
    phonDiv.classList.add('col')
    phonDiv.innerHTML = `
  
          <div class="card p-4">
            <img src="${i.image}" class="card-img-top w-25" alt="...">
            <div class="card-body">
              <h5 class="card-title">${i.phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <button onclick="showDetails('${i.slug}')" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#phoneModal">
    Show Details
  </button>
        </div>
    
    `
   // console.log(i)
  // console.log(i.image);
    container.appendChild(phonDiv)
    });
    //stop loader
    toggle(false)
}
const showDetails = (info) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${info}`)
    .then(res => res.json())
    .then(data => modal(data.data))
}
const modal = data =>{
    console.log(data.image);
    document.getElementById('phoneModalLabel').innerText = data.name;
    const imageContainer = document.getElementById('modalBody')
    imageContainer.innerHTML = `
    <img src="${data.image}" class="card-img-top w-25">
        
         <p>Storage: ${data.mainFeatures.storage ? data.mainFeatures.storage : 'no storage'} </p>

    `

  

}

const toggle = isLoading =>{
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }


}
const search = (limit) =>{
    //start loader 
    toggle(true);
    const searchField = document.getElementById('search-field').value;
    loadPhone(searchField,limit)
}
const searchLimit = () =>{
    search(10);

}
const showAll = () =>{
    search()
}

document.getElementById('search-field').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
     search(10)
    }
});
loadPhone('phone');