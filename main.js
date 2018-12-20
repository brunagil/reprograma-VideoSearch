const search = document.getElementById("search")
const result = document.getElementById("results")

    search.addEventListener("keyup", function() { 

        const searchInput = search.value 

        result.innerHTML = `<div class="loading">
                                <img id="#loading" src="img/loading.gif"/>
                            <div>`

        get_data(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchInput}&key=${gkey}`)
        
        .then(function(data) {
           data = JSON.parse(data) 
           console.log(data)

            result.innerHTML="" 

            let listaDeVideos = data.items   
            
    
        if (listaDeVideos.length > 0) {
            for (const video of listaDeVideos) { 
                
                const linkDoVideo = video.id.videoId
                const nomeDoVideo = video.snippet.title
                const descricaoDoVideo = video.snippet.description
                const imgDoVideo = video.snippet.thumbnails.medium.url

                results.innerHTML +=
                `<div class="results__videos">
                <a href="https://www.youtube.com/watch?v=${linkDoVideo}"> 
                    <div class="results__videos-description">
                    <h1>${nomeDoVideo}</h1>
                    <p>${descricaoDoVideo}</p>  
                    </div>          
                    <img src="${imgDoVideo}"/>
                    </a>
                    </div>`               
                }
        } else {
            results.innerHTML = `<p>Nenhum resultado encontrado</p>` 
        }
         
        })
        .catch(function(error) {
            results.innerHTML = `${error}` 
        })
    })
