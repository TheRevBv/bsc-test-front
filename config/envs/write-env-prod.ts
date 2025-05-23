const fs = require('fs');
require('dotenv').config({ path: './ANG-PROD.env' });
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `
// Actualizar archivo write-env-prod.ts para dar de alta nuevas variables.

export const environment = {
  production: true,
  ENVIRONMENT: 'PROD',
  APP_NAME: '${process.env['APP_NAME']}',
  VERSION: '${process.env['APP_VERSION']}',

};
`;

console.log('El archivo `environment.prod.ts` se ha cargado con la siguiente configuracion: \n');
console.log(envConfigFile);

fs.writeFile(targetPath, envConfigFile, function (err: NodeJS.ErrnoException | null): void {
    if (err) {
        throw console.error(err);
    } else {
        console.log(`El archivo environment.prod.ts fue sobreescrito correctamente sobre el archivo ${targetPath} \n`);
        console.log('---------------------------------------------------------');
    }
});
