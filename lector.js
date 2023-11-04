const { Console } = require('console');
const fs = require('fs');

fs.readFile('database.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //ARREGLOS POR POCISION
  

     var cadena_split = data.split('\n').map(linea => linea.replace('\r',''));

    console.log("nombres de las columnas",cadena_split );


        const renglonesIncorrectos = [];
       const queryObtenido =[]; //en este arreglo se guardara el query obtenido


       for (let i = 0; i < cadena_split.length; i++) {
        var query = cadena_split[i].split(" ");
        
        const operadoresLogicos = ["AND", "OR", "NOT"];
        const operadoresComparacion = [">", "<", "=", ">=", "<=", "!="];

        
        ///////// TOKENIZAR /////////


        ///////////tokenizar la posicion 0/////////////
        if (query[0] === 'SELECT') {
           queryObtenido.push(655);
            
        } else{
            queryObtenido.push('error');
        }
       //////////////////////////////////////////////////

       ////////////tokenizar la posicion 1///////////////////
        if (query[1] === '*') {
            queryObtenido.push(7);
           console.log(queryObtenido);
        } 
        /*  En esta condicion primero se verifica que sea un string la 
            la posicion 1 del query ,se creara un arreglo de esa posicion
            esto separado por una "," .  de ahi se hace condicion para
            para saber si hay espacio al inicio o al final,
            si es que hay espacios es que la consulta esta mal ya que no deberia empezar 
            ni terminar en ";"
        */
        else if ( typeof query[1] === 'string') {
          const arregloQuery1= query[1].split(',');

            if (arregloQuery1[0] === "" || arregloQuery1[arregloQuery1.length - 1] === "") {
            console.log("dato incorrecto en la posicion [1]");
          } else{
            queryObtenido.push(1000)}
        }  
        
       //////////////////////////////////////////////////////////// 
       
       ///////////////tokenizar la posicion 2/////////////////////7

        
       if (query[2] === 'FROM') {
          queryObtenido.push(309)
          
        }  else{
            queryObtenido.push('error');
        }
          ////////////////////////
          
        /////tokenizar la posicion 3/////////
        
        
        if (typeof query[3] === 'string') {
            const arregloQuery3= query[3].split(',');

            if (arregloQuery3[0] === "" || arregloQuery3[arregloQuery3.length - 1] === "") {
            console.log("dato incorrecto en la posicion [3]");
          } else{
            queryObtenido.push(1000)}
        }
         ///////////////////////
      
        //////////tokenizar la posicion 4///////
         if ( query[4] === 'WHERE') {
          queryObtenido.push(800);
        } else if(query[4]===';'){
        queryObtenido.push(6);

      } else{
        queryObtenido.push('error');
    }
        ///////////////////////////////////////

      ///////tokenizar la posicion 5///////

      if (typeof query[5] === 'string') {
        const arregloQuery5= query[5].split(',');

            if (arregloQuery5[0] === "" || arregloQuery5[arregloQuery5.length - 1] === "") {
            console.log("dato incorrecto en la posicion [5]");
          } else{
            queryObtenido.push(1000)}
      }

      ////////////////////////////////////

    ////tokenizar la posicion 6//////////////////
        if (operadoresComparacion.includes(query[6])) {
            if(query[6]=== ">"){
               queryObtenido.push(14) ;
            }else if(query[6]=== "<"){
                queryObtenido.push(13) ;
            }
            else if(query[6]=== "="){
            queryObtenido.push(10) ;
            }
            else if(query[6]=== ">="){
            queryObtenido.push(30) ;
            }
            else if(query[6]=== "<="){
            queryObtenido.push(31) ;
            }
            else if(query[6]=== "!="){
                queryObtenido.push(32) ;
                }

        }  else{
            queryObtenido.push('error');
        }
        /////////////////////////////////////
      
        //////tokenizar posicion 7//////////////////
        /* 
            En esta parte se valida que la posicion [7]
            del query sea un numero
                */
        
        if(!isNaN(parseInt(query[7]))){
            queryObtenido.push(2000);
           ;} else{
            queryObtenido.push('error');
        }

        ///////////////////////////////////////////

        /////////////tokenizar posicion 8///////////////////
        /*
        primero se revisa la posicion[8] del query es un ";"
        si es asi queryOntenido resibe un 6 .
        (esto lo hace ya que el query  hasta en esa posicion ya podria otener un ";")
        si no revisa si es un operadorLogico y push deauerdo el 
        operador logico
        
        */ 
        if(query[8]===";"){
            queryObtenido.push(6)

        }
        else if (operadoresLogicos.includes(query[8])) {
           
            if(query[8]=== "AND"){
               queryObtenido.push(115) ;
            }else if(query[8]=== "OR"){
                queryObtenido.push(527) ;
            }
            else if(query[8]=== "NOT"){
            queryObtenido.push(502) ;
            }
            
         }   
         else{
            queryObtenido.push('error');
        }
        ///////////////////////////////////////////////////

        ///////////toquenizar posicion 9///////////////
        if (typeof query[9] === 'string') {
            const arregloQuery9= query[9].split(',');

            if (arregloQuery9[0] === "" || arregloQuery9[arregloQuery9.length - 1] === "") {
            console.log("dato incorrecto en la posicion [9]");
          } else{
            queryObtenido.push(1000)}
        } 
        ////////////////////////////////////////////

        //////////tokenizar posicion 10///////////////////

            /* 
            En esta parte revisa que el query en la posicion
            [10] incluye un operadorComparacion
            si es asi busca cual es el operadorComparacion obtenido y da push con el 
            token correspondiente
            
            */
        
        if (operadoresComparacion.includes(query[10])) {
            if(query[10]=== ">"){
                queryObtenido.push(14) ;
             }else if(query[10]=== "<"){
                 queryObtenido.push(13) ;
             }
             else if(query[10]=== "="){
             queryObtenido.push(10) ;
             }
             else if(query[10]=== ">="){
             queryObtenido.push(30) ;
             }
             else if(query[10]=== "<="){
             queryObtenido.push(31) ;
             }
             else if(query[10]=== "!="){
                 queryObtenido.push(32) ;
                 }
           }  else{
            queryObtenido.push('error');
        }
         
        ////////////////////////////////////////////////////////

        ///////////tokenizar posicion11////////////////////////////
            /*
            en esta parte primero se  verifica que sea un string la posicion [11]
            si es asi se crea  otro arreglo  el cual se separara por "'" 
            esto para verificar que el query este escrito con "'"
            al principio y al final
            si es asi push su token correspondiente
            */

        if (typeof query[11] === 'string') {
            const arregloQuery2= query[11].split("'");
              if (arregloQuery2[0] === "" && arregloQuery2[arregloQuery2.length - 1] === "") {
              queryObtenido.push(1001)}
              else{
                queryObtenido.push('error');
            }
            }
                    
        //////////////////////////////////////////////

        /////////////tokenizar la posicion 12///////////////

        /*
        aqui primero revisa que la posicion[12] sea igual a ";"
        si es asi push su token correspondiente
         (esto lo hace ya que el query  hasta en esa posicion ya podria otener un ";")
         si no revisa que sea la palabra "ORDER"
         si es asi push su token correspondiente

         */

        if(query[12]===";"){    
            queryObtenido.push(6);
        }
        else if (query[12] === 'ORDER') {
           queryObtenido.push(528);
        }  
        else{
            queryObtenido.push('error');
        }
        
        /////////////////////////////////////////////////////////

        //////////// tokenizar la posicion 13/////////////////////

    
        if(query[13] === 'BY'){
           queryObtenido.push(79);
        }
        else{
            queryObtenido.push('error');
        }
        ///////////////////////////////////////////////////////////////////

        /////////tokenizar la posicion 14/////////////////////////////
         if (typeof query[14] === 'string') {
            const arregloQuery14= query[14].split(',');

            if (arregloQuery14[0] === "" || arregloQuery14[arregloQuery14.length - 1] === "") {
            console.log("dato incorrecto en la posicion [14]");
          } else{
            queryObtenido.push(1000)}

        }
        
        /////////////////////////////////////////////////////////////
        
        /////////////////tokenizar la posicion 15//////////////////////////

        /*
                aqui se revisa que la si la posicion[15]del query
                contenga "ASC" o "DESC" de ahi push su token correspondiente
        
        */
         if (query[15] === 'ASC' ) {
           queryObtenido.push(119)
        } 
        else if(query[15] === 'DESC'){
            queryObtenido.push(231)
        }
        else{
            queryObtenido.push('error');
        }
        /////////////////////////////////////////////////////////////////////
        
        ////////////tokenizar posicion 16////////////////////////////

            /*
            aqui revisa si el query en la posicion [16]
            es un ";" si es asi push su token correspondiente
            , (esto lo hace ya que el query  hasta en esa posicion ya podria otener un ";") 
            de lo contrario revisa si la palabra es "LIMIT"
            si es asi devuelve su token corespondinte
            
            */
        if(query[16]===";"){
            queryObtenido.push(6);

        }
        else if (query[16] === 'LIMIT') {
           queryObtenido.push(407);
        }  
        else{
            queryObtenido.push('error');
        }
        ////////////////////////////////////////////////////

        //////////////////tokenizar posicion 17//////////////////

            /*
                aqui se revisa si query en la posicion[17] es un numero
                para asi devolver su token correspondiente
            */
        if (!isNaN(parseInt(query[17]))) {
            queryObtenido.push(2000);
        }
        else{
            queryObtenido.push('error');
        }
        //////////////////////////////////////////////////////////////////////

        ///////////////tokenizar posicion 18///////////////////////////////
        /* 
        aqui revisa si el query en la posicion [18]
            es un ";" si es asi push su token correspondiente
           
        */
        if( query[18] === ';'){
           queryObtenido.push(6);
        }
        else{
            queryObtenido.push('error');
        }
        /////////////////////////////////
        console.log(" este es el arreglo obtenido  de tokenizar el query obtenido de dataBase.txt :","\n", JSON.stringify(queryObtenido));

       
    
    }  /////////VALIDACIONES///////////////////////////////////////////  

 ////////////////////////////////////////////////////
        /*
            Despues  De haber obtenido nuestro nuevo arreglo ya tokenizado
            se busca donde hay un [6] que es el token referente al ";"
            con esto para crear otro arreglo con la longitud de acuerdo a donde el query termina 
            con ";"

        */ 
      const querytamañofinal =[];

    const indiceBuscarCierre =queryObtenido.indexOf(6);

    for(let i=0; i <= indiceBuscarCierre;i++){
        querytamañofinal.push(queryObtenido[i]);
    }
/////////////////////////////////////////////////////

////////// EN Esta parte se escribiran todos los arreglos que pueden ser validos por SQL////////

const queryValido1 =[655,1000,309,1000,800,1000,10,2000,115,1000,10,1001,528,79,1000,231,407,2000,6];
const queryValido2= [655,1000,309,1000,6];

////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n","Este es el arreglo final el cual sera validado con con las validaciones: ","\n", JSON.stringify(querytamañofinal));
        /*
        se conviete querytamañofinal y  el queryvalido a evaluar en un string 
        para luego hacer una comparacion para determinar si es correcto
        
        */ 
 if(querytamañofinal.join(" ") === queryValido1.join(" "))
 {
    console.log("\n","el query es valido");
 }else if(querytamañofinal.join(" ") === queryValido2.join(" ")){
    console.log("\n","el query es valido");
 }
 else{
    console.log("\n","el query no es valido")
 }


    /////////////////////////////////////////////////////////////////

/////////////////////////////////////
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
