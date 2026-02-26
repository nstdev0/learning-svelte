<script lang="ts">
    import { tick } from "svelte";
    import { Link, useLocation } from "svelte-routing";

    const location = useLocation();

    let navElement: HTMLElement | undefined = $state();
    let sliderStyles = $state({ left: "0px", width: "0px", opacity: 0 });

    const getActiveProps = ({ isCurrent }: { isCurrent: boolean }) => {
        return { class: isCurrent ? "active" : "" };
    };

    $effect(() => {
        $location.pathname;
        updateSliderPosition();
    });

    async function updateSliderPosition() {
        if (!navElement) return;

        await tick();

        requestAnimationFrame(() => {
            const activeLink = navElement?.querySelector(
                "a.active",
            ) as HTMLElement;

            if (activeLink) {
                sliderStyles = {
                    left: `${activeLink.offsetLeft}px`,
                    width: `${activeLink.offsetWidth}px`,
                    opacity: 1,
                };
            } else {
                sliderStyles.opacity = 0;
            }
        });
    }
</script>

<svelte:window onresize={updateSliderPosition} />

<nav bind:this={navElement}>
    <div
        class="slider"
        style:left={sliderStyles.left}
        style:width={sliderStyles.width}
        style:opacity={sliderStyles.opacity}
    ></div>

    <Link to="/" getProps={getActiveProps}>Home</Link>
    <Link to="/weather" getProps={getActiveProps}>Weather</Link>
    <Link to="/pos" getProps={getActiveProps}>PoS</Link>
</nav>

<style>
    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 2rem;
        padding: 1rem;
        border-bottom: 1px solid #ccc;
        position: relative;
    }

    .slider {
        position: absolute;
        height: calc(100% - 1.5rem);
        background: rgb(3, 133, 255);
        border-radius: 50px;
        z-index: 1;
        transition:
            left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.2s ease;
        pointer-events: none;
    }

    :global(nav a) {
        position: relative;
        z-index: 2;
        font-weight: 800;
        text-decoration: none;
        padding: 0.5rem 1.25rem;
        border-radius: 50px;
        color: #3b82f6;
        transition: color 0.3s ease;
    }

    :global(nav a.active) {
        color: white;
    }
</style>
