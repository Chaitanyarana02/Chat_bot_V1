import axios from "axios";
import { BASE_URL } from "../constant";
// import { store } from "../../redux/store";
// import CODES from "../StatusCodes";
// import { logout } from "../../redux/Slices/auth-slice";

const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

const setHeaders = (data) => {
  let headers = {
    "accept-language": "en",
    "Content-Type": "application/json",
    // platform: "web",
    // "AccessKey": "AKIAYHZNSNS3V77KVXDY",
    Authorization:
      "AWS4-HMAC-SHA256 Credential=AKIAYHZNSNS3V77KVXDY/20240326/us-east-2/execute-api/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-content-sha256;x-amz-date, Signature=1c1c0a5db4047ade1822075795952ae4a78413715cd30d826670b9f0306af5ba",
    // authtoken: store.getState().auth.accessToken,
  };

  if (data) {
    if (data.isMultipart) {
      headers["Content-Type"] = "multipart/form-data";
    }
    if (data.isBinary) {
      headers["Content-Type"] = "video/mp4";
    }

    if (data.headers) {
      for (var key in data.headers) {
        if (data.headers.hasOwnProperty(key)) {
          headers[key] = data.headers[key];
        }
      }
    }
  }
  return headers;
};

export const getApi = (urlData, params = {}) => {
  const baseUrl = BASE_URL;
  const url = `${baseUrl}${urlData}`;
  const headers = { ...setHeaders() };

  let axiosObj = { method: METHOD.GET, url, params, headers };

  return axios(axiosObj);
};

export const postApi = (urlData, params = {}, multipart) => {
  const baseUrl = BASE_URL;
  const url = `${baseUrl}${urlData}`;
  const headers = {
    ...setHeaders({ isMultipart: multipart || false }),
  };

  let axiosObj = { method: METHOD.POST, url: url, data: params, headers };

  return axios(axiosObj);
};

export const putApi = (urlData, params = {}, multipart) => {
  const baseUrl = BASE_URL;
  const url = `${baseUrl}${urlData}`;
  const headers = {
    ...setHeaders({ isMultipart: multipart || false }),
  };

  let axiosObj = { method: METHOD.PUT, url: url, data: params, headers };

  return axios(axiosObj);
};

export const patchApi = (urlData, params = {}, multipart) => {
  const baseUrl = BASE_URL;
  const url = `${baseUrl}${urlData}`;
  const headers = {
    ...setHeaders({ isMultipart: multipart || false }),
  };

  let axiosObj = { method: METHOD.PATCH, url: url, data: params, headers };

  return axios(axiosObj);
};

export const deleteApi = (urlData, params = {}, multipart) => {
  const baseUrl = BASE_URL;
  const url = `${baseUrl}${urlData}`;
  const headers = { ...setHeaders() };

  let axiosObj = { method: METHOD.DELETE, url: url, data: params, headers };

  return axios(axiosObj);
};

// axios.interceptors.response.use(
//   (next) => {
//     return Promise.resolve(next);
//   },
//   (error) => {
//     if (error?.response?.status === CODES.UNAUTHORIZED) {
//       const { isLogin } = store.getState().auth;
//       if (isLogin) {
//         store.dispatch(logout());
//       }
//     }
//     return Promise.reject(error);
//   }
// );
