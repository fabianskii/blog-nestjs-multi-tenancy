import { Input } from '../commands';
import { Configuration } from '../lib/configuration';
import { BuildAction } from './build.action';
export declare class StartAction extends BuildAction {
    handle(inputs: Input[], options: Input[]): Promise<void>;
    createOnSuccessHook(configuration: Required<Configuration>, appName: string, debugFlag: boolean | string | undefined, outDirName: string, binaryToRun?: string): () => void;
    private spawnChildProcess;
}
