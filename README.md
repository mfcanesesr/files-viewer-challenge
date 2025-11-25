# 🚀 Full Stack JavaScript Challenge – Files Viewer (Versión Senior-Ready)

Este proyecto implementa una solución Full Stack para la visualización y procesamiento de archivos CSV obtenidos desde un API externo.  
Incluye un backend en **Node.js + Express** y un frontend en **React**, con arquitectura modular, pruebas automatizadas y una UI optimizada con filtros y paginación.

---

### 🛠️ Tecnologías Principales

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Bootstrap](https://img.shields.io/badge/React%20Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/Chai-A30701?style=for-the-badge&logo=chai&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing Library](https://img.shields.io/badge/testing%20library-323330?style=for-the-badge&logo=testing-library&logoColor=red)

---

## 📁 1. Estructura del Proyecto

```bash
/
├── api/        # Backend (Node.js + Express)
└── frontend/   # Frontend (React)
```

---

## 🧠 2. Arquitectura y Flujo Interno

El sistema sigue un flujo de datos claro y desacoplado:

```
API Externa (CSV)
        ↓
Backend (Node.js)
  - Obtiene lista de archivos
  - Descarga contenido CSV
  - Limpia líneas inválidas
  - Normaliza datos
        ↓
Frontend (React)
  - Consume JSON limpio
  - Filtra por archivo
  - Pagina y muestra en tabla
```

Beneficios:
- Backend actúa como **capa de saneamiento y estandarización**.  
- Frontend recibe un formato consistente sin preocuparse por errores CSV.  
- Fácil de escalar para agregar caché, autenticación o más proveedores.

---

## 🟣 3. Backend (API)

### ⚙️ Configuración de entorno

```bash
PORT=3001
API_EXTERNAL_URL=https://echo-serv.tbxnet.com/v1/secret
API_KEY=aSuperSecretKey
```

### 📥 Instalación

```bash
cd api
npm install
```

### ▶️ Ejecutar servidor

```bash
npm start
```

Disponible en:

```bash
http://localhost:3001
```

---

## 🔗 Endpoints Documentados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Verifica disponibilidad del backend. |
| GET | `/files/data` | Procesa todos los CSV y devuelve el JSON final. |
| GET | `/files/data?fileName=file.csv` | Filtra resultados por nombre de archivo. |

### Ejemplo de Respuesta del API

```json
[
  {
    "file": "test1.csv",
    "lines": [
      { "text": "value1", "number": 123, "hex": "0x1a2b" }
    ]
  }
]
```

---

## 🔵 4. Frontend (UI)

### 📥 Instalación

```bash
cd frontend
npm install
```

### ▶️ Ejecutar frontend

```bash
npm start
```

Disponible en:

```bash
http://localhost:3000
```

### Características del frontend

- Tabla responsiva  
- Filtros por archivo  
- Buscador por contenido  
- Paginación  
- Diseño Glassmorphism  
- Manejo básico de estados y errores  

---

## 🧪 5. Pruebas Automatizadas

### Backend — Mocha + Chai

```bash
cd api
npm test
```

### Frontend — Jest + Testing Library

```bash
cd frontend
npm test
```

Cobertura:
- Validación de endpoints  
- Mock del servicio externo  
- Renderización y filtrado en UI  

---

## 📦 6. Scripts recomendados

```bash
npm start
npm test
```

---

## 🧑‍💻 9. Autor

Challenge desarrollado por **Fer Caneses**  

---
