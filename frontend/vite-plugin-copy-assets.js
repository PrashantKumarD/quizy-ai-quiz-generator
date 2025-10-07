
export default function copyAssetsPlugin() {
  return {
    name: "copy-assets",
    async generateBundle(options, bundle) {
      
      console.log("Assets will be copied to output directory");
    },
  };
}
