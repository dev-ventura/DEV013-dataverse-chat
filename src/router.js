//Esta variable almacena información sobre las rutas en tu SPA.
let ROUTES = {};

//  va a ser la referencia al elmento html en donde vamos a dibujar el contenido de nuestros componentes
let rootEl = '';

//nos va a permitir setear un valor a nuestras variables
//y saber si el valor es correcto
export const setRootEl = (newRootElementValue) => {
  // validar si el valor que se le va  asignar a la variable sea correcto
  //validar si newRootElementValue es un objeto html
  rootEl = newRootElementValue;
}

export const setRoutes = (newRoutesValue) => {
  // opcional Lanzar errores si las rutas no son un objeto
  // opcional Lanzar errores si las rutas no definen una ruta /error
  if (typeof newRoutesValue === "object") {
    if (newRoutesValue['/error']) {
      // asignar RUTAS
      ROUTES = newRoutesValue;
      //console.log("routes", ROUTES);
    }
  }
}

//esta es opcional segun el README
export const queryStringToObject = (queryString) => {
// convierte la cadena de consulta a URLSearchParams
  const newURL = new URLSearchParams(queryString);
  console.log("Aqui se ve la new url", newURL);
// convierte URLSearchParams en un objeto
  const objectURL = Object.fromEntries(newURL);
// devolver el objeto
  console.log("Aqui vemos el objecturl", objectURL);
  return objectURL;
}

// props va a ser un objeto vacio 
const renderView = (pathname, props = {}) => {
  // borrar el elemento raíz(el elmento div root)
  let template;
  const root = rootEl;
  root.innerHTML = '';
  //console.log(ROUTES);
  // busca la vista correcta en RUTAS para el nombre de ruta
  if (ROUTES[pathname]) {
    template = ROUTES[pathname];
  } else {
    template = ROUTES['/error'];
  }
  //console.log('aqui es template', template);
  const component = template(props);
  //console.log(typeof component);
  console.log("es el componente ", component);
  root.appendChild(component);
  // en caso de que no se encuentre, renderice la vista de error
  // renderiza la vista correcta pasando el valor de los accesorios
  // agrega el elemento de vista al elemento raíz del DOM
}
export const navigateTo = (pathname, props = {}) => {
  // actualiza el historial de la ventana (navegador) con pushState
  console.log("origin", window.location.origin);
  const URLvisited = window.location.origin + pathname;
  console.log('url', URLvisited);
  window.history.pushState({}, '', URLvisited);

  // renderiza la vista con el nombre de la ruta y los accesorios
  console.log(props);
  renderView(pathname, props);
}

export const onURLChange = (eventObject, props={}) => {
  // analiza la ubicación de la ruta y los parámetros de búsqueda
  console.log(eventObject.currentTarget.location)
  // convierte los parámetros de búsqueda en un objeto
  console.log('search query', eventObject.currentTarget.location.search);

  props = queryStringToObject(window.location.search);
  // renderiza la vista con la ruta y el objeto
  console.log('location', eventObject.currentTarget.location);
  console.log('props', props);
  renderView(eventObject.currentTarget.location.pathname, props);
}
