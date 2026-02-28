<script lang="ts">
  import { getAbortSignal } from "svelte";
  import { getWeather } from "../services/weather";

  interface WeatherData {
    address: string;
    conditions: string;
    feelslike: number;
    humidity: number;
    precipprob: number;
    temp: number | string;
    timezone: string;
    winddir: number;
    windspeed: number;
  }

  // Estado sincronizado con el input usando bind:value
  let searchQuery = $state("");

  let weatherData: WeatherData | undefined = $state(undefined);
  let error: string | null = $state(null);
  let isLoading = $state(false);

  // Este efecto manejará tanto el debounce como la cancelación
  $effect(() => {
    const query = searchQuery.trim();

    if (query === "") {
      weatherData = undefined;
      error = null;
      return;
    }
    // 1. Obtenemos la señal aquí, de forma síncrona,
    // mientras el $effect está activo y Svelte nos está "mirando"
    const currentSignal = getAbortSignal();

    // 2. Se configura el debounce dentro del efecto
    const timer = setTimeout(async () => {
      isLoading = true;
      error = null;

      try {
        // 3. Aquí SÍ es seguro pasar el currentSignal porque estamos
        // indirectamente dentro del ciclo de vida del $effect.
        // Si searchQuery cambia, Svelte cancelará la señal del fetch anterior automáticamente.
        const data = await getWeather(query, currentSignal);
        weatherData = data;
      } catch (err) {
        if (currentSignal.aborted) return;

        if (err instanceof Error) {
          if (err.name === "AbortError") return; // Se ignoran cancelaciones intencionales

          if (err.message === "CITY_NOT_FOUND") {
            error = "City not found";
          } else {
            error = err.message;
          }
        }
      } finally {
        isLoading = false;
      }
    }, 500);

    // 3. Función de limpieza del efecto:
    // Si el usuario escribe otra letra antes de los 500ms, Svelte limpia
    // el temporizador anterior, previniendo peticiones innecesarias.
    return () => clearTimeout(timer);
  });

  const handleClearInput = () => {
    searchQuery = ""; // Svelte actualizará el input automáticamente
    weatherData = undefined;
    error = null;
  };
</script>

<div class="weather-widget">
  <div class="search-box">
    <input
      class="search-input"
      type="text"
      placeholder="City name..."
      bind:value={searchQuery}
    />
    <button class="clear-btn" onclick={handleClearInput}> Clear </button>
  </div>

  {#if isLoading}
    <div class="weather-content placeholder">
      <p>Buscando...</p>
    </div>
  {:else if error}
    <div class="weather-content placeholder">
      <p>{error}</p>
    </div>
  {:else if !weatherData && !error}
    <div class="weather-content placeholder">
      <p>Type a city name to see the weather</p>
    </div>
  {:else}
    <div class="weather-content" id="weather-container">
      <h2 class="address">
        {#if weatherData?.address}
          {weatherData?.address}
        {:else}
          <span class="no-data">No data</span>
        {/if}
      </h2>
      <span class="timezone">
        {#if weatherData?.timezone}
          {weatherData?.timezone}
        {:else}
          <span class="no-data">No data</span>
        {/if}
      </span>
      <div class="temp-box">
        <span class="temp">
          {#if weatherData?.temp}
            {weatherData?.temp}°
          {:else}
            <span class="no-data">No data</span>
          {/if}
        </span>
      </div>
      <p class="conditions">{weatherData?.conditions}</p>

      <div class="details">
        <div class="detail-item">
          <span class="label">Feels like</span>
          {#if weatherData?.feelslike}
            <span class="value">{weatherData?.feelslike}°</span>
          {:else}
            <span class="no-data">No data</span>
          {/if}
        </div>
        <div class="detail-item">
          <span class="label">Humidity</span>
          {#if weatherData?.humidity}
            <span class="value">{weatherData?.humidity}%</span>
          {:else}
            <span class="no-data">No data</span>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .weather-widget {
    max-width: 450px;
    background: linear-gradient(145deg, #bce4ff, #85c2ff);
    border-radius: 20px;
    padding: 24px;
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.08),
      0 1px 8px rgba(0, 0, 0, 0.04);
    color: #334155;
    transition: all 0.3s ease;
    margin: auto;
    padding: 2rem;
  }

  .search-box {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
  }

  .search-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
    background: white;
    color: black;
  }

  .search-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .clear-btn {
    padding: 0 16px;
    background: #f1f5f9;
    border: none;
    border-radius: 12px;
    color: #64748b;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .clear-btn:hover {
    background: rgba(255, 0, 0, 0.523);
    color: #334155;
  }

  .clear-btn:active {
    scale: 0.9;
    transition: all 0.3s ease-in-out;
  }

  .weather-content {
    text-align: center;
    animation: fadeIn 0.4s ease-out;
  }

  .weather-content.placeholder {
    color: #163c6a;
    padding: 2rem 0;
    font-size: 0.95rem;
  }

  .address {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    text-transform: capitalize;
  }

  .timezone {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  .temp-box {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 16px 0;
  }

  .temp {
    font-size: 4.5rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -2px;
    color: #3b82f6;
  }

  .conditions {
    font-size: 1.1rem;
    font-weight: 500;
    color: #475569;
    margin: 0 0 24px 0;
  }

  .details {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #102863;
    font-weight: 600;
  }

  .value {
    font-size: 1rem;
    font-weight: 700;
    color: #030579;
  }

  .no-data {
    font-size: 0.8rem;
    font-weight: 500;
    color: #94a3b8;
    font-style: italic;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
