//Sección de variables	
let pos = false, panIdeal = -1, batIdeal = -1, invIdeal = -1;  

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
    consumoMes = consumoMes * 1.3;
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
        calcularBateria();
    }
}

function calcularBateria(){
    for (const bateria of baterias) {
        if (bateria.cantidadMax() > consumoMes) {
            console.log(`La batería ${bateria.nombre} es el indicado para ti`);
            batIdeal = bateria;
            break;
        }
    }


    if (batIdeal == -1) {
        throw new Error('No hay baterías para tu consumo');
    } else{
        calcularInversor();
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
        console.log(`\n \n \n Tu sistema ideal es el siguiente: \n Voltaje del sistema: ${sysVoltage} \n y el wattage del sistema es: Paneles: ${cantPaneles} \n Baterías: ${batIdeal.cantidad} \n Inversor: ${invIdeal.nombre}`);
        //Falta la cantidad de cada uno
    }
}

function calcularHProm(){
    horaProm = (horasPicoMax+horasPicoMin)/2;
}

function calcularSysVol(){
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

function calcularPotMaxBanco(){
    potMaxBanco = consumoMes/horasPicoMax;
}

function calcularPotPromBanco(){
    potPromBanco = consumoMes/horaProm;
}

    //CALCULO PARA INVENTARIO (SÓLO PANEL)
//Se obtendrá el número mayor más cercano
cantPaneles = Math.ceil(potPicoBanco / panIdeal.watts);
residuo = cantPaneles % 2;

if (residuo != 0) {
    cantPaneles = cantPaneles + 1;
}

sysWatt = cantPaneles * panIdeal.watts;
invNecesario = sysWatt/sysVoltage;
    //FIN CALCULO PARA INVENTARIO (SÓLO PANEL) 

//Sólo se usan controladores mppt

/*

Obtener consumo mensual
(Multiplicar por 1.3 para margen)
Obtener horas pico máximas
Obtener horas pico mínimas

(Identificar el voltaje del sistema)
(potPicoBanco) (Cuánto es le máximo que podría llegar a recibir en una hora el panel) (ConsumoMensual/HoraPicoMax)

	(Calular Panel Ideal)

(Calcular la cantidad de paneles) (Se necesita potPicoBanco/PanelIdeal) 				
(verificar paridad) (Si se queda a medias, es mejor tener un panel más)
(Calcular el wattage del sistema en base a la cantidad de paneles por los watts del panel ideal) 	

	(Calcular inversor) (Se usa el wattage del sistema y el voltaje del mismo)

(Calcular Hora Promedio) ((max+min)/2)
(Calcular potPromBanco) (Se necesita ConsumoMensual/HoraProm)

	(Calcular las baterías ideal) (potPromBanco/batIdeal)						 
(Calcular margen con baterías siempre al 50%) ((potPromBanco/batIdeal)*2)

*Imprimir:
Sistema tipo mppt
Voltaje del sistema
Wattage del sistema
Cantidad de paneneles a X watts
Invesor del sistema con X capacidad en watts
Baterias del sistema con X capacidad en watts

*/