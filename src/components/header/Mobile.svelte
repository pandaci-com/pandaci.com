<script lang="ts">
    import * as dialog from "@zag-js/dialog";
    import { portal, normalizeProps, useMachine } from "@zag-js/svelte";
    import { fly } from "svelte/transition";

    const service = useMachine(dialog.machine, { id: "mobile-nav" });
    const api = $derived(dialog.connect(service, normalizeProps));

    interface Props {}

    const {}: Props = $props();

    const docs = [
        {
            name: "Home",
            href: "/",
            start: "/",
        },
        {
            name: "Why PandaCI?",
            href: "/docs/platform/overview/why-pandaci",
        },
        {
            name: "Docs",
            href: "/docs/platform/overview/quick-start",
            start: "/docs",
        },
        { name: "Pricing", href: "/pricing", start: "/pricing" },
    ];

    const links = [
        { name: "Get started", href: "https://app.pandaci.com/signup" },
        { name: "Sign in", href: "https://app.pandaci.com/login" },
        // { name: "GitHub", href: "https://github.com/pandaci-com/pandaci" },
    ];
</script>

<button
    {...api.getTriggerProps()}
    class="lg:hidden text-on-surface cursor-pointer"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="size-6"
        viewBox="0 0 256 256"
        ><path
            d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
        ></path></svg
    >
    <span class="sr-only">open menu</span>
</button>

{#if api.open}
    <div use:portal {...api.getBackdropProps()}></div>
    <div use:portal {...api.getPositionerProps()}>
        <div
            transition:fly={{ duration: 300, x: "100%", opacity: 1 }}
            class="fixed flex flex-col lg:hidden sm:max-w-sm z-40 p-4 bg-surface-high rounded-xl sm:right-2 inset-2 sm:left-auto sm:w-full sm:inset-y-2 border border-outline"
            {...api.getContentProps()}
        >
            <div class="w-full flex justify-between mb-4">
                <h2
                    class="text-lg/8 mx-1 relative font-semibold text-on-surface"
                >
                    Panda CI
                </h2>
                <button
                    class="p-1 text-on-surface-variant hover:text-on-surface cursor-pointer"
                    {...api.getCloseTriggerProps()}
                >
                    <span class="sr-only">close menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="size-4"
                        viewBox="0 0 256 256"
                    >
                        <path
                            d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
                        />
                    </svg>
                </button>
            </div>
            <nav class="flex space-y-2 flex-col">
                {#each docs as item}
                    <a
                        href={item.href}
                        class="text-on-surface-variant hover:bg-on-surface/5 rounded-xl p-2 hover:text-on-surface cursor-pointer py-2 data-[active='true']:text-primary"
                        data-active={item.href === "/"
                            ? window.location.pathname === item.href
                            : item.start
                              ? window.location.pathname.startsWith(item.start)
                              : false}
                    >
                        {item.name}
                    </a>
                {/each}
                <div class="flex flex-col space-y-2 sm:hidden">
                    <hr class="border-outline w-full" />
                    {#each links as item}
                        <a
                            href={item.href}
                            class="text-on-surface-variant hover:bg-on-surface/5 rounded-xl p-2 hover:text-on-surface cursor-pointer py-2"
                        >
                            {item.name}
                        </a>
                    {/each}
                </div>
            </nav>
        </div>
    </div>
{/if}
