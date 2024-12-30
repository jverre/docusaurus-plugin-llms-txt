export type PluginOptions = {
    /**
    * Title for the `llms.txt` file
    */
    title: string;

    /**
    * Description for the `llms.txt` file
    */
    description: string;

    /**
     * Whether to output a `llms-full.txt` file.
     */
    fullLLMsTxt: boolean;
}
