import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

import { AUTH_TOKEN } from "../constant";

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const calculateTimeElapsed = (dateIssued) =>{
  const fechaEmitida = new Date(dateIssued);
  const fechaActual = new Date();

  const minutosDiferencia = differenceInMinutes(fechaActual, fechaEmitida);
  const horasDiferencia = differenceInHours(fechaActual, fechaEmitida);

  if(minutosDiferencia < 1){
    return "un momento";    
  }else if (minutosDiferencia < 60) {
    // Si la diferencia es menor a 60 minutos, devolver el número de minutos
    return `${minutosDiferencia} minutos`;
  }
  else if (horasDiferencia < 24) {
    // Si la diferencia es menor a 24 horas, devolver el número de horas
    return `${horasDiferencia} horas`;
  } else {
  // Si la diferencia es mayor o igual a 24 horas, devolver el número de días
    const diasDiferencia = differenceInDays(fechaActual, fechaEmitida);
    return `${diasDiferencia} días`;
  }
}