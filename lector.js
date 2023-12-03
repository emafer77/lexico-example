
const { Console } = require('console');
const fs = require('fs');
const { specialCharacters } = require('./sqlkeywords');
const { validarWhere } =require('./validaciones');
const arregloTokentxt =[];
fs.readFile('database.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
 
    
  /*esta funcion es la encargada de tokenizar todas mis palabras */

  function buscarPalabraEnObjeto(palabra, objeto) {
    if (objeto.hasOwnProperty(palabra)) {
        console.log(`El número correspondiente a la palabra "${palabra}" es: ${objeto[palabra]}`);
        arregloFinalTOkenizado.push(objeto[palabra]);
    } else if (!isNaN(palabra)) {
        arregloFinalTOkenizado.push(2000);
    } else if (palabra.startsWith("'")||palabra.endsWith("'")) {//aqui se verifica si la palabra empieza con "'"
        arregloFinalTOkenizado.push(1001);
    } else {
        arregloFinalTOkenizado.push(1000);
        console.log(`La palabra "${palabra}" no está reservada; por lo tanto, se tokeniza con el valor 1000.`);
    }
 
}

  

///////////////////////////////////////////////

/**
 esta funcion verifica el arreglo tokenizado
 busca si hay un valor 1001 en este arreglo
 si hay un 1001 dentro del arreglo devuelve la
 posicion en donde encontro esa palabra
 despues busca en query segun la posicion indicada
 si dicha palabra termina con "'"
 si termina devuelve un false
 si no termina devulve un true.
 */
function buscarPosicionYVerificar(arrNumeros, arrPalabras) {
  // Buscar la posición del número 1001 en el primer arreglo
  const posicion = arrNumeros.indexOf(1001);
  let NoTerminaConSimples ='';
  if (posicion !== -1) {
      // Verificar si la palabra en la misma posición en el segundo arreglo termina con comillas simples
      const palabra = arrPalabras[posicion];

      if (palabra.endsWith("'") && palabra.startsWith("'")) {
          NoTerminaConSimples = false;
      } else {
         NoTerminaConSimples =true;
      }
  } 
return NoTerminaConSimples;
}


/////////////////////////////////////////////
     var cadena_split = data.split('\n').map(linea => linea.replace('\r',''));//Aqui se forma un arreglo con cada renglon de database.txt

    console.log("aqui se muestra las o la consultas a ejecutar:","\n",JSON.stringify(cadena_split),"\n","-----------------------------------------");
  
        const renglonesIncorrectos = [];

        for (let i = 0; i < cadena_split.length; i++) {
          var arregloFinalTOkenizado =[];
          var query = cadena_split[i].split(" ");//aqui se crea un arreglo con los datos de cada renglon en database.txt
     
        
           /*aqui se separa la posicion[1]del qssuery
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
        
      
        console.log("--------------------------------------","\n","este es el arreglo tokenizado:",JSON.stringify(arregloFinalTOkenizado),"\n","-----------------------------");
        
        //con est funcion se buscara si tenemos palabras no reservadas con comillas simples"'"
        const notermina =buscarPosicionYVerificar(arregloFinalTOkenizado, query);
    
    
    
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
            console.log(" Error ,consulta incorrecta la palabra SELECT no se encontro");
            renglonesIncorrectos.push("Error, consulta incorrecta la palabra SELECT no se encontro");
          }
          /*
            Aqui esta serie de if anidados se llevara a cabo                                                                                                                               
            si en la posicion que estamos el valor es 7
            esto es para validar
            select * FROM tabla;

          */
       
         var trabajarConAsterisco=true;//esta variable definira el camino a seguir
         if(indice===1 && arregloFinalTOkenizado[indice]!==3){ //ESTO SE LLEVARA ACABO SI SE ENCONTRO SELECT POSTERIOR MENTE y la pocicion 1 no es una ,
          if(arregloFinalTOkenizado[indice]===7){
            trabajarConAsterisco=false;
            indice++;
            if(arregloFinalTOkenizado[indice]===309){
                indice++;
                if(arregloFinalTOkenizado[indice]===1000){
                    indice++;
                    if(arregloFinalTOkenizado[indice]===6){
                        console.log(" la consulta es correcta: ","\n",query.join(" "));
                    }else if(arregloFinalTOkenizado[indice]===800){
                      validarWhere(indice,arregloFinalTOkenizado,notermina,query);
                    }else{
                      console.log(" Error ,no se termino la consulta con ';'");
                      renglonesIncorrectos.push(" Error, no se termino la consulta con ';'")
                    }
                }else{
                console.log("ERROR no se puede utilizar una palabra reservada despues de FROM");
                renglonesIncorrectos.push("ERROR no se puede utilizar una palabra reservada despues de FROM")
              }
            }else{
              console.log("Error,se esperaba FROM en la posicion",[indice]);
              renglonesIncorrectos.log("Error se esperaba FROM en la posicion",[indice]);
            }
            /////////validar si se trabajara sin "*"
          }else if (arregloFinalTOkenizado[indice] === 1000) {
            indice++;
          }else{
              console.log("Error se esperaba un '*' o 'una palabra no reservada");
              renglonesIncorrectos.push("Error se esperaba un '*' o 'una palabra no reservada");
            }
        
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
          console.log("Error no se encontro FROM");
          renglonesIncorrectos.push("Error no se encontro FROM");
          contieneFrom=false;
         }
         
           if(contieneFrom){
           indice++;
           /*
           el -2 siguiente es porque se necesita saber si antes de que se cambiara de 
           posicion por el FROM habia un ','
           esto porque no se puede haber un ',' antes que el FROM
           */
      
            if(arregloFinalTOkenizado[indice-2]==3 || arregloFinalTOkenizado[indice-2==655]){
              console.log("Error la consulta es incorrecta ya que no debe un 'SELECT' o una ',' antes del FROM ");
              renglonesIncorrectos.push("Error la consulta es incorrecta ya que no debe ir  una 'palabra reservada' antes del FROM ");
            }
      if(arregloFinalTOkenizado[indice-2]!==3&&arregloFinalTOkenizado[indice-2]!==655){
         if(trabajarConAsterisco){ 
          if (arregloFinalTOkenizado[indice] === 1000 ){
                  indice++;
                  if (arregloFinalTOkenizado[indice] === 6) {
                    console.log("Consulta correcta:","\n", query.join(" "),"\n");
                  }else if(arregloFinalTOkenizado[indice]=== 800){
                    validarWhere(indice,arregloFinalTOkenizado,notermina,query);
                  }else if(arregloFinalTOkenizado[indice]===407){
                    
                  }
                  else{
                    console.log("Error consulta no terminada con ';'");
                    renglonesIncorrectos.push("Error consulta no terminada con ';'");
                  }
                }else{
                  console.log("error no se puede trabajar con una palabra reservada despues de FROM");
                  renglonesIncorrectos.push("error no se puede trabajar con una palabra reservada despues de FROM");
                }
         }
      }
           }
         }else{
          console.log("error se escribio una ',' antes de '*' o 'palabra no reservada' ");
         }
        
      
         arregloTokentxt.push(arregloFinalTOkenizado);
        }
//////////////////
///////////////

/////////////////////////////////////
     // Crear y escribir en el archivo de registro
     const logData = renglonesIncorrectos.join('\n');
     fs.writeFile('log.txt', logData, (err) => {
         if (err) {
             console.error("\n"+"Error al escribir en el archivo de registro:", err);
         } else {
             console.log("---------------------------------","\n","Archivo de registro ('log.txt') ha sido creado");
         }
  }); 

  const tokenArchivo = arregloTokentxt.map(tokens => tokens.join(',')).join('\n');
fs.writeFile('tokens.txt', tokenArchivo, (err) => {
    if (err) {
        console.error("\n"+"Error al escribir en el archivo de registro:", err);
    } else {
        console.log("---------------------------------","\n","Archivo de registro ('tokens') ha sido creado.");
    }
});
  


});
