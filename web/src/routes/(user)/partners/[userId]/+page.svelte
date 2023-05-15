<script lang="ts">
	import CircleIconButton from '$lib/components/elements/buttons/circle-icon-button.svelte';
	import UserPageLayout from '$lib/components/layouts/user-page-layout.svelte';
	import AssetGrid from '$lib/components/photos-page/asset-grid.svelte';
	import ControlAppBar from '$lib/components/shared-components/control-app-bar.svelte';
	import {
		assetInteractionStore,
		isMultiSelectStoreState,
		selectedAssets
	} from '$lib/stores/asset-interaction.store';
	import { locale } from '$lib/stores/preferences.store';
	import { bulkDownload } from '$lib/utils/asset-utils';
	import Close from 'svelte-material-icons/Close.svelte';
	import CloudDownloadOutline from 'svelte-material-icons/CloudDownloadOutline.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const handleDownloadFiles = async () => {
		await bulkDownload('immich', Array.from($selectedAssets), () => {
			assetInteractionStore.clearMultiselect();
		});
	};
</script>

<UserPageLayout
	user={data.user}
	title="{data.partner.firstName} {data.partner.lastName}'s Photos"
	hideNavbar={$isMultiSelectStoreState}
>
	<svelte:fragment slot="header">
		{#if $isMultiSelectStoreState}
			<ControlAppBar
				on:close-button-click={() => assetInteractionStore.clearMultiselect()}
				backIcon={Close}
				tailwindClasses={'bg-white shadow-md'}
			>
				<svelte:fragment slot="leading">
					<p class="font-medium text-immich-primary dark:text-immich-dark-primary">
						Selected {$selectedAssets.size.toLocaleString($locale)}
					</p>
				</svelte:fragment>
				<svelte:fragment slot="trailing">
					<CircleIconButton
						title="Download"
						logo={CloudDownloadOutline}
						on:click={handleDownloadFiles}
					/>
				</svelte:fragment>
			</ControlAppBar>
		{/if}
	</svelte:fragment>

	<AssetGrid user={data.partner} slot="content" />
</UserPageLayout>
