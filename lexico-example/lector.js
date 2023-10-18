const fs = require('fs');

fs.readFile('database.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //ARREGLOS POR POCISION
   
  

     var cadena_split = data.split('\n').map(linea => linea.replace('\r',''));

    console.log("nombres de las columnas",cadena_split );


   for (let i = 0; i < cadena_split.length; i++) {

       
       var query = cadena_split[i].split(" ");}

       const operadoresLogicos = [  "AND", "OR", "NOT"];
       const operadoresComparacion = [">", "<", "=",">=", "<=", "!="];
       const renglonesIncorrectos = [];


       for (let i = 0; i < cadena_split.length; i++) {
        var query = cadena_split[i].split(" ");
        
        const operadoresLogicos = ["AND", "OR", "NOT"];
        const operadoresComparacion = [">", "<", "=", ">=", "<=", "!="];

        if (query.length!=19 || query.length == 0) {
            console.log("el tamaño de query es incorrecto en el renglón " + i);
            // Agregar el renglón incorrecto al array
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        }


        //  VALIDACION DE DATOS CORRECTOS
        if (query[0] !== 'SELECT') {
            console.error('Error: Se esperaba "SELECT" en la posición[0] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if (query[1] !== '*' && typeof query[1] !== 'string') {
            console.error('Error: Se esperaba un * o el nombre de una columna en la posicion[1] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if (query[2] !== 'FROM') {
            console.error('Error: Se esperaba "FROM" en la tercera posición[2] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if (typeof query[3] !== 'string') {
            console.error('Error: Se esperaba el nombre de una tabla en la posición[3] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
            //WHERE//////////////////////
        } else if (query[4] !== 'WHERE') {
            console.error('Error: Se esperaba "WHERE" en la quinta posición[4] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if (typeof query[5] !== 'string') {
            console.error('Error: Se esperaba el nombre de una columna en la  posición[5] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if (!operadoresComparacion.includes(query[6])) {
            console.error('Error: Se esperaba un operador de comparación válido en la posición[6] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if(isNaN(parseInt(query[7]))){
            console.log('Error: Se esperaba un numero en la pocision[7] ');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        }else if (!operadoresLogicos.includes(query[8])) {
            console.error('Error: Se esperaba un operador logico válido en la posición[8] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        }else if (typeof query[9] !== 'string') {
            console.error('Error: Se esperaba el nombre de columna en la posición[9] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        }else if (!operadoresComparacion.includes(query[10])) {
            console.error('Error: Se esperaba un operador de comparación válido en la posición[10] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        }else if (query[11] !== "'ensenada'") {
            console.error('Error: Se esperaba "ensenada" en la quinta posición[11] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        //////////////////////////////////////////////
        }else if (query[12] !== 'ORDER') {
            console.error('Error: Se esperaba "ORDER " en la posición[12] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if(query[13] !== 'BY'){
            console.error('Error: Se esperaba "BY" en la  posición[13] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        }
        else if (typeof query[14] !== 'string') {
            console.error('Error: Se esperaba el nombre de una columna en la posición[14] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if (query[15] !== 'ASC' && query[15] !== 'DESC') {
            console.error('Error: Se esperaba "ASC" o "DESC" en la posición[15] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if (query[16] !== 'LIMIT') {
            console.error('Errosr: Se esperaba "LIMIT" en la  posición[16] del query.');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if (isNaN(parseInt(query[17]))) {
            console.error('Error: Se esperaba un número en la posicion[17]del query');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        } else if( query[18] !== ';'){
            console.error('Error: Se esperaba un ";" en la posicion[18]del query');
            renglonesIncorrectos.push("Renglon " + i + " : " + cadena_split[i]);
            continue;
        }
        else {
            console.log('El query es válido.');
        }
    }

     // Crear y escribir en el archivo de registro
     const logData = renglonesIncorrectos.join('\n');
     fs.writeFile('log.txt', logData, (err) => {
         if (err) {
             console.error("\n"+"Error al escribir en el archivo de registro:", err);
         } else {
             console.log("\n"+"Archivo de registro ('log.txt') creado con los renglones incorrectos.");
         }
     });   

});
