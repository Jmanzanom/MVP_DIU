# frontend-sample-app

Basic Frontend Development Environment to start an app with Webpack

This repo includes `Webpack` to start an environment to build frontend views using `React`.

### Requirements

- Node >= 16.13.1
- npm >= 8.1.2

### Quick start

Install dependences

```
npm install
```


### Creacion .env

Para el correcto funcionamiento de la pagina se debe crear un archivo .env que contenga la siguiente informacion:

- REACT_APP_GOOGLE_BOOKS_API_KEY = CLAVE_API_GOOGLE_BOOKS //Aqui se debe reemplazar la clave de la api

- Dicha clave puede ser conseguida en [Google Cloud](https://console.cloud.google.com) en el apartado de "APIs y servicios"

En este apartado debemos buscar "Credenciales" y clickear en el boton Crear credenciales

Por ultimo en el apartado "Biblioteca" dentro de esta misma página, buscaremos "Books API" y la habilitaremos

Launch environment

```
npm run dev
```

Now you can open http://localhost:5050

## Si no funciona (Sale en blanco o compila con 2 errores) entonces: 

npm install @babel/core babel-loader --save-dev

### Packages included

- [Webpack](https://webpack.js.org/)
- [React Router](https://reactrouter.com/en/main)

### About stylesheets

- Sample stylesheets were written using the [BEM](https://getbem.com/) structure

