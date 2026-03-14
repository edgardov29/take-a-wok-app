// src/utils/ingredients.js
export function countIngredientsRecursively(ingredientes = []) {
  return ingredientes.reduce((acc, ing) => {
    const hijos = Array.isArray(ing.ingredientes) ? countIngredientsRecursively(ing.ingredientes) : 0;
    return acc + 1 + hijos;
  }, 0);
}

export function flattenIngredients(ingredientes = [], parentPath = "") {
  return ingredientes.flatMap((ing, idx) => {
    const path = parentPath ? `${parentPath} > ${ing.nombre}` : ing.nombre;
    const self = [{ nombre: ing.nombre, cantidad: ing.cantidad, path, key: `${path}-${idx}` }];
    const hijos = Array.isArray(ing.ingredientes) ? flattenIngredients(ing.ingredientes, path) : [];
    return self.concat(hijos);
  });
}