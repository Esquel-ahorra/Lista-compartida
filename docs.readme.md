# Lista de Compras Compartida

## Descripción General
Esta aplicación web permite a los usuarios crear y compartir listas de compras de manera sencilla y eficiente. Desarrollada con React y Firebase, ofrece una interfaz intuitiva y funcionalidades de tiempo real.

## Características Principales

### Autenticación de Usuarios
- Registro de nuevos usuarios con email y contraseña
- Inicio de sesión seguro
- Gestión de sesiones persistentes
- Cierre de sesión

### Gestión de Listas de Compras
- Creación de nuevas listas
- Visualización de todas las listas creadas
- Fecha de creación para cada lista
- Eliminación de listas

### Sistema de Compartición
- Generación de enlaces únicos para compartir listas
- Acceso a listas compartidas sin necesidad de registro
- Visualización en tiempo real de las listas compartidas
- Interfaz específica para listas compartidas

## Tecnologías Utilizadas

### Frontend
- React.js - Framework de JavaScript para la interfaz de usuario
- Material-UI - Biblioteca de componentes para un diseño moderno
- React Router - Navegación entre páginas

### Backend y Servicios
- Firebase Authentication - Gestión de usuarios y autenticación
- Firebase Firestore - Base de datos en tiempo real

## Estructura del Proyecto

```
src/
  ├── components/         # Componentes de React
  │   ├── Login.jsx       # Componente de inicio de sesión
  │   ├── Signup.jsx      # Componente de registro
  │   ├── SharedList.jsx  # Vista de lista compartida
  │   └── ShoppingList.jsx# Lista principal de compras
  ├── contexts/
  │   └── AuthContext.jsx # Contexto de autenticación
  ├── firebase/
  │   └── config.js       # Configuración de Firebase
  └── App.jsx             # Componente principal
```

## Guía de Uso

### Crear una Nueva Lista
1. Inicia sesión en la aplicación
2. En la página principal, introduce el nombre de la nueva lista
3. Haz clic en el botón "Añadir"

### Compartir una Lista
1. Localiza la lista que deseas compartir
2. Haz clic en el icono de compartir
3. Copia el enlace generado
4. Comparte el enlace con quien desees

### Acceder a una Lista Compartida
1. Abre el enlace compartido
2. La lista se mostrará automáticamente sin necesidad de iniciar sesión

### Eliminar una Lista
1. Encuentra la lista que deseas eliminar
2. Haz clic en el icono de papelera
3. La lista se eliminará permanentemente

## Características de Seguridad
- Autenticación segura mediante Firebase
- Enlaces de compartición únicos
- Protección de rutas privadas
- Validación de datos en tiempo real

## Interfaz de Usuario
- Diseño responsivo para todos los dispositivos
- Interfaz minimalista y fácil de usar
- Feedback visual para todas las acciones
- Indicadores de carga para operaciones asíncronas