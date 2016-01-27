$(document).ready(function(){
	creaBDBiblio();
});


function creaBDBiblio(){
    var Mibiblio=openDatabase("BdBiblio","1.0","Mibiblioteca",2*1024);

        if(Mibiblio!=null){
            console.log("La biblioteca se creó correctamente");
            Mibiblio.transaction(crearLibros,errorCrearLibros);
                
        } else {
            alert("La biblioteca no se ha creado. Revise el proceso");
                        
        }
    

}

function crearLibros(txt){
    txt.executeSql("CREATE TABLE IF NOT EXISTS Libros (isbn INTEGER PRIMARY KEY AUTOINCREMENT, autor TEXT NOT NULL, titulo TEXT NOT NULL, resumen TEXT)");
}
function errorCrearLibros(err){
console.log("Error al ejecutar la sentencia de crear libro"+err.code);
}

function ejecutaTransaction(numero){
	
	switch(numero){
			case 1: Mibiblio.transaction(guardalibro,errorCrearLibros);
			break;
			
			case 2: Mibiblio.transaction(listalibro,errorCrearLibros);
			break;
			
			case 3: Mibiblio.transaction(borralibro,errorCrearLibros);
			break;
			
	
	}
}
	
	function guardalibro(txt){
		
		var Mititulo=$("#Titulo").val();
		var Miautor=$("#Autor").val();
		var Miresumen=$("#Resumen").val();
		
		txt.executeSql("INSERT INTO libros(autor, titulo, resumen) VALUES (?,?,?)",[Miautor,Mititulo,Miresumen]);
		
		alert("He guardado el libro");
		
	}
	
	function listaLibro(txt){
    txt.executeSql("Select autor, titulo, resumen from Libros",[],function(txt,resultado){
         var nlibros=resultado.rows.length;
        $("#listaLibros").listview();
        for (var i=0;i<nlibros;i++){
            var libro=resultado.rows.item(i);
            $("#listaLibros").append("<li><a><p>"+libro["Titulo"]+"</p><br><label>"+libro[autor]+"</label></a></li>");    
        }
        $("#listaLibros").listview("refresh");
                   });
                   
}

$(document).ready(function(){
    $("#botonguardar").click(function(){
        ejecutaTransacion(1);
    });
    $("#botonlistar").click(function(){
        ejecutaTransacion(2);
    });

});
					   
					   		   
					   
					   
					   
					   
					   
	
					   

	
	

					   
	
	