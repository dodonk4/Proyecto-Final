import { transporter } from "./index.mjs";
import { mailOptions, options2 } from "./mailOptions.mjs";


import path from "path";
import hbs from 'nodemailer-express-handlebars';
const handlebarOptions = {
   viewEngine: {
      extName: ".handlebars",
      layoutsDir: './public/views',
      defaultLayout: 'mail',
      partialsDir: './public/views',
   },
   viewPath: path.resolve('./public/views'),
   extName: ".handlebars",
}

transporter.use('compile', hbs(handlebarOptions));

const sender2 = async (nombre)=> {
    try {
   console.log('Nombre en Send' + nombre)
     const info = await transporter.sendMail(await options2(nombre))
     console.log(info)
    } catch (error) {
     console.log(error)
    }
  
 }

const sender = async ()=> {
   try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
   } catch (error) {
    console.log(error)
   }
 
}

export { sender, sender2 }
