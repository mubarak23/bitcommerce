import express from 'express'
import swaggerUi from "swagger-ui-express";


const setupSwagger = (app: express.Application) => {
  // if(process.env.NODE_ENV !== 'production') {
    app.use(
      "/swagger-ui",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    )    
  // }
}

export default setupSwagger
