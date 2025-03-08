<script lang="ts">
  import * as tabs from "@zag-js/tabs";
  import { useMachine, normalizeProps } from "@zag-js/svelte";
  import clsx from "clsx";

  const data = [
    {
      value: "free",
      label: "Free",
    },
    {
      value: "pro",
      label: "Pro",
    },
    {
      value: "enterprise",
      label: "Enterprise",
    },
  ];

  const service = useMachine(tabs.machine, {
    id: "1",
    defaultValue: "free",
  });

  const api = $derived(tabs.connect(service, normalizeProps));
</script>

{#snippet priceRow({
  value,
  plan,
  name,
}: {
  value: string | boolean;
  plan: string;
  name: string;
})}
  <div
    class="grid grid-cols-2 w-full border-b border-outline-variant py-4 last:border-none"
  >
    <dt class="text-sm/6 font-normal text-on-surface-variant">
      {name}
    </dt>
    <dd class="text-center">
      {#if typeof value === "boolean"}
        {#if value}
          <svg
            class="inline-block size-4 fill-primary"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
              clip-rule="evenodd"
            />
          </svg>
        {:else}
          <svg
            class="inline-block size-4 fill-on-surface-variant"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z"
            />
          </svg>
        {/if}
      {:else}
        <span class="text-sm/6 text-on-surface">{value}</span>
      {/if}

      <span class="sr-only">
        {typeof value === "boolean"
          ? value
            ? `Included in ${plan}`
            : `Not included in ${plan}`
          : `${plan} includes: ${value}`}
      </span>
    </dd>
  </div>
{/snippet}

<div
  class="flex items-center px-2 flex-col max-w-5xl mx-auto"
  {...api.getRootProps()}
>
  <div
    class="flex space-x-2 w-full px-4 scrollbar-thin overflow-auto pb-4"
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
  <div class="mt-4 flex flex-col" {...api.getContentProps({ value: "free" })}>
    <div
      class="-mx-6 mt-10 rounded-lg bg-surface-high px-6 py-3 text-sm/6 font-semibold text-on-surface group-first-of-type:mt-5"
    >
      Usage
    </div>
    <dl class="w-full">
      {@render priceRow({
        plan: "free",
        value: "6000",
        name: "Included build minutes",
      })}

      {@render priceRow({
        plan: "free",
        value: false,
        name: "Additional build minutes",
      })}

      {@render priceRow({
        plan: "free",
        value: "5",
        name: "Included committers",
      })}

      {@render priceRow({
        plan: "free",
        value: false,
        name: "Additional committers",
      })}
    </dl>
    <div
      class="-mx-6 mt-10 rounded-lg bg-surface-high px-6 py-3 text-sm/6 font-semibold text-on-surface group-first-of-type:mt-5"
    >
      Features
    </div>
    <dl class="w-full">
      {@render priceRow({
        plan: "free",
        value: "4-core / 16GB ram",
        name: "Max runner size",
      })}

      {@render priceRow({
        plan: "free",
        value: "20",
        name: "Runner concurrency",
      })}

      {@render priceRow({
        plan: "free",
        value: "10",
        name: "Projects",
      })}

      {@render priceRow({
        plan: "free",
        value: "Unlimited",
        name: "Users",
      })}

      {@render priceRow({
        plan: "free",
        value: false,
        name: "SAML",
      })}

      {@render priceRow({
        plan: "free",
        value: false,
        name: "Custom domain",
      })}
    </dl>

    <div
      class="-mx-6 mt-10 rounded-lg bg-surface-high px-6 py-3 text-sm/6 font-semibold text-on-surface group-first-of-type:mt-5"
    >
      Support
    </div>
    <dl class="w-full">
      {@render priceRow({
        plan: "free",
        value: "We'll try",
        name: "Email",
      })}

      {@render priceRow({
        plan: "free",
        value: false,
        name: "Phone",
      })}

      {@render priceRow({
        plan: "free",
        value: false,
        name: "Dedicated support rep",
      })}

      {@render priceRow({
        plan: "free",
        value: false,
        name: "1:1 Onboarding",
      })}
    </dl>
  </div>

  <div class="mt-4 flex flex-col" {...api.getContentProps({ value: "pro" })}>
    <div
      class="-mx-6 mt-10 rounded-lg bg-surface-high px-6 py-3 text-sm/6 font-semibold text-on-surface group-first-of-type:mt-5"
    >
      Usage
    </div>
    <dl class="w-full">
      {@render priceRow({
        plan: "pro",
        value: "6000",
        name: "Included build minutes",
      })}

      {@render priceRow({
        plan: "pro",
        value: "$1 per 500",
        name: "Additional build minutes",
      })}

      {@render priceRow({
        plan: "pro",
        value: "5",
        name: "Included committers",
      })}

      {@render priceRow({
        plan: "pro",
        value: "$5 per committer",
        name: "Additional committers",
      })}
    </dl>
    <div
      class="-mx-6 mt-10 rounded-lg bg-surface-high px-6 py-3 text-sm/6 font-semibold text-on-surface group-first-of-type:mt-5"
    >
      Features
    </div>
    <dl class="w-full">
      {@render priceRow({
        plan: "pro",
        value: "8-core / 32GB ram",
        name: "Max runner size",
      })}

      {@render priceRow({
        plan: "pro",
        value: "40",
        name: "Runner concurrency",
      })}

      {@render priceRow({
        plan: "pro",
        value: "100",
        name: "Projects",
      })}

      {@render priceRow({
        plan: "pro",
        value: "Unlimited",
        name: "Users",
      })}

      {@render priceRow({
        plan: "pro",
        value: false,
        name: "SAML",
      })}

      {@render priceRow({
        plan: "pro",
        value: false,
        name: "Custom domain",
      })}
    </dl>

    <div
      class="-mx-6 mt-10 rounded-lg bg-surface-high px-6 py-3 text-sm/6 font-semibold text-on-surface group-first-of-type:mt-5"
    >
      Support
    </div>
    <dl class="w-full">
      {@render priceRow({
        plan: "pro",
        value: true,
        name: "Email",
      })}

      {@render priceRow({
        plan: "pro",
        value: false,
        name: "Phone",
      })}

      {@render priceRow({
        plan: "pro",
        value: false,
        name: "Dedicated support rep",
      })}

      {@render priceRow({
        plan: "pro",
        value: false,
        name: "1:1 Onboarding",
      })}
    </dl>
  </div>

  <div
    class="mt-4 flex flex-col"
    {...api.getContentProps({ value: "enterprise" })}
  >
    <div
      class="-mx-6 mt-10 rounded-lg bg-surface-high px-6 py-3 text-sm/6 font-semibold text-on-surface group-first-of-type:mt-5"
    >
      Usage
    </div>
    <dl class="w-full">
      {@render priceRow({
        plan: "enterprise",
        value: "Custom",
        name: "Included build minutes",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: "Custom",
        name: "Additional build minutes",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: "Custom",
        name: "Included committers",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: "Custom",
        name: "Additional committers",
      })}
    </dl>
    <div
      class="-mx-6 mt-10 rounded-lg bg-surface-high px-6 py-3 text-sm/6 font-semibold text-on-surface group-first-of-type:mt-5"
    >
      Features
    </div>
    <dl class="w-full">
      {@render priceRow({
        plan: "enterprise",
        value: "16-core / 64GB ram",
        name: "Max runner size",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: "Custom",
        name: "Runner concurrency",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: "Unlimited",
        name: "Projects",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: "Unlimited",
        name: "Users",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: "Coming soon",
        name: "SAML",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: true,
        name: "Custom domain",
      })}
    </dl>

    <div
      class="-mx-6 mt-10 rounded-lg bg-surface-high px-6 py-3 text-sm/6 font-semibold text-on-surface group-first-of-type:mt-5"
    >
      Support
    </div>
    <dl class="w-full">
      {@render priceRow({
        plan: "enterprise",
        value: true,
        name: "Email",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: true,
        name: "Phone",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: true,
        name: "Dedicated support rep",
      })}

      {@render priceRow({
        plan: "enterprise",
        value: true,
        name: "1:1 Onboarding",
      })}
    </dl>
  </div>
</div>
