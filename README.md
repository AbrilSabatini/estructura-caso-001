# Caso 001 - API REST con Node.js

Este proyecto es una API REST básica construida con Node.js, sin frameworks, que sirve información de productos desde un archivo JSON local.

## Estructura del proyecto

caso-001/  
├── src/  
│ ├── data/  
│ │ └── products.json  
│ ├── routes/  
│ │ └── products.js  
│ └── index.js  
├── .env  
├── .gitignore  
└── package.json



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