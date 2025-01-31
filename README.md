# WebApp test Grupalia

Esta es una **webapp** para crear, visualizar y gestionar ofertas de compra o venta de dinero virtual por dinero en efectivo. Los usuarios pueden crear un anuncio (ya sea de compra o venta) proporcionando detalles como nombre, monto, ubicación y contacto. 

## Funcionalidades

- **Registro de usuario**: Los usuarios pueden registrarse y autenticarse para crear y ver ofertas.
- **Creación de anuncios**: Los usuarios pueden crear ofertas de compra de dinero electronico o venta de dinero electronico especificando los detalles requeridos.
- **Visualización de ofertas**: Los usuarios pueden ver los anuncios de compra y venta en un formato atractivo.
- **Interactividad**: Al hacer clic en un anuncio, se muestra información detallada del mismo.
  
## Tecnologías utilizadas

- **Frontend**: React, Next.js, CSS
- **Backend**: Supabase (autenticación y base de datos)
- **Base de datos**: Supabase PostgreSQL
- **Despliegue**: Vercel (para el frontend)
  
## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener las siguientes herramientas instaladas:

- **Node.js**: [Descargar e instalar Node.js](https://nodejs.org)
- **npm o yarn**: Dependiendo de la gestión de dependencias que prefieras.
  
## Instalacion

Crear el proyecto con Next.js

-npx create-next-app@grupalia
-cd my-login-app
-npm install @supabase/supabase-js

Copiar carpeta src a directorio aplicacion

ejecutar con versel desde directorio raiz

-vercel





# RFC webapp transacciones

## Sistema de Filtros Avanzados

- **Descripción:** Permitir a los usuarios filtrar los anuncios por monto, ubicación y fecha. Esto ayudará a los usuarios a encontrar anuncios que se ajusten a sus necesidades de manera más rápida.
- **Tecnologías:** 
  - **React Hooks** para manejar el estado de los filtros.
  - Consultas SQL eficientes para filtrar los datos directamente desde **Supabase**.
- **Estrategia:** Realizar filtros a nivel de base de datos en lugar de hacerlo en el frontend para optimizar el rendimiento.

---

## Sistema de Notificaciones Push

- **Descripción:** Implementar notificaciones push para avisar a los usuarios cuando se creen nuevos anuncios que coincidan con sus intereses, o cuando haya alguna oferta que se ajuste a sus parámetros.
- **Tecnologías:**
  - **FCM** para enviar notificaciones push.
  - **React Notifications** para mostrar notificaciones en el frontend.
- **Estrategia:** Permitir a los usuarios suscribirse a diferentes tipos de notificaciones y habilitar el servicio para dispositivos móviles y de escritorio.

---

## Sistema de Comentarios y Valoraciones

- **Descripción:** Permitir que los usuarios comenten y valoren los anuncios para aumentar la interactividad de la plataforma.
- **Tecnologías:** SQL para manejo de tablas con información de valoracion de los usuarios.
- **Estrategia:** Implementar una relación de uno a muchos entre los anuncios y los comentarios, y permitir que los usuarios valoren los anuncios con una calificación de 1 a 5 estrellas.

---

## Verificación de Identidad para Mayor Confianza

- **Descripción:** Introducir un sistema opcional de verificación de identidad para que los usuarios puedan asegurar su identidad y ganar confianza de otros usuarios.
- **Tecnologías:** 
  - Integración de **supabase.auth** con un sistema de verificación de documentos (por ejemplo **Google Cloud Identity**).
- **Estrategia:** Implementar un proceso de validación de identidad con una interfaz amigable y asegurar que los datos sean manejados de manera segura y privada.

---

## Rediseño de interfaz de usuario

- **Descripción:** Mejorar la interfaz de usuario, buscando que sea mas amigable, atractiva y de facil uso para los usuarios
- **Tecnologías:** Tecnologias enfocadas en front-end estilo TailwindCSS, Styled Components, React-Bootstrap.
- **Estrategia:** Estrategia de mejorar por iteracion en la aplicacion y pruebas con usuarios para deteccion de puntos de friccion en la interaccion con la aplicación
