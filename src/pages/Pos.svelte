<script lang="ts">
    import { MENU } from "../data/products";
    import ProductCard from "../components/ProductCard.svelte";
    import CartSummary from "../components/CartSummary.svelte";
    import { cart } from "../domain/cart.svelte";
</script>

<main class="layout" class:has-cart={cart.items.length > 0}>
    <section class="menu-section">
        <header>
            <h1>Burgers</h1>
            <p>Punto de Venta</p>
        </header>

        <div class="product-grid">
            {#each MENU as product (product.id)}
                <ProductCard {product} />
            {/each}
        </div>
    </section>

    <aside class="cart-section">
        <CartSummary />
    </aside>
</main>

<style>
    :global(body) {
        margin: 0;
    }

    .layout {
        display: flex;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .menu-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: 2rem;
        height: 100%;
        overflow-y: auto;
    }

    .cart-section {
        width: 350px;
        height: 100%;
        margin-right: -350px;
        transition: margin-right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .layout.has-cart .cart-section {
        margin-right: 0;
    }

    .product-grid {
        display: grid;
        width: 80%;
        grid-template-columns: repeat(auto-fit, 275px);
        justify-content: center;
        gap: 1.5rem;
        margin-top: 2rem;
    }
</style>
