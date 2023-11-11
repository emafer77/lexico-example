
const { Console } = require('console');
const fs = require('fs');
const { specialCharacters } = require('./sqlkeywords');
const arregloFinalTOkenizado =[];

fs.readFile('database.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
  
  /*esta funcion es la encargada de tokenizar todas mis palabras */

    function buscarPalabraEnObjeto(palabra, objeto) {
        if (objeto.hasOwnProperty(palabra)) {
            console.log(`el numero correspondiente a la palabra "${palabra}" es: ${objeto[palabra]}`);
            arregloFinalTOkenizado.push(objeto[palabra]);
        } else {
            arregloFinalTOkenizado.push(1000);
          console.log(`La palabra "${palabra}" la palabra no esta reservado por lo tanto se tokenizo con  el valor = 1000.`);
        }
      }



     var cadena_split = data.split('\n').map(linea => linea.replace('\r',''));//Aqui se forma un arreglo con cada renglon de database.txt

    console.log("aqui se muestra las o la consultas a ejecutar:","\n",JSON.stringify(cadena_split), "\n");
    


        const renglonesIncorrectos = [];

        for (let i = 0; i < cadena_split.length; i++) {
            var query = cadena_split[i].split(" ");//aqui se crea un arreglo con los datos de cada renglon en database.txt
         } 
           /*aqui se separa la posicion[1]del query
           convirtiendolo es un arreglo */
        const separarArrego= query[1].split(/(,)/);//con esto se agrega la "," tambien
        /*
          aqui se filtra el separarArreglo para que no creara espacios vacios
          ya que con "," al final o al principio  en la posicion[1] crea espacios
          inecesarios en el arreglo
        */ 
        const arregloFiltrado = separarArrego.filter(function(elemento) {
          return elemento !== '';
        });
        arregloFiltrado.reverse();//esto lo aplico para cuando se lleve a cabo el metodo splice los datos no queden invertidos

          /*aqui se elimina la posicion 1 de query
          para posteriormente ser remplazada*/ 
       
        query.splice(1, 1);

        /*aqui se le iran ir agregando cada elemeto de
          de separarArreglo en el query original desde la posicion 1
         */
        for (let i = 0; i < arregloFiltrado.length; i++) {
          query.splice(1, 0, arregloFiltrado[i]);
        }
          /*
            se crea un ciclo en el cual
             se lleva a cabo la funcion
            y se crea el arregloFinalTOkenizado
          */
        for(let j =0;j<query.length;j++){
            buscarPalabraEnObjeto(query[j],specialCharacters);   
        }
    
        console.log("\n","este es el arreglo tokenizado:",JSON.stringify(arregloFinalTOkenizado));
    /////////VALIDACIONES///////////////////////////////////////////  
  
        //////////////////////////////////////////////////////
        /*
          este indice es de suma importancia ya que con el 
          nos dezplazaremos en el arregloFinalTokenizado
        */
        var indice;
        /*
          con esta funcion se creara el indice
        */
        function encontrarIndice(arr, numero) {
            indice = arr.indexOf(numero);
            return indice; // Devuelve el índice, que puede ser -1 si el número no se encuentra
          }
        /*
          se lleva a cabo la funcion la encontrar la 
          posicion de nuestro indice en este caso la
          posicion sera 0
        */
          encontrarIndice(arregloFinalTOkenizado,655);
         /*
          se evalua si indice es 0 para saber si la
          primera parabra es select
         */
          if (indice===0){
            indice++;
          }else{
            console.log("consulta incorrecta la palabra select no se encuentra en la posicion correcta")
          }
          /*
            Aqui esta serie de if anidados se llevara a cabo
            si en la posicion que estamos el valor es 7
            esto es para validar
            select * FROM tabla;

          */
         var trabajarConAsterisco=true;//esta variable definira el camino a seguir
          if(arregloFinalTOkenizado[indice]===7){
            trabajarConAsterisco=false;
            indice++;
            if(arregloFinalTOkenizado[indice]===309){
                indice++;
                if(arregloFinalTOkenizado[indice]===1000){
                    indice++;
                    if(arregloFinalTOkenizado[indice]===6){
                        console.log(" la consulta es correcta: ",query.join(" "));
                    }else{
                      console.log(" no se termino la consulta con ';'");
                    }
                }else{
                console.log("no se puede una palabra reservada despues de FROM");}
            }else{console.log("se esperaba FROM en la posicion",[indice])}
            /////////validar si se trabajara sin "*"
          }else if (arregloFinalTOkenizado[indice] === 1000) {
            indice++;}
            else(console.log("se esperaba un '*' o 'una palabra no reservda"))
              /*
                 en este while se terminara cuando encuentre un 309 
                 es decir cuando encuentre un FROM
                 cuando encuentre un ','avanzara la posicion del indice
              */
            while (indice < arregloFinalTOkenizado.length) {
              if (arregloFinalTOkenizado[indice] === 3) {
                indice++; // Aumenta el índice para continuar la búsqueda
              } 
              else if (arregloFinalTOkenizado[indice] === 309) {
                
                   break;
              }
              else{
                indice++;
              }
            }
            /*
              con esta variable se buscara en el arreglo arregloFinalTOkenizado
              si existe la palabra FROM
             */
            var contieneFrom = true;

         if(!arregloFinalTOkenizado.includes(309)){
          console.log("no se encontro FROM");
          contieneFrom=false;
         }
           if(contieneFrom){
           indice++;
           /*
           el -2 siguiente es porque se necesita saber si antes de que se cambiara de 
           posicion por el FROM habia un ','
           esto porque no se puede haber un ',' antes que el FROM
           */
            if(arregloFinalTOkenizado[indice-2]==3){
              console.log("la consulta es incorrecta ya que no debe ir  una ',' antes del FROM ");
            }
      if(arregloFinalTOkenizado[indice-2]!==3){
         if(trabajarConAsterisco){ if (arregloFinalTOkenizado[indice] === 1000 ){
                  indice++;}
                  if (arregloFinalTOkenizado[indice] === 6) {
                    console.log("Consulta correcta:", query.join(" "));
                  }else{
                    console.log("consulta no terminada con ';'");
                  }
         }
      }}

          
//////////////////


    /////////////////////////////////////////////////////////////////

/////////////////////////////////////
     // Crear y escribir en el archivo de registro
     //const logData = renglonesIncorrectos.join('\n');
     //fs.writeFile('log.txt', logData, (err) => {
        // if (err) {
        //     console.error("\n"+"Error al escribir en el archivo de registro:", err);
      //   } else {
    //         console.log("\n"+"Archivo de registro ('log.txt') creado con los renglones incorrectos.");
  //       }
//});   

});
