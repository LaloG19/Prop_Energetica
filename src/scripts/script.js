
//Sección de variables	
let pos = false;
let panIdeal = -1, batIdeal = -1, invIdeal = -1;
let potPromBanco=0, horaProm = 0;
let horasPicoMax = 0, horasPicoMin = 0, consumoMes = 0, sysVoltage = 0, potPicoBanco = 0, wattSys = 0, invNecesario = 0;
let cantPaneles = 0, residuo = 0;

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

function calcularConsumo(){
    paneles.forEach(panel => {
        if (panel.cantidadMax() > consumoMes) {
            console.log(`El panel ${panel.nombre} es el indicado para ti`);
            panIdeal = panel;
        }
    });
    
    if (panIdeal== -1) {
        throw new Error('No hay paneles para tu consumo');
    } else{
        console.log(`Se necesita el panel ${panIdeal}`);
    }
}

function calcularBatería(){
    baterias.forEach(bateria => {
        if (bateria.cantidadMax() > (consumoMes*2)) {
            console.log(`La batería ${bateria.nombre} es la indicada para ti`);
            batIdeal = bateria;
            //Maybe tendría que poner exit aquí, cuando sea capaz de cubrir el consumo. Lo mismo en calcularPaneles
        }
    });

    if (batIdeal == -1) {
        throw new Error('No hay baterías para tu consumo');
    } else{
        console.log(`Se necesita la bateria ${batIdeal}`);
    }
}

function calcularInversor(){
    inversores.forEach(inversor => {
        if (inversor.watts > invNecesario) {
            console.log(`El inversor ${inversor.nombre} es el indicado para ti`);
            invIdeal = inversor;
            //Maybe tendría que poner exit aquí, cuando sea capaz de cubrir el consumo. Lo mismo en calcularPaneles
        }

        if (invIdeal == -1) {
            throw new Error('No hay inversores para tu consumo');
        } else{
            console.log(`Se necesita el inversor ${invIdeal}`);
        }
    });
}
function calcularHProm(){
    horaProm = horasPicoMax/horasPicoMin;
}


//Apróximado, 3500 kw/h es el consumo promedio de una casa en México
consumoMes = prompt("Ingrese su consumo diario en Kw/h");

//Se multiplica por 1.3 para obtener un margen de carga para el sistema.
consumoMes = consumoMes * 1.3;

//Próximamente, el conteo de horas pico se obtendrá dependiendo de la ubicación del usuario
horasPicoMax = prompt("Ingrese la cantidad de horas pico en su ciudad");
horasPicoMin = prompt("Ingrese la cantidad de horas minimas en su ciudad");

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

potPicoBanco = consumoMes / horasPicoMax;

calcularConsumo();


cantPaneles = Math.ceil(potPicoBanco / panIdeal.watts);
residuo = cantPaneles % 2;

if (residuo != 0) {
    cantPaneles = cantPaneles + 1;
}

wattSys = cantPaneles * panIdeal.watts;

invNecesario = wattSys/sysVoltage;
calcularInversor();

calcularHProm();
calcularPotPromBanco();

calcularBatería();
//Sólo se usan controladores mppt
