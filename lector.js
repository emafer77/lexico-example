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

          /////////VALIDACIONES/////////  
    const buscarCierre =queryObtenido.indexOf(6);//con esto busco  ";" del query
    const querytamañofinal= [];
    for(let i=0; i <= buscarCierre-1;i++){
        querytamañofinal.push(queryObtenido[i]);
    }
    /////////////////////////////////////////////////////////////////
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
         else if ( typeof query[1] === 'string') {
          const arregloQuery1= query[1].split(',');// aqui se obtendra otro arreglo para haci hacer las validaciones
          //aqui valido que el string  no empieze ni termine en una ´,´

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
          queryObtenido.push(1000);
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
        queryObtenido.push(1000);
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
        
        if(!isNaN(parseInt(query[7]))){
            queryObtenido.push(2000);
           ;} else{
            queryObtenido.push('error');
        }
  

            
        ///////////////////////////////////////////
        /////////////tokenizar posicion 8///////////////////

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
            queryObtenido.push(1000);
        } 
        ////////////////////////////////////////////

        //////////tokenizar posicion 10///////////////////
        
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

        ///////////vtokenizar posicion11////////////////////////////
        if (typeof query[11] === 'string') {
            const arregloQuery2= query[11].split("'");// aqui se obtendra otro arreglo para haci hacer las validaciones
            //aqui valido que el string  empieze con ' y termine con '
              if (arregloQuery2[0] === "" && arregloQuery2[arregloQuery2.length - 1] === "") {
              queryObtenido.push(1001)}
              else{
                queryObtenido.push('error');
            }
            }
                    
        //////////////////////////////////////////////

        /////////////tokenizar la posicion 12///////////////
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
            queryObtenido.push(1000);
        }
        
        /////////////////////////////////////////////////////////////
        
        /////////////////tokenizar la posicion 15//////////////////////////
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
        if (!isNaN(parseInt(query[17]))) {
            queryObtenido.push(2000);
        }
        else{
            queryObtenido.push('error');
        }
        //////////////////////////////////////////////////////////////////////

        ///////////////tokenizar posicion 18///////////////////////////////
        if( query[18] === ';'){
           queryObtenido.push(6);
        }
        else{
            queryObtenido.push('error');
        }
        /////////////////////////////////
        console.log("tokenizar elementos del arreglo: ", queryObtenido);

       
    
    }  /////////VALIDACIONES/////////  
    const buscarCierre =queryObtenido.indexOf(6);//con esto busco  ";" del query
    const querytamañofinal= [];//en este query se guardara el arreglo final para hacer validaciones

    for(let i=0; i <= buscarCierre;i++){
        querytamañofinal.push(queryObtenido[i]);
    }

//aqui se escriben  los querys que son validos
const queryValido1 =[655,1000,309,1000,800,1000,10,2000,115,1000,10,1001,528,79,1000,231,407,2000,6];
const queryValido2= [655,1000,309,1000,6];
///////////////////////////////////////////////////////////////
console.log("Este es el arreglo final: ", querytamañofinal);

 if(querytamañofinal.join(" ") === queryValido1.join(" "))
 {
    console.log("el query es valido");
 }else if(querytamañofinal.join(" ") === queryValido2.join(" ")){
    console.log("el query es valido");
 }
 else{
    console.log("el query no es valido")
 }


    /////////////////////////////////////////////////////////////////

 
    console.log(querytamañofinal);
  

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
