import { writable } from 'svelte/store';
import { api, type AssetResponseDto } from '@api';

function createAssetViewingStore() {
  const viewingAssetStoreState = writable<AssetResponseDto>();
  const showState = writable<boolean>(false);

  const setAssetId = async (id: string) => {
    const { data } = await api.assetApi.getAssetById({ id });
    viewingAssetStoreState.set(data);
    showState.set(true);
  };

  const showAssetViewer = (show: boolean) => {
    showState.set(show);
  };

  return {
    asset: {
      subscribe: viewingAssetStoreState.subscribe,
    },
    isViewing: {
      subscribe: showState.subscribe,
    },
    setAssetId,
    showAssetViewer,
  };
}

export const assetViewingStore = createAssetViewingStore();
