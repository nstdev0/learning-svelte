<script lang="ts">
    import type { Product } from "../data/products";
    import { cart } from "../domain/cart.svelte";

    // Las "props" se reciben extrayéndolas del objeto global $props()
    let { product } = $props<{ product: Product }>();

    let quantityState = $state(1);

    const handleAddItem = (product: Product, quantity: number) => {
        cart.addItem(product, quantity);
        quantityState = 1;
    };
    const handleInputChange = (e: Event) => {
        quantityState = Number((e.target as HTMLInputElement).value);
    };
</script>

<div class="card">
    <h3>{product.name}</h3>
    <p class="desc">{product.description}</p>
    <span class="price">$ {product.price.toFixed(2)}</span>
    <div class="footer">
        <div class="quantity-controls">
            <button class="quantity-btn" onclick={() => quantityState--}
                >-</button
            >
            <input
                class="quantity-input"
                type="text"
                value={quantityState}
                onchange={handleInputChange}
            />
            <button class="quantity-btn" onclick={() => quantityState++}
                >+</button
            >
        </div>
        <button onclick={() => handleAddItem(product, quantityState)}>
            Agregar
        </button>
    </div>
</div>

<style>
    .card {
        border: 1px solid #ddd;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .desc {
        color: #666;
        font-size: 0.9rem;
    }
    .footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 1rem;
        gap: 10px;
    }
    button {
        background: #d97706;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }
    button:hover {
        background: #b45309;
    }
    button:active {
        scale: 0.95;
        transition: all 0.2s ease-in-out;
    }
    .quantity-controls {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .quantity-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        background: #d97706;
        color: white;
        border: none;
        cursor: pointer;
    }
    .quantity-input {
        width: 30px;
        height: 30px;
        padding: 0;
        text-align: center;
    }
</style>
