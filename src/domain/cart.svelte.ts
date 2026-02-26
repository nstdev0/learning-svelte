import type { Product } from '../data/products';

export interface CartItem extends Product {
    quantity: number;
}

class CartSystem {
    items = $state<CartItem[]>([]);

    totalPrice = $derived(
        this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    );

    totalItems = $derived(
        this.items.reduce((total, item) => total + item.quantity, 0)
    );

    addItem(product: Product, quantity: number) {
        // 1. Buscamos el ítem UNA sola vez y guardamos su referencia
        const existingItem = this.items.find(item => item.id === product.id);

        // 2. Calculamos la cantidad actual en el carrito
        const currentQuantity = existingItem?.quantity || 0;

        // 3. Validación de negocio
        if (product.stock < currentQuantity + quantity) {
            throw new Error("Stock insuficiente.");
        }

        // 4. Mutación reactiva del estado
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
    }

    removeItem(productId: string) {
        this.items = this.items.filter(item => item.id !== productId);
    }

    clearCart() {
        this.items = [];
    }
}

export const cart = new CartSystem();