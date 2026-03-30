import type { Metadata } from "next";
import DownloadContent from "./DownloadContent";

export const metadata: Metadata = {
  title: "Download Gradeum",
  description:
    "Download Gradeum for Windows. Includes the desktop application and local document indexing agent.",
};

export default function DownloadPage() {
  return <DownloadContent />;
}
