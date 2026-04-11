<script lang="ts">
    type NavItem = {
        label: string;
        icon: string;
        href?: string;
    };

    const topItems: NavItem[] = [
        { label: 'Text Compare', icon: 'compare_arrows', href: '#' },
        { label: 'JWT Decoder', icon: 'enhanced_encryption' },
        { label: 'Base64 Encoder', icon: 'code' },
        { label: 'JSON Formatter', icon: 'format_align_left' }
    ];

    const bottomItems: NavItem[] = [
        { label: 'Settings', icon: 'settings', href: '#' }
    ];
</script>

<aside class="h-screen w-64 docked left-0 bg-white flex flex-col py-8 px-6 shrink-0 overflow-y-auto border-r border-outline-variant/30">
    <div class="mb-10 px-2">
        <h1 class="text-xl font-bold text-on-surface font-headline tracking-tight">Syntax &amp; Steel</h1>
        <p class="text-xs font-medium text-on-surface-variant mt-1 opacity-70">Precision Utility Suite</p>
    </div>
    
    <nav class="flex-1 space-y-1">
        {#each topItems as item}
            {#if item.href}
                <a class="flex items-center gap-3 px-3 py-2.5 bg-primary text-on-primary rounded-lg font-semibold transition-all shadow-sm" href="{item.href}">
                    <span class="material-symbols-outlined text-[20px]" data-icon="{item.icon}">{item.icon}</span>
                    <span class="text-sm">{item.label}</span>
                </a>
            {:else}
                <a class="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg transition-colors" href="{item.href}">
                    <span class="material-symbols-outlined text-[20px]" data-icon="{item.icon}">{item.icon}</span>
                    <span class="text-sm font-medium">{item.label}</span>
                </a>
            {/if}
        {/each}
    </nav>

    <div class="mt-auto px-2">
        {#each bottomItems as item}
            <a class="flex items-center gap-3 py-2 text-on-surface-variant hover:text-on-surface transition-colors" href="{item.href}">
                <span class="material-symbols-outlined text-[20px]" data-icon="{item.icon}">{item.icon}</span>
                <span class="text-sm font-medium">{item.label}</span>
            </a>
        {/each}
    </div>
</aside>

