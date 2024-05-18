import nFetch from "node-fetch";

const f = typeof window !== "undefined" ? window.fetch : nFetch;
export default f;
