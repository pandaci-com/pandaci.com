<script lang="ts">
  import * as dialog from "@zag-js/dialog";
  import { portal, normalizeProps, useMachine } from "@zag-js/svelte";
  import type { Snippet } from "svelte";

  const service = useMachine(dialog.machine, { id: "mobileHeader" });
  const api = $derived(dialog.connect(service, normalizeProps));

  const {
    children,
    currentGroup,
    header = true,
  }: {
    children: Snippet;
    currentGroup: string;
    header?: boolean;
  } = $props();
</script>

<button
  class="cursor-pointer flex items-center w-full px-4 group"
  {...api.getTriggerProps()}
>
  <svg
    class="size-4 group-data-[state='open']:rotate-90 transition"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path
      d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
    />
  </svg>
  <span class="ml-2">
    {currentGroup.replace(/\d{2}-/, "").replaceAll("-", " ")}
  </span>
</button>

{#if api.open}
  <div
    class={[
      "bg-surface/50 backdrop-blur-lg z-20 fixed inset-x-0 bottom-0  mt-px overflow-y-auto",
      header ? "top-[6.5rem]" : "top-[3.5rem]",
    ]}
    use:portal
    {...api.getPositionerProps()}
  >
    <nav class="w-full pt-4 pb-12 px-8 h-fit" {...api.getContentProps()}>
      {@render children()}
    </nav>
  </div>
{/if}
