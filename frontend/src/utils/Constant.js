import { File, Shield, Upload } from "lucide-react";
//Texts

export const TEXTS = {
  desc: "Drag and drop your file directly on our cloud and share it with your friends secuarely with password and send it",
};

//Icons
export const SideBarIcon = [
  {
    id: 1,
    name: "Files",
    icon: File,
    path: "/dashboard/",
  },
  {
    id: 2,
    name: "Upload",
    icon: Upload,
    path: "/dashboard/upload",
  },
  {
    id: 3,
    name: "Upgrade",
    icon: Shield,
    path: "/dashboard/upgrade",
  },
];

export const Demofile = [
  {
    id: 1,
    name: "Files 1",
    type: "image/png",
    size: "2.5 MB",
  },
  {
    id: 2,
    name: "Files 2",
    type: "image/png",
    size: "2.5 MB",
  },
  {
    id: 3,
    name: "Files 3",
    type: "image/png",
    size: "2.9 MB",
  },
  {
    id: 4,
    name: "Files 4",
    type: "image/jpg",
    size: "2.5 MB",
  },
];
