# Pizza Shop 🍕

¡Bienvenido a **Pizza Shop**!  
Esta es una aplicación web para la gestión de un negocio de pizzas. Permite manejar productos y usuarios, con funcionalidades de autenticación, edición, eliminación y más.

La aplicación está desarrollada con **React** y **Vite**, utiliza **Firebase** como backend y **Bulma CSS** para el diseño. Además, está publicada en [Vercel](https://vercel.com/) y puedes probarla en el siguiente enlace:

🔗 [Pizza Shop en Vercel](https://pizza-shop-flax.vercel.app/)

---

## Características principales
- **Gestión de productos:** Alta, edición y eliminación de productos.
- **Gestión de usuarios:** Registro, edición y autenticación de usuarios.
- **Interfaz atractiva:** Construida con **Bulma CSS**.
- **Backend en Firebase:** Almacena datos de productos y usuarios.
- **Autenticación:** Requiere inicio de sesión para acceder a las funcionalidades.

---

## Instalación y configuración

### Prerrequisitos
- **Node.js** (v16 o superior).
- **Git** instalado en tu máquina.

### Pasos de instalación
1. **Clona este repositorio:**
   ```bash
   git clone https://github.com/fuentesnm/pizza-shop
   cd pizza-shop

2. **Instala las dependencias:**
   ```bash
   npm install

3. **Configura Firebase:**
   - Crea un proyecto en Firebase.
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega las credenciales de Firebase en el archivo `.env` de la siguiente manera:
   ```
    VITE_API_KEY=
    VITE_AUTH_DOMAIN=
    VITE_PROJECT_ID=
    VITE_STORAGE_BUCKET=
    VITE_MESSAGING_SENDER_ID=
    VITE_APP_ID= 
   ```
   - Reemplaza los valores con las credenciales de tu proyecto Firebase.
4. **Inicia la aplicación:**
   ```bash
   npm run dev
   La aplicación estará disponible en http://localhost:5173.
---
### Uso
- Abre la aplicación en tu navegador.
- Explora el menú. 
- Registra un usuario o inicia sesión.
- Agrega productos y administra tus pedidos.
- Utiliza la interfaz de usuario para interactuar con la aplicación.
---
### Scripts disponibles
- `npm run dev`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Inicia un servidor de producción.
---
### Despliegue en Vercel
- La aplicación está publicada en Vercel. Puedes acceder a ella en https://pizza-shop-flax.vercel.app/.
---
### Tecnologías utilizadas
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida y liviana.
- **Firebase**: Plataforma de desarrollo de aplicaciones web y móviles.
- **Bulma CSS**: Framework CSS para diseño rápido y responsivo.
- **React Router DOM**: Enrutamiento para aplicaciones web.
---
### Autor
- Este proyecto fue desarrollado por Nicolás Fuentes como parte de un proyecto de exámen para el curso de React JS de UTN.
---
