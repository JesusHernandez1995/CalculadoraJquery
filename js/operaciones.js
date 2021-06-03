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
     
    /* ----------------------- Eventos ------------------- */
    $("#btn0").on('click', function (e) {
        e.preventDefault();
        var num = '0';
        screen.val(screen.val() + num);
    });
    
    $("#btn1").on('click', function (e) {
        e.preventDefault();
        var num = '1';
        screen.val(screen.val() + num);
    });

    $("#btn2").on('click', function (e) {
        e.preventDefault();
        var num = '2';
        screen.val(screen.val() + num);
    });

    $("#btn3").on('click', function (e) {
        e.preventDefault();
        var num = '3';
        screen.val(screen.val() + num);
    });

    $("#btn4").on('click', function (e) {
        e.preventDefault();
        var num = '4';
        screen.val(screen.val() + num);
    });

    $("#btn5").on('click', function (e) {
        e.preventDefault();
        var num = '5';
        screen.val(screen.val() + num);
    });

    $("#btn6").on('click', function (e) {
        e.preventDefault();
        var num = '6';
        screen.val(screen.val() + num);
    });

    $("#btn7").on('click', function (e) {
        e.preventDefault();
        var num = '7';
        screen.val(screen.val() + num);
    });

    $("#btn8").on('click', function (e) {
        e.preventDefault();
        var num = '8';
        screen.val(screen.val() + num);
    });

    $("#btn9").on('click', function (e) {
        e.preventDefault();
        var num = '9';
        screen.val(screen.val() + num);
    });

    // Evento para el punto '.'
    $("#btnPunto").on('click', function (e) {
        e.preventDefault();
        var num = '.';
        screen.val(screen.val() + num);
    });

    // --------- Operaciones ------------
    $("#suma").on('click', function (e) {
        e.preventDefault();
        valor = screen.val();               // obtenemos el valor de la pantalla grande y lo almacenamos en valor
        // realizamos la operación, escribimos al final '+', ya que se espera el siguiente operando (a + 'b' -> segundo operando)
        operacion = operacion + valor + '+';
        little_screen.val(operacion);       // escribimos en la pantalla pequeña el resultado de la operación
        screen.val("");                     // limpiamos la pantalla principal
    });

    $("#resta").on('click', function (e) {
        e.preventDefault();
        valor = screen.val();               
        operacion = operacion + valor + '-';
        little_screen.val(operacion);       
        screen.val("");   
    });

    $("#multiplicacion").on('click', function (e) {
        e.preventDefault();
        valor = screen.val();               
        operacion = operacion + valor + '*';
        little_screen.val(operacion);       
        screen.val("");   
    });

    $("#division").on('click', function (e) {
        e.preventDefault();
        valor = screen.val();               
        operacion = operacion + valor + '/';
        little_screen.val(operacion);       
        screen.val("");   
    });

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