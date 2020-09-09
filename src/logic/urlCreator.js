import { SERVER_ADDRESS } from "./constants";

class URLCreator {
  constructor() {
    this.serverRootURL = SERVER_ADDRESS;
  }
  
  root() {
    return new URL('', this.serverRootURL).href;
  }

  paths() {
    return new URL('/paths', this.serverRootURL).href;
  }

  videos(searchParamName, searchParamValue) {
    const url = new URL('/videos', this.serverRootURL);

    if (searchParamName) {
      url.searchParams.append(searchParamName, searchParamValue);
    }

    return url.href;
  }
}

const urlCreator = new URLCreator()

export default urlCreator;