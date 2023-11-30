//Sólo se usan controladores mppt

//Sección de variables

    //Variables de entrada
    let consumoMes = 0, horasPicoMax = 0, horasPicoMin = 0,

    //Calculadas primarias
    potPicoBanco = 0, sysVoltage = 0, sysWatt = 0,

    //Ideales
    panIdeal = -1, batIdeal = -1, invIdeal = -1,

    //Calculadas secundarias
    potPromBanco = 0,
    horaProm = 0,

    // ?(?(?(?(?(
    cantPaneles = 0,
    residuo = 0;

//Sección de objetos

let paneles = [
    {
        nombre: "Panel 1: 200 watts",
        watts: 200,
        cantidad: 7,
        precio: 2000,
        cantidadMax: maxWatts
    },
    {
        nombre: "Panel 2: 450 watts",
        watts: 450,
        cantidad: 12,
        precio: 4000,
        cantidadMax: maxWatts
    },
    {
        nombre: "Panel 3: 750 watts",
        watts: 750,
        cantidad: 25,
        precio: 7000,
        cantidadMax: maxWatts
    }
];

let baterias = [
    {
        nombre: "Batería 1: 100 amp",
        amp: 100,
        cantidad: 1,
        precio: 2000,
        cantidadMax: maxAmp
    },
    {
        nombre: "Batería 2: 150 amp",
        amp: 150,
        cantidad: 1,
        precio: 4000,
        cantidadMax: maxAmp
    },
    {
        nombre: "Batería 3: 200 amp",
        amp: 200,
        cantidad: 1,
        precio: 7000,
        cantidadMax: maxAmp
    }
];

let inversores = [ 
    {
        nombre: "Inversor 1: 1500 watts",
        watts: 1500,
        cantidad: 3,
        precio: 4500
    },
    {
        nombre: "Inversor 2: 3000 watts",
        watts: 3000,
        cantidad: 2,
        precio: 8000 
    },
    {
        nombre: "Inversor 3: 5000 watts",
        watts: 5000,
        cantidad: 2,
        precio: 10000
    },
    {
        nombre: "Inversor 4: 10000 watts",
        watts: 10000,
        cantidad: 1,
        precio: 18000
    }
]

//Sección de funciones
function maxWatts(){
    return (this.watts * (this.cantidad + 1));
}

function maxAmp(){
    return (this.amp * (this.cantidad + 1));
}

function calcularPanel(){
    for (const panel of paneles) {
        if (panel.cantidadMax() > consumoMes) {
            panIdeal = panel;
            console.log(`El panel ${panIdeal.nombre} es el indicado para ti`);
            break;
        }
    }
    
    
    if (panIdeal== -1) {
        throw new Error('No hay paneles para tu consumo');
    } else{
        console.log("Se ha completado el calculo para paneles");
    }
}

function calcularBateria(){
    for (const bateria of baterias) {
        if (bateria.cantidadMax() > (potPromBanco)) {
            console.log(`La batería ${bateria.nombre} es el indicado para ti`);
            batIdeal = bateria;
            break;
        }
    }


    if (batIdeal == -1) {
        throw new Error('No hay baterías para tu consumo');
    } else{
        console.log("Se ha completado el calculo para baterías");
    }
}

function calcularInversor(){
    for (const inversor of inversores) {
        if (inversor.watts > consumoMes) {
            console.log(`El inversor ${inversor.nombre} es el indicado para ti`);
            invIdeal = inversor;
            break;
        }
    }

    if (invIdeal == -1) {
        throw new Error('No hay inversores para tu consumo');
    } else{
        console.log("Se ha completado el calculo para inversor");
    }
}

function calcularHProm(){
    horaProm = (horasPicoMax+horasPicoMin)/2;
}

function calcularSysVol(){
    consumoMes = consumoMes * 1.3;
    switch (consumoMes) {
        case (consumoMes<=1900):
            console.log("El sistema será de 12 voltios");
            sysVoltage = 12;
            break;
        case (consumoMes>1900 && consumoMes<4000):
            console.log("El sistema será de 24 voltios");
            sysVoltage = 24;
            break;
        case (consumoMes>4000 && consumoMes<7000):
            console.log("El sistema será de 48 voltios");
            sysVoltage = 48;
            break;  
        default:
            throw new Error('El sistema es demasiado grande para un hogar, consulta con un especialista');
    }
}

function calcularSysWatt(){
    sysWatt = cantPaneles * panIdeal.watts;
}

function calcularPotPicoBanco(){
    potPicoBanco = consumoMes/horasPicoMax;
}

function calcularPotPromBanco(){
    potPromBanco = consumoMes/horaProm;
}

function calcularCantPaneles(){
    cantPaneles = potPicoBanco/panIdeal.watts;
    residuo = cantPaneles % 2;

    if (residuo != 0) {
        cantPaneles = cantPaneles + 1;
    }
}

function ALLIN(){
    //obt consumo mensual desde la UI                   Paso 1
    //obt Horas Pico Max y Min desde la UI              Paso 3 y 4
    calcularSysVol();                                   //Paso 2 y 5
    calcularPotPicoBanco();                             //Paso 6
        calcularPanel();                                //Paso 7
    calcularCantPaneles();                              //Paso 8 y 9
    calcularSysWatt();                                  //Paso 10
        calcularInversor();                             //Paso 11
    calcularHProm();                                    //Paso 12
    calcularPotPromBanco();                             //Paso 13
        calcularBateria();                              //Paso 14 y 15
    console.log(
        `\n \n \n 
        Tu sistema tiene un consumo con margen funcional de ${consumoMes} kWh mensuales. \n
        El sistema se calculó para tener un Voltaje de ${sysVoltage} voltios, \n
        además de un wattage de ${sysWatt} watts. \n

        Ahora bien, los componentes seleccionados fueron: \n
        Paneles: ${cantPaneles} ${panIdeal.nombre} \n
        Inversor: ${invIdeal.nombre} \n
        Baterías: ${batIdeal.nombre} \n
        `);
        /* Baterías: ${batIdeal.cantidad} ${batIdeal.nombre} \n */
}

ALLIN();
export { ALLIN, consumoMes, horasPicoMax, horasPicoMin };


/*

    1   Obtener consumo mensual
    2   (Multiplicar por 1.3 para margen)
    3   Obtener horas pico máximas
    4   Obtener horas pico mínimas

    5   (Identificar el voltaje del sistema)
    6   (potPicoBanco) (Cuánto es le máximo que podría llegar a recibir en una hora el panel) (ConsumoMensual/HoraPicoMax)

        7   (Calular Panel Ideal)

    8   (Calcular la cantidad de paneles) (Se necesita potPicoBanco/PanelIdeal) 				
    9   (verificar paridad) (Si se queda a medias, es mejor tener un panel más)
    10  (Calcular el wattage del sistema en base a la cantidad de paneles por los watts del panel ideal) 	

        11  (Calcular inversor) (Se usa el wattage del sistema y el voltaje del mismo)

    12  (Calcular Hora Promedio) ((max+min)/2)
    13  (Calcular potPromBanco) (Se necesita ConsumoMensual/HoraProm)

        14  (Calcular las baterías ideal) (potPromBanco/batIdeal)						 
    15  (Calcular margen con baterías siempre al 50%) ((potPromBanco/batIdeal)*2)

    16 Imprimir resultados:
        Sistema tipo mppt
        Voltaje del sistema
        Wattage del sistema
        Cantidad de paneneles a X watts
        Invesor del sistema con X capacidad en watts
        Baterias del sistema con X capacidad en watts

*/