//Variables de entrada
let consumoMes = 0, horasPicoMax = 0, horasPicoMin = 0, potPicoBanco = 0, sysVoltage = 0, sysWatt = 0, panIdeal = -1, batIdeal = -1, invIdeal = -1, potPromBanco = 0, horaProm = 0, cantPaneles = 0, residuo = 0;

//Aquí va un objeto con los paneles: Llevan los campos de nombre, watts, cantidad, precio y cantidadMax (función)
//Aquí va un objeto con las baterías: Llevan los campos de nombre, amp, cantidad, precio y cantidadMax (función)
//Aquí va un objeto con los inversores: Llevan los campos de nombre, watts, cantidad, precio

function maxWatts(){
    return (this.watts * (this.cantidad + 1));
}

function maxAmp(){
    return (this.amp * (this.cantidad + 1));
}

function ALLIN(){
/*
1 Se obtienen Consumo mensual
2 Horas Pico Max 
3 Horas Pico Min
 */

//4 Aumento del consumo mensual para tener un margen de error
        consumoMes = consumoMes * 1.3;

//5 Calculo del Voltaje del sistema
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

//6 Calculo de la potencia pico del banco 
        potPicoBanco = consumoMes/horasPicoMax;

//7 Calculo de panel ideal
        for (const panel of paneles) {
            if (panel.cantidadMax() > consumoMes) {
                panIdeal = panel;
                console.log(`El panel ${panIdeal.nombre} es el indicado para ti`);
                break;
            }
        }
//8 Calculo de la cantidad de paneles
        cantPaneles = potPicoBanco/panIdeal.watts;
        residuo = cantPaneles % 2;

//9 Ajuste de la cantidad de paneles
        if (residuo != 0) {
            cantPaneles = cantPaneles + 1;
        }
        if (panIdeal== -1) {
            throw new Error('No hay paneles para tu consumo');
        } else{
        console.log('El código funcionó hasta el calculo del panel ideal');
        }

//10 Calculo del wattage del sistema
        sysWatt = cantPaneles * panIdeal.watts;

//11 Calculo del inversor ideal
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
            console.log('El código funcionó hasta el calculo del inversor ideal');
        }

//12 Calculo de horas promedio de sol
        horaProm = (horasPicoMax+horasPicoMin)/2;

//13 Calculo de la potencia promedio del banco
        potPromBanco = consumoMes/horaProm;

//14 Calculo de la batería ideal
        for (const bateria of baterias) {

//15 Margen de eficiencia de la batería
            if (bateria.cantidadMax() > (consumoMes*2)) {
                console.log(`La batería ${bateria.nombre} es el indicado para ti`);
                batIdeal = bateria;
                break;
            }
        }
        if (batIdeal == -1) {
            throw new Error('No hay baterías para tu consumo');
        } else{
            console.log('El código funcionó hasta el calculo de la batería ideal');
        }

//16 Impresión de resultados
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
} //Fin de la función ALLIN