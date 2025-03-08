<script lang="ts">
  import * as tabs from "@zag-js/tabs";
  import { useMachine, normalizeProps } from "@zag-js/svelte";
  import clsx from "clsx";

  interface Props {
    data: {
      label: string;
      value: string;
      content: string;
      description: string;
    }[];
  }

  const { data }: Props = $props();

  const service = useMachine(tabs.machine, {
    id: "1",
    defaultValue: "simple",
  });

  const api = $derived(tabs.connect(service, normalizeProps));
</script>

<div
  class="flex items-center px-2 flex-col max-w-5xl mx-auto"
  {...api.getRootProps()}
>
  <div
    class="flex space-x-2 scrollbar-thin w-full px-4 overflow-auto pb-4"
    {...api.getListProps()}
  >
    {#each data as item}
      <button
        class={clsx(
          "w-full py-2 px-4 cursor-pointer transition-colors whitespace-nowrap",
          api.value === item.value
            ? "text-primary border-b border-primary"
            : "text-on-surface-variant border-b border-outline-variant hover:text-on-surface hover:border-outline"
        )}
        {...api.getTriggerProps({ value: item.value })}
      >
        {item.label}
      </button>
    {/each}
  </div>
  {#each data as item}
    <div
      class="mt-4 max-w-4xl w-full bg-surface rounded-lg border border-outline-variant"
      {...api.getContentProps({ value: item.value })}
    >
      <div
        class="flex flex-col md:flex-row divide-outline-variant md:divide-x p-4"
      >
        <div class="p-4 grow overflow-auto scrollbar-thin order-1 md:order-0">
          {@html item.content}
        </div>
        <div
          class="w-full md:w-64 border-b border-outline-variant md:border-none"
        >
          <p
            class="block text-center md:text-left text-on-surface-variant text-lg md:text-2xl font-bold px-4 pb-4 md:pt-4 text-balance"
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  :global {
    @media (prefers-color-scheme: dark) {
      .shiki,
      .shiki span {
        color: var(--shiki-dark) !important;
        background-color: var(--shiki-dark-bg) !important;
        /* Optional, if you also want font styles */
        font-style: var(--shiki-dark-font-style) !important;
        font-weight: var(--shiki-dark-font-weight) !important;
        text-decoration: var(--shiki-dark-text-decoration) !important;
      }
    }

    .shiki {
      code {
        counter-reset: step;
        counter-increment: step 0;
      }

      code .line::before {
        content: counter(step);
        counter-increment: step;
        width: 1rem;
        margin-right: 1.5rem;
        padding-right: 1.5rem;
        display: inline-block;
        text-align: right;
        color: var(--color-on-surface-variant);
      }
    }

    .no-lines .shiki code .line::before {
      display: none;
    }
  }
</style>
