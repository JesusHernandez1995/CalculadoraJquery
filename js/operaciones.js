$(document).ready(function(){
    
    /* ----------------------- Variables ------------------- */
       var screen = $("#_calculatorScreen"),
    little_screen = $("#calculos"),
          results = $("#resultados"),
        operacion = '';

    /* ----------------------- Funciones ------------------- */
    const publicarHistorial = (op) => {
        results.html(op);
        results.html(results.html() + '<br />' + eval(op));
    }

    function operar(op){
        if(op == "suma")            operador = '+';
        if(op == "resta")           operador = '-';
        if(op == "multiplicacion")  operador = '*';
        if(op == "division")        operador = '/';

        valor = screen.val();               // obtenemos el valor de la pantalla grande y lo almacenamos en valor
        // realizamos la operación, escribimos al final '+', ya que se espera el siguiente operando (a + 'b' -> segundo operando)
        operacion = operacion + valor + operador;
        little_screen.val(operacion);       // escribimos en la pantalla pequeña el resultado de la operación
        screen.val("");                     // limpiamos la pantalla principal
    }
     
    /* ----------------------- Eventos ------------------- */
    for(let i=0; i<=9; i++){
        $("#btn"+i).on('click', function (e) {
            e.preventDefault();
            var num = i.toString();
            screen.val(screen.val() + num);
        });
    }

    // Evento para el punto '.'
    $("#btnPunto").on('click', function (e) {
        e.preventDefault();
        var num = '.';
        screen.val(screen.val() + num);
    });

    // --------- Operaciones ------------
    for(let i=0; i<=3; i++){
        let operation;
        if(i == 0)    operation = "suma";
        if(i == 1)    operation = "resta";
        if(i == 2)    operation = "multiplicacion"; 
        if(i == 3)    operation = "division";  

        $("#"+operation).on('click', function(e){
            e.preventDefault();
            operar(operation);
        });
    }

    $("#btnigual").on('click', function (e) {
        e.preventDefault();
        valor = screen.val();
        operacion += valor;             // realizamos las operaciones (a + b + ... + n ) Por ejemplo!
        // Mostramos SOLAMENTE la sintaxis de la operación SIN operarlo. Por ejemplo: Se visualizará 8 + 8 + 8
        little_screen.val(operacion); 
        // Checamos si la evaluación de la operación es un entero.
        if(Number.isInteger(eval(operacion))) { // si lo es, entonces mostramos el resultado de la operación
            screen.val(eval(operacion));
        } else {            // si no es entero, acortamos hasta 2 decimales y luego mostramos el resultado
            x = eval(operacion).toFixed(2);  
            screen.val(x);    // Se visualiza el resultado. Del ejemplo anterior: 24
        }
        // Añadimos un pequeño retardo antes de llamar a la función publicarHistorial
        setTimeout(publicarHistorial, 500, operacion);
        // publicarHistorial(operacion);
        operacion = '';                 // reseteamos la operación
    });

    // Botón para borrar todo de la pantalla principal y pequeña
    $("#btn_delete").on('click', function(e){
        e.preventDefault();
        screen.val('');
        little_screen.val('');
    });

    // Botón para borrar el último digito
    $("#btn_delete_last_digit").on('click', function(e){
        e.preventDefault();
        valor = screen.val();
        screen.val(valor.substring(0, valor.length - 1));
    });

    // Botón para borrar el historial
    $("#delete_history").on('click', function (e) {
        e.preventDefault();
        results.html('');
    });
});