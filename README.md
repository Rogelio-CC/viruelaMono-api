# Proyecto Viruela del Mono

Este proyecto es una API REST escalable para gestionar los casos de la Viruela del Mono en México. Utiliza Node.js con TypeScript, MongoDB, y está contenedorizado con Docker.

## Requisitos
- Tener instalado docker y docker desktop.
- Una vez descargado este proyecto, crea un archivo llamado ".env" para poner variables de entorno y que se ejecute el comando docker-compose up -d correctamente

## Cómo iniciar el proyecto

Para levantar los contenedores, debes usar el siguiente comando:

```bash
docker-compose up -d
```

Este comando levanta todos los servicios definidos en el archivo `docker-compose.yml`.

### Imagen de MongoDB

Este proyecto utiliza la imagen oficial de MongoDB desde docker hub como base de datos. 

MongoDB estará expuesto en el puerto `27017` de tu máquina local.

## Cómo detener los contenedores

Para detener los contenedores en ejecución, usa el siguiente comando:

```bash
docker-compose down
```

Este comando detiene y elimina los contenedores que se levantaron con `docker-compose up`.

## Otros comandos útiles

- **Ver logs de un contenedor**:
  Si quieres ver los logs de un contenedor específico, puedes usar:
  
  ```bash
  docker logs <nombre_del_contenedor>
  ```

- **Acceder a un contenedor**:
  Para acceder a la terminal de un contenedor en ejecución, utiliza:

  ```bash
  docker exec -it <nombre_del_contenedor> /bin/bash
  ```

- **Listar contenedores activos**:
  Para ver los contenedores activos, ejecuta:

  ```bash
  docker ps
  ```
