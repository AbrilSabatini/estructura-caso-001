# Caso 001 - API REST con Node.js

Este proyecto es una API REST básica construida con Node.js, sin frameworks, que sirve información de productos desde una base de datos MySQL.

## Estructura del proyecto

caso-001/  
└── src/  
ㅤㅤ├── data/  
ㅤㅤ│   └── products.json  
ㅤㅤ├── database/  
ㅤㅤ│   └── connection.js  
ㅤㅤ├── utils/  
ㅤㅤ│   ├── response.js  
ㅤㅤ│   ├── getIdFromUrl.js  
ㅤㅤ│   └── getBody.js  
ㅤㅤ├── validators/  
ㅤㅤ│   └── validateProduct.js  
ㅤㅤ├── controllers/  
ㅤㅤ│   └── products.controller.js  
ㅤㅤ├── routes/  
ㅤㅤ│   └── productsRouter.js  
ㅤㅤ└── index.js  
               




## Inicio

1. Clonar el repositorio:

    ```
    git clone https://github.com/AbrilSabatini/estructura-caso-001.git
    cd Caso-001
    ```

2. Instalar las dependencias:
    ```
    npm install
    ```

3. Crear un archivo `.env` a partir de `.env.template`

4. Ejecutar:
    ```
    npm run dev
    ```
