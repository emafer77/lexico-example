

/*con esta funcion se lleva a cabo una consulta al 
que se le agrega la palabra 'WHERE' 
 el parametro "notermina" sera utilizado como un indicador
  si la palabra no reservada termino con "'" */

function validarWhere(indice, arre,notermina,query) {
    indice++;
 
    if (arre[indice] === 1000) {
      indice++;
      if(arre[indice]===10||arre[indice]===13||arre[indice]===14||arre[indice]===30||arre[indice]===31||arre[indice]===32){
        indice++;
        if(arre[indice]===2000){
          indice++;
          if(arre[indice]===6){
            console.log("Consulta correcta:","\n", JSON.stringify(query),"\n");
          }
         
        }else if(arre[indice]===1001){
          if(notermina){
            console.log("hay un error la palabra reservada con comillas simples no fue escrita correctamente");

          }else{
            indice++;
            if(arre[indice]===6){
              console.log("Consulta correcta:","\n", JSON.stringify(query),"\n");
            }
          }

        }
        else{
          console.log("error se esperaba un numero")
        }
      }else{
        console.log("error se esparaba un simbolo de asignacion ")
      }
    }else {
      console.log("se esperaba una palabra no reservada despues de WHERE");
    }
  
  }

function validarORDERBY(indice,arre){
  indice++;
}


  
  module.exports = {
    validarWhere: validarWhere
  };
  