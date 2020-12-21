import { Configuration } from '../configuration';
export declare class AssetsManager {
    private watchAssetsKeyValue;
    private watchers;
    /**
     * Using on `nest build` to close file watch or the build process will not end
     */
    closeWatchers(): void;
    copyAssets(configuration: Required<Configuration>, appName: string, outDir: string, watchAssetsMode: boolean): void;
    private actionOnFile;
}
