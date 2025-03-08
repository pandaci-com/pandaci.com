<script lang="ts">
  import * as select from "@zag-js/select";
  import { portal, useMachine, normalizeProps } from "@zag-js/svelte";

  const {
    groups,
  }: {
    groups: { label: string; group: string; href: string }[];
  } = $props();

  const collection = select.collection({
    items: groups,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.href,
  });

  const service = useMachine(select.machine, {
    id: "1",
    collection,
    value: [
      typeof window === "undefined"
        ? " "
        : groups.find((group) =>
            window.location.pathname.startsWith(
              "/docs/" + group.group.toLowerCase() + "/"
            )
          )?.href || " ",
    ],
    positioning: {
      sameWidth: true,
    },
    onValueChange: ({ value }) => {
      window.location.href = value[0];
    },
  });

  const api = $derived(select.connect(service, normalizeProps));
</script>

<div class="mb-4" {...api.getRootProps()}>
  <div {...api.getControlProps()}>
    <button
      class="border border-outline rounded-lg px-4 h-11 py-2 flex items-center w-full justify-between"
      {...api.getTriggerProps()}
    >
      {api.valueAsString}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="size-4 ml-2"
        viewBox="0 0 256 256"
      >
        <path
          d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"
        ></path>
      </svg>
    </button>
  </div>

  <div {...api.getPositionerProps()}>
    <ul
      class="bg-surface-high z-50 w-full rounded-lg border border-outline/25 p-1 flex flex-col space-y-2"
      {...api.getContentProps()}
    >
      {#each groups as item}
        <li
          class="hover:bg-on-surface/5 rounded p-2 cursor-pointer justify-between flex items-center group"
          {...api.getItemProps({ item })}
        >
          <span
            class="group-data-[state='checked']:text-on-surface group-hover:text-on-surface text-on-surface-variant"
            {...api.getItemTextProps({ item })}>{item.label}</span
          >
          <span {...api.getItemIndicatorProps({ item })}>
            <svg
              class="size-5 fill-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <path
                d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
              ></path>
            </svg>
          </span>
        </li>
      {/each}
    </ul>
  </div>
</div>
