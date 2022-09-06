import axios from "axios";
import {
  AuthenticationTokens,
  ConsumerKeys,
  generateAuthorizationHeader,
} from "./oauth";

const getConsumerKeys = (): ConsumerKeys => ({
  key: process.env.API_KEY!,
  secret: process.env.API_SECRET!,
});
const getAuthenticationTokens = (): AuthenticationTokens => ({
  token: process.env.ACCESS_TOKEN!,
  secret: process.env.ACCESS_SECRET!,
});

// TODO: Give appropriate types of the arguments and the return value.

// NOTE:
// See https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update#post-statuses-update
type UpdateStatusesParameters = {
  status: string;
  media_ids?: string[];
};
export const updateStatuses = async ({
  status,
  media_ids,
}: UpdateStatusesParameters): Promise<object> => {
  const url = "https://api.twitter.com/1.1/statuses/update.json";
  const method = "POST";
  const data = {
    status,
    ...(media_ids ? { media_ids: media_ids.join(",") } : {}),
  };

  const headers = {
    Authorization: generateAuthorizationHeader(
      { url, method, data },
      getConsumerKeys(),
      getAuthenticationTokens()
    ),
  };

  // TODO: Give a response type
  return axios({
    method,
    url,
    data: new URLSearchParams(data).toString(),
    headers,
  }).then(({ data }) => data);
};

// NOTE:
// See https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/api-reference/post-media-upload
type UploadMediaParameters = {
  media_data: string; // NOTE: The base64-encoded file content being uploaded.
};
export const uploadMedia = async ({
  media_data,
}: UploadMediaParameters): Promise<object> => {
  const url = "https://upload.twitter.com/1.1/media/upload.json";
  const method = "POST";
  const data = {
    media_data,
  };

  const headers = {
    Authorization: generateAuthorizationHeader(
      { url, method, data },
      getConsumerKeys(),
      getAuthenticationTokens()
    ),
  };

  // TODO: Give a response type
  return axios({
    method,
    url,
    data: new URLSearchParams(data).toString(),
    headers,
  }).then(({ data }) => data);
};
