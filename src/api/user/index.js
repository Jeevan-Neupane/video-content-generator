import axios from "axios";

export const addVideoApi = async (video) => {
  const res = await axios.post("/api/user/addVideo", {
    video,
  });

  return res;
};
