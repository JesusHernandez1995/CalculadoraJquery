$(document).ready(function(){
    
    /* ----------------------- Variables ------------------- */
        var screen = $("#_calculatorScreen"),
     little_screen = $("#calculos"),
           results = $("#resultados"),
      pow_no_hecho = true,
          auxiliar = '',
          auxiliar2 = '',
         operacion = '';

    /* ----------------------- Funciones ------------------- */
    const publicarHistorial = (op) => {
        results.html(op);
        results.html(results.html() + '<br />' + eval(op));
    }

    const operar = (op) => { 
        if(op == "suma")            operador = '+';
        if(op == "resta")           operador = '-';
        if(op == "multiplicacion")  operador = '*';
        if(op == "division")        operador = '/';
        if(op == "resto")           operador = '%';

        valor = screen.val();               // obtenemos el valor de la pantalla grande y lo almacenamos en valor
        // realizamos la operación, escribimos al final '+', ya que se espera el siguiente operando (a + 'b' -> segundo operando)
        operacion = operacion + valor + operador;
        little_screen.val(operacion);       // escribimos en la pantalla pequeña el resultado de la operación
        screen.val("");                     // limpiamos la pantalla principal
    }
     
    const calcular_pow = () => {
        screen.val(Math.pow(auxiliar, screen.val()));
        pow_no_hecho = true;
        console.log("ha entrado");
    }

    /* ----------------------- Eventos números (0-9) ------------------- */
    for(let i=0; i<=9; i++){
        $("#btn"+i).on('click', function (e) {
            e.preventDefault();
            var num = i.toString();
            screen.val(screen.val() + num);
            if(!pow_no_hecho)    calcular_pow(); 
        });
    }

    // Evento para el punto '.'
    $("#btnPunto").on('click', function (e) {
        e.preventDefault();
        var num = '.';
        screen.val(screen.val() + num);
    });

    // --------- Evento para las operaciones básicas (+,-,*,/,%) ------------
    for(let i=0; i<=4; i++){
        let operation;
        if(i == 0)    operation = "suma";
        if(i == 1)    operation = "resta";
        if(i == 2)    operation = "multiplicacion"; 
        if(i == 3)    operation = "division";  
        if(i == 4)    operation = "resto"; 

        $("#"+operation).on('click', function(e){
            e.preventDefault();
            operar(operation);
        });
    }
    // ----------------------------------
    // Evento para elevar un número al cuadrado
    $("#cuadrado").on('click', function (e) {
        e.preventDefault();
        screen.val(screen.val() * screen.val());
    });
    
    // Evento para la tecla PI
    $("#btnPi").on('click', function (e) {
        e.preventDefault();
        screen.val(Math.PI);
    });

    // Evento para la tecla 'e'
    $("#btn_e").on('click', function (e) {
        e.preventDefault();
        screen.val(Math.E);
    });

    // Evento para realizar las potencias
    $("#potencia").on('click', function (e) {
        e.preventDefault();
        auxiliar = screen.val();
        pow_no_hecho = false;
        screen.val("");
    }); 
    
    // Evento para elevar en base a 10 cualquier número
    $("#btn10expX").on('click', function (e) {
        e.preventDefault();
        screen.val(Math.pow(10, screen.val()));
    });

    // Evento para calcular el factorial
    $("#factorial").on('click', function (e) {
        e.preventDefault();
        let total = 1;
        for(let i = 1; i <= screen.val(); i++){
            total *= i;
        }
        screen.val(total);
    });

    // Evento para calcular el inverso
    $("#inversoX").on('click', function (e) {
        e.preventDefault();
        screen.val(1 / screen.val());
    });

    // Evento para el botón de Log en base a 10
    $("#btnlog").on('click', function (e) {
        e.preventDefault();
        if(screen.val() <= 0)   screen.val("Math Error");
        else          screen.val(Math.log10(screen.val()));
    });

    // Evento para el botón de Ln en base a 'e'
    $("#btnln").on('click', function (e) {
        e.preventDefault();
        if(screen.val() <= 0)   screen.val("Math Error");
        else          screen.val(Math.log(screen.val()));
    });

    // Evento para el botón de valor absoluto
    $("#btn_abs").on('click', function (e) {
        e.preventDefault();
        screen.val(Math.abs(screen.val()));
    });

    // Evento para calcular la raíz cuadrada
    $("#raiz").on('click', function (e) {
        e.preventDefault();
        if(screen.val() < 0)    screen.val("Math Error");
        else         screen.val(Math.sqrt(screen.val()));
    });

    // Evento para escribir el paréntesis de apertura
    $("#parApertura").on('click', function (e) {
        e.preventDefault();
        screen.val(auxiliar2 = auxiliar2 + screen.val() + "(");
    });
    
    // Evento para escribir el paréntesis de cierre
    $("#parCierre").on('click', function (e) {
        e.preventDefault();
        screen.val(auxiliar2 = auxiliar2 + screen.val().replace('(', '') + ")");
    });

    // Evento que cambia el signo del número
    $("#pos_neg").on('click', function (e) {
        e.preventDefault();
        screen.val(screen.val()*-1);
    });

    // Evento cuando se presiona la tecla de =
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
        auxiliar2 = '';
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