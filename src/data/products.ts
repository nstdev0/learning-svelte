// src/data/products.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
}

export const MENU: Product[] = [
    {
        id: 'p1',
        name: 'Burger 1',
        description: 'Hamburguesa clásica con lechuga, tomate y la salsa de la casa.',
        price: 15.00
    },
    {
        id: 'p2',
        name: 'Burger 2',
        description: 'Doble smash burger, doble queso cheddar, tocino crujiente y cebolla caramelizada.',
        price: 22.50
    },
    {
        id: 'p3',
        name: 'Burger 3',
        description: 'Corte artesanal, queso azul, rúcula y reducción de aceto balsámico.',
        price: 25.00
    }
];