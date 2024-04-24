window.onload = () => {
    getProductos();
}


const getProductos = async () => {
    await fetch('https://dummyjson.com/products')
    .then( response => response.json() )
    .then( data => {

        console.log( data );

        tarjetaProductos( data.products );

    }).catch( error => {
        console.log( error );
    })
}

const tarjetaProductos = ( productos = [] ) =>{

    let html = '';

    productos.forEach( ({ category, description, id, price, stock, thumbnail, title, brand }) => {

        html += `
            <div class="col-md-4 col-lg-3">
                <div class="card" style="width: 18rem;">
                    <img src="${ thumbnail }" class="card-img-top" alt="${ title }">
                    <div class="card-body">
                        <h4 class="card-title">${ title }</h4>
                        <h5 class="card-subtitle">${ category }</h5>
                        <p class="card-text">${ description }</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Marca: </b>${ brand }</li>
                            <li class="list-group-item"><b>Precio: </b>$${ price } </li>
                            <li class="list-group-item"><b>Stock: </b>${ stock } </li>
                        </ul>

                        <button onclick="getProducto('${ id }')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                            Ver Producto
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    const sectionProducts = document.getElementById('productos');
    sectionProducts.innerHTML = html;

}


const getProducto = async( id ) =>{
    await fetch(`https://dummyjson.com/products/${id}`)
    .then( response => response.json() )
    .then( data => {
        console.log( data );

        showProducto( data );

    }).catch( error => {
        console.log( error );
    })
}

const showProducto = ({ category, description, price, stock, thumbnail, title, brand, images, discountPercentage }) => {

    const srcImg = document.querySelector('.modal img');
    srcImg.src = thumbnail;

    const titleText = document.querySelector('.modal .card-title');
    titleText.textContent = title;

    const subtitleText = document.querySelector('.modal .card-subtitle');
    subtitleText.textContent = category;

    const descText = document.querySelector('.modal .card-text');
    descText.textContent = description;


    const listCategoria = document.getElementById('categoria');
    listCategoria.textContent = category;

    const listMarca = document.getElementById('marca');
    listMarca.textContent = brand;

    const listPrecio = document.getElementById('precio');
    listPrecio.textContent = price;

    const listStock = document.getElementById('stock');
    listStock.textContent = stock;

    const listDescuento = document.getElementById('descuento');
    listDescuento.textContent = discountPercentage;

    showImagenesCarrusel( images );

}

const showImagenesCarrusel = ( imagenes = [] ) => {
    let htmlImagenes = ''; 

    imagenes.forEach( ( imagen, index ) =>{ //active

        htmlImagenes += `
            <div class="carousel-item ${ ( index === 0 ) && 'active' }"  >
                <img src="${ imagen }" class="d-block w-100">
            </div>
        `;

    });

    const corrusel = document.querySelector('#carouselExample .carousel-inner');
    corrusel.innerHTML = htmlImagenes;

    const myCarouselElement = document.querySelector('#carouselExample');

    const carousel = new bootstrap.Carousel(myCarouselElement, {
        interval: 2000,
        touch: false
    });

}