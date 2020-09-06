import { axiosClient } from "../config";
import { errorHandler } from "../utility";
import * as qs from "querystring";

export const getAllCampaign = async (id) => {
  try {
    const endUrl = id ? `/templates/${id}` : '/templates'
    const res = await axiosClient.get(endUrl);
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const addNewCampaign = async (body) => {
  try {
    console.log(qs.stringify(body));
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const res = await axiosClient.post("/templates", qs.stringify(body),config);
    if (res.status === 200) {
      return res.data;
    } else {
      return false;
    }
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

export const deleteCampaign = async (id) => {
  try {
    const res = await axiosClient.delete(`/templates/${id}`);
    if (res.status === 200) {
      return res.data;
    } else {
      return false;
    }
  } catch (err) {
    errorHandler(err);
    return false;
  }
};
