import {addVideoApi} from "@/api/user";
import {UploadDropzone} from "@uploadthing/react";
import {useRouter} from "next/navigation";

export const VideoUploadDropzone = () => {
  return (
    <UploadDropzone
      endpoint="videoUploader"
      onClientUploadComplete={async (res) => {
        // Do something with the response
        console.log("Files: ", res);
        try {
          await addVideoApi(res[0]?.url);

          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }}
      onUploadError={(error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
      onDrop={(acceptedFiles) => {
        // Do something with the accepted files
        console.log("Accepted files: ", acceptedFiles);
      }}
    />
  );
};
